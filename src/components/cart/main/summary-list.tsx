"use client";
import { Cart } from "@/src/models/Cart";
import { Food } from "@/src/models/Food";
import React, { useEffect, useState } from "react";
import { SummaryItem } from "./summary-item";
import { Separate } from "../../ui/separate";
import { Button } from "../../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/src/redux/hooks";
import path from "path";
import { ClassValue } from "clsx";
import { cn } from "@/src/utils/func";
import animation from "src/style/animation.module.css";

interface Props {
  foods: Food[];
  className?: ClassValue;
}
const SummaryList = ({ foods, className }: Props) => {
  const router = useRouter();
  const selectedCart = useAppSelector((state) => state.cart.selectedCart);
  const selectedCartIds = selectedCart.map((cart) => cart.id);
  const [subtotal, setSubtotal] = useState<number>(0);
  const path = usePathname();
  const rightColRef = React.useRef<HTMLDivElement>(null);

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
          onClick={() => {
            if (path === "/cart/checkout") {
              fadeOut();
              setTimeout(() => {
                router.push("/cart/complete");
              }, 250);
            } else {
              router.push("/cart/checkout");
            }
          }}
        >
          {path === "/cart/checkout" ? "Make order" : "Checkout details"}
        </Button>
      </div>
    </div>
  );
};

export default SummaryList;
