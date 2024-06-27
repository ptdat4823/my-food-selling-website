import { cn } from "@/src/utils/func";
import { ClassValue } from "clsx";
import { StarsIcon } from "../icons/normal-custom/stars-icon";

const FoodRating = ({
  rating,
  className,
}: {
  rating: number;
  className?: ClassValue;
}) => {
  return (
    <div className={cn("flex flex-row items-center select-none", className)}>
      <StarsIcon rating={rating} />
    </div>
  );
};

export default FoodRating;
