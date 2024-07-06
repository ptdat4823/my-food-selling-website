import { GetAllCarts } from "@/src/actions/cart";
import CartList from "@/src/components/cart/main/cart-list";
import { Cart } from "@/src/models/Cart";
import { Suspense } from "react";
import Loading from "./loading";

const CartMainPage = async () => {
  const [cartResults] = await Promise.allSettled([GetAllCarts()]);

  const carts =
    cartResults.status === "fulfilled" ? (cartResults.value as Cart[]) : [];
  return (
    <Suspense fallback={<Loading />}>
      <CartList carts={carts} className="h-[65vh]" />
    </Suspense>
  );
};

export default CartMainPage;
