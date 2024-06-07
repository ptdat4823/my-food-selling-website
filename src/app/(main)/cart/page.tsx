import { CartItem } from "@/src/components/cart/cart-item";
import CartList from "@/src/components/cart/cart-list";
import { EmptyCart } from "@/src/components/cart/empty-cart";
import { FoodTitleBar } from "@/src/components/cart/food-title-bar";
import { Cart } from "@/src/models/Cart";
import CartService from "@/src/services/cartService";
import React from "react";

const CartPage = async () => {
  const carts = [] as Cart[];
  return (
    <div className="w-full h-full flex flex-row justify-between items-center overflow-hidden">
      <div className="min-h-screen flex-1 p-8">
        <CartList carts={carts} />
      </div>
      <div className="w-[400px] h-[100vh] bg-primary"></div>
    </div>
  );
};

export default CartPage;
