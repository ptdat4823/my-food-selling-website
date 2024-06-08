"use client";
import React, { useEffect, useState } from "react";
import { CustomDatatable } from "../table/custom_datatable";
import {
  orderColumnTitles,
  orderDefaultVisibilityState,
  orderTableColumns,
} from "./columns";
import { Order, OrderStatus } from "@/src/models/Order";
import { formatDate, handleFilterColumn } from "@/src/utils/func";
import { FoodDetailTab } from "./food-detail-tab";

interface Props {
  orders: Order[];
}
const HistoryDataTable = ({ orders }: Props) => {
  const [filteredData, setFilteredData] = useState<Order[]>([]);
  const filterOptionKeys = Object.keys(orderColumnTitles)
    .filter((key) => key !== "images")
    .map((key) => key);
  const [rowUpdating, setRowUpdating] = useState<number[]>([]);
  const handleConfirmBeforeStatusChange = (id: number, status: OrderStatus) => {
    // setDataStatusChange({ id, status });
    // setOpen(true);
  };

  useEffect(() => {
    setFilteredData(orders);
  }, [orders]);
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
    console.log(filterInput, col);
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
      data={orders}
      columns={orderTableColumns(rowUpdating, handleConfirmBeforeStatusChange)}
      columnTitles={orderColumnTitles}
      infoTabs={[
        {
          render(row, setShowTabs) {
            return (
              <FoodDetailTab
                row={row}
                //   setOrderToRate={handleRateOrder}
                setShowTabs={setShowTabs}
              />
            );
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

export default HistoryDataTable;
