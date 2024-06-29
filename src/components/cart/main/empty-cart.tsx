"use client";
import Image from "next/image";
import emptyCartImage from "@/public/images/empty_cart_item.svg";
import darkEmptyCartImage from "@/public/images/dark_empty-cart_item.svg";
import { useTheme } from "next-themes";

export const EmptyCart = () => {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col items-center gap-4 mt-10 font-sans">
      <Image
        width={200}
        height={200}
        src={theme === "dark" ? darkEmptyCartImage : emptyCartImage}
        alt="empty cart item image"
      />
      <span className="text-secondary-word dark:text-dark-secondary-word text-xl">
        Your cart is now empty
      </span>
    </div>
  );
};
