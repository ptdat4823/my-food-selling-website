"use client";
import { Food } from "@/src/models/Food";
import { User } from "@/src/models/User";
import { cn } from "@/src/utils/func";
import { useState } from "react";
import { FoodDetail } from "../main/food-detail";
import { EmptyItem } from "./empty-item";
import FavouriteFoodItem from "./favorite-food-item";
import FoodItem from "../main/food-item";

interface Props {
  foods: Food[];
  user: User;
}
const FavoriteFoodList = ({ foods, user }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food>();

  const handleFoodClick = (food: Food) => {
    setSelectedFood(food);
    setOpen(!isOpen);
  };

  return (
    <div>
      {foods.length === 0 && <EmptyItem />}
      <div
        className={cn(
          "grid grid-cols-3 gap-2 max-md:grid-cols-1 max-lg:grid-cols-2",
          foods.length === 0 ? "hidden" : ""
        )}
      >
        {foods.map((food) => {
          return (
            <FoodItem
              key={food.id}
              food={food}
              onClick={() => handleFoodClick(food)}
              isFavorite={true}
            />
          );
        })}
      </div>
      {selectedFood && (
        <FoodDetail
          isOpen={isOpen}
          onOpenChange={() => setOpen(!isOpen)}
          food={selectedFood!}
          isFavorite={true}
          user={user}
        />
      )}
    </div>
  );
};

export default FavoriteFoodList;
