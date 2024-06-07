import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const displayNumber = (
  number: number,
  unit: "%" | string = "",
  spaceBetweenNumAndUnit: boolean = false,
  maximumFractionDigits: number = 2
) => {
  if (isNaN(number)) return "$0.00";
  if (unit === "%") {
    if (number < 1000)
      return (
        number.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) +
        (spaceBetweenNumAndUnit ? " " : "") +
        unit
      );

    return (
      number.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }) +
      (spaceBetweenNumAndUnit ? " " : "") +
      unit
    );
  }

  if (unit === "$")
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: maximumFractionDigits,
    });

  return (
    number.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    }) +
    (spaceBetweenNumAndUnit ? " " : "") +
    unit
  );
};

export { cn, displayNumber };
