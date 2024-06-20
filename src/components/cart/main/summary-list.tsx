"use client";
import { Cart } from "@/src/models/Cart";
import { Food } from "@/src/models/Food";
import React, { useEffect, useState } from "react";
import { SummaryItem } from "./summary-item";
import { Separate } from "../../ui/separate";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";

interface SummaryListProps {
  carts: Cart[];
}
const SummaryList = ({ carts }: SummaryListProps) => {
  const foods = [] as Food[];

  const router = useRouter();
  const [selectedCardIds, setSelectedCartIds] = useState<number[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  useEffect(() => {
    const ids = localStorage.getItem("selectedCartIds");
    setSelectedCartIds(ids ? JSON.parse(ids) : []);
  }, []);

  useEffect(() => {
    let tempSubtotal = 0;
    carts
      .filter((cart) => selectedCardIds.includes(cart.id))
      .forEach((cart) => {
        tempSubtotal += cart.foodSize.price * cart.quantity;
      });
    setSubtotal(tempSubtotal);
  }, [carts, selectedCardIds]);
  return (
    <div className="relative w-full h-full flex flex-col justify-start text-white gap-4">
      <h1 className="text-3xl font-bold whitespace-nowrap">Order Summary</h1>
      <div className="w-full h-3/5 max-h-3/5 flex flex-col gap-4 white-scrollbar">
        {/* {carts
          .filter((cart) => selectedCardIds.includes(cart.id))
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
          })} */}
        {/* <SummaryItem key={1} title={"food"} total={92} quantity={3} />
        <SummaryItem key={1} title={"food"} total={92} quantity={3} />
        <SummaryItem key={1} title={"food"} total={92} quantity={3} />
        <SummaryItem key={1} title={"food"} total={92} quantity={3} />
        <SummaryItem key={1} title={"food"} total={92} quantity={3} />
        <SummaryItem key={1} title={"food"} total={92} quantity={3} />
        <SummaryItem key={1} title={"food"} total={92} quantity={3} />
        <SummaryItem key={1} title={"food"} total={92} quantity={3} />
        <SummaryItem key={1} title={"food"} total={92} quantity={3} />
        <SummaryItem key={1} title={"food"} total={92} quantity={3} />
        <SummaryItem key={1} title={"food"} total={92} quantity={3} />
        <SummaryItem key={1} title={"food"} total={92} quantity={3} />
        <SummaryItem key={1} title={"food"} total={92} quantity={3} />
        <SummaryItem key={1} title={"food"} total={92} quantity={3} />
        <SummaryItem key={1} title={"food"} total={92} quantity={3} /> */}
      </div>
      <div className="flex flex-col gap-4">
        <Separate classname="h-[1.5px]" />
        <SummaryItem title="Subtotal" total={subtotal} />
        <SummaryItem title="V.A.T" total={subtotal * 0.1} />
        <Separate classname="h-[1.5px]" />
        <SummaryItem title="Total" total={subtotal + subtotal * 0.1} />
      </div>
      <Button
        className="absolute bottom-0 right-0 w-full bg-secondary hover:bg-third/90"
        onClick={() => {
          router.push("/checkout");
        }}
      >
        Make payment
      </Button>
    </div>
  );
};

export default SummaryList;
