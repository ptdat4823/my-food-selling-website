import { GetAllOrders } from "@/src/actions/order";
import { GetInfo } from "@/src/actions/user";
import OrderManagementDataTable from "@/src/components/order-management/datatable";
import { Order } from "@/src/models/Order";
import { User } from "@/src/models/User";
import { notFound } from "next/navigation";

export default async function OrderManagementPage() {
  const [orderResults, userResults] = await Promise.allSettled([
    GetAllOrders(),
    GetInfo(),
  ]);
  const orders =
    orderResults.status === "fulfilled" ? (orderResults.value as Order[]) : [];
  const user =
    userResults.status === "fulfilled" ? (userResults.value as User) : null;
  console.log("user", user);
  if (!user || !user.isAdmin) return notFound();
  return (
    <div className="h-screen flex flex-col p-8 text-primary-word overflow-y-scroll default-scrollbar">
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-4xl font-bold text-primary">Order management</h1>
      </div>
      <OrderManagementDataTable orders={orders} />
    </div>
  );
}
