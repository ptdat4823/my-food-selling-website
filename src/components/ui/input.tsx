import { cn } from "@/src/utils/func";
import { ClassValue } from "clsx";
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelColor?: ClassValue;
  errorMessages?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, label, labelColor, errorMessages, ...props }, ref) => {
    return (
      <div className="relative w-full flex flex-col">
        <label
          htmlFor={id}
          className={cn(
            "font-semibold cursor-pointer mb-2",
            labelColor ? labelColor : "text-primary-word",
            "dark:text-dark-primary-word",
            label ? "" : "hidden"
          )}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={cn(
            "border-0 outline outline-1 outline-border rounded py-1 px-3 bg-transparent focus:outline-primary disabled:outline-disable font-normal text-primary-word dark:text-dark-primary-word",
            errorMessages ? "outline-red-500" : "",
            className
          )}
          {...props}
        />
        <span className="absolute -bottom-5 text-red-500 text-xs">
          {errorMessages ? errorMessages : ""}
        </span>
      </div>
    );
  }
);
Input.displayName = "Input";
