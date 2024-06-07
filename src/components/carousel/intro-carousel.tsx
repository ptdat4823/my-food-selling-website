"use client";
import { cn } from "@/src/utils/func";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

export default function IntroCarousel() {
  const [emblaRef] = useEmblaCarousel({}, [Autoplay({ delay: 3000 })]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex text-white select-none">
        <div
          className={cn(
            "flex-[0_0_100%]",
            "bg-[url('/images/banner_intro_1.jpg')] h-72 bg-center bg-cover relative after:absolute after:left-0 after:right-0 after:bottom-0 after:top-0 after:bg-slate-800 after:bg-opacity-40"
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
            "bg-[url('/images/banner_intro_2.jpg')] h-72 bg-center bg-cover relative after:absolute after:left-0 after:right-0 after:bottom-0 after:top-0 after:bg-slate-800 after:bg-opacity-40"
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
            "bg-[url('/images/banner_intro_3.jpg')] h-72 bg-center bg-cover relative after:absolute after:left-0 after:right-0 after:bottom-0 after:top-0 after:bg-slate-800 after:bg-opacity-40"
          )}
        >
          <h3 className="absolute left-60 bottom-3 right-3 text-4xl text-right z-[1]">
            Savor the harmony of sweet and savory in our signature dessert, a
            decadent chocolate lava cake oozing with rich, velvety goodness.
          </h3>
        </div>
      </div>
    </div>
  );
}
