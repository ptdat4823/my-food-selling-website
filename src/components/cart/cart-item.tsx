"use client";
import { Cart } from "@/src/models/Cart";
import { Checkbox, Tooltip } from "@nextui-org/react";
import foodDefaultImage from "@/public/images/default_food.jpg";
import Image from "next/image";
import { cn, displayNumber } from "@/src/utils/func";
import { Edit, FileText, X } from "lucide-react";
import { useRef, useState } from "react";
import { TextArea } from "../ui/textarea";
import { NumberInput } from "../ui/number-input";

export const CartItem = ({
  cart,
  onQuantityChange,
  onNoteChange,
  onDelete,
  isSelected = false,
  onSelected,
  isOutOfStock = false,
}: {
  cart: Cart;
  onQuantityChange?: (value: number) => void;
  onNoteChange?: (value: string) => void;
  onDelete?: () => void;
  isSelected?: boolean;
  onSelected?: () => void;
  isOutOfStock?: boolean;
}) => {
  const cartRef = useRef<HTMLDivElement>(null);
  const addAnimation = () => {
    if (cartRef.current) {
      cartRef.current.classList.add("animate-row-disappear");
    }
  };
  const [isEdittingNote, setIsEdittingNote] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tempCartNote, setTempCartNote] = useState(cart.note);

  window.addEventListener("click", (e) => {
    setIsTooltipOpen(false);
    setIsEdittingNote(false);
  });

  return (
    <div
      ref={cartRef}
      className={cn(
        "w-full group text-primaryWord rounded-md bg-slate-50 flex flex-row items-center justify-end p-2",
        isOutOfStock ? "" : "cursor-pointer"
      )}
      onClick={() => {
        if (isOutOfStock) return;
        if (onSelected) onSelected();
      }}
    >
      <Checkbox
        isSelected={isSelected}
        isDisabled={isOutOfStock}
        className="mr-2"
        onClick={onSelected}
      />
      <div className="flex-1 flex md:flex-row max-md:flex-col md:items-center md:gap-4 max-md:items-start text-center font-semibold text-lg">
        <Image
          src={foodDefaultImage}
          alt="food image"
          className="h-20 w-20 rounded justify-seft-start object-cover"
        />
        <div className="w-full flex flex-col items-end justify-start">
          <p className="w-full text-start truncate">{cart.food.name}</p>
          <span
            className={cn(
              "w-full text-red-500 text-start text-sm",
              isOutOfStock ? "" : "hidden"
            )}
          >
            Out of stock !
          </span>
        </div>
      </div>
      <span className="w-[100px] text-center max-lg:hidden">
        {cart.foodSize.name}
      </span>
      <div className="w-[150px] px-2">
        <NumberInput
          value={cart.quantity}
          onDecrease={() => {
            if (onQuantityChange)
              onQuantityChange(cart.quantity <= 0 ? 0 : cart.quantity - 1);
          }}
          onIncrease={() => {
            if (onQuantityChange) onQuantityChange(cart.quantity + 1);
          }}
          onChange={(e) => {
            if (onQuantityChange)
              onQuantityChange(Number.parseInt(e.target.value));
          }}
          disabled={isOutOfStock}
        />
      </div>

      <span className="w-[100px] text-center max-lg:hidden">
        {displayNumber(cart.price, "$")}
      </span>
      <span className="w-[100px] text-center">
        {displayNumber(cart.price * cart.quantity, "$")}
      </span>
      {isOutOfStock ? (
        <span className="w-[50px]"></span>
      ) : (
        <Tooltip
          showArrow
          isOpen={isTooltipOpen}
          onOpenChange={(isOpen) => {
            if (!isEdittingNote) setIsTooltipOpen(isOpen);
          }}
          content={
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {isEdittingNote ? (
                <div className="flex flex-row items-center font-sans">
                  <TextArea
                    className="outline-0 rounded-lg resize-none"
                    value={tempCartNote}
                    onChange={(e) => setTempCartNote(e.currentTarget.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (onNoteChange) onNoteChange(tempCartNote);
                        setIsTooltipOpen(false);
                        setIsEdittingNote(false);
                      }
                    }}
                  />
                </div>
              ) : (
                <span className="px-2">
                  {cart.note && cart.note.length > 0 ? cart.note : "Add note"}
                </span>
              )}
            </div>
          }
          closeDelay={0}
          classNames={{
            base: [
              // arrow color
              "before:bg-cyan-500 focus-within:before:bg-cyan-500",
            ],
            // tooltip color
            content: [
              "bg-cyan-500 text-white font-sans px-1 focus-within:bg-cyan-500",
            ],
          }}
        >
          <span
            className={cn(
              "w-[50px] flex items-center justify-center opacity-0 text-primaryWord group-hover:opacity-100 ease-linear duration-100 cursor-pointer",
              isEdittingNote ? "opacity-100" : "",
              cart.note && cart.note.length > 0 ? "opacity-100" : ""
            )}
            onClick={(e) => {
              e.stopPropagation();
              setIsTooltipOpen(!isTooltipOpen);
              setIsEdittingNote(!isEdittingNote);
            }}
          >
            {cart.note && cart.note.length > 0 ? (
              <FileText className="text-cyan-500" />
            ) : (
              <Edit />
            )}
          </span>
        </Tooltip>
      )}

      <X
        className={cn(
          "w-[50px] text-center opacity-0 text-red-500 group-hover:opacity-100 ease-linear duration-100 cursor-pointer",
          isEdittingNote ? "opacity-100" : ""
        )}
        onClick={() => {
          setTimeout(() => {
            if (onDelete) onDelete();
          }, 200);
          addAnimation();
        }}
      />
    </div>
  );
};
