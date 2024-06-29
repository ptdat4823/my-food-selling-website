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
  const selectedNumStyle = "bg-primary dark:bg-dark-primary";
  const selectedStepStyle = "text-primary-word dark:text-dark-primary-word";
  const defaultNumStyle = "bg-disable dark:bg-dark-disable";
  const defaultStepStyle =
    "text-secondary-word hover:text-primary-word dark:text-dark-secondary-word dark:hover:text-dark-primary-word";
  const disableNumStyle =
    "cursor-default bg-disable dark:bg-dark-disable hover:bg-disable dark:hover:bg-dark-disable";
  const disableStepStyle =
    "cursor-default text-secondary-word hover:text-secondary-word dark:text-dark-secondary-word dark:hover:text-dark-secondary-word";
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
          "cursor-pointer font-semibold text-lg whitespace-nowrap ease-linear duration-100",
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
