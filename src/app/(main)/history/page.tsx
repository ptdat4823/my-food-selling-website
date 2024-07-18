import { GetAllOrders, GetOrderByPage } from "@/src/actions/order";
import HistoryDataTable from "@/src/components/history/datatable";
import { Page } from "@/src/models/Page";
import { cn } from "@/src/utils/func";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page: number;
    size: number;
  };
}
export default async function HistoryPage({ searchParams }: Props) {
  const page = searchParams.page;
  const size = searchParams.size;

  const [orderRes] = await Promise.all([
    page && size ? GetOrderByPage(page, size) : GetAllOrders(),
  ]);
  const orderPage: Page = orderRes.data;
  const pagination =
    page && size
      ? {
          totalPages: orderPage.totalPages,
          currentPage: page,
          pageSize: size,
        }
      : undefined;

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
      <HistoryDataTable
        orders={orderPage.data}
        error={orderRes.error}
        pagination={pagination}
      />
    </div>
  );
}
