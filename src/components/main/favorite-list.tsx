"use client";
import { useState } from "react";
import { FoodList } from "./food-list";
import { User } from "@/src/models/User";
import { Food } from "@/src/models/Food";
import { cn } from "@/src/utils/func";

interface Props {
  foods: Food[];
  favoriteFoodIds: number[];
  user: User;
}
const FavoriteList = ({ foods, favoriteFoodIds, user }: Props) => {
  const favoriteList = foods.filter((food) =>
    favoriteFoodIds.includes(food.id)
  );
  return (
    <div className={cn(favoriteList.length === 0 && "hidden")}>
      <h3 className="text-4xl font-semibold mb-4 text-primary dark:text-dark-primary-word">
        Your favourite
      </h3>
      <FoodList
        foods={favoriteList}
        favoriteFoodIds={favoriteFoodIds}
        user={user}
      />
    </div>
  );
};

export default FavoriteList;
