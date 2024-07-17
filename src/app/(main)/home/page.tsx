import { GetAllCategories } from "@/src/actions/category";
import { GetAllFood, GetFavouriteFood } from "@/src/actions/food";
import { GetInfo } from "@/src/actions/user";
import AllFoodsList from "@/src/components/main/all-foods-list";
import BestRatedList from "@/src/components/main/best-rated-list";
import BestSellerList from "@/src/components/main/best-seller-list";
import FavoriteList from "@/src/components/main/favorite-list";
import SearchBar from "@/src/components/main/search-bar";
import { FoodToReceive } from "@/src/convertor/foodConvertor";
import { Food, FoodCategory } from "@/src/models/Food";
import { getActiveFood } from "@/src/utils/func";
import { Skeleton } from "@nextui-org/react";

const HomePage = async () => {
  const [foodsRes, categoriesRes, favouriteRes, userRes] = await Promise.all([
    GetAllFood(),
    GetAllCategories(),
    GetFavouriteFood(),
    GetInfo(),
  ]);

  const foods = foodsRes.data.map((item: any) => FoodToReceive(item)) || [];
  const favouriteFoods: Food[] = favouriteRes.data.map((item: any) =>
    FoodToReceive(item)
  );
  const favouriteFoodIds = favouriteFoods.map((food) => food.id);
  const user = userRes.data;

  return (
    <div className="w-full h-screen default-scrollbar dark:white-scrollbar bg-light bg-cover dark:bg-dark">
      <div className="w-full h-fit px-4 py-8 space-y-4 overflow-hidden">
        <SearchBar
          foods={getActiveFood(foods)}
          favoriteFoodIds={favouriteFoodIds}
          user={user}
        />

        <AllFoodsList
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
          foods={getActiveFood(favouriteFoods)}
          favoriteFoodIds={favouriteFoodIds}
          user={user}
        />
      </div>
    </div>
  );
};

export default HomePage;
