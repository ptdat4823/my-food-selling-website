import React from "react";
import { FoodTitleBar } from "../../../cart/main/food-title-bar";
import CartItemSkeleton from "./cart-item-skeleton";

const CartListSkeleton = () => {
  return (
    <div>
      <FoodTitleBar />
      <div className="h-full flex flex-col items-center gap-2 overflow-x-hidden default-scrollbar dark:white-scrollbar">
        <CartItemSkeleton />
        <CartItemSkeleton />
        <CartItemSkeleton />
        <CartItemSkeleton />
        <CartItemSkeleton />
      </div>
    </div>
  );
};

export default CartListSkeleton;
