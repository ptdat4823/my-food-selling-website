import { GetFavouriteFood } from "@/src/actions/food";
import { GetInfo } from "@/src/actions/user";
import FavoriteFoodList from "@/src/components/favorite/favorite-food-list";
import { FoodToReceive } from "@/src/convertor/foodConvertor";
import { cn, getActiveFood } from "@/src/utils/func";
import { Suspense } from "react";
import Loading from "./loading";
import FoodListSkeleton from "@/src/components/skeleton/main/food-list-skeleton";

export default async function FavouritePages() {
  const [favouriteFoodRes, user] = await Promise.all([
    GetFavouriteFood(),
    GetInfo(),
  ]);
  const favouriteFoods = favouriteFoodRes.error
    ? []
    : (favouriteFoodRes as any[]).map((food) => FoodToReceive(food));

  console.log(favouriteFoods);

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
      <Suspense fallback={<Loading />}>
        <FavoriteFoodList foods={getActiveFood(favouriteFoods)} user={user} />
      </Suspense>
    </div>
  );
}
