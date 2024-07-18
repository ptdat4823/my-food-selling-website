"use client";
import { UpdateOrder } from "@/src/actions/order";
import { Order, OrderStatus } from "@/src/models/Order";
import { formatDate, handleFilterColumn } from "@/src/utils/func";
import { useEffect, useState } from "react";
import { CustomDatatable } from "../table/custom_datatable";
import { showErrorToast, showSuccessToast } from "../ui/toast";
import {
  orderColumnTitles,
  orderDefaultVisibilityState,
  orderTableColumns,
} from "./columns";
import { OrderDetailTab } from "./order-detail-tab";

interface Props {
  orders: Order[];
  pagination?: {
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
  error?: string;
}
export const OrderManagementDataTable = ({
  orders,
  error,
  pagination,
}: Props) => {
  const [filteredData, setFilteredData] = useState<Order[]>([]);
  const [rowUpdating, setRowUpdating] = useState<number[]>([]);
  const filterOptionKeys = Object.keys(orderColumnTitles)
    .filter((key) => key !== "images")
    .map((key) => key);

  useEffect(() => {
    setFilteredData(orders);
  }, [orders]);

  const onStatusChange = async (id: number, status: OrderStatus) => {
    const orderToUpdate = orders.find((order) => order.id === id);
    if (!orderToUpdate) return;
    setRowUpdating([...rowUpdating, id]);

    const res = await UpdateOrder(id, { ...orderToUpdate, status }).finally(
      () => setRowUpdating(rowUpdating.filter((rowId) => rowId !== id))
    );
    if (res.error) {
      showErrorToast(res.error);
    }
    if (res.message) {
      const newOrders = orders.map((order) =>
        order.id === id ? { ...order, status } : order
      );
      setFilteredData(newOrders);
      showSuccessToast(res.message);
    }
  };

  useEffect(() => {
    if (error) showErrorToast(error);
  }, [error]);

  const handleCustomerFilter = (filterInput: string, data: Order[]) => {
    const filteredData = data.filter((order) =>
      order.user.name.toString().includes(filterInput.toString())
    );
    return filteredData;
  };
  const handleContactFilter = (filterInput: string, data: Order[]) => {
    const filteredData = data.filter((order) =>
      order.user.phoneNumber.toString().includes(filterInput.toString())
    );
    return filteredData;
  };
  const handleEmailFilter = (filterInput: string, data: Order[]) => {
    const filteredData = data.filter((order) =>
      order.user.email.toString().includes(filterInput.toString())
    );
    return filteredData;
  };
  const handleAddressFilter = (filterInput: string, data: Order[]) => {
    const filteredData = data.filter((order) =>
      order.user.address.toString().includes(filterInput.toString())
    );
    return filteredData;
  };
  const handleCreatedDateFilter = (filterInput: string, data: Order[]) => {
    const filteredData = data.filter((order) =>
      formatDate(order.createdAt).includes(filterInput.toString())
    );
    return filteredData;
  };
  const handleFilterChange = (filterInput: string, col: string) => {
    let filteredData: Order[] = [];
    if (col === "") filteredData = getFilterAllTableData(filterInput);
    else filteredData = getDataFilter(filterInput, col);
    setFilteredData(filteredData);
  };
  const getDataFilter = (filterInput: string, col: string) => {
    //special col that cannot filter as default
    if (col === "user") return handleCustomerFilter(filterInput, orders);
    else if (col === "contact") return handleContactFilter(filterInput, orders);
    else if (col === "email") return handleEmailFilter(filterInput, orders);
    else if (col === "address") return handleAddressFilter(filterInput, orders);
    else if (col === "createdAt")
      return handleCreatedDateFilter(filterInput, orders);
    return handleFilterColumn(filterInput, col, orders);
  };
  const getFilterAllTableData = (filterInput: string) => {
    let filteredAllTableData: Set<Order> = new Set();
    Object.keys(orderColumnTitles).forEach((col) => {
      const filteredData = getDataFilter(filterInput, col);
      filteredData.forEach((order) => filteredAllTableData.add(order));
    });
    const filteredData = Array.from(filteredAllTableData);
    return filteredData;
  };

  return (
    <CustomDatatable
      data={filteredData}
      pagination={pagination}
      columns={orderTableColumns(rowUpdating, onStatusChange)}
      columnTitles={orderColumnTitles}
      infoTabs={[
        {
          render(row, setShowTabs) {
            return <OrderDetailTab row={row} setShowTabs={setShowTabs} />;
          },
          tabName: "Order details",
        },
      ]}
      config={{
        defaultVisibilityState: orderDefaultVisibilityState,
        showFilterButton: true,
        filterOptionKeys: filterOptionKeys,
        showDataTableViewOptions: true,
        showRowSelectedCounter: true,
        onFilterChange: handleFilterChange,
        rowColorDependence: {
          key: "status",
          condition: [
            { value: OrderStatus.PENDING, borderColor: "border-yellow-400" },
            { value: OrderStatus.ACCEPTED, borderColor: "border-green-400" },
            { value: OrderStatus.DELIVERED, borderColor: "border-blue-400" },
            {
              value: OrderStatus.CANCELLED,
              borderColor: "border-red-400",
            },
          ],
        },
      }}
    />
  );
};

export default OrderManagementDataTable;
