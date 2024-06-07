import { ClassValue } from "clsx";
import Image from "next/image";
import React, { ReactNode } from "react";
import { Checkbox } from "@nextui-org/react";
import { cn } from "@/src/utils/func";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconBefore?: ReactNode;
  iconAfter?: ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, iconBefore, iconAfter, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "w-fit px-2 py-2 bg-primary text-white hover:opacity-60 disabled:opacity-60 rounded-md text-md font-bold flex flex-row items-center justify-center cursor-pointer disabled:cursor-default ease-linear duration-100",
          className
        )}
        {...props}
      >
        {iconBefore}
        {children}
        {iconAfter}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
