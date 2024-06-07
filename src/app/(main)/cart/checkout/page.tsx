import CheckoutDetail from "@/src/components/cart/checkout/checkout-detail";
import { PaymentStepBar } from "@/src/components/cart/main/payment-step-bar";
import SummaryList from "@/src/components/cart/main/summary-list";
import { Cart } from "@/src/models/Cart";
import React from "react";

const CheckoutPage = () => {
  const carts = [] as Cart[];
  return (
    <div className="w-full h-full flex flex-row justify-between items-center overflow-hidden">
      <div className="min-h-screen flex-1 p-8">
        <div className="bg-white flex flex-col gap-8 items-start mb-4 font-sans">
          <h1 className="text-primary text-3xl font-bold">Your cart</h1>
          <PaymentStepBar />
        </div>
        <CheckoutDetail />
      </div>
      <div className="w-[400px] h-[100vh] bg-primary p-8">
        <SummaryList carts={carts} />
      </div>
    </div>
  );
};

export default CheckoutPage;
