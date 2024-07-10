import { GetAllCategories } from "@/src/actions/category";
import { GetAllFood } from "@/src/actions/food";
import InventoryDataTable from "@/src/components/inventory/datatable";
import { Food, FoodCategory } from "@/src/models/Food";
import { getActiveFood } from "@/src/utils/func";

const InventoryPage = async () => {
  const [foodsResult, categoriesResult] = await Promise.allSettled([
    GetAllFood(),
    GetAllCategories(),
  ]);

  const foods =
    foodsResult.status === "fulfilled" ? (foodsResult.value as Food[]) : [];
  const categories =
    categoriesResult.status === "fulfilled"
      ? (categoriesResult.value as FoodCategory[])
      : [];

  return (
    <div className="h-screen flex flex-col p-8 text-primary-word dark:text-dark-primary-word overflow-x-hidden default-scrollbar dark:white-scrollbar">
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-4xl font-bold text-primary dark:text-dark-primary-word">
          Inventory
        </h1>
      </div>
      <InventoryDataTable
        foods={getActiveFood(foods)}
        categories={categories}
      />
    </div>
  );
};

export default InventoryPage;
