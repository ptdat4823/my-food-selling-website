"use client";
import { useEffect, useState } from "react";
import { FoodList } from "./food-list";
import { Food } from "@/src/models/Food";
import { User } from "@/src/models/User";
import { cn } from "@/src/utils/func";

interface Props {
  foods: Food[];
  favoriteFoodIds: number[];
  user: User;
}
const AllFoodsList = ({ foods, favoriteFoodIds, user }: Props) => {
  return (
    <div className={cn(foods.length === 0 && "hidden")}>
      <h3 className="text-4xl font-semibold mb-4 text-primary dark:text-dark-primary-word">
        All foods
      </h3>
      <FoodList foods={foods} favoriteFoodIds={favoriteFoodIds} user={user} />
    </div>
  );
};

export default AllFoodsList;
