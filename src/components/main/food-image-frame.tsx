"use client";

import { Food } from "@/src/models/Food";
import { cn } from "@/src/utils/func";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { Button } from "../ui/button";
import { SolidHeartIcon } from "../icons/solid";
import { useEffect, useState } from "react";
import LoadingCircle from "../icons/custom-with-css/LoadingCircle/loading_circle";
import { useSession } from "next-auth/react";
import { showDefaultToast, showErrorToast } from "../ui/toast";
import { useAppDispatch } from "@/src/redux/hooks";
import { changeFavorite } from "@/src/redux/slices/favorite";
import { ChangeStateFavouriteFood } from "@/src/actions/food";

interface Props {
  food: Food;
  onClick?: () => void;
  isFavorite?: boolean;
}
const FoodImageFrame = ({ food, onClick, isFavorite }: Props) => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [isFavorite]);

  const handleFavoriteFoodIdsChange = async (id: number) => {
    if (!session) {
      showDefaultToast("Please login to add your favourite food");
      return;
    }
    dispatch(changeFavorite(food));
    const res = await ChangeStateFavouriteFood(id);
    if (res.error) {
      showErrorToast(res.error);
    }
  };
  return (
    <div
      className="relative h-full flex items-center justify-center bg-white ease-linear duration-100"
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
      <Button
        className={cn(
          "absolute top-2 right-2 p-2",
          "rounded-xl ease-linear duration-100 bg-white hover:bg-white dark:hover:bg-white hover:opacity-80",
          isLoading ? "pointer-events-none" : ""
        )}
        iconBefore={
          isLoading ? (
            <div className="w-5 h-5 flex items-center justify-center">
              <LoadingCircle />
            </div>
          ) : isFavorite ? (
            <SolidHeartIcon />
          ) : (
            <SolidHeartIcon color="gray" />
          )
        }
        onClick={(e) => {
          e.stopPropagation();
          if (handleFavoriteFoodIdsChange) {
            setIsLoading(true);
            handleFavoriteFoodIdsChange(food.id);
          }
        }}
      />
    </div>
  );
};

export default FoodImageFrame;
