import { cn } from "@/src/utils/func";
import { forwardRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  canSort?: boolean;
}

export const CollumnHeaderButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, content, iconBefore, iconAfter, canSort = true, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "w-fit px-2 py-2 gap-2 outline-none border-0 whitespace-nowrap text-secondary-word bg-white ease-linear duration-100 disabled:bg-gray-100/60 rounded-md flex flex-row items-center justify-center cursor-pointer disabled:cursor-default font-semibold",
          canSort ? "hover:bg-gray-100 select-none" : "",
          className
        )}
        {...props}
      >
        {iconBefore}
        {content}
        {iconAfter}
      </button>
    );
  }
);
CollumnHeaderButton.displayName = "CollumnHeaderButton";
