"use client";
import { Food } from "@/src/models/Food";
import { User } from "@/src/models/User";
import { useState } from "react";
import { FoodDetail } from "./food-detail";
import { FoodItemSearch } from "./food-item-search";
import { ClassValue } from "clsx";
import { cn } from "@/src/utils/func";
import { SearchIcon } from "lucide-react";
import { useAppSelector } from "@/src/redux/hooks";

interface Props {
  foods: Food[];
  user: User;
  className?: ClassValue;
}
const SearchBar = ({ foods, user, className }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food>();
  const favoriteFoodIds = useAppSelector((state) => state.favorite.ids);

  const handleFoodClick = (food: Food) => {
    setSelectedFood(food);
    setOpen(!isOpen);
  };

  return (
    <div
      className={cn(
        "z-40 flex items-center justify-between relative",
        className
      )}
    >
      <div className="h-12 flex items-center rounded-md bg-gray-100 dark:bg-dark-secondary-bg self-stretch px-4 w-2/3">
        <SearchIcon className="w-6 h-6 text-black dark:text-dark-primary-word" />
        <input
          type="text"
          className="px-4 self-stretch bg-transparent flex-grow text-black dark:text-dark-primary-word outline-none"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setSearchFocus(true)}
          onBlur={() => setSearchFocus(false)}
        />
      </div>
      {searchFocus && searchInput.length > 0 ? (
        <div className="absolute bg-white dark:bg-dark-secondary-bg top-full left-0 w-2/3 mt-1 rounded-md overflow-hidden">
          {foods
            .filter((f) =>
              f.name.toLowerCase().includes(searchInput.toLowerCase())
            )
            .map((f) => (
              <FoodItemSearch
                food={f}
                key={f.id}
                searchInput={searchInput}
                onMouseDown={() => handleFoodClick(f)}
              />
            ))}
        </div>
      ) : null}
      {selectedFood && (
        <FoodDetail
          isOpen={isOpen}
          onOpenChange={setOpen}
          food={selectedFood}
          isFavorite={favoriteFoodIds.includes(selectedFood.id)}
          user={user}
        />
      )}
    </div>
  );
};

export default SearchBar;
