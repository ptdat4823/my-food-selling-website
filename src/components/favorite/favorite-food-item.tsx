import { Food } from "@/src/models/Food";
import FoodImageFrame from "../main/food-image-frame";
import { cn } from "@/src/utils/func";
import { Button } from "../ui/button";
import { HeartIcon } from "lucide-react";
import { FoodPrice } from "../main/food-price";
import FoodRating from "../main/food-rating";
import FoodTag from "../main/food-tag";

export default function FavouriteFoodItem({
  food,
  className,
  onClick,
  isFavorite = false,
  onFavoriteChange,
}: {
  food: Food;
  className?: string;
  onClick?: () => void;
  isFavorite?: boolean;
  onFavoriteChange?: (isFavorite: boolean) => void;
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

  return (
    <div
      className={cn(
        "w-full h-min flex flex-col rounded overflow-hidden shadow-lg",
        className
      )}
    >
      <div className="w-full h-40 overflow-hidden cursor-pointer">
        <FoodImageFrame food={food} />
      </div>
      <div className="flex flex-col m-2 gap-2">
        <div className="w-full flex flex-row items-center justify-between">
          <span className="font-semibold">{food.name}</span>
          <Button
            className={cn("rounded-full ease-linear duration-100")}
            iconBefore={
              isFavorite ? (
                <HeartIcon />
              ) : (
                <HeartIcon className="bg-pink-600 text-pink-600" />
              )
            }
            onClick={() => {
              if (onFavoriteChange) onFavoriteChange(!isFavorite);
            }}
          />
        </div>
        <FoodPrice
          currency="$"
          defaultPrice={sortedPriceList[0]}
          secondPrice={sortedPriceList[sortedPriceList.length - 1]}
        />

        <div className={cn("flex items-center")}>
          <FoodRating
            rating={food.rating}
            className={cn("mt-2", food.rating === 0 && "hidden")}
          />
          {food.tags.map((tag) => {
            return <FoodTag key={tag} name={tag} theme="light" />;
          })}
        </div>
      </div>
    </div>
  );
}
