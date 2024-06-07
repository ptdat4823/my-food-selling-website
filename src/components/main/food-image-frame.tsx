"use client";

import { Food } from "@/src/models/Food";

interface Props {
  food: Food;
  onClick?: () => void;
}
const FoodImageFrame = ({ food, onClick }: Props) => {
  return (
    <div
      className="object-center hover:scale-125 h-40 ease-linear transition-all duration-300"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${food.images[0]})`,
      }}
      onClick={onClick}
    ></div>
  );
};

export default FoodImageFrame;
