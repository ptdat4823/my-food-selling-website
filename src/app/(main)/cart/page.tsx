import CartList from "@/src/components/cart/cart-list";
import SummaryList from "@/src/components/cart/summary-list";
import { Cart } from "@/src/models/Cart";

const CartPage = async () => {
  const carts = [] as Cart[];
  let selectedCardIds = [] as number[];

  return (
    <div className="w-full h-full flex flex-row justify-between items-center overflow-hidden">
      <div className="min-h-screen flex-1 p-8">
        <CartList carts={carts} />
      </div>
      <div className="w-[400px] h-[100vh] bg-primary p-8">
        <SummaryList carts={carts} />
      </div>
    </div>
  );
};

export default CartPage;
