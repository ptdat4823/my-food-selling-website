"use client";
import { CreateOrder } from "@/src/actions/order";
import { CartsToOrder } from "@/src/convertor/orderConvertor";
import { Cart } from "@/src/models/Cart";
import { Food } from "@/src/models/Food";
import { Order, PaymentMethod } from "@/src/models/Order";
import { User } from "@/src/models/User";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { setCartItems, setSelectedCart } from "@/src/redux/slices/cart";
import { setCurrentOrder } from "@/src/redux/slices/order";
import { cn, isValidString } from "@/src/utils/func";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import animation from "src/style/animation.module.css";
import { Button } from "../../ui/button";
import { Separate } from "../../ui/separate";
import { showDefaultToast, showErrorToast } from "../../ui/toast";
import { SummaryItem } from "./summary-item";
import LoadingCircle from "../../icons/custom-with-css/LoadingCircle/loading_circle";

interface Props {
  foods: Food[];
  thisUser: User;
  error?: string;
}
const SummaryList = ({ foods, thisUser, error }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const carts = useAppSelector((state) => state.cart.cartItems);
  const selectedCart = useAppSelector((state) => state.cart.selectedCart);
  const selectedCartIds = selectedCart.map((cart) => cart.id);
  const currentOrder = useAppSelector((state) => state.order.currentOrder);
  const [subtotal, setSubtotal] = useState<number>(0);

  const path = usePathname();
  const [isChangeingPath, setIsChangeingPath] = useState(false);
  const rightColRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tempSubtotal = 0;
    selectedCart.forEach((cart) => {
      tempSubtotal += cart.foodSize.price * cart.quantity;
    });
    setSubtotal(tempSubtotal);
  }, [selectedCart, selectedCartIds]);

  useEffect(() => {
    setIsChangeingPath(false);
  }, [path]);

  useEffect(() => {
    if (error) showErrorToast(error);
  }, [error]);

  const fadeOut = () => {
    if (rightColRef.current) {
      rightColRef.current.classList.add(animation["fade-out"]);
    }
  };

  const checkInfo = (user: User) => {
    if (
      !isValidString(user.name) ||
      !isValidString(user.phoneNumber) ||
      !isValidString(user.address)
    )
      return false;
    return true;
  };

  const SetOrder = (cart: Cart[]) => {
    const order: Order = CartsToOrder(cart, PaymentMethod.CASH, "", thisUser);
    dispatch(setCurrentOrder(order));
  };

  const handleAfterMakeOrder = () => {
    dispatch(setCurrentOrder(null));
    dispatch(
      setCartItems(carts.filter((cart) => !selectedCartIds.includes(cart.id)))
    );
    dispatch(setSelectedCart([]));
  };

  const handleCartTabChange = async () => {
    const canMakeOrder =
      selectedCart.length !== 0 &&
      selectedCart.every((cart) => cart.quantity > 0);
    if (path === "/cart/checkout") {
      if (!canMakeOrder) {
        showDefaultToast("Please select at least one item to order");
        return;
      }
      if (!checkInfo(thisUser)) {
        showDefaultToast("Please fill in your information");
        return;
      }
      if (!currentOrder) {
        SetOrder(selectedCart);
      }

      const res = await CreateOrder(currentOrder!);
      if (res.error) {
        showErrorToast(res.error);
      }
      if (res.message) {
        handleAfterMakeOrder();
        // fadeOut();
        setTimeout(() => {
          router.push("/cart/complete");
          setIsChangeingPath(false);
        }, 250);
      }
    } else {
      SetOrder(selectedCart);
      router.push("/cart/checkout");
      setIsChangeingPath(false);
    }
  };

  return (
    <div
      ref={rightColRef}
      className={cn(
        "w-[400px] h-[100vh] bg-primary p-8 ease-linear duration-200",
        "dark:bg-dark-secondary-bg"
      )}
    >
      <div className="relative w-full h-full flex flex-col justify-start text-white gap-4">
        <h1 className="text-3xl font-bold whitespace-nowrap">Order Summary</h1>
        <div className="w-full h-3/5 max-h-3/5 flex flex-col gap-4 scrollbar">
          {selectedCart
            .filter((cart) => selectedCartIds.includes(cart.id))
            .sort()
            .map((cart) => {
              if (!cart.quantity || cart.quantity === 0) return null;
              const food = foods.find((food) => food.id === cart.food.id);
              if (!food) return null;
              const foodSize = food.foodSizes.find(
                (size) => size.id === cart.foodSize.id
              );
              if (!foodSize) return null;
              return (
                <SummaryItem
                  key={cart.id}
                  title={food.name}
                  total={foodSize.price * cart.quantity}
                  quantity={cart.quantity}
                />
              );
            })}
        </div>
        <div className="flex flex-col gap-4">
          <Separate classname="h-[1.5px]" />
          <SummaryItem title="Subtotal" total={subtotal} />
          <SummaryItem title="V.A.T" total={subtotal * 0.1} />
          <Separate classname="h-[1.5px]" />
          <SummaryItem title="Total" total={subtotal + subtotal * 0.1} />
        </div>
        <Button
          className={cn(
            "absolute bottom-0 right-0 w-full bg-secondary hover:bg-hover-secondary",
            "dark:bg-dark-secondary dark:hover:bg-dark-hover-secondary"
          )}
          onClick={() => {
            setIsChangeingPath(true);
            handleCartTabChange();
          }}
          iconBefore={isChangeingPath ? <LoadingCircle color="white" /> : null}
        >
          {isChangeingPath
            ? null
            : path === "/cart/checkout"
            ? "Make order"
            : "Checkout details"}
        </Button>
      </div>
    </div>
  );
};

export default SummaryList;
