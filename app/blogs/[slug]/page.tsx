// components/BestXForYBlog.tsx

import { LuCirclePlay } from "react-icons/lu";
import { BEST_X_FOR_Y_DATA, RankedItem } from "@/lib/data/randomBlog";
import { Playfair_Display, Source_Serif_4 } from "next/font/google";
import Image from "next/image";

const playfair_display = Playfair_Display({ subsets: ["latin"] });
const source_serif_4 = Source_Serif_4({ subsets: ["latin"] });

function RankBadge({ item }: { item: RankedItem }) {
  return (
    <span className={`${playfair_display.className} text-4xl font-bold text-[#326891]`}>
      {item.medal ?? `${item.rank}.`}
    </span>
  );
}

export default function BestXForYBlog() {
  const data = BEST_X_FOR_Y_DATA;

  return (
    <div className="flex w-full my-12">
      <div className="w-1/4"></div>
      <div className="flex flex-col justify-center w-2/4">
        {/* Header */}
        <div className="text-center flex gap-4 flex-col">
          <div className="uppercase tracking-wide text-xs font-bold text-[#326891]">
            {data.section} · {data.category} for {data.useCase}
          </div>
          <div className={`${playfair_display.className} text-5xl font-bold`}>
            {data.headline}
          </div>
          <div className={`${source_serif_4.className} font-light text-lg`}>
            {data.deck}
          </div>
          <div className="h-[1px] bg-gray-200 my-2 w-full"></div>
        </div>

        <div className="flex justify-between text-xs">
          <div className="flex gap-2 items-center">
            <LuCirclePlay size={18} />
            <div>Listen</div>
            <div>{data.readingTime} min read</div>
          </div>
          <div>Share</div>
        </div>

        {/* Hero image */}
        <div className="my-4 flex flex-col gap-2">
          <Image
            src={data.heroImage.url}
            alt={data.heroImage.caption}
            width={1200}
            height={800}
            className="w-full h-auto"
          />
          <div className={`${source_serif_4.className} text-sm text-[#666]`}>
            {data.heroImage.caption}
            <span className="text-[#326891] font-bold"> {data.heroImage.credit}</span>
          </div>
        </div>

        {/* Byline */}
        <div className={`${source_serif_4.className} flex flex-col mb-2 gap-2 font-bold text-base`}>
          <div className="flex gap-2">
            By
            {data.authors.map((author, i) => (
              <span key={author}>
                <span className="underline">{author}</span>
                {i !== data.authors.length - 1 && ", "}
              </span>
            ))}
          </div>
          <div className="text-gray-600 font-medium text-sm">{data.date}</div>
        </div>

        {/* Intro */}
        <div className={`${source_serif_4.className} font-light text-lg text-[#333] flex flex-col gap-2 text-justify mt-4`}>
          {data.intro.map((p, i) => (
            <div
              key={i}
              className={
                i === 0
                  ? "[&::first-letter]:font-serif [&::first-letter]:text-[86px] [&::first-letter]:font-black [&::first-letter]:float-left [&::first-letter]:leading-[0.76] [&::first-letter]:mr-2 [&::first-letter]:mt-2 [&::first-letter]:text-[#121212]"
                  : ""
              }
            >
              {p}
            </div>
          ))}
        </div>

        {/* Ranked items */}
        <div className="flex flex-col mt-10">
          {data.items.map((item) => (
            <div key={item.rank} className="flex flex-col gap-3 py-8 border-t border-gray-200">
              <div className="flex items-baseline gap-3">
                <RankBadge item={item} />
                <h2 className={`${playfair_display.className} text-3xl font-bold`}>
                  {item.name}
                </h2>
              </div>
              <div className={`${source_serif_4.className} italic text-lg text-[#666]`}>
                {item.tagline}
              </div>

              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={900}
                  height={600}
                  className="w-full h-auto my-1"
                />
              )}

              <div className={`${source_serif_4.className} flex flex-wrap gap-x-6 gap-y-1 text-sm border-y border-gray-200 py-3`}>
                <div><span className="font-bold">Price:</span> {item.price}</div>
                {item.specs.map((spec) => (
                  <div key={spec.label}>
                    <span className="font-bold">{spec.label}:</span> {spec.value}
                  </div>
                ))}
                <div className="ml-auto font-bold text-[#326891]">
                  {item.scoreLabel}: {item.score}/10
                </div>
              </div>

              <div className={`${source_serif_4.className} flex flex-col gap-3 text-lg text-[#333] text-justify`}>
                {item.description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {item.highlights?.map((h) => (
                  <p key={h.label}>
                    <span className="font-bold">{h.label}:</span> {h.text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mt-8 border-t border-gray-200 pt-8">
          <h3 className={`${playfair_display.className} text-2xl font-bold mb-4`}>
            Quick Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className={`${source_serif_4.className} w-full text-sm border-collapse`}>
              <thead>
                <tr className="border-b-2 border-gray-300 text-left">
                  <th className="py-2 pr-4">Soundbar</th>
                  <th className="py-2 pr-4">Price</th>
                  {data.comparisonColumns.map((col) => (
                    <th key={col} className="py-2 pr-4">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.comparisonTable.map((row) => (
                  <tr key={row.name} className="border-b border-gray-200">
                    <td className="py-2 pr-4 font-bold">{row.name}</td>
                    <td className="py-2 pr-4">{row.price}</td>
                    {data.comparisonColumns.map((col) => (
                      <td key={col} className="py-2 pr-4">{row.values[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8">
          {data.tags.map((tag) => (
            <span key={tag} className="text-xs border border-gray-300 rounded-full px-3 py-1 text-gray-600">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="w-1/4"></div>
    </div>
  );
}