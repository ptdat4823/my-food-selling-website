import FoodListSkeleton from "@/src/components/skeleton/main/food-list-skeleton";
import { cn } from "@/src/utils/func";

const Loading = () => {
  return (
    <div
      className={cn(
        "bg-light w-full h-screen font-sans text-primary-word dark:text-dark-primary-word p-8 default-scrollbar dark:while-scrollbar overflow-x-hidden",
        "dark:bg-dark"
      )}
    >
      <h1 className="text-primary dark:text-dark-primary-word text-3xl font-bold mb-16">
        Your favourite foods
      </h1>
      <FoodListSkeleton />
    </div>
  );
};

export default Loading;
