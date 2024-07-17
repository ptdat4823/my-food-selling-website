import { GetAllCarts } from "@/src/actions/cart";
import CartList from "@/src/components/cart/main/cart-list";

const CartMainPage = async () => {
  const [cartRes] = await Promise.all([GetAllCarts()]);

  return (
    <CartList carts={cartRes.data} error={cartRes.error} className="h-[65vh]" />
  );
};

export default CartMainPage;
