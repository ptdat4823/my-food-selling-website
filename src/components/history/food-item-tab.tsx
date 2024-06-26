import { Cart } from "@/src/models/Cart";
import { OrderStatus } from "@/src/models/Order";
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
  orderStatus,
}: {
  className?: ClassValue;
  cart: Cart;
  selectedTab: number;
  setSelectedTab: (id: number) => void;
  onClick?: () => void;
  disabled?: boolean;
  orderStatus: OrderStatus;
}) => {
  let selectedStyle = "text-white ";
  if (orderStatus === OrderStatus.PENDING)
    selectedStyle += "bg-yellow-400 hover:bg-yellow-400";
  if (orderStatus === OrderStatus.ACCEPTED)
    selectedStyle += "bg-green-400 hover:bg-green-400";
  if (orderStatus === OrderStatus.CANCELLED)
    selectedStyle += "bg-red-500 hover:bg-red-400";
  if (orderStatus === OrderStatus.DELIVERED)
    selectedStyle += "bg-blue-500 hover:bg-blue-400";
  const defaultStyle =
    "flex flex-row items-center bg-gray-100 hover:bg-gray-100 text-secondary-word hover:text-secondary-word";
  return (
    <Button
      className={cn(
        "text-sm rounded-full py-1 space-x-1 whitespace-nowrap",
        selectedTab === cart.foodSize.id ? selectedStyle : defaultStyle
      )}
      onClick={() => {
        setSelectedTab(cart.foodSize.id);
        if (onClick) onClick();
      }}
    >
      <span className="max-w-[100px] truncate">{cart.food.name}</span>
      <span className="text-nowrap">{"x " + cart.quantity.toString()}</span>
    </Button>
  );
};
