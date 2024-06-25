import { GetAllOrders } from "@/src/actions/order";
import HistoryDataTable from "@/src/components/history/datatable";
import { Order } from "@/src/models/Order";

export default async function HistoryPage() {
  const [orderResults] = await Promise.all([GetAllOrders()]);
  const orders = orderResults.error ? [] : orderResults;
  return (
    <div className="h-screen flex flex-col p-8 text-primary-word overflow-y-scroll default-scrollbar">
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-4xl font-bold text-primary">History</h1>
      </div>
      <HistoryDataTable orders={orders} />
    </div>
  );
}
