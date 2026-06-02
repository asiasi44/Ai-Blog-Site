import { getProductsByCategory } from "@/lib/fetches/productByCategory";
import AdjustFilters from "./filter/adjustFilter";

export default async function RankCategory({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const { productsByCategory, currentCategory } =
    await getProductsByCategory(category);

  console.log(productsByCategory);
  console.log(currentCategory);
  return (
    <div className="p-16 flex flex-col gap-12">
      <div className="text-[61.04px] font-manrope text-center font-bold">
        {currentCategory.category}
      </div>
      <AdjustFilters currentCategory={currentCategory} />
      <div></div>
    </div>
  );
}
