import { GetAllOrders, GetOrderByPage } from "@/src/actions/order";
import { GetInfo } from "@/src/actions/user";
import OrderManagementDataTable from "@/src/components/order-management/datatable";
import { Page } from "@/src/models/Page";
import { User } from "@/src/models/User";
import { notFound, redirect } from "next/navigation";

interface Props {
  searchParams: {
    page: number;
    size: number;
  };
}
export default async function OrderManagementPage({ searchParams }: Props) {
  const page = searchParams.page;
  const size = searchParams.size;

  const [orderRes, userRes] = await Promise.all([
    page && size ? GetOrderByPage(page, size) : GetAllOrders(),
    GetInfo(),
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

  const user = userRes.data as User;
  if (!user || !user.isAdmin) return notFound();
  return (
    <div className="h-screen flex flex-col p-8 text-primary-word dark:text-dark-primary-word default-scrollbar dark:white-scrollbar">
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-4xl font-bold text-primary dark:text-dark-primary-word">
          Order management
        </h1>
      </div>

      <OrderManagementDataTable
        orders={orderPage.data}
        error={orderRes.error}
        pagination={pagination}
      />
    </div>
  );
}
