import { GetAllCarts } from "@/src/actions/cart";
import { GetAllFood } from "@/src/actions/food";
import CartList from "@/src/components/cart/main/cart-list";
import { PaymentStepBar } from "@/src/components/cart/main/payment-step-bar";
import SummaryList from "@/src/components/cart/main/summary-list";
import { Cart } from "@/src/models/Cart";
import { Food } from "@/src/models/Food";

export default async function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

  return (
    <div className="w-full h-full flex flex-row justify-between items-center overflow-hidden">
      <div className="min-h-screen flex-1 p-8">
        <div className="bg-white flex flex-col gap-8 items-start mb-4 font-sans">
          <h1 className="text-primary text-3xl font-bold">Your cart</h1>
          <PaymentStepBar />
        </div>
        {children}
      </div>
      <SummaryList foods={getActiveFood(foods)} />
    </div>
  );
}
