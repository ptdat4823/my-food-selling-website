"use client";
import { Cart } from "@/src/models/Cart";
import { cn } from "@/src/utils/func";
import { useState } from "react";
import { CartItem } from "./cart-item";
import { EmptyCart } from "./empty-cart";
import { FoodTitleBar } from "./food-title-bar";
import { PaymentStepBar } from "./payment-step-bar";

interface CartListProps {
  carts: Cart[];
}
const CartList = ({ carts }: CartListProps) => {
  const [selectedCardIds, setSelectedCartIds] = useState<number[]>([]);
  const [cartData, setCartData] = useState(carts);
  return (
    <div>
      <div className="bg-white flex flex-col gap-8 items-start mb-4 font-sans">
        <h1 className="text-primary text-3xl font-bold">Your cart</h1>
        <PaymentStepBar />
      </div>
      {carts.length === 0 && <EmptyCart />}
      <FoodTitleBar
        className={carts.length > 0 ? "" : "hidden"}
        cartData={carts}
        selectedItems={selectedCardIds}
        setSelectedItems={setSelectedCartIds}
      />
      <div
        className={cn(
          "h-full flex flex-col items-center gap-2 overflow-y-scroll",
          carts.length === 0 ? "hidden" : ""
        )}
      >
        {carts.map((cart) => {
          const handleQuantityChange = (value: number) => {
            setCartData(
              cartData.map((c) =>
                c.id === cart.id ? { ...c, quantity: value } : c
              )
            );
            localStorage.setItem(
              "selectedCartIds",
              JSON.stringify(selectedCardIds)
            );
          };
          // const handleNoteChange = async (note: string) => {
          //   const updatedCart = { ...cart, note: note };
          //   await CartService.UpdateCart(updatedCart)
          //     .then(() => {
          //       dispatch(updateCartItem(updatedCart));
          //       setCartData(
          //         cartData.map((cart) =>
          //           cart.id === updatedCart.id ? updatedCart : cart
          //         )
          //       );
          //     })
          //     .catch((err) => {
          //       showErrorToast(
          //         "Failed to update cart item with error:" + err
          //       );
          //     });
          // };
          // const onDelete = async (id: number) => {
          //   await CartService.DeleteCart(id)
          //     .then(() => {
          //       dispatch(deleteCartItem(id));
          //       setCartData(cartData.filter((i) => i.id !== id));
          //       setSelectedCartIds(
          //         selectedCardIds.filter((i) => i !== id)
          //       );
          //     })
          //     .catch((err) => {
          //       showErrorToast(
          //         "Failed to delete cart item with error:" + err
          //       );
          //     });
          // };

          return (
            <CartItem
              key={cart.id}
              cart={cart}
              isOutOfStock={cart.foodSize.deleted}
              onQuantityChange={handleQuantityChange}
              //   onNoteChange={handleNoteChange}
              //   onDelete={() => onDelete(cart.id)}
              //   isSelected={selectedCardIds.includes(cart.id)}
              //   onSelected={() => handleSelectedCardIdsChange(cart.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CartList;
