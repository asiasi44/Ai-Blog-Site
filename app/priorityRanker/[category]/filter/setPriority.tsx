"use client";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export default function SetPriority({
  feature,
}: {
  feature: { name: string; keywords: [string]; _id: string };
}) {
  const [value, setValue] = useState(1);
  return (
    <div key={feature._id} className="flex gap-4 items-center">
      <div className="underline">{feature.name}</div>
      <div className="w-22 flex gap-2">
        <Slider
          min={1}
          max={2}
          step={0.1}
          className=""
          value={[value]}
          onValueChange={(v) => setValue(v[0])}
        />
        <div>{value}x</div>
      </div>
    </div>
  );
}
