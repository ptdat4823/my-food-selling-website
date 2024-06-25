import { GetAllCarts } from "@/src/actions/cart";
import { GetFavouriteFood } from "@/src/actions/food";
import Sidebar from "@/src/components/ui/sidebar";
import { Cart } from "@/src/models/Cart";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cartResults, favouriteResults] = await Promise.allSettled([
    GetAllCarts(),
    GetFavouriteFood(),
  ]);

  const carts =
    cartResults.status === "fulfilled" ? (cartResults.value as Cart[]) : [];
  const favouriteFoods =
    favouriteResults.status === "fulfilled"
      ? (favouriteResults.value as Cart[])
      : [];

  return (
    <div className="w-screen flex flex-row">
      <Sidebar
        cartQuantity={carts.length}
        favouriteQuantity={favouriteFoods.length}
      />
      <div className="flex-1">{children}</div>
    </div>
  );
}
