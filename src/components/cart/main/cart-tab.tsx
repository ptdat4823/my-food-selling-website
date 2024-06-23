"use client";
import { cn } from "@/src/utils/func";
import { ClassValue } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const CartTab = ({
  className,
  tabNum,
  tabName,
  href,
  disabled = false,
}: {
  className?: ClassValue;
  tabNum: number;
  tabName: string;
  href: string;
  disabled?: boolean;
}) => {
  const selectedNumStyle = "bg-primary";
  const selectedStepStyle = "text-primary-word";
  const defaultNumStyle = "bg-disable";
  const defaultStepStyle = "text-secondary-word";
  const disableNumStyle = "cursor-default bg-disable hover:bg-disable";
  const disableStepStyle =
    "cursor-default text-secondary-word hover:text-secondary-word";
  const path = usePathname();
  return (
    <Link
      href={disabled ? "" : href}
      className={cn("flex flex-row items-center gap-2 select-none", className)}
    >
      <div
        className={cn(
          "w-6 h-6 flex items-center justify-center font-bold text-white rounded-full shrink-0",
          path === href ? selectedNumStyle : defaultNumStyle,
          disabled && disableNumStyle
        )}
      >
        {tabNum}
      </div>
      <span
        className={cn(
          "cursor-pointer font-semibold text-lg whitespace-nowrap hover:text-primary-word ease-linear duration-100",
          path === href ? selectedStepStyle : defaultStepStyle,
          disabled && disableStepStyle
        )}
      >
        {tabName}
      </span>
    </Link>
  );
};

export { CartTab };
