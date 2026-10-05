type VideoChapter = {
  timestamp: string;
  title: string;
};

function timestampToSeconds(timestamp: string) {
  const parts = timestamp.split(":").map(Number);
  if (parts.some((part) => !Number.isFinite(part))) return 0;
  return parts.reduce((seconds, part) => seconds * 60 + part, 0);
}

export default function ProductVideo({
  videoId,
  title,
  chapters = [],
}: {
  videoId: string;
  title: string;
  chapters?: VideoChapter[];
}) {
  if (!/^[\w-]{11}$/.test(videoId)) return null;

  return (
    <section className="border-4 border-slate-900 bg-slate-900 p-4 text-white shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] sm:p-6">
      <div className="mb-4">
        <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#FFE7A2]">
          RankNest video
        </p>
        <h2 className="mt-2 font-anton text-2xl uppercase tracking-wide sm:text-3xl">
          {title}
        </h2>
      </div>
      <div className="aspect-video overflow-hidden border-2 border-slate-900 bg-black">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      {chapters.length > 0 && (
        <nav aria-label="Video chapters" className="mt-4 flex flex-wrap gap-2">
          {chapters.map((chapter, index) => (
            <a
              key={`${chapter.timestamp}-${index}`}
              href={`https://www.youtube.com/watch?v=${videoId}&t=${timestampToSeconds(chapter.timestamp)}s`}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white/40 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wide transition-colors hover:border-[#FFE7A2] hover:bg-[#FFE7A2] hover:text-slate-900"
            >
              <span className="text-[#FFE7A2]">{chapter.timestamp}</span> {chapter.title}
            </a>
          ))}
        </nav>
      )}
    </section>
  );
}
