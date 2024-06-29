import { GetAllOrders } from "@/src/actions/order";
import HistoryDataTable from "@/src/components/history/datatable";
import { Order } from "@/src/models/Order";
import { cn } from "@/src/utils/func";

export default async function HistoryPage() {
  const [orderResults] = await Promise.all([GetAllOrders()]);
  const orders = orderResults.error ? [] : orderResults;
  return (
    <div
      className={cn(
        "h-screen flex flex-col p-8 text-primary-word dark:text-dark-primary-word overflow-y-scroll default-scrollbar dark:white-scrollbar",
        "dark:text-dark-primary-word"
      )}
    >
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-4xl font-bold text-primary dark:text-dark-primary-word">
          History
        </h1>
      </div>
      <HistoryDataTable orders={orders} />
    </div>
  );
}
