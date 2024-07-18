"use client";
import { Food } from "@/src/models/Food";
import { User } from "@/src/models/User";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { setFavorite } from "@/src/redux/slices/favorite";
import { cn } from "@/src/utils/func";
import { useEffect, useState } from "react";
import { FoodDetail } from "../main/food-detail";
import FoodItem from "../main/food-item";
import { showErrorToast } from "../ui/toast";
import { EmptyItem } from "./empty-item";

interface Props {
  user: User;
  error?: string;
}
const FavoriteFoodList = ({ user, error }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food>();
  const tempFavoriteFoods = useAppSelector((state) => state.favorite.value);
  const tempFavoriteFoodIds = useAppSelector((state) => state.favorite.ids);

  const handleFoodClick = (food: Food) => {
    setSelectedFood(food);
    setOpen(!isOpen);
  };

  useEffect(() => {
    if (error) showErrorToast(error);
  }, [error]);

  return (
    <div>
      {tempFavoriteFoods.length === 0 && <EmptyItem />}
      <div
        className={cn(
          "grid grid-cols-3 gap-2 max-md:grid-cols-1 max-lg:grid-cols-2",
          tempFavoriteFoods.length === 0 ? "hidden" : ""
        )}
      >
        {tempFavoriteFoods.map((food) => {
          return (
            <FoodItem
              key={food.id}
              food={food}
              onClick={() => handleFoodClick(food)}
              isFavorite={tempFavoriteFoodIds.includes(food.id)}
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
