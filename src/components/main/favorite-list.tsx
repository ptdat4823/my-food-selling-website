"use client";
import { useState } from "react";
import { FoodList } from "./food-list";
import { User } from "@/src/models/User";
import { Food } from "@/src/models/Food";

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
    <div>
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
