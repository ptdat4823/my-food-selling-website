import { GetAllCategories } from "@/src/actions/category";
import { GetAllFood } from "@/src/actions/food";
import { GetInfo } from "@/src/actions/user";
import AllFoodsList from "@/src/components/main/all-foods-list";
import BestRatedList from "@/src/components/main/best-rated-list";
import BestSellerList from "@/src/components/main/best-seller-list";
import FavoriteList from "@/src/components/main/favorite-list";
import SearchBar from "@/src/components/main/search-bar";
import { FoodToReceive } from "@/src/convertor/foodConvertor";
import { Page } from "@/src/models/Page";
import { getActiveFood } from "@/src/utils/func";

const HomePage = async () => {
  const [foodsRes, categoriesRes, userRes] = await Promise.all([
    GetAllFood(),
    GetAllCategories(),
    GetInfo(),
  ]);
  const foodPage: Page = foodsRes.data;
  const foods = foodPage.data.map((item: any) => FoodToReceive(item)) || [];
  const user = userRes.data;

  return (
    <div className="w-full h-screen default-scrollbar dark:white-scrollbar bg-cover">
      <div className="w-full h-fit px-4 py-8 space-y-4 overflow-hidden">
        <SearchBar foods={getActiveFood(foods)} user={user} />

        <AllFoodsList foods={getActiveFood(foods)} user={user} />

        <BestSellerList foods={getActiveFood(foods)} user={user} />

        <BestRatedList foods={getActiveFood(foods)} user={user} />

        <FavoriteList user={user} />
      </div>
    </div>
  );
};

export default HomePage;
