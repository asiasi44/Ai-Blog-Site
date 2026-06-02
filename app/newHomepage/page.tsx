import { getCategoriesToShow } from "@/lib/fetches/categoriesToShow";
import { getIconsByName } from "@/lib/functions/getIconsByName";
import { slugify } from "@/lib/functions/slugify";

import Link from "next/link";

export default async function HomePage() {
  const categories = await getCategoriesToShow();
  return (
    <div
      className={`flex flex-col p-16 gap-16 font-inter bg-[#0F1115] text-[#D5DAE2] font-bold`}
    >
      <div className="flex flex-col gap-12 items-center">
        <div className={`font-manrope text-[61.04px]`}>
          What are you looking for today?
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex p-8 gap-8 bg-[#AFBACA] rounded-2xl justify-evenly items-center font-medium">
            {categories.slice(0, 4).map((eachCategory, index) => {
              const Icon = getIconsByName(eachCategory.category || "");
              const slug = slugify(eachCategory.category);
              return (
                <Link
                  href={`/priorityRanker/${slug}`}
                  key={`${eachCategory._id}-${index}`}
                  className="flex-1 flex flex-col p-6 justify-center gap-6 items-center bg-[#333A47]/75 rounded-2xl text-[#60A5FA] border-[#0F1115] hover:bg-[#657892] hover:text-[#172554] active:bg-[#424E62] hover:cursor-pointer"
                >
                  <div>
                    <Icon className="text-[48.83px]" />
                  </div>
                  <div className="text-[20px] capitalize text-center line-clamp-2">
                    {eachCategory.category}
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="flex justify-center italic text-[20px] font-light">
            Find products tailored to YOU.
          </div>
        </div>
      </div>
    </div>
  );
}
