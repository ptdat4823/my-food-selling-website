import { GetInfo } from "@/src/actions/user";
import CheckoutDetail from "@/src/components/cart/checkout/checkout-detail";

const CartCheckoutPage = async () => {
  const [userResults] = await Promise.allSettled([GetInfo()]);

  const user = userResults.status === "fulfilled" ? userResults.value : null;

  return <CheckoutDetail thisUser={user} />;
};

export default CartCheckoutPage;
