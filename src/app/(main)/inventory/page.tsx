import InventoryDataTable from "@/src/components/inventory/datatable";
import { Food } from "@/src/models/Food";

import React from "react";

const InventoryPage = () => {
  const foods = [] as Food[];
  return (
    <div className="h-screen flex flex-col p-8 text-primary-word default-scrollbar">
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-4xl font-bold text-primary">Inventory</h1>
      </div>
      <InventoryDataTable foods={foods} />
      {/* {openNewFoodForm && (
        <FoodForm
          food={selectedFood}
          categories={categories}
          closeForm={() => {
            setSelectedFood(undefined);
            setOpenNewFoodForm(false);
          }}
        />
      )} */}
    </div>
  );
};

export default InventoryPage;
