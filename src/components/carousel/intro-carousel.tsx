"use client";
import { cn } from "@/src/utils/func";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Nunito } from "next/font/google";
import { useDotButton } from "./carousel_dot_button";
import { ClassValue } from "clsx";

const nunito = Nunito({
  weight: ["400", "700", "1000"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

interface Props {
  className?: ClassValue;
}
export default function IntroCarousel({ className }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({}, [
    Autoplay({ delay: 3000 }),
  ]);
  const { onDotButtonClick, selectedIndex, scrollSnaps } =
    useDotButton(emblaApi);

  return (
    <div className={cn("relative h-fit", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className={cn("flex text-white select-none", nunito.className)}>
          <div
            className={cn(
              "flex-[0_0_100%]",
              "bg-[url('/images/banner_intro_1.jpg')] h-72 bg-center bg-cover relative after:absolute after:left-0 after:right-0 after:bottom-0 after:top-0 after:bg-slate-800 after:bg-opacity-20 hover:after:bg-opacity-60 after:ease-linear after:duration-200"
            )}
          >
            <h3 className="absolute left-60 bottom-3 right-3 text-4xl text-right z-[1]">
              Indulge in the exquisite flavors of our artisanal cheeses,
              handcrafted with the finest ingredients sourced locally.
            </h3>
          </div>
          <div
            className={cn(
              "flex-[0_0_100%]",
              "bg-[url('/images/banner_intro_2.jpg')] h-72 bg-center bg-cover relative after:absolute after:left-0 after:right-0 after:bottom-0 after:top-0 after:bg-slate-800 after:bg-opacity-20 hover:after:bg-opacity-60 after:ease-linear after:duration-200"
            )}
          >
            <h3 className="absolute left-60 bottom-3 right-3 text-4xl text-right z-[1]">
              Elevate your dining experience with our succulent,
              melt-in-your-mouth steak, expertly seasoned and grilled to
              perfection.
            </h3>
          </div>
          <div
            className={cn(
              "flex-[0_0_100%]",
              "bg-[url('/images/banner_intro_3.jpg')] h-72 bg-center bg-cover relative after:absolute after:left-0 after:right-0 after:bottom-0 after:top-0 after:bg-slate-800 after:bg-opacity-20 hover:after:bg-opacity-60 after:ease-linear after:duration-200"
            )}
          >
            <h3 className="absolute left-60 bottom-3 right-3 text-4xl text-right z-[1]">
              Savor the harmony of sweet and savory in our signature dessert, a
              decadent chocolate lava cake oozing with rich, velvety goodness.
            </h3>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "absolute w-full top-[102%] flex flex-row items-center justify-center gap-1 z-50",
          scrollSnaps.length <= 1 && "hidden"
        )}
      >
        {scrollSnaps.map((snap, index) => {
          return (
            <div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full border border-black hover:bg-black dark:border-white dark:hover:bg-white ease-linear duration-100 cursor-pointer",
                selectedIndex === index
                  ? "bg-black dark:bg-white"
                  : "bg-white dark:bg-black"
              )}
              onClick={() => onDotButtonClick(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
