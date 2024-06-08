import { cn } from "@/src/utils/func";
import { ClassValue } from "clsx";
import React from "react";

interface Props {
  theme?: "light" | "dark";
  name: string;
}
const FoodTag = ({ theme = "dark", name }: Props) => {
  const lightTheme: ClassValue =
    "bg-slate-200 text-gray-700 hover:bg-slate-500 hover:text-slate-200";
  const darkTheme: ClassValue = "bg-blue-500 text-white hover:bg-blue-400";
  return (
    <span
      className={cn(
        "hover:cursor-pointer rounded-md font-semibold px-2 py-1 font-hairline text-xs ml-1",
        theme === "light" ? lightTheme : darkTheme
      )}
    >
      {name}
    </span>
  );
};

export default FoodTag;
