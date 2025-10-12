"use client";
import Link from "next/link";
import { Package, BarChart3 } from "lucide-react";
import Button from "@/components/ui/Button";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link className="text-xl font-semibold text-gray-900" href={"/"}>
              Amazon Product Analyzer
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/product-library">
              <Button
                variant={pathname === "/product-library" ? "default" : "ghost"}
                className="flex items-center gap-2"
              >
                <Package className="w-4 h-4" />
                Product Library
              </Button>
            </Link>
            <Link href="/scraped-products">
              <Button
                variant={pathname === "/scraped-products" ? "default" : "ghost"}
                className="flex items-center gap-2"
              >
                <Package className="w-4 h-4" />
                Scraped Products
              </Button>
            </Link>
            <Link href="/analysis-results">
              <Button
                variant={pathname === "/analysis-results" ? "default" : "ghost"}
                className="flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Analysis Results
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
