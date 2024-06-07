import { Cart } from "@/src/models/Cart";
import { ClassValue } from "clsx";
import { Button } from "../ui/button";
import { cn } from "@/src/utils/func";

export const FoodItemTab = ({
  className,
  cart,
  selectedTab,
  setSelectedTab,
  onClick,
  disabled = false,
}: {
  className?: ClassValue;
  cart: Cart;
  selectedTab: number;
  setSelectedTab: (id: number) => void;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const selectedStyle = "bg-primary text-white hover:opacity-100";
  const defaultStyle =
    "bg-gray-100 hover:bg-gray-100 text-secondaryWord hover:text-primaryWord";
  return (
    <Button
      className={cn(
        "text-sm rounded-md py-1",
        selectedTab === cart.foodSize.id ? selectedStyle : defaultStyle
      )}
      onClick={() => {
        setSelectedTab(cart.foodSize.id);
        if (onClick) onClick();
      }}
    >
      {cart.food.name + " x " + cart.quantity.toString()}
    </Button>
  );
};
