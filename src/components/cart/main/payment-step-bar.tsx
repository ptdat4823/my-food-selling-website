"use client";
import { cn } from "@/src/utils/func";
import { ClassValue } from "clsx";
import { CartTab } from "./cart-tab";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

export const PaymentStepBar = ({ className }: { className?: ClassValue }) => {
  const path = usePathname();
  return (
    <div
      className={cn(
        "w-full flex flex-row flex-wrap items-center justify-center gap-4",
        className
      )}
    >
      <CartTab tabNum={1} tabName="Shopping Cart" href="/cart" />
      <ChevronRight className="text-primary" />
      <CartTab
        tabNum={2}
        tabName="Checkout Details"
        href="/cart/checkout"
        disabled={path === "/cart"}
      />
      <ChevronRight className="text-primary" />
      <CartTab
        tabNum={3}
        tabName="Order Complete"
        href="/cart/complete"
        disabled={path === "/cart" || path === "/cart/checkout"}
      />
    </div>
  );
};
