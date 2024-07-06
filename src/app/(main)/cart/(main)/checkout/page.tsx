import { GetInfo } from "@/src/actions/user";
import CheckoutDetail from "@/src/components/cart/checkout/checkout-detail";
import { Suspense } from "react";
import Loading from "./loading";

const CartCheckoutPage = async () => {
  const [userResults] = await Promise.allSettled([GetInfo()]);

  const user = userResults.status === "fulfilled" ? userResults.value : null;

  return (
    <Suspense fallback={<Loading />}>
      <CheckoutDetail thisUser={user} />
    </Suspense>
  );
};

export default CartCheckoutPage;
