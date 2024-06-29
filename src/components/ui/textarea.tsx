import { cn } from "@/src/utils/func";
import { forwardRef } from "react";

export interface TextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  labelColor?: string;
  errorMessages?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative w-full flex flex-col bg-transparent">
        <label
          htmlFor={id}
          className={cn(
            "font-semibold cursor-pointer mb-2",
            labelColor ? labelColor : "text-primary-word",
            label ? "" : "hidden"
          )}
        >
          {label}
        </label>
        <textarea
          ref={ref}
          id={id}
          name={name}
          placeholder={placeholder}
          className={cn(
            "border-0 outline outline-1 bg-transparent outline-border rounded py-1 px-3 focus:outline-primary disabled:outline-disable font-normal text-primary-word dark:text-dark-primary-word",
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
TextArea.displayName = "TextArea";
