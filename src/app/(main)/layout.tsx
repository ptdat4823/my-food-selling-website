import { GetAllCarts } from "@/src/actions/cart";
import Sidebar from "@/src/components/ui/sidebar";
import { Cart } from "@/src/models/Cart";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cartResults] = await Promise.allSettled([GetAllCarts()]);

  const carts =
    cartResults.status === "fulfilled" ? (cartResults.value as Cart[]) : [];
  console.log("carts", carts);

  return (
    <div className="w-screen h-screen flex flex-row overflow-hidden">
      <Sidebar cartQuantity={carts.length} />
      <div className="flex-1">{children}</div>
    </div>
  );
}
