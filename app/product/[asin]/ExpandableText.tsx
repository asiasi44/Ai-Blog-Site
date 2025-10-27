"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableTextProps {
  text: string;
  maxLength?: number;
}

export function ExpandableText({ text, maxLength = 100 }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);

  if (text.length <= maxLength) {
    return <p className="mt-1 text-gray-800">{text}</p>;
  }

  return (
    <p className="mt-1 text-gray-800 relative">
      {expanded ? text : text.slice(0, maxLength) + "..."}{" "}
      <span
        onClick={() => setExpanded(!expanded)}
        className="text-blue-600 cursor-pointer ml-1 flex items-center gap-1 font-medium hover:text-blue-800 select-none"
        title={expanded ? "Collapse" : "Expand"}
      >
        {expanded ? "less" : "more"}{" "}
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </span>
    </p>
  );
}
