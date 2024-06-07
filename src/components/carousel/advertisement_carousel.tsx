"use client";
import { cn } from "@/src/utils/func";
import { ClassValue } from "clsx";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export type CarouselItem = {
  image: string;
};

export default function AdvertisementCarousel({
  carouselItems,
  className,
}: {
  carouselItems: CarouselItem[];
  className?: ClassValue;
}) {
  const [emblaRef, emplaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);

  return (
    <div className={cn("relative group", className)}>
      <Button
        iconBefore={<ChevronLeft className="text-white" />}
        className={cn(
          "absolute h-full left-0 top-0 opacity-0 group-hover:opacity-100 bg-transparent hover:bg-gray-50/20 hover:opacity-100 rounded-none z-50",

          carouselItems.length === 1 ? "hidden" : ""
        )}
        onClick={() => {
          if (emplaApi) emplaApi.scrollPrev();
        }}
      />
      <Button
        iconBefore={<ChevronRight className="text-white" />}
        className={cn(
          "absolute h-full right-0 top-0 opacity-0 group-hover:opacity-100 bg-transparent hover:bg-gray-50/20 hover:opacity-100 rounded-none z-50",
          carouselItems.length === 1 ? "hidden" : ""
        )}
        onClick={() => {
          if (emplaApi) emplaApi.scrollNext();
        }}
      />
      <div className="overflow-hidden rounded-md" ref={emblaRef}>
        <div className="flex items-center">
          {carouselItems.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
                className={cn(
                  "flex-0_0_100",
                  "md:h-[20vw] max-md:h-[15vw] lg:w-full lg:h-[24vw] bg-center bg-cover bg-no-repeat relative"
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
