import { cn } from "@/src/utils/func";
import { ClassValue } from "clsx";

export const FoodProperty = ({
  isSelected = false,
  name,
  onClick,
  className,
}: {
  isSelected?: boolean;
  name: string;
  onClick?: () => void;
  className?: ClassValue;
}) => {
  const defaultStyle =
    "bg-white text-primary-word hover:bg-black hover:text-white";
  const selectedStyle = "bg-black text-white hover:bg-black hover:text-white";
  return (
    <span
      className={cn(
        "cursor-pointer rounded-[999px] font-semibold outline outline-black outline-1 px-2 text-xs ease-linear duration-100 flex items-center capitalize",
        isSelected ? selectedStyle : defaultStyle,
        className
      )}
      onClick={onClick}
    >
      {name}
    </span>
  );
};
