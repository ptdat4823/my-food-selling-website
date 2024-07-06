import React from "react";
import Skeleton from "../../custom/skeleton";
import { cn } from "@/src/utils/func";

interface Props {
  title: string;
}
const TextAreaSkeleton = ({ title }: Props) => {
  return (
    <div className="relative w-full flex flex-col">
      <label
        className={cn(
          "font-semibold cursor-pointer mb-2",
          "text-primary-word dark:text-dark-primary-word",
          "dark:text-dark-primary-word"
        )}
      >
        {title}
      </label>
      <Skeleton className="w-full h-24" />
    </div>
  );
};

export default TextAreaSkeleton;
