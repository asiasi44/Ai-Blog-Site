"use client";
import { Slider } from "@/components/ui/slider";
import { FeatureWithPriority } from "../type";

export default function SetPriority({
  feature,
  setFeatureWithPriority,
}: {
  feature: FeatureWithPriority;
  setFeatureWithPriority: React.Dispatch<
    React.SetStateAction<FeatureWithPriority[]>
  >;
}) {
  const handlePriorityChange = (v: [number]) => {
    const givenPriority = v[0];

    setFeatureWithPriority((prev) =>
      prev.map((f) =>
        f._id === feature._id ? { ...f, priority: givenPriority } : f,
      ),
    );
  };
  return (
    <div key={feature._id} className="flex gap-4 items-center">
      <div className="underline">{feature.name}</div>
      <div className="w-22 flex gap-2">
        <Slider
          min={1}
          max={5}
          step={1}
          className=""
          value={[feature.priority]}
          onValueChange={handlePriorityChange}
        />
        <div>{feature.priority}x</div>
      </div>
    </div>
  );
}
