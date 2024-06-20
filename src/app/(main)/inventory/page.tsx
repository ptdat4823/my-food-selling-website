import InventoryDataTable from "@/src/components/inventory/datatable";
import { Food, FoodCategory } from "@/src/models/Food";
import { showErrorToast } from "@/src/components/ui/toast";
import { GetAllFood } from "@/src/actions/food";
import { GetAllCategories } from "@/src/actions/category";

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
    <div className="h-screen flex flex-col p-8 text-primary-word default-scrollbar overflow-hidden">
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-4xl font-bold text-primary">Inventory</h1>
      </div>
      <InventoryDataTable foods={foods} categories={categories} />
    </div>
  );
};

export default InventoryPage;
