"use client";
import { Food, FoodCategory } from "@/src/models/Food";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CustomDatatable } from "../table/custom_datatable";
import { Button } from "../ui/button";
import {
  menuColumnTitles,
  menuDefaultVisibilityState,
  menuTableColumns,
} from "./columns";
import { FoodDetailTab } from "./food-detail-tab";
import { FoodForm } from "./food-form";

interface Props {
  foods: Food[];
  categories: FoodCategory[];
}
const InventoryDataTable = ({ foods, categories }: Props) => {
  foods = foods.filter((food) => !food.isDeleted && food.name !== null);
  const [openNewFoodForm, setOpenNewFoodForm] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food>();
  const filterOptionKeys = Object.keys(menuColumnTitles)
    .filter((key) => key !== "images")
    .map((key) => key);

  return (
    <>
      <CustomDatatable
        data={foods}
        columns={menuTableColumns()}
        columnTitles={menuColumnTitles}
        buttons={[
          <div key={1} className="flex flex-row items-center justify-end gap-2">
            <Button
              iconBefore={<Plus size={16} />}
              className="w-fit whitespace-nowrap gap-2 py-2"
              onClick={() => setOpenNewFoodForm(true)}
            >
              Add new food
            </Button>
          </div>,
        ]}
        infoTabs={[
          {
            render(row, setShowTabs) {
              return (
                <FoodDetailTab
                  row={row}
                  setShowTabs={setShowTabs}
                  // onDeleteFood={handleDeleteFood}
                  onUpdateFood={() => {
                    setSelectedFood(row.original);
                    setOpenNewFoodForm(true);
                  }}
                />
              );
            },
            tabName: "Food details",
          },
        ]}
        config={{
          defaultVisibilityState: menuDefaultVisibilityState,
          showFilterButton: true,
          filterOptionKeys: filterOptionKeys,
          showDataTableViewOptions: true,
          //   onFilterChange: handleFilterChange,
          //   onDeleteRowsBtnClick: handleDeleteSelectedFoods,
        }}
      />
      {openNewFoodForm && (
        <FoodForm
          food={selectedFood}
          categories={categories}
          closeForm={() => {
            setSelectedFood(undefined);
            setOpenNewFoodForm(false);
          }}
        />
      )}
    </>
  );
};

export default InventoryDataTable;
