import { Food } from "@/src/models/Food";
import React from "react";
import { EmptyItem } from "./empty-item";
import { cn } from "@/src/utils/func";
import FavouriteFoodItem from "./favorite-food-item";

interface Props {
  foods: Food[];
}
const FavoriteFoodList = ({ foods }: Props) => {
  const favoriteFoodIds = [] as number[];
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
              isFavorite={favoriteFoodIds.includes(food.id)}
              //   onFavoriteChange={(isFavorite) => {
              //     handleFavoriteFoodIdsChange(food.id);
              //   }}
              //   onClick={() => handleFoodClick(food)}
            />
          );
        })}
      </div>
      {/* {selectedFood && (
        <FoodDetail
          isOpen={isOpen}
          onOpenChange={() => setOpen(!isOpen)}
          food={selectedFood!}
          foodQuantity={selectedFoodQuantity}
          onFoodQuantityChange={(quantity) => setSelectedFoodQuantity(quantity)}
          selectedSize={selectedSize!}
          onFoodSizeChange={(foodSize) => handleFoodSizeChange(foodSize)}
          isFavorite={favoriteFoodIds.includes(selectedFood.id)}
          onFavoriteChange={(isFavorite) => {
            handleFavoriteFoodIdsChange(selectedFood.id);
          }}
          onAddToCart={() => handleAddToCart(selectedFood)}
        />
      )} */}
    </div>
  );
};

export default FavoriteFoodList;
