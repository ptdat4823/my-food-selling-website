"use client";
import { Food, FoodSize } from "@/src/models/Food";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import FoodItem from "./food-item";
import { useEffect, useState } from "react";
import { FoodDetail } from "./food-detail";
import { useSession } from "next-auth/react";
import { showErrorToast, showSuccessToast } from "../ui/toast";
import { Cart } from "@/src/models/Cart";
import { AddCart } from "@/src/actions/cart";

export const FoodList = ({ foods }: { foods: Food[] }) => {
  const { data: session } = useSession();
  const [emblaRef] = useEmblaCarousel({}, [Autoplay()]);
  const [isOpen, setOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food>();
  const [selectedSize, setSelectedSize] = useState<FoodSize>();
  const [selectedFoodQuantity, setSelectedFoodQuantity] = useState(1);
  const [favoriteFoodIds, setFavoriteFoodIds] = useState<number[]>([]);
  const isLogin = false;

  const handleFoodClick = (food: Food) => {
    setSelectedFood(food);
    if (selectedFood !== food) setSelectedSize(food.foodSizes[0]);
    setOpen(!isOpen);
  };

  const handleAddToCart = async (food: Food) => {
    if (!selectedSize) return;
    if (!session) {
      showErrorToast("Please login to add to cart");
      return;
    }
    const newCartItem: Cart = {
      id: -1,
      quantity: selectedFoodQuantity,
      price: selectedFoodQuantity * selectedSize.price,
      food: food,
      foodSize: selectedSize,
      note: "",
    };
    const res = await AddCart(newCartItem);
    if (res.error) {
      showErrorToast(res.error);
    }
    if (res.message) {
      showSuccessToast(res.message);
      setOpen(!isOpen);
    }
    setOpen(!isOpen);
    // await CartService.AddCart(newCartItem)
    //   .then((res) => {
    //     console.log(res);
    //     dispatch(addCartItem(res.data));
    //     showSuccessToast("Added to cart successfully");
    //     setOpen(!isOpen);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     showErrorToast("Failed to add to cart");
    //   });
  };
  const handleFoodSizeChange = (foodSize: FoodSize) => {
    if (selectedSize !== foodSize) setSelectedSize(foodSize);
  };
  const handleFavoriteFoodIdsChange = (foodId: number) => {
    console.log(foodId);
  };

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="w-full flex gap-[calc((100%-99%)/3)] mb-8">
        {foods.map((food: any, index: number) => (
          <FoodItem
            key={index}
            className="xl:flex-[0_0_33%] max-xl:flex-[0_0_50%] max-md:flex-[0_0_100%] min-w-0"
            food={food}
            isFavorite={favoriteFoodIds.includes(food.id)}
            onFavoriteChange={handleFavoriteFoodIdsChange}
            onClick={handleFoodClick}
          />
        ))}

        {selectedFood && selectedSize && (
          <FoodDetail
            isOpen={isOpen}
            onOpenChange={() => setOpen(!isOpen)}
            food={selectedFood}
            foodQuantity={selectedFoodQuantity}
            onFoodQuantityChange={(quantity: number) =>
              setSelectedFoodQuantity(quantity)
            }
            selectedSize={selectedSize}
            onFoodSizeChange={(foodSize: any) => handleFoodSizeChange(foodSize)}
            isFavorite={favoriteFoodIds.includes(selectedFood.id)}
            // onFavoriteChange={(isFavorite: boolean) =>
            //   onFavoriteFoodIdsChange &&
            //   onFavoriteFoodIdsChange(selectedFood.id)
            // }
            onAddToCart={() => handleAddToCart(selectedFood)}
          />
        )}
      </div>
    </div>
  );
};
