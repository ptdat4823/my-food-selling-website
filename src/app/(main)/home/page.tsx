import { GetAllCategories } from "@/src/actions/category";
import { GetTopFoodByOrder } from "@/src/actions/dashboard";
import { GetAllFood, GetFavouriteFood } from "@/src/actions/food";
import { GetInfo } from "@/src/actions/user";
import Banners from "@/src/components/main/banners";
import BestRatedList from "@/src/components/main/best-rated-list";
import BestSellerList from "@/src/components/main/best-seller-list";
import FavoriteList from "@/src/components/main/favorite-list";
import { FoodList } from "@/src/components/main/food-list";
import SearchBar from "@/src/components/main/search-bar";
import { FoodToReceive } from "@/src/convertor/foodConvertor";
import { ToFoodReport } from "@/src/convertor/reportConvertor";
import { Food, FoodCategory } from "@/src/models/Food";
import { FoodReport } from "@/src/models/Report";

const HomePage = async () => {
  const [foodsResult, categoriesResult, favouriteResults, userResults] =
    await Promise.allSettled([
      GetAllFood(),
      GetAllCategories(),
      GetFavouriteFood(),
      GetInfo(),
    ]);

  const foods =
    foodsResult.status === "fulfilled"
      ? (foodsResult.value as any[]).map((item) => FoodToReceive(item))
      : [];
  const categories =
    categoriesResult.status === "fulfilled"
      ? (categoriesResult.value as FoodCategory[])
      : [];
  const favouriteFoods =
    favouriteResults.status === "fulfilled"
      ? (favouriteResults.value as any[]).map((item) => FoodToReceive(item))
      : [];
  const favouriteFoodIds = favouriteFoods.map((food) => food.id);

  const getActiveFood = (foods: Food[]) => {
    return foods.filter((food) => !food.isDeleted && food.name !== null);
  };
  const user = userResults.status === "fulfilled" ? userResults.value : null;

  return (
    <div className="relative w-full h-screen overflow-y-scroll white-scrollbar bg-main bg-cover">
      <div className="w-full h-fit px-4 py-8 space-y-4 overflow-hidden">
        <SearchBar
          foods={getActiveFood(foods)}
          favoriteFoodIds={favouriteFoodIds}
          user={user}
        />

        <FoodList
          foods={getActiveFood(foods)}
          favoriteFoodIds={favouriteFoodIds}
          user={user}
        />

        <BestSellerList
          foods={getActiveFood(foods)}
          favoriteFoodIds={favouriteFoodIds}
          user={user}
        />

        <BestRatedList
          foods={getActiveFood(foods)}
          favoriteFoodIds={favouriteFoodIds}
          user={user}
        />

        <FavoriteList
          foods={favouriteFoods}
          favoriteFoodIds={favouriteFoodIds}
          user={user}
        />
      </div>
    </div>
  );
};

export default HomePage;
