import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-4">
        <div className="flex items-center gap-2 text-sm overflow-x-auto">
          <Link
            href="/"
            className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors flex-shrink-0"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors truncate"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-blue-600 font-semibold truncate">
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
