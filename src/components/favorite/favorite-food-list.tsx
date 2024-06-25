"use client";
import { Food, FoodSize } from "@/src/models/Food";
import React, { useState } from "react";
import { EmptyItem } from "./empty-item";
import { cn } from "@/src/utils/func";
import FavouriteFoodItem from "./favorite-food-item";
import { FoodDetail } from "../main/food-detail";
import { useSession } from "next-auth/react";
import { showErrorToast, showSuccessToast } from "../ui/toast";
import { ChangeStateFavouriteFood } from "@/src/actions/food";
import { Cart } from "@/src/models/Cart";
import { AddCart } from "@/src/actions/cart";
import { User } from "@/src/models/User";

interface Props {
  foods: Food[];
  user: User;
}
const FavoriteFoodList = ({ foods, user }: Props) => {
  const { data: session } = useSession();
  const [isOpen, setOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food>();
  const [selectedSize, setSelectedSize] = useState<FoodSize>();
  const [selectedFoodQuantity, setSelectedFoodQuantity] = useState(1);

  const handleFoodClick = (food: Food) => {
    setSelectedFood(food);
    if (selectedFood !== food) setSelectedSize(food.foodSizes[0]);
    setOpen(!isOpen);
  };
  const handleFoodSizeChange = (foodSize: FoodSize) => {
    if (selectedSize !== foodSize) setSelectedSize(foodSize);
  };
  const handleFavoriteFoodIdsChange = async (id: number) => {
    const res = await ChangeStateFavouriteFood(id);
    if (res.error) {
      showErrorToast(res.error);
    }
  };
  const handleAddToCart = async (food: Food) => {
    if (!selectedSize) return;
    if (!session) {
      showErrorToast("Please login to add to cart");
      return;
    }
    const newCartItem: Cart = {
      id: -1,
      quantity: selectedFoodQuantity,
      price: selectedFoodQuantity * selectedSize.price,
      food: food,
      foodSize: selectedSize,
      note: "",
    };
    const res = await AddCart(newCartItem);
    if (res.error) {
      showErrorToast(res.error);
    }
    if (res.message) {
      showSuccessToast(res.message);
      setOpen(!isOpen);
    }
    setOpen(!isOpen);
  };
  return (
    <div>
      {foods.length === 0 && <EmptyItem />}
      <div
        className={cn(
          "grid grid-cols-4 gap-4 max-md:grid-cols-1 max-lg:grid-cols-2",
          foods.length === 0 ? "hidden" : ""
        )}
      >
        {foods.map((food) => {
          return (
            <FavouriteFoodItem
              key={food.id}
              food={food}
              isFavorite={true}
              onFavoriteChange={(isFavorite) => {
                handleFavoriteFoodIdsChange(food.id);
              }}
              onClick={() => handleFoodClick(food)}
            />
          );
        })}
      </div>
      {selectedFood && (
        <FoodDetail
          isOpen={isOpen}
          onOpenChange={() => setOpen(!isOpen)}
          food={selectedFood!}
          foodQuantity={selectedFoodQuantity}
          onFoodQuantityChange={setSelectedFoodQuantity}
          selectedSize={selectedSize!}
          onFoodSizeChange={handleFoodSizeChange}
          isFavorite={true}
          onFavoriteChange={handleFavoriteFoodIdsChange}
          onAddToCart={() => handleAddToCart(selectedFood)}
          user={user}
        />
      )}
    </div>
  );
};

export default FavoriteFoodList;
