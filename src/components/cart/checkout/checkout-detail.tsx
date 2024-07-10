"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separate } from "../../ui/separate";
import { Input } from "../../ui/input";
import { TextArea } from "../../ui/textarea";
import { PayMethodButton } from "./paymethod-button";
import Image from "next/image";
import PayByCashImage from "@/public/images/pay_by_cash.png";
import { Order, PaymentMethod } from "@/src/models/Order";
import { User } from "@/src/models/User";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { setCurrentOrder, updateCurrentOrder } from "@/src/redux/slices/order";
import { CartsToOrder } from "@/src/convertor/orderConvertor";
import Loading from "../../skeleton/cart/checkout/loading";

interface Props {
  thisUser: User;
}
const CheckoutDetail = ({ thisUser }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedCart = useAppSelector((state) => state.cart.selectedCart);
  const [selectedPayMethod, setSelectedPayMethod] = useState<PaymentMethod>(
    PaymentMethod.CASH
  );
  const currentOrder = useAppSelector((state) => state.order.currentOrder);
  const orderNote = currentOrder && currentOrder.note ? currentOrder.note : "";
  const handleOrderNoteChange = (note: string) => {
    if (currentOrder) {
      dispatch(updateCurrentOrder({ ...currentOrder, note: note }));
    } else {
      const order: Order = CartsToOrder(
        selectedCart,
        selectedPayMethod,
        note,
        thisUser
      );
      dispatch(setCurrentOrder(order));
    }
  };
  const handlePayMethodChange = (payMethod: PaymentMethod) => {
    setSelectedPayMethod(payMethod);
  };

  return (
    <div className="h-fit px-2 flex flex-col gap-8">
      <div className="w-full flex flex-col gap-2">
        <Button
          iconBefore={<Pen className="w-4 h-4" strokeWidth={2} />}
          className="self-end bg-gray-50 dark:bg-white/10 shadow-primaryShadow text-primary hover:bg-primary hover:text-white hover:opacity-100 ease-linear duration-100"
          onClick={() => {
            router.push("/setting");
          }}
        />
        <Separate classname="h-[1.5px]" />
        <Input
          id="full-name"
          label="Full name"
          placeholder={thisUser ? thisUser.name : ""}
          labelColor="text-primary-word dark:text-dark-primary-word"
          disabled
        />
        <Input
          id="address"
          label="Address"
          placeholder={thisUser ? thisUser.address : ""}
          labelColor="text-primary-word dark:text-dark-primary-word"
          disabled
        />
        <Input
          id="phone-number"
          label="Phone number"
          placeholder={thisUser ? thisUser.phoneNumber : ""}
          labelColor="text-primary-word dark:text-dark-primary-word"
          disabled
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Separate classname="h-[1.5px]" />

        <TextArea
          id="note"
          label="Note"
          placeholder="Your note here"
          labelColor="text-primary-word dark:text-dark-primary-word"
          className="resize-none h-24"
          value={orderNote ? orderNote : ""}
          onChange={(e) => handleOrderNoteChange(e.currentTarget.value)}
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Separate classname="h-[1.5px]" />
        <div className="font-bold">Payment method</div>
        <div className="w-full flex flex-row flex-wrap items-center justify-start gap-2">
          <PayMethodButton
            content={PaymentMethod.CASH}
            icon={
              <Image
                src={PayByCashImage}
                alt="momo"
                className="rounded-lg"
                width={40}
                height={40}
              />
            }
            selectedButton={selectedPayMethod}
            onClick={() => handlePayMethodChange(PaymentMethod.CASH)}
          />
          <PayMethodButton
            content={PaymentMethod.MOMO}
            icon={
              <Image
                src="/images/momo_logo.svg"
                alt="momo"
                className="rounded-lg"
                width={40}
                height={40}
              />
            }
            selectedButton={selectedPayMethod}
            onClick={() => handlePayMethodChange(PaymentMethod.MOMO)}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetail;
