import { cn } from "@/src/utils/func";
import { Checkbox } from "@nextui-org/react";
import { ReactNode, forwardRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  selectedButton?: string;
  content: string;
}

export const PayMethodButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, content, selectedButton, icon, onClick, ...props }, ref) => {
    const selectedStyle = "bg-momoBgColor border-momoBorderColor";
    const defaultStyle = "bg-white border-borderColor";
    return (
      <button
        ref={ref}
        className={cn(
          "min-w-60 w-auto flex flex-row items-center justify-between px-4 py-2 gap-4 ease-linear duration-200 text-primaryWord border rounded-2xl text-md font-bold cursor-pointer disabled:cursor-default",
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
          color="danger"
          size="sm"
          isSelected={selectedButton === content}
        />
      </button>
    );
  }
);
PayMethodButton.displayName = "PayMethodButton";
