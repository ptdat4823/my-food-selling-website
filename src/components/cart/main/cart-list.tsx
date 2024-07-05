"use client";
import { DeleteCart, UpdateCart } from "@/src/actions/cart";
import { Cart } from "@/src/models/Cart";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  addSelectedCart,
  removeSelectedCart,
  setCartItems,
  updateCartItem,
  updateSelectedCart,
} from "@/src/redux/slices/cart";
import { cn } from "@/src/utils/func";
import { ClassValue } from "clsx";
import { useEffect, useState } from "react";
import { showErrorToast, showSuccessToast } from "../../ui/toast";
import { CartItem } from "./cart-item";
import { EmptyCart } from "./empty-cart";
import { FoodTitleBar } from "./food-title-bar";

const getUpdatedCartData = (cartData: Cart[], selectedCart: Cart[]) => {
  const newCartData = cartData.map((cart) => {
    const index = selectedCart.findIndex((c) => c.id === cart.id);
    if (index !== -1)
      return { ...cart, quantity: selectedCart[index].quantity };
    return cart;
  });
  return newCartData;
};

interface CartListProps {
  carts: Cart[];
  className?: ClassValue;
}
const CartList = ({ carts, className }: CartListProps) => {
  const dispatch = useAppDispatch();
  const selectedCart = useAppSelector((state) => state.cart.selectedCart);
  const selectedCartIds = selectedCart.map((cart) => cart.id);

  const [cartData, setCartData] = useState(
    getUpdatedCartData(carts, selectedCart)
  );

  const handleSelectedCartChange = (cart: Cart) => {
    if (selectedCartIds.includes(cart.id))
      dispatch(removeSelectedCart(cart.id));
    else dispatch(addSelectedCart(cart));
  };

  useEffect(() => {
    setCartData(getUpdatedCartData(carts, selectedCart));
    dispatch(setCartItems(cartData));
  }, [carts]);

  return (
    <div className={cn(className)}>
      {cartData.length === 0 && <EmptyCart />}
      {cartData.length > 0 && (
        <>
          <FoodTitleBar />
          <div className="h-full flex flex-col items-center gap-2 overflow-x-hidden default-scrollbar dark:white-scrollbar">
            {cartData.map((cart) => {
              const handleQuantityChange = (value: number) => {
                //for updating the cart in the local state
                const newCartData = cartData.map((c) =>
                  c.id === cart.id ? { ...c, quantity: value } : c
                );
                setCartData(newCartData);
                dispatch(setCartItems(newCartData));

                //for updating the cart in the redux store
                const newCartItem = { ...cart, quantity: value };
                dispatch(updateSelectedCart(newCartItem));
              };
              const handleNoteChange = async (note: string) => {
                const updatedCart = { ...cart, note: note };
                const res = await UpdateCart(cart.id, updatedCart);
                if (res.error) {
                  showErrorToast(res.error);
                }
                if (res.message) {
                  dispatch(updateSelectedCart(updatedCart));
                  dispatch(updateCartItem(updatedCart));
                }
              };
              const onDelete = async () => {
                const res = await DeleteCart(cart.id);
                if (res.error) {
                  showErrorToast(res.error);
                }
                if (res.message) {
                  dispatch(removeSelectedCart(cart.id));
                  showSuccessToast(res.message);
                }
              };

              return (
                <CartItem
                  key={cart.id}
                  cart={cart}
                  isOutOfStock={cart.foodSize.deleted || cart.food.isDeleted}
                  onQuantityChange={handleQuantityChange}
                  onNoteChange={handleNoteChange}
                  onDelete={onDelete}
                  isSelected={selectedCartIds.includes(cart.id)}
                  onSelected={() => handleSelectedCartChange(cart)}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default CartList;
