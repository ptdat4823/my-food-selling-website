import { GetAllCarts } from "@/src/actions/cart";
import CartList from "@/src/components/cart/main/cart-list";

const CartMainPage = async () => {
  return <CartList className="h-[65vh]" />;
};

export default CartMainPage;
