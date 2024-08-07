"use client";
import { DeleteFood, DeleteFoods } from "@/src/actions/food";
import { Food, FoodCategory } from "@/src/models/Food";
import { deleteImage, formatDate, handleFilterColumn } from "@/src/utils/func";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { CustomDatatable } from "../table/custom_datatable";
import { Button } from "../ui/button";
import { showErrorToast, showSuccessToast } from "../ui/toast";
import {
  menuColumnTitles,
  menuDefaultVisibilityState,
  menuTableColumns,
} from "./columns";
import { FoodDetailTab } from "./food-detail-tab";
import { FoodForm } from "./food-form";

interface Props {
  foods: Food[];
  pagination?: { totalPages: number; currentPage: number; pageSize: number };
  categories: FoodCategory[];
  error?: string;
}
const InventoryDataTable = ({
  foods,
  pagination,
  categories,
  error,
}: Props) => {
  const [filteredData, setFilteredData] = useState<Food[]>([]);
  const [openNewFoodForm, setOpenNewFoodForm] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food>();
  const filterOptionKeys = Object.keys(menuColumnTitles)
    .filter((key) => key !== "images")
    .map((key) => key);

  useEffect(() => {
    setFilteredData(foods);
  }, [foods]);

  useEffect(() => {
    if (error) showErrorToast(error);
  }, [error]);

  const handleDeleteFood = async (id: number) => {
    const imagesToDelete = foods.find((food) => food.id === id)?.images;
    if (imagesToDelete) imagesToDelete.forEach((image) => deleteImage(image));
    const res = await DeleteFood(id);
    if (res.error) {
      showErrorToast(res.error);
    }
    if (res.message) {
      showSuccessToast(res.message);
    }
  };

  const handleDeleteSelectedFoods = async (foods: Food[]) => {
    foods.map((food) => {
      food.images.forEach((image) => deleteImage(image));
    });
    const res = await DeleteFoods(foods.map((food) => food.id));
    if (res.errors) {
      res.errors.forEach((error) => showErrorToast(error));
    }
    if (res.message) {
      showSuccessToast(res.message);
    }
  };

  const handleCategoryFilter = (filterInput: string, data: Food[]) => {
    const filteredData = data.filter((food) =>
      food.category.name.toLowerCase().includes(filterInput.toLowerCase())
    );
    return filteredData;
  };
  const handleCreatedDateFilter = (filterInput: string, data: Food[]) => {
    const filteredData = data.filter((food) =>
      formatDate(food.createdAt).includes(filterInput.toString())
    );
    return filteredData;
  };

  const handleFilterChange = (filterInput: string, col: string) => {
    let filteredData: Food[] = [];
    if (col === "") filteredData = getFilterAllTableData(filterInput);
    else filteredData = getDataFilter(filterInput, col);
    setFilteredData(filteredData);
  };

  const getDataFilter = (filterInput: string, col: string) => {
    //special col that cannot filter as default
    if (col === "category") return handleCategoryFilter(filterInput, foods);
    if (col === "createdAt") return handleCreatedDateFilter(filterInput, foods);
    return handleFilterColumn(filterInput, col, foods);
  };
  const getFilterAllTableData = (filterInput: string) => {
    let filteredAllTableData: Set<Food> = new Set();
    Object.keys(menuColumnTitles).forEach((col) => {
      if (col === "images") return;
      const filteredData = getDataFilter(filterInput, col);
      filteredData.forEach((order) => filteredAllTableData.add(order));
    });
    const filteredData = Array.from(filteredAllTableData);
    return filteredData;
  };

  return (
    <>
      <CustomDatatable
        data={filteredData}
        pagination={pagination}
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
                  onDeleteFood={handleDeleteFood}
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
          onFilterChange: handleFilterChange,
          onDeleteRowsBtnClick: handleDeleteSelectedFoods,
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
