import { cn } from "@/src/utils/func";
import { ClassValue } from "clsx";
import { Minus, Plus } from "lucide-react";
import { forwardRef } from "react";

export interface NumberInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelColor?: string;
  errorMessages?: string;
  onDecrease?: () => void;
  onIncrease?: () => void;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      type,
      name,
      id,
      placeholder,
      label,
      labelColor,
      errorMessages,
      value,
      onChange,
      onDecrease,
      onIncrease,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className="w-full flex flex-row items-center justify-between gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className={cn(
            "cursor-pointer text-primary-word hover:text-hover-primary ease-linear duration-100",
            "dark:text-dark-primary-word",
            disabled ? "opacity-0" : ""
          )}
          onClick={onDecrease}
        >
          <Minus />
        </span>
        <input
          ref={ref}
          id={id}
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={cn(
            "w-[60px] border-0 outline outline-1 outline-border rounded py-1 px-3 bg-transparent focus:outline-primary disabled:outline-disable font-normal text-center text-primary-word",
            "dark:text-dark-primary-word dark:focus:outline-dark-primary",
            errorMessages ? "outline-red-500" : "",
            className
          )}
          {...props}
        />
        <span
          className={cn(
            "cursor-pointer text-primary-word hover:text-hover-primary ease-linear duration-100",
            "dark:text-dark-primary-word",
            disabled ? "opacity-0" : ""
          )}
          onClick={onIncrease}
        >
          <Plus />
        </span>
      </div>
    );
  }
);
NumberInput.displayName = "Input";
