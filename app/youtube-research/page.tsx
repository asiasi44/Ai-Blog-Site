"use client";

import { FormEvent, useState } from "react";

type ChatCompletionResponse = {
  choices?: { message?: { content?: string | null } }[];
  error?: { message?: string };
};

function parseSeeds(content: string): string[] {
  const normalized = content
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
  const parsed: unknown = JSON.parse(normalized);
  const seeds = Array.isArray(parsed)
    ? parsed
    : parsed && typeof parsed === "object" && "seeds" in parsed
      ? (parsed as { seeds: unknown }).seeds
      : null;

  if (!Array.isArray(seeds)) {
    throw new Error("Pollinations returned an unexpected response. Please try again.");
  }

  const uniqueSeeds = [...new Set(
    seeds.filter((seed): seed is string => typeof seed === "string")
      .map((seed) => seed.trim())
      .filter(Boolean),
  )];

  if (uniqueSeeds.length !== 30) {
    throw new Error("Pollinations did not return 30 unique search seeds. Please try again.");
  }

  return uniqueSeeds;
}

export default function YoutubeResearch() {
  const [topic, setTopic] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [seeds, setSeeds] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedTopic = topic.trim();
    const normalizedApiKey = apiKey.trim();

    if (!normalizedTopic) {
      setError("Enter a topic to generate search seeds.");
      return;
    }
    if (!normalizedApiKey) {
      setError("Enter a Pollinations API key to generate seeds using your Pollen balance.");
      return;
    }

    setError("");
    setSeeds([]);
    setIsGenerating(true);

    try {
      const response = await fetch("https://gen.pollinations.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${normalizedApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai",
          temperature: 0.7,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                'Generate exactly 30 distinct, useful YouTube keyword research seed queries for the given topic. Include varied search intent such as "how to", "best", reviews, comparisons using "vs", buying advice, and alphabet expansions from A through Z where appropriate. Keep every query specific to the topic and suitable for Google or YouTube autocomplete expansion. Return only valid JSON in this shape: {"seeds":["query 1", "query 2"]}. The seeds array must contain exactly 30 unique strings.',
            },
            {
              role: "user",
              content: `Create 30 YouTube keyword research seeds for: ${normalizedTopic}`,
            },
          ],
        }),
      });

      const result = (await response.json()) as ChatCompletionResponse;
      if (!response.ok) {
        throw new Error(
          response.status === 401 || response.status === 403
            ? "Pollinations rejected this API key. Check the key and try again."
            : result.error?.message || `Seed generation failed (${response.status}). Please try again.`,
        );
      }

      const content = result.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error("Pollinations returned no seed data. Please try again.");
      }

      setSeeds(parseSeeds(content));
    } catch (generationError) {
      setError(
        generationError instanceof Error
          ? generationError.message
          : "Could not generate seeds. Check your connection and try again.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFDF5] px-4 py-10 text-slate-900 md:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="border-4 border-slate-900 bg-slate-900 p-6 text-white shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] md:p-10">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#FFE7A2]">
            YouTube keyword research
          </p>
          <h1 className="mt-3 font-anton text-4xl uppercase tracking-wide sm:text-5xl">
            Turn a topic into 30 search seeds
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
            Start with one topic. Pollinations AI will create a focused set of
            search queries to explore.
          </p>
        </header>

        <form
          onSubmit={handleGenerate}
          className="mt-8 border-4 border-slate-900 bg-[#FFE7A2] p-5 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] md:p-7"
        >
          <div className="grid gap-5 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <label className="flex flex-col gap-2 font-mono text-[10px] font-black uppercase tracking-widest">
              Seed topic
              <input
                type="text"
                required
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                placeholder="e.g. Minecraft"
                className="min-w-0 border-2 border-slate-900 bg-white px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </label>
            <label className="flex flex-col gap-2 font-mono text-[10px] font-black uppercase tracking-widest">
              Pollinations API key
              <input
                type="password"
                autoComplete="off"
                value={apiKey}
                onChange={(event) => setApiKey(event.target.value)}
                placeholder="pk_... or sk_..."
                className="min-w-0 border-2 border-slate-900 bg-white px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span className="font-sans text-xs font-normal normal-case tracking-normal text-slate-600">
                Sent directly to Pollinations and kept only in this page session.
              </span>
            </label>
            <button
              type="submit"
              disabled={isGenerating}
              className="min-h-12 border-2 border-slate-900 bg-[#93E9BE] px-5 py-3 font-mono text-[10px] font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
            >
              {isGenerating ? "Generating..." : "Generate seeds"}
            </button>
          </div>
          {error && (
            <p role="alert" className="mt-5 border-2 border-red-900 bg-red-100 p-3 text-sm font-semibold text-red-900">
              {error}
            </p>
          )}
        </form>

        {seeds.length > 0 && (
          <section className="mt-8" aria-live="polite">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                  Generated for {topic.trim()}
                </p>
                <h2 className="mt-1 font-anton text-3xl uppercase">30 search seeds</h2>
              </div>
              <span className="border-2 border-slate-900 bg-[#93E9BE] px-3 py-2 font-mono text-xs font-black uppercase">
                {seeds.length} queries
              </span>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {seeds.map((seed, index) => (
                <li
                  key={`${index}-${seed}`}
                  className="flex min-w-0 items-start gap-3 border-2 border-slate-900 bg-white p-4 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
                >
                  <span className="font-mono text-xs font-black text-slate-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold leading-6">{seed}</span>
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </main>
  );
}
