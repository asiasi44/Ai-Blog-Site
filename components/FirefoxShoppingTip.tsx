import { Search } from "lucide-react";

const ADDON_URL =
  "https://addons.mozilla.org/en-US/firefox/addon/right-click-amazon-search/";

export default function FirefoxShoppingTip() {
  return (
    <div className="mt-3 flex items-start gap-2 text-xs leading-5 text-slate-600">
      <Search aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
      <p>
        Shopping around? Highlight a product name, right-click, and search Amazon
        with our free Firefox add-on. Made by RankNest.{" "}
        <a
          href={ADDON_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline underline-offset-2 hover:text-slate-900"
        >
          Get the add-on
        </a>
      </p>
    </div>
  );
}
