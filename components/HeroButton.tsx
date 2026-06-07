"use client";
import Link from "next/link";
import { ReactNode, useRef } from "react";

interface HeroButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  baseColor: string;
  hoverColor: string;
  backgroundColor?: string;
  borderColor?: string;
}

export default function HeroButton({
  href,
  children,
  variant = "primary",
  baseColor,
  hoverColor,
  backgroundColor,
  borderColor,
}: HeroButtonProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = () => {
    if (linkRef.current) {
      linkRef.current.style.backgroundColor = hoverColor;
    }
  };

  const handleMouseLeave = () => {
    if (linkRef.current) {
      linkRef.current.style.backgroundColor =
        variant === "primary" ? baseColor : backgroundColor || "transparent";
    }
  };

  if (variant === "primary") {
    return (
      <Link
        ref={linkRef}
        href={href}
        className="px-8 py-4 rounded-full text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        style={{ backgroundColor: baseColor }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      ref={linkRef}
      href={href}
      className="px-8 py-4 rounded-full text-lg font-semibold border-2 transition-all duration-300"
      style={{
        borderColor,
        color: baseColor,
        backgroundColor,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Link>
  );
}
