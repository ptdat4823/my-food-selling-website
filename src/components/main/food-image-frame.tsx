"use client";

import { Food } from "@/src/models/Food";
import { CldImage } from "next-cloudinary";
import Image from "next/image";

interface Props {
  food: Food;
  onClick?: () => void;
}
const FoodImageFrame = ({ food, onClick }: Props) => {
  return (
    <div
      className="h-full flex items-center justify-center bg-white hover:scale-125 ease-linear duration-100"
      onClick={onClick}
    >
      {food.images.length > 0 ? (
        <CldImage
          src={food.images[0]}
          alt={food.name + " image"}
          width={500}
          height={300}
          crop="scale"
          className="bg-top bg-cover bg-no-repeat object-center"
        />
      ) : (
        <Image
          src={"/images/default_food.jpg"}
          alt={food.name + " image"}
          width={230}
          height={230}
          className="bg-center bg-cover bg-no-repeat object-center"
        />
      )}
    </div>
  );
};

export default FoodImageFrame;
