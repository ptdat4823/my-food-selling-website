import Image from "next/image";
import emptyCartImage from "@/public/images/empty_cart_item.svg";

export const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center gap-4 mt-10 font-sans">
      <Image
        width={200}
        height={200}
        src={emptyCartImage}
        alt="empty cart item image"
      />
      <span className="text-secondaryWord text-xl">Your cart is now empty</span>
    </div>
  );
};
