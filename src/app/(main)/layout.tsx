import { GetAllCarts } from "@/src/actions/cart";
import { GetFavouriteFood } from "@/src/actions/food";
import { GetInfo } from "@/src/actions/user";
import MySteryBackground from "@/src/components/ui/mystery-background";
import Sidebar from "@/src/components/ui/sidebar";
import { FoodToReceive } from "@/src/convertor/foodConvertor";
import { getActiveFood } from "@/src/utils/func";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cartRes, favouriteRes, userRes] = await Promise.all([
    GetAllCarts(),
    GetFavouriteFood(),
    GetInfo(),
  ]);

  const favouriteFoods = favouriteRes.data.map((item: any) =>
    FoodToReceive(item)
  );

  return (
    <div className="w-screen flex flex-row h-screen overflow-hidden">
      <Sidebar
        cartQuantity={cartRes.data}
        favouriteQuantity={getActiveFood(favouriteFoods).length}
        user={userRes.data}
      />
      <div className="relative flex-1 h-full">
        <MySteryBackground />
        <div className="relative w-full h-full">{children}</div>
      </div>
    </div>
  );
}
