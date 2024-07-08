"use client";
import { cn } from "@/src/utils/func";
import { ClassValue } from "clsx";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IntroComment } from "../intro/intro-comment";
import IntroCommentCard from "../intro/intro-comment-card";
import { Button } from "../ui/button";
import { useDotButton } from "./carousel_dot_button";

export default function CommentCarousel({
  comments,
  className,
  loop = false,
  autoPlay = false,
  dragable = false,
}: {
  comments: IntroComment[];
  className?: ClassValue;
  loop?: boolean;
  active?: boolean;
  autoPlay?: boolean;
  dragable?: boolean;
}) {
  const [emblaRef, emplaApi] = useEmblaCarousel(
    { loop: loop, watchDrag: dragable },
    autoPlay ? [Autoplay({ delay: 3000 })] : []
  );
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emplaApi);

  return (
    <div className={cn("relative", className)}>
      <div className={cn("overflow-hidden rounded-md")} ref={emblaRef}>
        <div className="flex flex-row items-center select-none">
          {comments.map((comment, index) => {
            return (
              <IntroCommentCard
                key={index}
                comment={comment}
                className={cn("flex-[0_0_100%]")}
              />
            );
          })}
        </div>
      </div>
      <div
        className={cn(
          "absolute w-full top-[110%] flex flex-row items-center justify-center gap-1 z-50",
          scrollSnaps.length <= 1 && "hidden"
        )}
      >
        {scrollSnaps.map((snap, index) => {
          return (
            <div
              key={index}
              className={cn(
                "w-3 h-3 rounded-full bg-primary dark:bg-gray-400 ease-linear duration-100 cursor-pointer",
                selectedIndex === index ? "opacity-100" : "opacity-50"
              )}
              onClick={() => onDotButtonClick(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
