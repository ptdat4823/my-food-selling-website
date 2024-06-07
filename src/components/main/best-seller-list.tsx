"use client";
import { useEffect, useState } from "react";
import { FoodList } from "./food-list";

const BestSellerList = () => {
  const [foods, setFoods] = useState([]);
  const [favoriteFoodIds, setFavoriteFoodIds] = useState<number[]>([]);
  return (
    <div>
      <h3 className="text-4xl font-semibold mb-4 text-white">Best sellers</h3>
      <FoodList foods={foods} />
    </div>
  );
};

export default BestSellerList;
