"use client";
import { Food } from "@/src/models/Food";
import { FoodReportData } from "@/src/models/Report";
import { cn, displayNumber } from "@/src/utils/func";
import { ClassValue } from "clsx";
import Image from "next/image";
import LayoutCard from "../card/layout-card";

interface Props {
  data: FoodReportData[];
  className?: ClassValue;
}
export const TrendingFoodReport = ({ data, className }: Props) => {
  return (
    <LayoutCard className={cn("h-full flex flex-col gap-2", className)}>
      <span className="font-semibold text-primary-word text-xl">
        Trending foods
      </span>
      <HeaderRow />
      <div className="h-[400px] flex flex-col gap-2 overflow-y-scroll scrollbar scrollbar-hide">
        {data.map((item, idx) => (
          <FoodRow key={idx} food={item.food} count={item.quantity} />
        ))}
      </div>
    </LayoutCard>
  );
};

const HeaderRow = () => {
  return (
    <div className="bg-purple-100 rounded-md flex flex-row justify-between py-3 px-4">
      <span>Food name</span>
      <span>Orders</span>
    </div>
  );
};

const FoodRow = ({ food, count }: { food: Food; count: number }) => {
  let formattedPrice;
  if (food.foodSizes.length === 1) {
    formattedPrice = displayNumber(food.foodSizes[0].price, "$");
  } else if (food.foodSizes.length > 1) {
    //find min and max price
    let minPrice = food.foodSizes[0].price;
    let maxPrice = food.foodSizes[0].price;
    food.foodSizes.forEach((foodSize) => {
      if (foodSize.price < minPrice) minPrice = foodSize.price;
      if (foodSize.price > maxPrice) maxPrice = foodSize.price;
    });
    formattedPrice =
      displayNumber(minPrice, "$") + " - " + displayNumber(maxPrice, "$");
  }
  return (
    <div className="rounded-md bg-white hover:bg-white/10 flex flex-row justify-between py-3 pr-4 text-primary-word">
      <div className="flex flex-row gap-4">
        <Image
          src={food.images[0]}
          width={50}
          height={50}
          alt={food.name}
          className="rounded-md object-cover"
        />
        <div className="flex-1">
          <div className="flex flex-col">
            <span className="font-semibold">{food.name}</span>
            <span className="text-secondary-word">{formattedPrice}</span>
          </div>
        </div>
      </div>
      <span className="text-secondary-word">{count}</span>
    </div>
  );
};
