import { cn } from "@/src/utils/func";
import React, { ReactNode } from "react";
import animation from "src/style/button.module.css";

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
          "w-fit px-2 py-2 bg-primary text-white hover:bg-hover-primary disabled:opacity-60 rounded-md text-md font-bold flex flex-row items-center justify-center cursor-pointer disabled:cursor-default ease-linear duration-100",
          "dark:text-dark-primary-word dark:hover:bg-dark-hover-primary",
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
