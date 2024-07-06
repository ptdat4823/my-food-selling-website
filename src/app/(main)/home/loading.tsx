import FoodListSectionSkeleton from "@/src/components/skeleton/main/food-list-section-skeleton";
import SearchBarSkeleton from "@/src/components/skeleton/main/search-bar-skeleton";

const Loading = () => {
  return (
    <div className="w-full h-screen default-scrollbar dark:white-scrollbar bg-light bg-cover dark:bg-dark">
      <div className="w-full h-fit px-4 py-8 space-y-8 overflow-hidden">
        <SearchBarSkeleton />
        <FoodListSectionSkeleton title="All foods" />
        <FoodListSectionSkeleton title="Best seller" />
        <FoodListSectionSkeleton title="Best rated" />
        <FoodListSectionSkeleton title="Your favourite" />
      </div>
    </div>
  );
};

export default Loading;
