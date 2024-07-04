"use client";
import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ClassValue } from "clsx";
import { ChevronLeft, ChevronRight, Circle, Dot } from "lucide-react";
import { useDotButton } from "./carousel_dot_button";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/src/utils/func";
import { CldImage } from "next-cloudinary";

export default function ImageCarousel({
  images,
  className,
  loop = false,
  autoPlay = false,
  hoverScale = false,
}: {
  images: string[];
  className?: ClassValue;
  loop?: boolean;
  active?: boolean;
  autoPlay?: boolean;
  hoverScale?: boolean;
}) {
  const [emblaRef, emplaApi] = useEmblaCarousel(
    { loop: loop, watchDrag: false },
    autoPlay ? [Autoplay({ delay: 3000 })] : []
  );
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emplaApi);

  return (
    <div className={cn("relative group", className)}>
      <Button
        iconBefore={<ChevronLeft className="text-white" />}
        className={cn(
          "absolute h-full left-0 top-0 opacity-0 group-hover:opacity-100 bg-transparent hover:bg-gray-500/50 dark:hover:bg-gray-500/50 hover:opacity-100 rounded-none z-50",
          images.length === 1 ? "hidden" : "",
          selectedIndex === 0 && "hidden"
        )}
        onClick={() => {
          if (emplaApi) emplaApi.scrollPrev();
        }}
      />
      <Button
        iconBefore={<ChevronRight className="text-white" />}
        className={cn(
          "absolute h-full right-0 top-0 opacity-0 group-hover:opacity-100 bg-transparent hover:bg-gray-500/50 dark:hover:bg-gray-500/50 hover:opacity-100 rounded-none z-50",
          images.length === 1 ? "hidden" : "",
          selectedIndex === scrollSnaps.length - 1 && "hidden"
        )}
        onClick={() => {
          if (emplaApi) emplaApi.scrollNext();
        }}
      />
      <div className="overflow-hidden rounded-md" ref={emblaRef}>
        <div className="flex items-center select-none">
          {images.map((image, index) => {
            console.log("image", image);
            return (
              <CldImage
                key={index}
                alt="food image"
                width={400}
                height={300}
                src={image}
                className={cn(
                  "flex-0_0_100",
                  "h-48 bg-center bg-cover bg-no-repeat relative ease-linear duration-100",
                  hoverScale && "hover:scale-125"
                )}
              />
            );
          })}
        </div>
      </div>
      <div
        className={cn(
          "absolute w-full top-[105%] flex flex-row items-center justify-center gap-1 z-50",
          scrollSnaps.length <= 1 && "hidden"
        )}
      >
        {scrollSnaps.map((snap, index) => {
          console.log("index", index);
          console.log("scrollnaps", scrollSnaps.length);
          return (
            <div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full border border-black hover:bg-black ease-linear duration-100 cursor-pointer",
                selectedIndex === index ? "bg-black" : "bg-white"
              )}
              onClick={() => onDotButtonClick(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
