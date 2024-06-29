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
    "bg-transparent text-primary-word hover:bg-black hover:text-white dark:text-dark-primary-word dark:hover:bg-white dark:hover:text-black";
  const selectedStyle =
    "bg-black text-white hover:bg-black hover:text-white dark:bg-white dark:text-black";
  return (
    <span
      className={cn(
        "cursor-pointer rounded-[999px] font-semibold outline outline-black dark:outline-white outline-1 px-2 text-xs ease-linear duration-100 flex items-center capitalize select-none",
        isSelected ? selectedStyle : defaultStyle,
        className
      )}
      onClick={onClick}
    >
      {name}
    </span>
  );
};
