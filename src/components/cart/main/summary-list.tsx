"use client";
import { Cart } from "@/src/models/Cart";
import { Food } from "@/src/models/Food";
import React, { useEffect, useState } from "react";
import { SummaryItem } from "./summary-item";
import { Separate } from "../../ui/separate";
import { Button } from "../../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import path from "path";
import { ClassValue } from "clsx";
import { cn } from "@/src/utils/func";
import animation from "src/style/animation.module.css";
import { Order, PaymentMethod } from "@/src/models/Order";
import { CartsToOrder } from "@/src/convertor/orderConvertor";
import {
  showDefaultToast,
  showErrorToast,
  showSuccessToast,
} from "../../ui/toast";
import { User } from "@/src/models/User";
import { setCurrentOrder } from "@/src/redux/slices/order";
import { CreateOrder } from "@/src/actions/order";
import { setSelectedCart } from "@/src/redux/slices/cart";

interface Props {
  foods: Food[];
  thisUser: User;
}
const SummaryList = ({ foods, thisUser }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedCart = useAppSelector((state) => state.cart.selectedCart);
  const selectedCartIds = selectedCart.map((cart) => cart.id);
  const [subtotal, setSubtotal] = useState<number>(0);
  const path = usePathname();
  const rightColRef = React.useRef<HTMLDivElement>(null);
  const currentOrder = useAppSelector((state) => state.order.currentOrder);

  useEffect(() => {
    let tempSubtotal = 0;
    selectedCart.forEach((cart) => {
      tempSubtotal += cart.foodSize.price * cart.quantity;
    });
    setSubtotal(tempSubtotal);
  }, [selectedCart, selectedCartIds]);

  const fadeOut = () => {
    if (rightColRef.current) {
      rightColRef.current.classList.add(animation["fade-out"]);
    }
  };

  const SetOrder = (cart: Cart[]) => {
    const order: Order = CartsToOrder(cart, PaymentMethod.CASH, "", thisUser);
    dispatch(setCurrentOrder(order));
  };

  const handleAfterMakeOrder = () => {
    dispatch(setCurrentOrder(null));
    dispatch(setSelectedCart([]));
  };

  const handleCartTabChange = async () => {
    const canMakeOrder =
      selectedCart.length !== 0 &&
      selectedCart.every((cart) => cart.quantity > 0);
    if (path === "/cart/checkout") {
      if (!canMakeOrder) {
        showDefaultToast("Please select at least one item to order");
        return;
      }
      if (!currentOrder) {
        showErrorToast("Error: Order is not set");
        return;
      }

      const res = await CreateOrder(currentOrder);
      if (res.error) {
        showErrorToast(res.error);
      }
      if (res.message) {
        handleAfterMakeOrder();
        fadeOut();
        setTimeout(() => {
          router.push("/cart/complete");
        }, 250);
      }
    } else {
      SetOrder(selectedCart);
      router.push("/cart/checkout");
    }
  };

  return (
    <div
      ref={rightColRef}
      className="w-[400px] h-[100vh] bg-primary p-8 ease-linear duration-200"
    >
      <div className="relative w-full h-full flex flex-col justify-start text-white gap-4">
        <h1 className="text-3xl font-bold whitespace-nowrap">Order Summary</h1>
        <div className="w-full h-3/5 max-h-3/5 flex flex-col gap-4 white-scrollbar">
          {selectedCart
            .filter((cart) => selectedCartIds.includes(cart.id))
            .sort()
            .map((cart) => {
              if (!cart.quantity || cart.quantity === 0) return null;
              const food = foods.find((food) => food.id === cart.food.id);
              if (!food) return null;
              const foodSize = food.foodSizes.find(
                (size) => size.id === cart.foodSize.id
              );
              if (!foodSize) return null;
              return (
                <SummaryItem
                  key={cart.id}
                  title={food.name}
                  total={foodSize.price * cart.quantity}
                  quantity={cart.quantity}
                />
              );
            })}
        </div>
        <div className="flex flex-col gap-4">
          <Separate classname="h-[1.5px]" />
          <SummaryItem title="Subtotal" total={subtotal} />
          <SummaryItem title="V.A.T" total={subtotal * 0.1} />
          <Separate classname="h-[1.5px]" />
          <SummaryItem title="Total" total={subtotal + subtotal * 0.1} />
        </div>
        <Button
          className="absolute bottom-0 right-0 w-full bg-secondary hover:bg-hover-secondary"
          onClick={handleCartTabChange}
        >
          {path === "/cart/checkout" ? "Make order" : "Checkout details"}
        </Button>
      </div>
    </div>
  );
};

export default SummaryList;
