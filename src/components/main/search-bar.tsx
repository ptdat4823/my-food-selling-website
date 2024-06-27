"use client";
import { Food } from "@/src/models/Food";
import { User } from "@/src/models/User";
import { useState } from "react";
import { FoodDetail } from "./food-detail";
import { FoodItemSearch } from "./food-item-search";
import { ClassValue } from "clsx";
import { cn } from "@/src/utils/func";

interface Props {
  foods: Food[];
  favoriteFoodIds: number[];
  user: User;
  className?: ClassValue;
}
const SearchBar = ({ foods, favoriteFoodIds, user, className }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food>();

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
      <div className="h-12 flex items-center rounded-md bg-gray-100 self-stretch px-4 w-2/3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          viewBox="0 0 16 16"
        >
          <path
            fill="black"
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0"
          />
        </svg>
        <input
          type="text"
          className="px-4 self-stretch bg-transparent flex-grow text-black outline-none"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setSearchFocus(true)}
          onBlur={() => setSearchFocus(false)}
        />
      </div>
      {searchFocus && searchInput.length > 0 ? (
        <div className="absolute bg-slate-700 top-full left-0 w-2/3 mt-1 rounded-md overflow-hidden">
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
