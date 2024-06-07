"use client";
import { Cart } from "@/src/models/Cart";
import { cn } from "@/src/utils/func";
import { Checkbox } from "@nextui-org/react";
import { ClassValue } from "clsx";

export const FoodTitleBar = ({
  className,
  cartData,
  selectedItems,
  setSelectedItems,
}: {
  className?: ClassValue;
  cartData: Cart[];
  selectedItems: number[];
  setSelectedItems: (selectedItems: number[]) => void;
}) => {
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
          selectedItems.length === activeCarts.length && activeCarts.length > 0
        }
        onClick={() => {
          if (selectedItems.length === activeCarts.length) setSelectedItems([]);
          else setSelectedItems(activeCarts.map((item) => item.id));
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
        "text-secondaryWord text-lg font-semibold text-center",
        className
      )}
    >
      {content}
    </span>
  );
};
