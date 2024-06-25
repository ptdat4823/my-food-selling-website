import { cn } from "@/src/utils/func";
import { ClassValue } from "clsx";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: ClassValue;
}
const LayoutCard = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "w-full h-full font-sans bg-white rounded-lg shadow-primary-shadow hover:shadow-report-card p-4 text-primary-word font-semibold ease-linear duration-300 transition-all",
        className
      )}
    >
      {children}
    </div>
  );
};

export default LayoutCard;
