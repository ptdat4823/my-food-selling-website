import { Table } from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/src/utils/func";

import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  config: DataTablePaginationConfig;
}

interface DataTablePaginationConfig {
  showRowSelectedCounter: boolean;
}

export function CustomDataTablePagination<TData>({
  table,
  config,
}: DataTablePaginationProps<TData>) {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-between text-sm",
        config.showRowSelectedCounter ? "visible" : "hidden"
      )}
    >
      <div
        className={cn(
          "flex text-sm text-muted-foreground",
          !table.getColumn("select") && "opacity-0 select-none"
        )}
      >
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>

      {table.getPageCount() > 0 ? (
        <div className="flex flex-row gap-2">
          <Button
            className="hidden h-8 w-8 p-0 lg:flex whitespace-nowrap bg-white text-secondary-word hover:bg-gray-200 border disabled:hover:bg-white"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            iconAfter={<ChevronsLeft className="h-4 w-4" />}
          ></Button>
          <Button
            className="h-8 w-8 p-0 whitespace-nowrap bg-white text-secondary-word hover:bg-gray-200 border disabled:hover:bg-white"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            iconAfter={<ChevronLeftIcon className="h-4 w-4" />}
          ></Button>
          <div className="flex w-[100px] items-center justify-center font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <Button
            className="h-8 w-8 p-0 whitespace-nowrap bg-white text-secondary-word hover:bg-gray-200 border disabled:hover:bg-white"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            iconAfter={<ChevronRightIcon className="h-4 w-4" />}
          ></Button>
          <Button
            className="hidden h-8 w-8 p-0 lg:flex whitespace-nowrap bg-white text-secondary-word hover:bg-gray-200 border disabled:hover:bg-white"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            iconAfter={<ChevronsRight className="h-4 w-4" />}
          ></Button>
        </div>
      ) : null}
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent
              side="top"
              className="font-sans bg-white text-primary-word"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
