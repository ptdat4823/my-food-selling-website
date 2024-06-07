import OrderManagementDataTable from "@/src/components/order-management/datatable";
import { Order } from "@/src/models/Order";

export default function HistoryPage() {
  const orders = [] as Order[];

  return (
    <div className="h-screen flex flex-col p-8 text-primaryWord overflow-y-scroll">
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-4xl font-bold text-primary">Order management</h1>
      </div>
      <OrderManagementDataTable orders={orders} />
    </div>
  );
}
