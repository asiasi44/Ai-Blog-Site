import SetPriority from "./setPriority";

export default async function AdjustFilters({
  currentCategory,
}: {
  currentCategory: {
    category: string;
    _id: string;
    features: [{ name: string; keywords: [string]; _id: string }];
  };
}) {
  return (
    <div className="font-inter gap-12 flex flex-col">
      <div className="text-[31.25px] text-[#8B5CF6]">
        Adjust what you care about
      </div>
      <div className="flex gap-4 flex-wrap justify-evenly text-[12.8px]">
        {currentCategory.features.map((eachfeature) => {
          return <SetPriority feature={eachfeature} key={eachfeature._id} />;
        })}
      </div>
      <div className="text-red-500">
        Slide to increase Importance of feature
      </div>
    </div>
  );
}
