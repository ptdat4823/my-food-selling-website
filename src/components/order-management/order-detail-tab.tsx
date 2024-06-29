import { Cart } from "@/src/models/Cart";
import { Order } from "@/src/models/Order";
import { displayNumber, formatDate } from "@/src/utils/func";
import { Row } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { RowInfo } from "./row-info";
import { FoodItemContent } from "./food-item-content";
import { FoodItemTab } from "./food-items-tab";

export const OrderDetailTab = ({
  row,
  setShowTabs,
}: {
  row: Row<Order>;
  setShowTabs: (value: boolean) => any;
}) => {
  const order = row.original;
  const [selectFoodItemTab, setSelectFoodItemTab] = useState<number>(-1); //use food size as id
  const [selectedCart, setSelectedCart] = useState<Cart | undefined>();

  const handleSelectedFoodItemTabChange = (foodSizeId: number) => {
    setSelectFoodItemTab(foodSizeId);
    if (foodSizeId === -1) {
      setSelectedCart(undefined);
    } else {
      const cart = order.items.find((cart) => cart.foodSize.id === foodSizeId);
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
      <div className="flex flex-row">
        <div className="flex shrink-[5] grow-[5] flex-row gap-2 text-[0.8rem]">
          <div className="flex flex-1 flex-col">
            <RowInfo label="Order ID:" value={order.id.toString()} />
            <RowInfo label="Customer:" value={order.user.name} />
            <RowInfo label="Contact:" value={order.user.phoneNumber} />
            <RowInfo label="Email:" value={order.user.email} />
            <RowInfo label="Address:" value={order.user.address} />
            <RowInfo label="Total:" value={displayNumber(order.total, "$")} />
          </div>
          <div className="flex flex-1 flex-col">
            <RowInfo
              label="Order date:"
              value={formatDate(order.createdAt, "datetime")}
            />
            <RowInfo label="Payment method:" value={order.paymentMethod} />
            <RowInfo
              label="Order note:"
              value={order.note}
              showTextArea={true}
            />
          </div>
        </div>
      </div>
      <div className="h-fit flex flex-col gap-4">
        <div className="flex flex-row items-center gap-2">
          <div className="flex flex-row gap-2 items-center">
            <Button className="text-sm rounded-md py-1 bg-gray-100 text-secondary-word hover:bg-gray-100 hover:opacity-100 dark:bg-white/10 dark:hover:bg-white/20">
              Items
            </Button>
            <ChevronRight className="w-5 h-5 text-secondary-word" />
          </div>
          <div className="flex flex-row gap-4">
            {order.items.map((cart) => (
              <FoodItemTab
                key={cart.foodSize.id}
                cart={cart}
                selectedTab={selectFoodItemTab}
                setSelectedTab={handleSelectedFoodItemTabChange}
              />
            ))}
          </div>
        </div>
        <FoodItemContent cart={selectedCart} />
      </div>
    </div>
  );
};
