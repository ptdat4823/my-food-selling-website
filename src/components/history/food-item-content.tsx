import { Cart } from "@/src/models/Cart";
import { cn, displayNumber } from "@/src/utils/func";
import { FoodProperty } from "../main/food-property";
import ImageCarousel from "../carousel/image_carousel";

export const FoodItemContent = ({
  cart,
}: {
  cart: Cart | undefined;
  onRateFood?: () => void;
}) => {
  if (!cart) return null;

  return (
    <div className="flex h-fit flex-col gap-4">
      <div className="flex flex-row gap-4">
        <div
          className={cn(
            "w-[250px] h-[200px] shrink-0 rounded-sm overflow-hidden"
          )}
        >
          <ImageCarousel images={cart.food.images} />
        </div>
        <div className="relative flex-1">
          <div className="w-auto flex flex-col gap-2 justify-start">
            <div className="w-[60vw] text-primary-word text-2xl font-semibold capitalize truncate">
              {cart.food.name}
            </div>
            <div className="w-[40vw] text-secondary-word text-lg capitalize truncate">
              {cart.food.description}
            </div>
            <div className="flex flex-row gap-2 justify-between">
              <FoodProperty name={cart.foodSize.name} isSelected={true} />

              <span className="text-secondary-word italic">
                Price:{" "}
                <span className="w-fit text-primary font-normal">
                  {displayNumber(cart.price, "$")}
                </span>
              </span>
            </div>
            <div
              className={cn(
                "w-[50vw] flex flex-row gap-2",
                cart.note && cart.note.length > 0 ? "" : "opacity-0"
              )}
            >
              <span className="text-cyan-500 font-semibold">Note:</span>
              <span className="w-full text-primary-word line-clamp-3 overflow-hidden text-ellipsis">
                {cart.note}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
