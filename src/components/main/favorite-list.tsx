"use client";
import { useState } from "react";
import { FoodList } from "./food-list";

const FavoriteList = () => {
  const [foods, setFoods] = useState([]);
  const [favoriteFoodIds, setFavoriteFoodIds] = useState<number[]>([]);
  return (
    <div>
      <h3 className="text-4xl font-semibold mb-4 text-white">Best rated</h3>
      <FoodList foods={foods} />
    </div>
  );
};

export default FavoriteList;
