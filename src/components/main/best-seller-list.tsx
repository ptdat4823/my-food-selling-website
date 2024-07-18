"use client";
import { useEffect, useState } from "react";
import { FoodList } from "./food-list";
import { Food } from "@/src/models/Food";
import { User } from "@/src/models/User";
import { cn } from "@/src/utils/func";

interface Props {
  foods: Food[];
  user: User;
}
const BestSellerList = ({ foods, user }: Props) => {
  const bestSellerFoods = foods
    .filter((food) => food.totalSold > 0)
    .sort((a, b) => b.totalSold - a.totalSold);
  return (
    <div className={cn(bestSellerFoods.length === 0 && "hidden")}>
      <h3 className="text-4xl font-semibold mb-4 text-primary dark:text-dark-primary-word">
        Best sellers
      </h3>
      <FoodList foods={bestSellerFoods} user={user} />
    </div>
  );
};

export default BestSellerList;
