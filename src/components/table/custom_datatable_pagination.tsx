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
        "flex items-center justify-between px-2",
        config.showRowSelectedCounter ? "visible" : "hidden"
      )}
    >
      {table.getColumn("select") ? (
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
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
        {table.getPageCount() > 0 ? (
          <>
            <div className="flex w-[100px] items-center justify-center text-xs font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="w-[100px] h-[100px] bg-red-300 flex items-center space-x-2 sr-only">
              <Button
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                iconAfter={<ChevronsLeft className="h-4 w-4" />}
              >
                Go to first page
              </Button>
              <Button
                className="h-8 w-8 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                iconAfter={<ChevronLeftIcon className="h-4 w-4" />}
              >
                Go to previous page
              </Button>
              <Button
                className="h-8 w-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                iconAfter={<ChevronRightIcon className="h-4 w-4" />}
              >
                Go to next page
              </Button>
              <Button
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                iconAfter={<ChevronsRight className="h-4 w-4" />}
              >
                Go to last page
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
