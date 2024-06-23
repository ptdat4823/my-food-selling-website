"use client";
import React from "react";
import { Button } from "../../ui/button";
import { Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separate } from "../../ui/separate";
import { Input } from "../../ui/input";
import { TextArea } from "../../ui/textarea";
import { PayMethodButton } from "./paymethod-button";
import Image from "next/image";
import PayByCashImage from "@/public/images/pay_by_cash.png";
import { PaymentMethod } from "@/src/models/Order";

const CheckoutDetail = () => {
  const router = useRouter();
  const [selectedPayMethod, setSelectedPayMethod] =
    React.useState<PaymentMethod>(PaymentMethod.CASH);
  return (
    <div className="h-fit px-2 flex flex-col gap-8">
      <div className="w-full flex flex-col gap-2">
        <Button
          iconBefore={<Pen className="w-4 h-4" strokeWidth={2} />}
          className="self-end bg-gray-50 shadow-primaryShadow text-primary hover:bg-primary hover:text-white hover:opacity-100 ease-linear duration-100"
          onClick={() => {
            //   setCookie("redirect", "/cart");
            router.push("/user-setting");
          }}
        />
        <Separate classname="h-[1.5px]" />
        <Input
          id="full-name"
          label="Full name"
          // placeholder={thisUser ? thisUser.address : ""}
          labelColor="text-secondary-word"
          className="text-primary-word"
          disabled
        />
        <Input
          id="address"
          label="Address"
          // placeholder={thisUser ? thisUser.address : ""}
          labelColor="text-secondary-word"
          className="text-primary-word"
          disabled
        />
        <Input
          id="phone-number"
          label="Phone number"
          // placeholder={thisUser ? thisUser.phoneNumber : ""}
          labelColor="text-secondary-word"
          disabled
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Separate classname="h-[1.5px]" />

        <TextArea
          id="note"
          label="Note"
          placeholder="Your note here"
          labelColor="text-primary-word"
          className="resize-none h-24"
          // onChange={(e) => setOrderNote(e.currentTarget.value)}
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
            // onClick={() => handlePayMethodChange(PaymentMethod.CASH)}
          />
          {/* <PayMethodButton
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
            /> */}
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetail;
