import { GetAllCategories } from "@/src/actions/category";
import { GetFoodByPage } from "@/src/actions/food";
import InventoryDataTable from "@/src/components/inventory/datatable";
import { Food } from "@/src/models/Food";
import { getActiveFood } from "@/src/utils/func";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page: number;
    size: number;
  };
}
const InventoryPage = async ({ searchParams }: Props) => {
  const page = searchParams.page;
  const size = searchParams.size;
  if (!page || !size) {
    redirect("/inventory?page=1&size=10");
  }
  const [foodRes, categorieRes] = await Promise.all([
    GetFoodByPage(page, size),
    GetAllCategories(),
  ]);

  return (
    <div className="h-screen flex flex-col p-8 text-primary-word dark:text-dark-primary-word overflow-x-hidden default-scrollbar dark:white-scrollbar">
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-4xl font-bold text-primary dark:text-dark-primary-word">
          Inventory
        </h1>
      </div>
      <InventoryDataTable
        foods={getActiveFood(foodRes.data as Food[])}
        categories={categorieRes.data}
        error={foodRes.error || categorieRes.error}
      />
    </div>
  );
};

export default InventoryPage;
