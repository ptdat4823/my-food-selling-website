"use client";
import { ChangeStateFavouriteFood } from "@/src/actions/food";
import { Food } from "@/src/models/Food";
import { cn } from "@/src/utils/func";
import { ClassValue } from "clsx";
import { useSession } from "next-auth/react";
import { SolidHeartIcon } from "../icons/solid";
import { Button } from "../ui/button";
import { showDefaultToast, showErrorToast } from "../ui/toast";
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
  const { data: session } = useSession();
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
    if (!session) {
      showDefaultToast("Please login to add your favourite food");
      return;
    }
    const res = await ChangeStateFavouriteFood(id);
    if (res.error) {
      showErrorToast(res.error);
    }
  };

  return (
    <div
      className={cn(
        "rounded overflow-hidden shadow-lg bg-[#12192C] bg-opacity-75 p-0",
        className
      )}
    >
      <div className="w-full h-40 overflow-hidden cursor-pointer">
        <FoodImageFrame food={food} onClick={onClick} />
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
              handleFavoriteFoodIdsChange(food.id);
            }}
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

        <div className="flex items-center">
          <span className="">{food.totalSold + " sold"}</span>
        </div>
      </div>
    </div>
  );
}
