import Link from "next/link";

export default function Navbar({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) {
  return (
    <header className="sticky top-0 z-50 bg-gray-50/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Ranknest
          </Link>
          <div className="flex-1 flex gap-8 items-center max-w-xl w-full lg:w-auto mx-0 lg:mx-8">
            <input
              type="text"
              className="w-full px-5 py-3 border border-gray-300 rounded-full text-base focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link
              href={"/subscribe-to-newsletter?utm_source=direct"}
              className="border-yellow-300 rounded-full px-4 py-2 border-4 hover:text-yellow-300 hover:bg-black hover:border-black text-lg font-bold"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
