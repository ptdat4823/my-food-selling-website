"use client";
import { Cart } from "@/src/models/Cart";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import cart, { setSelectedCart } from "@/src/redux/slices/cart";
import { cn } from "@/src/utils/func";
import { Checkbox } from "@nextui-org/react";
import { ClassValue } from "clsx";

export const FoodTitleBar = ({ className }: { className?: ClassValue }) => {
  const dispatch = useAppDispatch();
  const selectedCart = useAppSelector((state) => state.cart.selectedCart);
  const selectedCartIds = selectedCart.map((cart) => cart.id);
  const cartData = useAppSelector((state) => state.cart.cartItems);
  const activeCarts = cartData.filter((cart) => !cart.foodSize.deleted);

  return (
    <div
      className={cn(
        "w-full h-10 flex flex-row items-center justify-end py-2 pl-2 pr-4",
        className
      )}
    >
      <Checkbox
        className="mr-2"
        isSelected={
          selectedCartIds.length === activeCarts.length &&
          activeCarts.length > 0
        }
        onClick={() => {
          if (selectedCartIds.length === activeCarts.length)
            dispatch(setSelectedCart([]));
          else dispatch(setSelectedCart(activeCarts));
        }}
      />
      <Title content="Food" className="flex-1 flex justify-start" />
      <Title content="Size" className="w-[100px] text-center max-lg:hidden" />
      <Title content="Quantity" className="w-[150px] text-center px-8" />
      <Title content="Price" className="w-[100px] text-center max-lg:hidden" />
      <Title content="Total" className="w-[100px] text-center" />
      <Title content="temp" className="w-[100px] opacity-0" />
    </div>
  );
};

const Title = ({
  className,
  content,
}: {
  className?: ClassValue;
  content: string;
}) => {
  return (
    <span
      className={cn(
        "text-secondary-word dark:text-dark-secondary-word text-lg font-semibold text-center",
        className
      )}
    >
      {content}
    </span>
  );
};
