"use client";
import { useState } from "react";
import { FoodList } from "./food-list";
import { User } from "@/src/models/User";
import { Food } from "@/src/models/Food";
import { cn } from "@/src/utils/func";
import { useAppSelector } from "@/src/redux/hooks";

interface Props {
  user: User;
}
const FavoriteList = ({ user }: Props) => {
  const favoriteList = useAppSelector((state) => state.favorite.value);
  return (
    <div className={cn(favoriteList.length === 0 && "hidden")}>
      <h3 className="text-4xl font-semibold mb-4 text-primary dark:text-dark-primary-word">
        Your favourite
      </h3>
      <FoodList foods={favoriteList} user={user} />
    </div>
  );
};

export default FavoriteList;
