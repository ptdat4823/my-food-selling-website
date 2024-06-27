import { Food } from "@/src/models/Food";
import Image from "next/image";
import FoodRating from "./food-rating";
import { cn } from "@/src/utils/func";
import { FoodPrice } from "./food-price";

export const FoodItemSearch = ({
  food,
  onMouseDown,
  searchInput,
}: {
  food: Food;
  onMouseDown?: () => void;
  searchInput?: string;
}) => {
  const default_food_image = "/images/default_food.jpg";
  const foodPriceRange = food.foodSizes.toSorted((a, b) => a.price - b.price);

  const highlightMatch = (text: string, query: string | undefined) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(
      regex,
      '<mark style="background-color: yellow;">$1</mark>'
    );
  };

  const highlightedName = highlightMatch(food.name, searchInput);

  return (
    <div
      onMouseDown={onMouseDown}
      className="px-4 py-2 text-sm flex flex-row items-center bg-white hover:bg-gray-100 hover:cursor-pointer ease-linear duration-100"
    >
      <div className="rounded-md overflow-hidden">
        <Image
          alt="food image"
          width={70}
          height={60}
          src={
            food.images && food.images.length > 0
              ? food.images[0]
              : default_food_image
          }
          className="object-cover w-[70px] h-[60px] rounded-md"
        />
      </div>
      <div className="flex flex-col m-2 gap-2">
        <div className="flex flex-row items-center gap-4">
          <p
            className="font-semibold"
            dangerouslySetInnerHTML={{ __html: highlightedName }}
          />
          <FoodRating
            className={cn(food.rating === 0 ? "hidden" : "")}
            rating={food.rating}
          />
        </div>
        <FoodPrice
          currency="$"
          defaultPrice={foodPriceRange[0].price}
          secondPrice={foodPriceRange[foodPriceRange.length - 1].price}
        />
      </div>
    </div>
  );
};
