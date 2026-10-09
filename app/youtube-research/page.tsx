"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

const POLLINATIONS_CLIENT_ID = process.env.NEXT_PUBLIC_POLLINATIONS_CLIENT_ID;
const TOKEN_STORAGE_KEY = "youtube-research.pollinations-token";
const VERIFIER_STORAGE_KEY = "youtube-research.pollinations-verifier";
const STATE_STORAGE_KEY = "youtube-research.pollinations-state";

type ChatCompletionResponse = {
  choices?: { message?: { content?: string | null } }[];
  error?: { message?: string };
};

type OAuthTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

type SeedSuggestions = {
  seed: string;
  suggestions: string[];
};

type SearchSignal = {
  query: string;
  occurrences: number;
};

type VideoStrategy = {
  title: string;
  openingHook: string;
  targetedQueries: string[];
  whyThisWorks: string;
  executionSteps: string[];
};

function fetchYoutubeSuggestions(seed: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const callbackName = `youtubeSuggest_${crypto.randomUUID().replace(/-/g, "")}`;
    const jsonpWindow = window as Window &
      Record<string, (response: unknown) => void>;
    const script = document.createElement("script");
    const timeout = window.setTimeout(
      () => finish(new Error("Suggestion request timed out.")),
      12000,
    );

    const finish = (error?: Error, suggestions: string[] = []) => {
      window.clearTimeout(timeout);
      script.remove();
      delete jsonpWindow[callbackName];
      if (error) reject(error);
      else resolve(suggestions);
    };

    jsonpWindow[callbackName] = (response: unknown) => {
      if (!Array.isArray(response) || !Array.isArray(response[1])) {
        finish(new Error("Google returned an unexpected suggestion response."));
        return;
      }
      finish(
        undefined,
        response[1].filter(
          (suggestion): suggestion is string => typeof suggestion === "string",
        ),
      );
    };
    script.onerror = () => finish(new Error("Suggestion request failed."));
    script.src = `https://suggestqueries.google.com/complete/search?${new URLSearchParams(
      {
        client: "chrome",
        ds: "yt",
        q: seed,
        callback: callbackName,
      },
    )}`;
    document.head.appendChild(script);
  });
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function rankSearchSignals(results: SeedSuggestions[]): SearchSignal[] {
  const frequencies = new Map<string, SearchSignal>();
  for (const { suggestions } of results) {
    for (const suggestion of suggestions) {
      const query = suggestion.trim().replace(/\s+/g, " ");
      const key = query.toLocaleLowerCase();
      if (!key) continue;

      const signal = frequencies.get(key);
      if (signal) signal.occurrences += 1;
      else frequencies.set(key, { query, occurrences: 1 });
    }
  }

  return [...frequencies.values()]
    .sort(
      (left, right) =>
        right.occurrences - left.occurrences ||
        left.query.localeCompare(right.query),
    )
    .slice(0, 15);
}

async function requestPollinationsChat(
  accessToken: string,
  messages: { role: "system" | "user"; content: string }[],
): Promise<string> {
  const response = await fetch(
    "https://gen.pollinations.ai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai",
        temperature: 0.7,
        response_format: { type: "json_object" },
        messages,
      }),
    },
  );

  const result = (await response.json()) as ChatCompletionResponse;
  if (!response.ok) {
    throw new Error(
      response.status === 401 || response.status === 403
        ? "Pollinations rejected this connection. Please reconnect and try again."
        : result.error?.message ||
            `Pollinations request failed (${response.status}). Please try again.`,
    );
  }

  const content = result.choices?.[0]?.message?.content;
  if (!content)
    throw new Error("Pollinations returned no data. Please try again.");
  return content;
}

function encodeBase64Url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function createRandomValue(): string {
  return encodeBase64Url(crypto.getRandomValues(new Uint8Array(32)));
}

async function createCodeChallenge(verifier: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(verifier),
  );
  return encodeBase64Url(new Uint8Array(digest));
}

function parseSeedResearch(content: string): {
  channelAnalysis: string;
  seeds: string[];
} {
  const normalized = content
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
  const parsed: unknown = JSON.parse(normalized);
  const response =
    parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as { seeds?: unknown; channelAnalysis?: unknown })
      : null;
  const seeds = response?.seeds;

  if (!Array.isArray(seeds)) {
    throw new Error(
      "Pollinations returned an unexpected response. Please try again.",
    );
  }

  return {
    channelAnalysis:
      typeof response?.channelAnalysis === "string"
        ? response.channelAnalysis
        : "",
    seeds: [
      ...new Set(
        seeds
          .filter((seed): seed is string => typeof seed === "string")
          .map((seed) => seed.trim())
          .filter(Boolean),
      ),
    ],
  };
}

function parseStrategies(
  content: string,
  expectedCount: number,
): VideoStrategy[] {
  const normalized = content
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
  const parsed: unknown = JSON.parse(normalized);
  const strategies = Array.isArray(parsed)
    ? parsed
    : parsed && typeof parsed === "object" && "strategies" in parsed
      ? (parsed as { strategies: unknown }).strategies
      : null;

  if (!Array.isArray(strategies) || strategies.length !== expectedCount) {
    throw new Error(
      `Pollinations did not return exactly ${expectedCount} strategies. Please try again.`,
    );
  }

  return strategies.map((strategy, index) => {
    if (!strategy || typeof strategy !== "object") {
      throw new Error(
        `Strategy ${index + 1} had an unexpected format. Please try again.`,
      );
    }

    const candidate = strategy as Record<string, unknown>;
    const targetedQueries = Array.isArray(candidate.targetedQueries)
      ? candidate.targetedQueries.filter(
          (value): value is string =>
            typeof value === "string" && Boolean(value.trim()),
        )
      : [];
    const executionSteps = Array.isArray(candidate.executionSteps)
      ? candidate.executionSteps.filter(
          (value): value is string =>
            typeof value === "string" && Boolean(value.trim()),
        )
      : [];

    if (
      typeof candidate.title !== "string" ||
      typeof candidate.openingHook !== "string" ||
      typeof candidate.whyThisWorks !== "string" ||
      targetedQueries.length === 0 ||
      executionSteps.length === 0
    ) {
      throw new Error(
        `Strategy ${index + 1} was missing required details. Please try again.`,
      );
    }

    return {
      title: candidate.title,
      openingHook: candidate.openingHook,
      targetedQueries,
      whyThisWorks: candidate.whyThisWorks,
      executionSteps,
    };
  });
}

export default function YoutubeResearch() {
  const [brief, setBrief] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [strategies, setStrategies] = useState<VideoStrategy[]>([]);
  const [error, setError] = useState("");
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [researchStatus, setResearchStatus] = useState("");

  useEffect(() => {
    const savedToken = sessionStorage.getItem(TOKEN_STORAGE_KEY);
    if (savedToken) setAccessToken(savedToken);

    const callbackUrl = new URL(window.location.href);
    const code = callbackUrl.searchParams.get("code");
    const callbackError = callbackUrl.searchParams.get("error");
    if (!code && !callbackError) return;

    const callbackState = callbackUrl.searchParams.get("state");
    const expectedState = sessionStorage.getItem(STATE_STORAGE_KEY);
    const verifier = sessionStorage.getItem(VERIFIER_STORAGE_KEY);
    window.history.replaceState({}, "", callbackUrl.pathname);
    sessionStorage.removeItem(STATE_STORAGE_KEY);

    if (callbackError) {
      sessionStorage.removeItem(VERIFIER_STORAGE_KEY);
      setError(
        "Pollinations connection was not authorized. You can try again.",
      );
      return;
    }
    if (
      !code ||
      !callbackState ||
      callbackState !== expectedState ||
      !verifier ||
      !POLLINATIONS_CLIENT_ID
    ) {
      sessionStorage.removeItem(VERIFIER_STORAGE_KEY);
      setError(
        "Could not verify the Pollinations connection. Please connect again.",
      );
      return;
    }

    setIsConnecting(true);
    const redirectUri = `${window.location.origin}${callbackUrl.pathname}`;
    void fetch("https://enter.pollinations.ai/api/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: POLLINATIONS_CLIENT_ID,
        redirect_uri: redirectUri,
        code_verifier: verifier,
      }),
    })
      .then(async (response) => {
        const result = (await response.json()) as OAuthTokenResponse;
        if (!response.ok || !result.access_token) {
          throw new Error(
            result.error_description ||
              result.error ||
              "Pollinations authorization failed.",
          );
        }
        sessionStorage.setItem(TOKEN_STORAGE_KEY, result.access_token);
        setAccessToken(result.access_token);
        setError("");
      })
      .catch((connectionError: unknown) => {
        setError(
          connectionError instanceof Error
            ? connectionError.message
            : "Could not connect to Pollinations.",
        );
      })
      .finally(() => {
        sessionStorage.removeItem(VERIFIER_STORAGE_KEY);
        setIsConnecting(false);
      });
  }, []);

  const handleConnect = async () => {
    if (!POLLINATIONS_CLIENT_ID) {
      setError(
        "Pollinations sign-in is not configured. Set NEXT_PUBLIC_POLLINATIONS_CLIENT_ID to your Pollinations App Key.",
      );
      return;
    }

    try {
      const verifier = createRandomValue();
      const state = createRandomValue();
      const challenge = await createCodeChallenge(verifier);
      const redirectUri = `${window.location.origin}${window.location.pathname}`;
      sessionStorage.setItem(VERIFIER_STORAGE_KEY, verifier);
      sessionStorage.setItem(STATE_STORAGE_KEY, state);

      const authorizeUrl = new URL("https://enter.pollinations.ai/authorize");
      authorizeUrl.search = new URLSearchParams({
        response_type: "code",
        client_id: POLLINATIONS_CLIENT_ID,
        redirect_uri: redirectUri,
        state,
        code_challenge: challenge,
        code_challenge_method: "S256",
        budget: "5",
        expiry: "7",
      }).toString();
      window.location.assign(authorizeUrl.toString());
    } catch {
      setError("Could not start Pollinations sign-in. Please try again.");
    }
  };

  const handleDisconnect = () => {
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    setAccessToken("");
    setError("");
  };

  const handleGenerateIdeas = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedBrief = brief.trim();

    if (!normalizedBrief) {
      setError(
        "Describe your channel, audience, or the kind of videos you want to make.",
      );
      return;
    }
    if (!accessToken) {
      setError(
        "Connect your Pollinations account to generate video ideas using your Pollen balance.",
      );
      return;
    }

    setError("");
    setStrategies([]);
    setIsGeneratingIdeas(true);

    try {
      setResearchStatus("Understanding your channel and audience...");
      const seedResearchContent = await requestPollinationsChat(accessToken, [
        {
          role: "system",
          content:
            'You are a YouTube audience researcher. The user will describe a channel, a rough video idea, an audience, or a messy combination of these. First infer the channel niche, likely audience, creator strengths or constraints, and the viewer intent. Treat imperfect wording generously, infer the most plausible meaning, and do not ask follow-up questions. Then create 20 to 30 concise, varied YouTube search seed queries that fit that inferred channel and audience. Return only JSON in this shape: {"channelAnalysis":"A concise inferred channel and audience profile","seeds":["query 1","query 2"]}.',
        },
        { role: "user", content: normalizedBrief },
      ]);
      const seedResearch = parseSeedResearch(seedResearchContent);
      if (seedResearch.seeds.length === 0) {
        throw new Error(
          "Could not create search angles from that description. Try adding a little more about your channel or audience.",
        );
      }

      const collected: SeedSuggestions[] = [];
      for (let index = 0; index < seedResearch.seeds.length; index += 1) {
        const seed = seedResearch.seeds[index];
        setResearchStatus(
          `Researching YouTube searches (${index + 1}/${seedResearch.seeds.length})...`,
        );
        try {
          collected.push({
            seed,
            suggestions: await fetchYoutubeSuggestions(seed),
          });
        } catch {
          // Keep the workflow moving when an individual autocomplete request fails.
        }
        if (index < seedResearch.seeds.length - 1) await wait(1500);
      }

      let searchSignals = rankSearchSignals(collected);
      const autocompleteAvailable = searchSignals.length > 0;
      if (!autocompleteAvailable) {
        searchSignals = seedResearch.seeds
          .slice(0, 15)
          .map((query) => ({ query, occurrences: 0 }));
      }

      setResearchStatus("Building your video ideas...");
      const strategyContent = await requestPollinationsChat(accessToken, [
        {
          role: "system",
          content:
            'You are an expert YouTube channel strategist. Analyze the user description and inferred profile, then produce exactly 5 distinct, high-quality video ideas the creator can realistically execute. These are the final user-facing results, not keyword suggestions. Rank ideas best-first for audience fit, clarity, originality, and practical execution. Explain specifically why each idea is a good fit for this creator and audience; mention the actual signal it responds to. Autocomplete occurrence counts only describe recurrence in this small collected sample, never search volume or guaranteed demand. If autocomplete is unavailable, use the inferred profile and seed queries without claiming search validation. Use concise useful detail. Return only JSON: {"strategies":[{"title":"Accurate clickable video title","openingHook":"A spoken hook for the first five seconds","targetedQueries":["one or two supplied search phrases"],"whyThisWorks":"Why this idea fits the described channel and audience, including the supporting search or brief signal","executionSteps":["A concise production action","A second concrete action","A third concrete action"]}]}. Include 3 or 4 practical execution steps per idea.',
        },
        {
          role: "user",
          content: JSON.stringify({
            creatorBrief: normalizedBrief,
            inferredChannelAndAudience: seedResearch.channelAnalysis,
            autocompleteAvailable,
            searchSignals,
          }),
        },
      ]);

      setStrategies(parseStrategies(strategyContent, 5));
    } catch (generationError) {
      setError(
        generationError instanceof Error
          ? generationError.message
          : "Could not generate video ideas. Check your connection and try again.",
      );
    } finally {
      setIsGeneratingIdeas(false);
      setResearchStatus("");
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFDF5] px-4 py-10 text-slate-900 md:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="border-4 border-slate-900 bg-slate-900 p-6 text-white shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] md:p-10">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#FFE7A2]">
            YouTube strategy studio
          </p>
          <h1 className="mt-3 font-anton text-4xl uppercase tracking-wide sm:text-5xl">
            Video ideas built for your channel
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
            Describe your channel, audience, rough ideas, or all three. Get five
            focused ideas with a clear reason to make each one.
          </p>
        </header>

        <form
          onSubmit={handleGenerateIdeas}
          className="mt-8 border-4 border-slate-900 bg-[#FFE7A2] p-5 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] md:p-7"
        >
          <label className="flex flex-col gap-2 font-mono text-[10px] font-black uppercase tracking-widest">
            Tell us about your channel or video direction
            <textarea
              required
              rows={6}
              maxLength={3000}
              value={brief}
              onChange={(event) => setBrief(event.target.value)}
              disabled={isGeneratingIdeas}
              placeholder="I make videos about restoring old laptops, mostly for people who want to learn repairs without expensive tools. I have a small workshop and prefer hands-on tests over talking-head videos..."
              className="min-h-36 resize-y border-2 border-slate-900 bg-white px-4 py-3 font-sans text-sm font-normal normal-case leading-6 tracking-normal outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-100"
            />
          </label>
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              {accessToken ? (
                <>
                  <span
                    role="status"
                    className="border-2 border-slate-900 bg-white px-3 py-2 font-mono text-[10px] font-black uppercase tracking-widest"
                  >
                    Pollinations connected
                  </span>
                  <button
                    type="button"
                    onClick={handleDisconnect}
                    disabled={isGeneratingIdeas}
                    className="min-h-11 border-2 border-slate-900 bg-white px-4 py-2 font-mono text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 disabled:opacity-60"
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="min-h-12 border-2 border-slate-900 bg-white px-5 py-3 font-mono text-[10px] font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
                >
                  {isConnecting ? "Connecting..." : "Connect Pollinations"}
                </button>
              )}
              {!POLLINATIONS_CLIENT_ID && (
                <span className="max-w-xs font-sans text-xs font-normal text-slate-700">
                  Add NEXT_PUBLIC_POLLINATIONS_CLIENT_ID to enable account
                  connection.
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={
                isGeneratingIdeas ||
                !accessToken ||
                isConnecting ||
                !brief.trim()
              }
              className="min-h-12 border-2 border-slate-900 bg-[#93E9BE] px-5 py-3 font-mono text-[10px] font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
            >
              {isGeneratingIdeas
                ? "Finding your ideas..."
                : strategies.length
                  ? "Generate new ideas"
                  : "Generate my video ideas"}
            </button>
          </div>
          {isGeneratingIdeas && researchStatus && (
            <p
              role="status"
              aria-live="polite"
              className="mt-4 text-sm font-semibold text-slate-800"
            >
              {researchStatus}
            </p>
          )}
          {error && (
            <p
              role="alert"
              className="mt-5 border-2 border-red-900 bg-red-100 p-3 text-sm font-semibold text-red-900"
            >
              {error}
            </p>
          )}
        </form>

        {strategies.length > 0 && (
          <section className="mt-10" aria-live="polite">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                  Personalized video plan
                </p>
                <h2 className="mt-1 font-anton text-3xl uppercase">
                  Your five best ideas
                </h2>
              </div>
              <span className="border-2 border-slate-900 bg-[#93E9BE] px-3 py-2 font-mono text-xs font-black uppercase">
                {strategies.length} ideas
              </span>
            </div>
            <ol className="space-y-5">
              {strategies.map((strategy, index) => (
                <li
                  key={`${index}-${strategy.title}`}
                  className="border-2 border-slate-900 bg-white p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] md:p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="shrink-0 font-mono text-sm font-black text-slate-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-anton text-2xl uppercase">
                        {strategy.title}
                      </h3>
                      <blockquote className="mt-4 border-l-4 border-emerald-500 pl-4 text-sm font-semibold leading-6">
                        <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-500">
                          Opening hook
                        </span>
                        <br />
                        {strategy.openingHook}
                      </blockquote>
                      <div className="mt-5 border-t border-slate-200 pt-4">
                        <h4 className="font-mono text-[10px] font-black uppercase tracking-widest">
                          Why this is a good fit
                        </h4>
                        <p className="mt-1 text-sm leading-6">
                          {strategy.whyThisWorks}
                        </p>
                      </div>
                      <div className="mt-5 grid gap-5 md:grid-cols-2">
                        <div>
                          <h4 className="font-mono text-[10px] font-black uppercase tracking-widest">
                            Search phrases to target
                          </h4>
                          <ul className="mt-2 flex flex-wrap gap-2">
                            {strategy.targetedQueries.map((query) => (
                              <li
                                key={query}
                                className="border border-slate-300 bg-slate-50 px-2 py-1 text-sm"
                              >
                                {query}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-mono text-[10px] font-black uppercase tracking-widest">
                            How to execute
                          </h4>
                          <ol className="mt-2 list-inside list-decimal space-y-1 text-sm leading-6">
                            {strategy.executionSteps.map((step, stepIndex) => (
                              <li key={`${stepIndex}-${step}`}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
      <section
        aria-label="Pollinations attribution"
        className="mx-auto mt-16 max-w-5xl overflow-hidden border-2 border-slate-900 bg-slate-900 text-white shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]"
      >
        <div className="flex flex-col gap-6 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center border-2 border-slate-900 bg-[#93E9BE] text-slate-900">
              <Sparkles aria-hidden="true" size={22} strokeWidth={2.5} />
            </span>
            <div>
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-[#FFE7A2]">
                AI research, in bloom
              </p>
              <h2 className="mt-1 font-anton text-2xl uppercase sm:text-3xl">
                Made with Pollinations.ai
              </h2>
              <p className="mt-1 max-w-lg text-sm leading-6 text-slate-300">
                Helping turn your channel direction into ideas worth making.
              </p>
            </div>
          </div>
          <a
            href="https://pollinations.ai/?ref=badge"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-14 items-center justify-between gap-4 border-2 border-slate-900 bg-white px-4 py-3 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#93E9BE] sm:justify-center"
          >
            <span className="text-left">
              <span className="block font-mono text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                Explore
              </span>
              <span className="block font-anton text-lg uppercase text-slate-900">
                pollinations.ai
              </span>
            </span>
            <ArrowUpRight
              aria-hidden="true"
              size={18}
              className="shrink-0 text-slate-700 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </section>
    </main>
  );
}
