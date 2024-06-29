"use client";
import { useState } from "react";
import { FoodList } from "./food-list";
import { Food } from "@/src/models/Food";
import { User } from "@/src/models/User";

interface Props {
  foods: Food[];
  favoriteFoodIds: number[];
  user: User;
}
const BestRatedList = ({ foods, favoriteFoodIds, user }: Props) => {
  const bestRatedList = foods
    .filter((food) => food.rating > 0)
    .sort((a, b) => b.rating - a.rating);
  return (
    <div>
      <h3 className="text-4xl font-semibold mb-4 text-primary dark:text-dark-primary-word">
        Best rated
      </h3>
      <FoodList
        foods={bestRatedList}
        favoriteFoodIds={favoriteFoodIds}
        user={user}
      />
    </div>
  );
};

export default BestRatedList;
