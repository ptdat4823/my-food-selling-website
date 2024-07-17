import { GetAllOrders } from "@/src/actions/order";
import { GetInfo } from "@/src/actions/user";
import OrderManagementDataTable from "@/src/components/order-management/datatable";
import { User } from "@/src/models/User";
import { notFound } from "next/navigation";

export default async function OrderManagementPage() {
  const [orderRes, userRes] = await Promise.all([GetAllOrders(), GetInfo()]);
  // if (!user || !user.isAdmin) return notFound();
  return (
    <div className="h-screen flex flex-col p-8 text-primary-word dark:text-dark-primary-word default-scrollbar dark:white-scrollbar">
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-4xl font-bold text-primary dark:text-dark-primary-word">
          Order management
        </h1>
      </div>

      <OrderManagementDataTable orders={orderRes.data} error={orderRes.error} />
    </div>
  );
}
