"use client";
import { PaymentStepBar } from "@/src/components/cart/main/payment-step-bar";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/utils/func";
import { CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import animation from "src/style/animation.module.css";

const CartCompletePage = () => {
  const router = useRouter();

  return (
    <div
      className={cn(
        "w-full h-full flex flex-row justify-between items-center overflow-hidden mr-[400px] ease-linear duration-200"
      )}
    >
      <div className={cn("min-h-screen flex-1 p-8")}>
        <div className="bg-transparent flex flex-col gap-8 items-start mb-4 font-sans">
          <h1 className="text-primary dark:text-dark-primary-word text-3xl font-bold">
            Your cart
          </h1>
        </div>
        <div
          className={cn(
            "flex flex-col items-center gap-4 mt-10",
            animation["fade-in-right"]
          )}
        >
          <PaymentStepBar />
          <CircleCheck
            className={cn("w-20 h-20 text-primary", animation["fade-in"])}
            strokeWidth={1}
          />
          <span
            className={cn(
              "font-bold text-3xl text-center opacity-0",
              animation["fade-in-delay-1"]
            )}
          >
            Thank you for your ordering!
          </span>
          <span
            className={cn(
              "text-center opacity-0",
              animation["fade-in-delay-2"]
            )}
          >
            Your order has been placed successfully.
          </span>

          <div
            className={cn(
              "md:w-1/2 max-md:w-full flex flex-row items-center justify-between gap-4 mt-8 opacity-0",
              animation["fade-in-delay-3"]
            )}
          >
            <Button
              className={cn(
                "w-1/2 bg-gray-50 text-secondary-word hover:bg-gray-100 hover:text-primary-word whitespace-nowrap",
                "dark:bg-white/10 dark:hover:bg-white/20"
              )}
              onClick={() => router.push("/history")}
            >
              View order
            </Button>
            <Button
              className="w-1/2 whitespace-nowrap"
              onClick={() => router.push("/home")}
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
