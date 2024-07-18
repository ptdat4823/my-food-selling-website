import { GetAllCategories } from "@/src/actions/category";
import { GetAllFood, GetFoodByPage } from "@/src/actions/food";
import InventoryDataTable from "@/src/components/inventory/datatable";
import { Food } from "@/src/models/Food";
import { Page } from "@/src/models/Page";
import { getActiveFood } from "@/src/utils/func";

interface Props {
  searchParams: {
    page: number;
    size: number;
  };
}
const InventoryPage = async ({ searchParams }: Props) => {
  const page = searchParams.page;
  const size = searchParams.size;
  const [foodRes, categorieRes] = await Promise.all([
    page && size ? GetFoodByPage(page, size) : GetAllFood(),
    GetAllCategories(),
  ]);

  const foodPage: Page = foodRes.data;
  const foods = foodPage.data as Food[];
  const pagination =
    page && size
      ? {
          totalPages: foodPage.totalPages,
          currentPage: page,
          pageSize: size,
        }
      : undefined;

  return (
    <div className="h-screen flex flex-col p-8 text-primary-word dark:text-dark-primary-word overflow-x-hidden default-scrollbar dark:white-scrollbar">
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-4xl font-bold text-primary dark:text-dark-primary-word">
          Inventory
        </h1>
      </div>
      <InventoryDataTable
        foods={getActiveFood(foods)}
        categories={categorieRes.data}
        pagination={pagination}
        error={foodRes.error || categorieRes.error}
      />
    </div>
  );
};

export default InventoryPage;
