"use client";
import { Food } from "@/src/models/Food";
import { User } from "@/src/models/User";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useState } from "react";
import { FoodDetail } from "./food-detail";
import FoodItem from "./food-item";

export const FoodList = ({
  foods,
  favoriteFoodIds,
  user,
}: {
  foods: Food[];
  favoriteFoodIds: number[];
  user: User;
}) => {
  const [emblaRef] = useEmblaCarousel({}, [Autoplay()]);
  const [isOpen, setOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food>();

  const handleFoodClick = (food: Food) => {
    setSelectedFood(food);
    setOpen(!isOpen);
  };

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="w-full flex gap-[calc((100%-99%)/3)] mb-8">
        {foods.map((food: any, index: number) => (
          <FoodItem
            key={index}
            className="xl:flex-[0_0_33%] max-xl:flex-[0_0_50%] max-md:flex-[0_0_100%] min-w-0"
            food={food}
            isFavorite={favoriteFoodIds.includes(food.id)}
            onClick={() => handleFoodClick(food)}
          />
        ))}

        {selectedFood && (
          <FoodDetail
            isOpen={isOpen}
            onOpenChange={setOpen}
            food={selectedFood}
            isFavorite={favoriteFoodIds.includes(selectedFood.id)}
            user={user}
          />
        )}
      </div>
    </div>
  );
};
