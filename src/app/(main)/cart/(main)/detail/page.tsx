import { GetAllCarts } from "@/src/actions/cart";
import CartList from "@/src/components/cart/main/cart-list";
import { Cart } from "@/src/models/Cart";
import { Suspense } from "react";

const CartMainPage = async () => {
  const [cartResults] = await Promise.allSettled([GetAllCarts()]);

  const carts =
    cartResults.status === "fulfilled" ? (cartResults.value as Cart[]) : [];
  return <CartList carts={carts} className="h-[65vh]" />;
};

export default CartMainPage;
