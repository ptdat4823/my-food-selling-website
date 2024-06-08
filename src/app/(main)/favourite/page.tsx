import FavoriteFoodList from "@/src/components/favorite/favorite-food-list";
import { Food } from "@/src/models/Food";

export default function FavouritePages() {
  const favouriteFoods = [] as Food[];

  return (
    <div className="w-full h-screen font-sans text-primaryWord p-8 overflow-y-scroll">
      <h1 className="text-primary text-3xl font-bold mb-4">
        Your favourite foods
      </h1>
      <FavoriteFoodList foods={favouriteFoods} />
    </div>
  );
}
