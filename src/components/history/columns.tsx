"use client";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "../table/my_table_column_header";
import { Order, OrderStatus } from "@/src/models/Order";
import { ColumnDef } from "@tanstack/react-table";
import { cn, displayNumber } from "@/src/utils/func";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { showSuccessToast } from "../ui/toast";
import { defaultColumn } from "../table/my_table_default_column";

export const orderColumnTitles = {
  id: "Order ID",
  total: "Total",
  paymentMethod: "Payment method",
  createdAt: "Order date",
  status: "Status",
};

export const orderDefaultVisibilityState = {
  id: true,
  total: true,
  paymentMethod: true,
  createdAt: true,
  status: true,
};

const statusColumn = (
  accessorKey: string,
  title: string,
  rowUpdating: number[]
): ColumnDef<Order> => {
  const col: ColumnDef<Order> = {
    accessorKey: accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),
    cell: ({ row }) => {
      let value: OrderStatus = row.getValue(accessorKey);
      let styleButton = "";
      //styles of each status
      if (value === OrderStatus.PENDING) styleButton = "text-yellow-400";
      if (value === OrderStatus.ACCEPTED) styleButton = "text-green-400";
      if (value === OrderStatus.CANCELLED) styleButton = "text-red-500";
      if (value === OrderStatus.DELIVERED) styleButton = "text-blue-500";

      return (
        <span
          className={cn(
            "w-[100px] gap-2 whitespace-nowrap ease-linear duration-100 py-1 rounded-md cursor-pointer font-semibold",
            styleButton
          )}
        >
          {rowUpdating.includes(row.original.id)
            ? "Updating..."
            : (value as OrderStatus)}
        </span>
      );
    },
    enableSorting: true,
  };
  return col;
};

const actionColumn = (
  onStatusChange: (id: number, status: OrderStatus) => void
): ColumnDef<Order> => {
  const col: ColumnDef<Order> = {
    id: "Action",
    cell: ({ row }) => {
      let status: OrderStatus = row.getValue("status");
      const handleStatusChange = (status: OrderStatus) => {
        const id = row.original.id;
        onStatusChange(id, status);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-transparent hover:bg-gray-200 hover:opacity-100 text-black">
              <span className="sr-only">See actions</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white text-primaryWord font-sans z-50"
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="hover:bg-gray-100 cursor-pointer ease-linear duration-100"
              onClick={() => {
                navigator.clipboard.writeText(row.original.id.toString());
                showSuccessToast("Order ID copied to clipboard");
              }}
            >
              Copy order ID
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(
                "text-red-500 hover:bg-gray-100 cursor-pointer ease-linear duration-100",
                (status as OrderStatus) === OrderStatus.PENDING ? "" : "hidden"
              )}
              onClick={() => handleStatusChange(OrderStatus.CANCELLED)}
            >
              Cancel this order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: true,
  };
  return col;
};

const totalColumn = (accessorKey: string, title: string): ColumnDef<Order> => {
  const col: ColumnDef<Order> = {
    accessorKey: accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),
    cell: ({ row }) => {
      let value: number = row.getValue(accessorKey);

      return <p className="px-2">{displayNumber(value, "$", false, 2)}</p>;
    },
    enableSorting: true,
  };
  return col;
};

export const orderTableColumns = (
  rowUpdating: number[],
  onStatusChange: (id: number, status: OrderStatus) => void
): ColumnDef<Order>[] => {
  const columns: ColumnDef<Order>[] = [];

  for (let key in orderColumnTitles) {
    let col: ColumnDef<Order>;
    if (key === "status")
      col = statusColumn(key, orderColumnTitles[key], rowUpdating);
    else if (key === "total") col = totalColumn(key, orderColumnTitles[key]);
    else col = defaultColumn<Order>(key, orderColumnTitles);
    columns.push(col);
  }

  columns.push(actionColumn(onStatusChange));
  return columns;
};
