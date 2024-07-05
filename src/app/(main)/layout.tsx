import { GetAllCarts } from "@/src/actions/cart";
import { GetFavouriteFood } from "@/src/actions/food";
import { GetInfo } from "@/src/actions/user";
import MySteryBackground from "@/src/components/ui/mystery-background";
import Sidebar from "@/src/components/ui/sidebar";
import { Cart } from "@/src/models/Cart";
import { Food } from "@/src/models/Food";
import { User } from "@/src/models/User";
import { getActiveFood } from "@/src/utils/func";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cartResults, favouriteResults, userResults] = await Promise.allSettled(
    [GetAllCarts(), GetFavouriteFood(), GetInfo()]
  );

  const carts =
    cartResults.status === "fulfilled" ? (cartResults.value as Cart[]) : [];
  const favouriteFoods =
    favouriteResults.status === "fulfilled"
      ? (favouriteResults.value as Food[])
      : [];
  const user =
    userResults.status === "fulfilled" ? (userResults.value as User) : null;

  return (
    <div className="w-screen flex flex-row h-screen overflow-hidden">
      <Sidebar
        cartQuantity={carts.length}
        favouriteQuantity={getActiveFood(favouriteFoods).length}
        user={user}
      />
      <div className="relative flex-1 h-full">
        <MySteryBackground />
        <div className="relative w-full h-full">{children}</div>
      </div>
    </div>
  );
}
