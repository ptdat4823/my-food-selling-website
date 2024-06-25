"use client";
import { cn } from "@/src/utils/func";
import FoodImageFrame from "./food-image-frame";
import { Button } from "../ui/button";
import { showDefaultToast } from "../ui/toast";
import { Food } from "@/src/models/Food";
import { ClassValue } from "clsx";
import { FoodPrice } from "./food-price";
import FoodRating from "./food-rating";
import FoodTag from "./food-tag";
import { HeartIcon } from "lucide-react";
import { SolidHeartIcon } from "../icons/solid";
import { useSession } from "next-auth/react";

export default function FoodItem({
  food,
  className,
  onClick,
  isFavorite = false,
  onFavoriteChange,
}: {
  food: Food;
  className?: ClassValue;
  onClick?: (food: Food) => void;
  isFavorite?: boolean;
  onFavoriteChange?: (foodId: number) => void;
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
        "rounded overflow-hidden shadow-lg bg-[#12192C] bg-opacity-75 p-0",
        className
      )}
    >
      <div className="w-full h-40 overflow-hidden cursor-pointer">
        <FoodImageFrame
          food={food}
          onClick={() => {
            if (onClick) onClick(food);
          }}
        />
      </div>
      <div className="flex flex-col m-2 gap-2 text-white">
        <div className="w-full flex flex-row items-center justify-between">
          <span className="font-semibold">{food.name}</span>
          <Button
            className={cn(
              "rounded-full ease-linear duration-100 bg-transparent hover:bg-transparent hover:opacity-60"
            )}
            iconBefore={
              isFavorite ? <SolidHeartIcon /> : <SolidHeartIcon color="white" />
            }
            onClick={() => {
              if (onFavoriteChange) onFavoriteChange(food.id);
            }}
          />
        </div>
        <FoodPrice
          currency="$"
          defaultPrice={sortedPriceList[0]}
          secondPrice={sortedPriceList[sortedPriceList.length - 1]}
        />
        <div className="flex items-center">
          <FoodRating
            rating={food.rating}
            className={cn("mt-2 hidden", food.rating > 0 && "visible")}
          />
          <div className="flex flex-row gap-1">
            {food.tags.map((tag) => {
              return <FoodTag key={tag} name={tag} theme="dark" />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
