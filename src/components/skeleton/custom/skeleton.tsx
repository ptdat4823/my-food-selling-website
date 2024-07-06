import React from "react";
import { Skeleton as OriginSkeleton } from "@nextui-org/react";
import { cn } from "@/src/utils/func";
import { ClassValue } from "clsx";

interface Props {
  duration?: 0.3 | 0.5 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  className?: ClassValue;
}
const Skeleton = ({ duration = 2, className }: Props) => {
  return (
    <OriginSkeleton
      className={cn(
        "h-12 w-full rounded-md",
        `before:!duration-[${duration}s]`,
        className
      )}
    />
  );
};

export default Skeleton;
