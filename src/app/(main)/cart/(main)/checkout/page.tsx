import { GetAllCarts } from "@/src/actions/cart";
import { GetAllFood } from "@/src/actions/food";
import CheckoutDetail from "@/src/components/cart/checkout/checkout-detail";
import { PaymentStepBar } from "@/src/components/cart/main/payment-step-bar";
import SummaryList from "@/src/components/cart/main/summary-list";
import { Cart } from "@/src/models/Cart";
import { Food } from "@/src/models/Food";
import React from "react";

const CartCheckoutPage = async () => {
  const [cartResults, foodsResult] = await Promise.allSettled([
    GetAllCarts(),
    GetAllFood(),
  ]);

  const carts =
    cartResults.status === "fulfilled" ? (cartResults.value as Cart[]) : [];
  const foods =
    foodsResult.status === "fulfilled" ? (foodsResult.value as Food[]) : [];

  const getActiveFood = (foods: Food[]) => {
    return foods.filter((food) => !food.isDeleted && food.name !== null);
  };

  return <CheckoutDetail />;
};

export default CartCheckoutPage;
