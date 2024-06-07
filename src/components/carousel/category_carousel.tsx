"use client";
import { cn } from "@/src/utils/func";
import { ClassValue } from "clsx";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export type CategoryCarouselItem = {
  id: number;
  name: string;
  image: string;
  quantity: number;
};

export default function CategoryCarousel({
  carouselItems,
  className,
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: number;
  setSelectedCategory: (num: number) => any;
  carouselItems: CategoryCarouselItem[];
  className?: ClassValue;
}) {
  const [emblaRef, emplaApi] = useEmblaCarousel({ loop: false }, [
    Autoplay({ delay: 5000 }),
  ]);

  return (
    <div className={cn("relative group mb-8", className)}>
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
      <div
        className="overflow-hidden rounded-md w-[1210px] mx-auto"
        ref={emblaRef}
      >
        <div className="flex items-center gap-1">
          <CategoryAll
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            allDishesCount={carouselItems.reduce(
              (pre, cur, idx, arr) => (pre = pre + arr[idx].quantity),
              0
            )}
          />
          {carouselItems.map((item, index) => {
            return (
              <Category
                key={index}
                item={item}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

const Category = ({
  setSelectedCategory,
  selectedCategory,
  item,
}: {
  item: CategoryCarouselItem;
  selectedCategory: number;
  setSelectedCategory: (num: number) => any;
}) => {
  return (
    <div
      onClick={() => setSelectedCategory(item.id)}
      className={cn(
        "rounded-md p-2 grid grid-cols-3 grid-rows-2 gap-2 shadow-xl cursor-pointer transition-colors duration-500 ease-in-out h-16 min-w-40",
        selectedCategory === item.id
          ? "bg-primary"
          : "bg-orange-100 bg-opacity-20"
      )}
    >
      <div className="rounded-full flex items-center justify-center row-span-2">
        <img
          className="h-12 w-12 object-cover rounded-full"
          src={item.image}
          alt=""
        />
      </div>
      <p className="font-bold text-xs col-span-2 text-ellipsis whitespace-nowrap overflow-hidden">
        {item.name}
      </p>
      <p className="text-xs text-slate-200 col-span-2 text-ellipsis whitespace-nowrap overflow-hidden">
        {item.quantity} dishes
      </p>
    </div>
  );
};

const CategoryAll = ({
  setSelectedCategory,
  selectedCategory,
  allDishesCount,
}: {
  allDishesCount: number;
  selectedCategory: number;
  setSelectedCategory: (num: number) => any;
}) => {
  return (
    <div
      onClick={() => setSelectedCategory(-1)}
      className={cn(
        "rounded-md p-2 grid grid-cols-3 grid-rows-2 gap-2 shadow-xl cursor-pointer transition-colors duration-500 ease-in-out h-16 min-w-40",
        selectedCategory === -1 ? "bg-primary" : "bg-orange-100 bg-opacity-20"
      )}
    >
      <div className="rounded-full flex items-center justify-center row-span-2">
        <img
          className="h-12 w-12 object-cover rounded-full"
          src={"/images/category_all.png"}
          alt=""
        />
      </div>
      <p className="font-bold text-xs col-span-2 text-ellipsis whitespace-nowrap overflow-hidden">
        All
      </p>
      <p className="text-xs text-slate-200 col-span-2 text-ellipsis whitespace-nowrap overflow-hidden">
        {allDishesCount} dishes
      </p>
    </div>
  );
};
