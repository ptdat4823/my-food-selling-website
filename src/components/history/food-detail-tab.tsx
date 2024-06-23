import { Cart } from "@/src/models/Cart";
import { Order, OrderStatus } from "@/src/models/Order";
import { Row } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "../ui/button";
import { displayNumber } from "@/src/utils/func";
import { FoodItemTab } from "./food-item-tab";
import { FoodItemContent } from "./food-item-content";

export const FoodDetailTab = ({
  row,
  setOrderToRate,
  setShowTabs,
}: {
  row: Row<Order>;
  setOrderToRate?: (order: Order) => void;
  setShowTabs: (value: boolean) => any;
}) => {
  const order = row.original;
  const [selectFoodItemTab, setSelectFoodItemTab] = useState<number>(-1); //use foodSize as id
  const [selectedCart, setSelectedCart] = useState<Cart | undefined>();
  const [emblaRef, emplaApi] = useEmblaCarousel({ loop: false });

  const handleSelectedFoodItemTabChange = (id: number) => {
    setSelectFoodItemTab(id);
    if (id === -1) {
      setSelectedCart(undefined);
    } else {
      const cart = order.items.find((cart) => cart.foodSize.id === id);
      if (cart) {
        setSelectedCart(cart);
      }
    }
  };
  useEffect(() => {
    if (order.items.length > 0) {
      setSelectFoodItemTab(order.items[0].foodSize.id);
      setSelectedCart(order.items[0]);
    }
  }, []);
  return (
    <div className="flex h-fit flex-col gap-4 px-4 py-2">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-2">
          <div className="flex-1 overflow-hidden" ref={emblaRef}>
            <div className="w-full flex flex-row gap-2 select-none">
              {order.items.map((cart) => (
                <FoodItemTab
                  key={cart.food.id}
                  cart={cart}
                  selectedTab={selectFoodItemTab}
                  setSelectedTab={handleSelectedFoodItemTabChange}
                  orderStatus={order.status}
                />
              ))}
            </div>
          </div>
          {order.status === OrderStatus.DELIVERED && (
            <Button
              onClick={() => {
                if (setOrderToRate) setOrderToRate(order);
              }}
              disabled={order.feedback ? true : false}
              className="py-1 disabled:opacity-100"
            >
              {order.feedback ? "Rated" : "Rate this order"}
            </Button>
          )}
          <span className="text-secondary-word italic">
            VAT:{" "}
            <span className="w-fit text-primary font-normal">
              {displayNumber(order.total - order.total / 1.1, "$")}
            </span>
          </span>
          <span className="text-secondary-word italic">
            Total:{" "}
            <span className="w-fit text-primary font-normal">
              {displayNumber(order.total, "$")}
            </span>
          </span>
        </div>
        <FoodItemContent cart={selectedCart} />
      </div>
    </div>
  );
};
