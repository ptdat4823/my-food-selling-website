import { GetInfo } from "@/src/actions/user";
import CheckoutDetail from "@/src/components/cart/checkout/checkout-detail";

const CartCheckoutPage = async () => {
  const [userRes] = await Promise.all([GetInfo()]);

  return <CheckoutDetail thisUser={userRes.data} error={userRes.error} />;
};

export default CartCheckoutPage;
