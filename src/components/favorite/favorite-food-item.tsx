import { ChangeStateFavouriteFood } from "@/src/actions/food";
import { Food } from "@/src/models/Food";
import { cn } from "@/src/utils/func";
import { SolidHeartIcon } from "../icons/solid";
import FoodImageFrame from "../main/food-image-frame";
import { FoodPrice } from "../main/food-price";
import FoodRating from "../main/food-rating";
import FoodTag from "../main/food-tag";
import { Button } from "../ui/button";
import { showErrorToast } from "../ui/toast";

export default function FavouriteFoodItem({
  food,
  className,
  onClick,
  isFavorite = false,
}: {
  food: Food;
  className?: string;
  onClick?: () => void;
  isFavorite?: boolean;
}) {
  const getMinAndMaxPrice = (food: Food) => {
    const tempSortedPriceList = food.foodSizes
      .map((foodSize) => foodSize.price)
      .sort();
    return [
      tempSortedPriceList[0],
      tempSortedPriceList[tempSortedPriceList.length - 1],
    ];
  };

  const sortedPriceList = getMinAndMaxPrice(food);

  const handleFavoriteFoodIdsChange = async (id: number) => {
    const res = await ChangeStateFavouriteFood(id);
    if (res.error) {
      showErrorToast(res.error);
    }
  };

  return (
    <div
      className={cn(
        "w-full h-min flex flex-col rounded overflow-hidden shadow-lg bg-white/90 hover:scale-105 dark:bg-dark-secondary dark:text-dark-primary-word transition-all duration-100 ease-linear cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="w-full h-40 overflow-hidden cursor-pointer">
        <FoodImageFrame food={food} onClick={onClick} />
      </div>
      <div className="flex flex-col m-2 gap-2">
        <div className="w-full flex flex-row items-center justify-between">
          <span className="font-semibold">{food.name}</span>
          <Button
            className={cn(
              "rounded-full ease-linear duration-100 bg-transparent hover:bg-transparent hover:opacity-60",
              "dark:bg-transparent hover:dark:bg-transparent"
            )}
            iconBefore={
              isFavorite ? (
                <SolidHeartIcon color="pink" />
              ) : (
                <SolidHeartIcon color="pink" />
              )
            }
            onClick={() => handleFavoriteFoodIdsChange(food.id)}
          />
        </div>
        <div className="flex items-center justify-between">
          <FoodPrice
            currency="$"
            defaultPrice={sortedPriceList[0]}
            secondPrice={sortedPriceList[sortedPriceList.length - 1]}
          />
          <div
            className={cn(
              "flex gap-1 text-sm font-semibold",
              food.rating === 0 && "hidden"
            )}
          >
            <span>{food.rating}</span>
            <FoodRating rating={food.rating} />
          </div>
        </div>

        <div className={cn("flex items-center")}>
          {food.tags.map((tag) => {
            return <FoodTag key={tag} name={tag} theme="light" />;
          })}
        </div>
        <div className="flex items-center">
          <span className="">{food.totalSold + " sold"}</span>
        </div>
      </div>
    </div>
  );
}
