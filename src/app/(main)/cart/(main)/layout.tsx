import { GetAllFood } from "@/src/actions/food";
import { GetInfo } from "@/src/actions/user";
import { PaymentStepBar } from "@/src/components/cart/main/payment-step-bar";
import SummaryList from "@/src/components/cart/main/summary-list";
import { cn, getActiveFood } from "@/src/utils/func";

export default async function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [foodsRes, userRes] = await Promise.all([GetAllFood(), GetInfo()]);

  return (
    <div
      className={cn(
        "w-full h-full flex flex-row justify-between items-center overflow-hidden"
      )}
    >
      <div className="min-h-screen flex-1 p-8">
        <div className="flex flex-col gap-8 items-start mb-4 font-sans">
          <h1
            className={cn(
              "text-primary text-3xl font-bold",
              "dark:text-dark-primary-word"
            )}
          >
            Your cart
          </h1>
          <PaymentStepBar />
        </div>
        {children}
      </div>
      <SummaryList
        foods={getActiveFood(foodsRes.data)}
        thisUser={userRes.data}
        error={foodsRes.error || userRes.error}
      />
    </div>
  );
}
