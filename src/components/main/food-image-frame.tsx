"use client";

import { Food } from "@/src/models/Food";
import Image from "next/image";

interface Props {
  food: Food;
  onClick?: () => void;
}
const FoodImageFrame = ({ food, onClick }: Props) => {
  return (
    <div
      className="flex items-center justify-center hover:scale-125 ease-linear duration-100"
      // style={{
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      //   backgroundImage: `url(${food.images[0]})`,
      // }}
      onClick={onClick}
    >
      <Image
        src={food.images[0] || "/images/default_food.jpg"}
        alt={food.name + " image"}
        width={450}
        height={200}
        className="h-52 bg-center bg-cover bg-no-repeat object-center"
      />
    </div>
  );
};

export default FoodImageFrame;
