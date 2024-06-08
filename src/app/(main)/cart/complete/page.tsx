"use client";
import { PaymentStepBar } from "@/src/components/cart/main/payment-step-bar";
import { Button } from "@/src/components/ui/button";
import { CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CartCompletePage = () => {
  const router = useRouter();
  return (
    <div className="w-full h-full flex flex-row justify-between items-center overflow-hidden">
      <div className="min-h-screen flex-1 p-8">
        <div className="bg-white flex flex-col gap-8 items-start mb-4 font-sans">
          <h1 className="text-primary text-3xl font-bold">Your cart</h1>
          <PaymentStepBar />
        </div>
        <div className="flex flex-col items-center gap-4 mt-10">
          <CircleCheck className="w-20 h-20 text-primary" strokeWidth={1} />
          <span className="font-bold text-3xl text-center">
            Thank you for your ordering!
          </span>
          <span className="text-center">
            Your order has been placed successfully.
          </span>

          <div className="md:w-1/2 max-md:w-full flex flex-row items-center justify-between gap-4 mt-8">
            <Button
              className="w-1/2 bg-gray-50 text-secondary-word hover:bg-gray-100 hover:text-primary-word whitespace-nowrap"
              onClick={() => router.push("/history")}
            >
              View order
            </Button>
            <Button
              className="w-1/2 whitespace-nowrap"
              onClick={() => router.push("/")}
            >
              Continue shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCompletePage;
