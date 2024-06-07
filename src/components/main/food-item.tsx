"use client";
import { cn } from "@/src/utils/func";
import FoodImageFrame from "./food-image-frame";
import { Button } from "../ui/buttons";
import { HeartIcon } from "lucide-react";
import { showDefaultToast } from "../ui/toast";
import { Food } from "@/src/models/Food";
import { ClassValue } from "clsx";
import { FoodPrice } from "./food-price";
import FoodRating from "./food-rating";

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
  const isLogin = false;

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
              if (!isLogin) {
                showDefaultToast("Please login to add your favorite food");
                return;
              }
              if (onFavoriteChange) onFavoriteChange(food.id);
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
            return <Tag key={tag} name={tag} />;
          })}
        </div>
      </div>
    </div>
  );
}

export const Tag = ({ name }: { name: string }) => (
  <span className="hover:cursor-pointer bg-blue-500 text-white rounded-md font-medium hover:bg-blue-400 px-2 py-1  font-hairline text-xs ml-1">
    {name}
  </span>
);
