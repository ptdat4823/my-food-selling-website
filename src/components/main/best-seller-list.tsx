"use client";
import { useEffect, useState } from "react";
import { FoodList } from "./food-list";
import { Food } from "@/src/models/Food";
import { User } from "@/src/models/User";

interface Props {
  foods: Food[];
  favoriteFoodIds: number[];
  user: User;
}
const BestSellerList = ({ foods, favoriteFoodIds, user }: Props) => {
  const bestSellerFoods = foods
    .filter((food) => food.totalSold > 0)
    .sort((a, b) => b.totalSold - a.totalSold);
  return (
    <div>
      <h3 className="text-4xl font-semibold mb-4 text-white">Best sellers</h3>
      <FoodList
        foods={bestSellerFoods}
        favoriteFoodIds={favoriteFoodIds}
        user={user}
      />
    </div>
  );
};

export default BestSellerList;
