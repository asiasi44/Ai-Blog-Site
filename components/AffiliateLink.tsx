import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { THEME, COMPONENT_COLORS } from "@/lib/design/theme";
import { ReactNode } from "react";

interface AffiliateLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "button" | "inline" | "badge";
  showIcon?: boolean;
  disclosure?: "full" | "compact" | "tooltip";
}

/**
 * AffiliateLink Component
 * Clearly marks Amazon affiliate links with FTC-compliant disclosure
 */
export default function AffiliateLink({
  href,
  children,
  className = "",
  variant = "button",
  showIcon = true,
  disclosure = "compact",
}: AffiliateLinkProps) {
  const baseClassName = "inline-flex items-center gap-2 transition-all duration-200";

  const variantStyles = {
    button: `px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2`,
    inline: `text-blue-600 font-medium underline hover:text-blue-700`,
    badge: `px-4 py-2 rounded-full text-sm font-semibold bg-amber-50 text-amber-700 border-2 border-amber-200 hover:border-amber-400`,
  };

  const disclosureElement = {
    full: (
      <span className="text-xs text-gray-500 ml-1 align-super">
        *affiliate link
      </span>
    ),
    compact: (
      <span
        className="inline-block w-1.5 h-1.5 rounded-full ml-1 align-super"
        style={{ backgroundColor: THEME.accent[500] }}
        title="This is an affiliate link - we earn a commission at no extra cost to you"
      />
    ),
    tooltip: null,
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={`${baseClassName} ${variantStyles[variant]} ${className}`}
      style={
        variant === "button"
          ? {
              backgroundColor: COMPONENT_COLORS.button.affiliate,
            }
          : undefined
      }
      onMouseEnter={(e) => {
        if (variant === "button") {
          (e.currentTarget as HTMLElement).style.backgroundColor =
            COMPONENT_COLORS.button.affiliateHover;
        }
      }}
      onMouseLeave={(e) => {
        if (variant === "button") {
          (e.currentTarget as HTMLElement).style.backgroundColor =
            COMPONENT_COLORS.button.affiliate;
        }
      }}
      title={
        disclosure === "tooltip"
          ? "This is an affiliate link - we earn a commission at no extra cost to you"
          : undefined
      }
    >
      <span>{children}</span>
      {showIcon && <ExternalLink className="w-4 h-4" />}
      {disclosureElement[disclosure]}
    </Link>
  );
}

/**
 * Affiliate Disclosure Banner
 * Display on pages with affiliate links
 */
export function AffiliateDisclosure() {
  return (
    <div
      className="px-4 py-3 rounded-lg text-sm flex gap-2 items-start border-l-4"
      style={{
        backgroundColor: THEME.accent[50],
        borderColor: THEME.accent[500],
        color: THEME.neutral[700],
      }}
    >
      <span className="font-bold text-amber-600">💡</span>
      <div>
        <p className="font-semibold text-amber-900">Affiliate Disclosure</p>
        <p className="text-amber-800 mt-1">
          We earn a small commission from Amazon purchases at no extra cost to you.
          This helps us provide free product recommendations.
        </p>
      </div>
    </div>
  );
}
