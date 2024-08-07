"use client";
import { useState } from "react";
import { FoodList } from "./food-list";
import { Food } from "@/src/models/Food";
import { User } from "@/src/models/User";
import { cn } from "@/src/utils/func";

interface Props {
  foods: Food[];
  user: User;
}
const BestRatedList = ({ foods, user }: Props) => {
  const bestRatedList = foods
    .filter((food) => food.rating > 0)
    .sort((a, b) => b.rating - a.rating);
  return (
    <div className={cn(bestRatedList.length === 0 && "hidden")}>
      <h3 className="text-4xl font-semibold mb-4 text-primary dark:text-dark-primary-word">
        Best rated
      </h3>
      <FoodList foods={bestRatedList} user={user} />
    </div>
  );
};

export default BestRatedList;
