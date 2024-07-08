import { cn } from "@/src/utils/func";
import { ClassValue } from "clsx";
import Image from "next/image";
import React from "react";

const CustomImage = ({
  image,
  className,
}: {
  image: string;
  className?: ClassValue;
}) => {
  return (
    <Image
      src={image}
      alt="about food"
      width={300}
      height={500}
      className={cn(
        "h-[500px] rounded-lg hover:-translate-y-2 ease-linear duration-200 shadow-highlight-white",
        className
      )}
    />
  );
};

export default CustomImage;
