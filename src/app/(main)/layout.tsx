import { GetAllCarts } from "@/src/actions/cart";
import { GetFavouriteFood } from "@/src/actions/food";
import { GetInfo } from "@/src/actions/user";
import Sidebar from "@/src/components/ui/sidebar";
import { Cart } from "@/src/models/Cart";
import { User } from "@/src/models/User";
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
      ? (favouriteResults.value as Cart[])
      : [];
  const user =
    userResults.status === "fulfilled" ? (userResults.value as User) : null;

  return (
    <div className="w-screen flex flex-row">
      <Sidebar
        cartQuantity={carts.length}
        favouriteQuantity={favouriteFoods.length}
        user={user}
      />
      <div className="flex-1">{children}</div>
    </div>
  );
}
