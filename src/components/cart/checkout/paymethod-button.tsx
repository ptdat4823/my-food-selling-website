import { cn } from "@/src/utils/func";
import { Checkbox } from "@nextui-org/react";
import { ReactNode, forwardRef, useState } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  selectedButton: string;
  content: string;
  onClick: () => void;
}

export const PayMethodButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, content, selectedButton, icon, onClick, ...props }, ref) => {
    const selectedStyle =
      "bg-white border-primary dark:bg-dark-secondary dark:text-dark-primary-word dark:border-dark-primary";
    const defaultStyle =
      "bg-transparent border-border dark:text-dark-primary-word dark:border-white dark:hover:bg-white/10";
    return (
      <button
        ref={ref}
        className={cn(
          "min-w-60 w-auto flex flex-row items-center justify-between px-4 py-2 gap-4 ease-linear duration-200 text-primary-word border rounded-2xl text-md font-semibold cursor-pointer disabled:cursor-default",
          selectedButton === content ? selectedStyle : defaultStyle,
          className
        )}
        onClick={onClick}
        {...props}
      >
        <div className="flex flex-row items-center gap-2">
          {icon}
          {content}
        </div>
        <Checkbox
          radius="full"
          color="primary"
          size="sm"
          isSelected={selectedButton === content}
          onClick={onClick}
        />
      </button>
    );
  }
);
PayMethodButton.displayName = "PayMethodButton";
