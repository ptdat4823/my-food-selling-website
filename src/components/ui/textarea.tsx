import { cn } from "@/src/utils/func";
import { forwardRef } from "react";

export interface TextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  labelColor?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { className, type, name, id, placeholder, label, labelColor, ...props },
    ref
  ) => {
    return (
      <div className="w-full flex flex-col">
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
            "border-0 outline outline-1 outline-border rounded py-1 px-3 focus:outline-primary disabled:outline-disable font-normal text-primary-word",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
TextArea.displayName = "TextArea";
