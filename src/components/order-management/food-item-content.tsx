import { Cart } from "@/src/models/Cart";
import ImageCarousel from "../carousel/image_carousel";
import { cn, displayNumber } from "@/src/utils/func";
import { RowInfo } from "./row-info";

export const FoodItemContent = ({ cart }: { cart: Cart | undefined }) => {
  if (!cart) return null;

  return (
    <div className="h-fit flex flex-row gap-4">
      <div className={cn("w-[250px] h-[220px] rounded-sm overflow-hidden")}>
        <ImageCarousel images={cart.food.images} />
      </div>
      <div className="flex shrink-[5] grow-[5] flex-row gap-2 text-[0.8rem]">
        <div className="flex flex-1 flex-col">
          <RowInfo label="Food ID:" value={cart.food.id.toString()} />
          <RowInfo label="Food name:" value={cart.food.name} />
          <RowInfo label="Size:" value={cart.foodSize.name} />
          <RowInfo label="Price:" value={displayNumber(cart.price, "$")} />
        </div>
        <div className="flex flex-1 flex-col">
          <RowInfo label="Item note:" value={cart.note} showTextArea={true} />
        </div>
      </div>
    </div>
  );
};
