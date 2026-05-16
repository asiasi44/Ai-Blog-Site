import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function ProductPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className="sticky top-0 z-50 bg-gray-50/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Ranknest
            </Link>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
