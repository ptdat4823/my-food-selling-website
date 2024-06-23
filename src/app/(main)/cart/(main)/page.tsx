import { GetAllCarts } from "@/src/actions/cart";
import { GetAllFood } from "@/src/actions/food";
import CheckoutDetail from "@/src/components/cart/checkout/checkout-detail";
import CartList from "@/src/components/cart/main/cart-list";
import { PaymentStepBar } from "@/src/components/cart/main/payment-step-bar";
import SummaryList from "@/src/components/cart/main/summary-list";
import { Cart } from "@/src/models/Cart";
import { Food } from "@/src/models/Food";
import React from "react";

const CartMainPage = async () => {
  const [cartResults] = await Promise.allSettled([GetAllCarts()]);

  const carts =
    cartResults.status === "fulfilled" ? (cartResults.value as Cart[]) : [];

  return <CartList carts={carts} className="h-[65vh]" />;
};

export default CartMainPage;
