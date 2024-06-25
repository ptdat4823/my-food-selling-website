import { GetFavouriteFood } from "@/src/actions/food";
import { GetInfo } from "@/src/actions/user";
import FavoriteFoodList from "@/src/components/favorite/favorite-food-list";
import { Food } from "@/src/models/Food";

export default async function FavouritePages() {
  const [favouriteFoodRes, user] = await Promise.all([
    GetFavouriteFood(),
    GetInfo(),
  ]);
  const favouriteFoods = favouriteFoodRes.error
    ? []
    : (favouriteFoodRes as Food[]);

  return (
    <div className="bg-white w-full h-screen font-sans text-primary-word p-8 overflow-y-scroll default-scrollbar">
      <h1 className="text-primary text-3xl font-bold mb-4">
        Your favourite foods
      </h1>
      <FavoriteFoodList foods={favouriteFoods} user={user} />
    </div>
  );
}
