import { ChangeStateFavouriteFood } from "@/src/actions/food";
import { Food } from "@/src/models/Food";
import { cn } from "@/src/utils/func";
import { SolidHeartIcon } from "../icons/solid";
import FoodImageFrame from "../main/food-image-frame";
import { FoodPrice } from "../main/food-price";
import FoodRating from "../main/food-rating";
import FoodTag from "../main/food-tag";
import { Button } from "../ui/button";
import { showErrorToast } from "../ui/toast";

export default function FavouriteFoodItem({
  food,
  className,
  onClick,
  isFavorite = false,
}: {
  food: Food;
  className?: string;
  onClick?: () => void;
  isFavorite?: boolean;
}) {
  const getMinAndMaxPrice = (food: Food) => {
    const tempSortedPriceList = food.foodSizes
      .map((foodSize) => foodSize.price)
      .sort();
    return [
      tempSortedPriceList[0],
      tempSortedPriceList[tempSortedPriceList.length - 1],
    ];
  };

  const sortedPriceList = getMinAndMaxPrice(food);

  const handleFavoriteFoodIdsChange = async (id: number) => {
    const res = await ChangeStateFavouriteFood(id);
    if (res.error) {
      showErrorToast(res.error);
    }
  };

  return (
    <div
      className={cn(
        "w-full h-min flex flex-col rounded overflow-hidden shadow-lg bg-white/70",
        className
      )}
    >
      <div className="w-full h-40 overflow-hidden cursor-pointer">
        <FoodImageFrame food={food} onClick={onClick} />
      </div>
      <div className="flex flex-col m-2 gap-2">
        <div className="w-full flex flex-row items-center justify-between">
          <span className="font-semibold">{food.name}</span>
          <Button
            className={cn(
              "rounded-full ease-linear duration-100 bg-transparent hover:bg-transparent hover:opacity-60"
            )}
            iconBefore={
              isFavorite ? (
                <SolidHeartIcon color="pink" />
              ) : (
                <SolidHeartIcon color="pink" />
              )
            }
            onClick={() => handleFavoriteFoodIdsChange(food.id)}
          />
        </div>
        <FoodPrice
          currency="$"
          defaultPrice={sortedPriceList[0]}
          secondPrice={sortedPriceList[sortedPriceList.length - 1]}
        />

        <div className={cn("flex items-center")}>
          <FoodRating
            rating={food.rating}
            className={cn("mt-2", food.rating === 0 && "hidden")}
          />
          {food.tags.map((tag) => {
            return <FoodTag key={tag} name={tag} theme="light" />;
          })}
        </div>
      </div>
    </div>
  );
}
