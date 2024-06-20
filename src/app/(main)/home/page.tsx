import { GetAllCategories } from "@/src/actions/category";
import { GetAllFood } from "@/src/actions/food";
import Banners from "@/src/components/main/banners";
import BestRatedList from "@/src/components/main/best-rated-list";
import BestSellerList from "@/src/components/main/best-seller-list";
import FavoriteList from "@/src/components/main/favorite-list";
import { FoodList } from "@/src/components/main/food-list";
import { Food, FoodCategory } from "@/src/models/Food";

const HomePage = async () => {
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

  const getActiveFood = (foods: Food[]) => {
    return foods.filter((food) => !food.isDeleted && food.name !== null);
  };
  return (
    <div
      className="relative w-full h-full white-scrollbar"
      style={{
        background:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8) ), url('/images/bg-main-page.jpg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full h-fit px-4 pb-8 space-y-4 overflow-hidden">
        <div className="h-12 mt-8 flex items-center justify-between relative">
          <div className="flex items-center rounded-md bg-gray-100 self-stretch px-4 w-2/3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 16 16"
            >
              <path
                fill="black"
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0"
              />
            </svg>
            <input
              type="text"
              className="px-4 self-stretch bg-transparent flex-grow text-black outline-none"
              placeholder="Search"
              //   onChange={(e) => setSearchInput(e.target.value)}
              //   onFocus={() => setSearchFocus(true)}
              //   onBlur={() => setSearchFocus(false)}
            />
          </div>
        </div>
        <Banners />

        <FoodList foods={getActiveFood(foods)} />

        <BestSellerList />

        <BestRatedList />

        <FavoriteList />
      </div>
    </div>
  );
};

export default HomePage;
