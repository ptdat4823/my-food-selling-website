import { GetAllOrders } from "@/src/actions/order";
import OrderManagementDataTable from "@/src/components/order-management/datatable";

export default async function OrderManagementPage() {
  const [orderResults] = await Promise.all([GetAllOrders()]);
  const orders = orderResults.error ? [] : orderResults;

  return (
    <div className="h-screen flex flex-col p-8 text-primary-word overflow-y-scroll default-scrollbar">
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-4xl font-bold text-primary">Order management</h1>
      </div>
      <OrderManagementDataTable orders={orders} />
    </div>
  );
}
