"use client";
import { Food } from "@/src/models/Food";
import { cn } from "@/src/utils/func";
import { ClassValue } from "clsx";
import FoodImageFrame from "./food-image-frame";
import { FoodPrice } from "./food-price";
import FoodRating from "./food-rating";

export default function FoodItem({
  food,
  className,
  onClick,
  isFavorite = false,
}: {
  food: Food;
  className?: ClassValue;
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

  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden bg-transparent p-0 transition-all ease-linear duration-100 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="w-full h-fit rounded-md overflow-hidden cursor-pointer">
        <FoodImageFrame food={food} onClick={onClick} isFavorite={isFavorite} />
      </div>
      <div className="flex flex-col m-2 gap-2 text-primary-word dark:text-dark-primary-word select-none">
        <div className="w-full flex flex-row items-center justify-between">
          <span className="font-semibold">{food.name}</span>
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
        <div className="flex items-center justify-between">
          <FoodPrice
            currency="$"
            defaultPrice={sortedPriceList[0]}
            secondPrice={sortedPriceList[sortedPriceList.length - 1]}
          />
        </div>

        <div className="flex items-center">
          <span className="">{food.totalSold + " sold"}</span>
        </div>
      </div>
    </div>
  );
}
