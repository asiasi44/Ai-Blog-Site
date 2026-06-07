"use client";
import { FeatureWithPriority } from "../type";

const STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 50];
const DANGER_THRESHOLD = 10;

export default function AdjustFilters({
  featureWithPriority,
  setFeatureWithPriority,
}: {
  featureWithPriority: FeatureWithPriority[];
  setFeatureWithPriority: (f: FeatureWithPriority[]) => void;
}) {
  const handleChange = (name: string, sliderIndex: number) => {
    setFeatureWithPriority(
      featureWithPriority.map((f) =>
        f.name === name ? { ...f, priority: STEPS[sliderIndex] } : f,
      ),
    );
  };

  const resetAll = () =>
    setFeatureWithPriority(featureWithPriority.map((f) => ({ ...f, priority: 1 })));

  const anyBoosted = featureWithPriority.some((f) => f.priority > 1);
  const safeWidthPct = (10 / 11) * 100;

  return (
    <div className="flex flex-col">
      {anyBoosted && (
        <div className="flex justify-end mb-1 pt-1">
          <button
            onClick={resetAll}
            className="text-[11px] text-gray-300 hover:text-red-400 transition-colors"
          >
            reset all
          </button>
        </div>
      )}

      {featureWithPriority.map((feature) => {
        const idx = STEPS.indexOf(feature.priority);
        const sliderIndex = idx === -1 ? 0 : idx;
        const isBoosted = feature.priority > 1;
        const isDanger = feature.priority > DANGER_THRESHOLD;
        const fillPct = (sliderIndex / (STEPS.length - 1)) * 100;

        return (
          <div
            key={feature.name}
            className="py-2.5 border-b border-gray-100 last:border-0"
          >
            {/* Label + badge */}
            <div className="flex items-center justify-between mb-1.5">
              <span
                className={`text-[12px] font-medium transition-colors truncate mr-2 ${
                  isDanger ? "text-red-600" : isBoosted ? "text-blue-700" : "text-gray-700"
                }`}
                title={feature.name}
              >
                {feature.name}
              </span>
              <span
                className={`text-[11px] font-semibold tabular-nums px-1.5 py-0.5 rounded shrink-0 transition-all ${
                  isDanger
                    ? "bg-red-50 text-red-600"
                    : isBoosted
                      ? "bg-blue-50 text-blue-700"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {isDanger && <span className="mr-0.5">⚠</span>}
                {feature.priority}×
              </span>
            </div>

            {/* Track */}
            <div className="relative h-4 flex items-center">
              {/* BG zones */}
              <div className="absolute inset-x-0 h-1 rounded-full overflow-hidden flex pointer-events-none">
                <div className="h-full bg-slate-100" style={{ width: `${safeWidthPct}%` }} />
                <div className="h-full bg-red-100" style={{ width: `${100 - safeWidthPct}%` }} />
              </div>
              {/* Active fill */}
              <div
                className="absolute h-1 rounded-full pointer-events-none transition-all duration-100"
                style={{
                  width: `${fillPct}%`,
                  background: isDanger ? "#ef4444" : isBoosted ? "#3b82f6" : "#cbd5e1",
                }}
              />
              {/* Zone divider */}
              <div
                className="absolute w-px h-3 bg-red-200 pointer-events-none"
                style={{ left: `calc(${safeWidthPct}% - 0.5px)` }}
              />
              <input
                type="range"
                min={0}
                max={STEPS.length - 1}
                step={1}
                value={sliderIndex}
                onChange={(e) => handleChange(feature.name, Number(e.target.value))}
                className="relative w-full cursor-pointer bg-transparent appearance-none h-4 z-10"
                style={{ accentColor: isDanger ? "#ef4444" : "#2563eb" }}
              />
            </div>

            {/* Ticks */}
            <div className="flex justify-between text-[9px] text-gray-200 mt-0.5">
              <span>1×</span>
              <span>5×</span>
              <span>10×</span>
              <span className="text-red-200">50×</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}