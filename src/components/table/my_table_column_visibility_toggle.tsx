"use client";

import { Table } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Settings2 } from "lucide-react";
import { Checkbox } from "@nextui-org/react";
import { Button } from "../ui/button";
import { cn } from "@/src/utils/func";

interface DataTableViewOptionsProps<TData> {
  title: string;
  table: Table<TData>;
  columnHeaders?: object;
  cols?: number;
  rowPerCols?: number;
}

function DataTableViewOptions<TData>({
  title,
  table,
  columnHeaders,
  cols = 2,
  rowPerCols,
}: DataTableViewOptionsProps<TData>) {
  const arrColIndex = Array.from(Array(cols).keys()); // this col start from 0
  if (rowPerCols === undefined)
    rowPerCols =
      table.getAllColumns().filter((column) => column.getCanHide()).length /
      cols;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          iconBefore={<Settings2 className="h-4 w-4" />}
          className={cn(
            "gap-2 whitespace-nowrap text-secondary-word bg-gray-100 hover:bg-gray-200 ease-linear duration-100 py-2 rounded-md cursor-pointer select-none",
            "dark:bg-white/10 dark:hover:bg-white/20"
          )}
        >
          {title}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="font-sans flex flex-row justify-between space-x-2 bg-white text-secondary-word dark:bg-dark-secondary-bg dark:text-dark-secondary-word"
      >
        {arrColIndex.map((col) => {
          return (
            <div key={col} className="flex flex-col ">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column, index) => {
                  const headerContent =
                    columnHeaders !== undefined
                      ? columnHeaders[column.id as keyof typeof columnHeaders]
                      : column.id;

                  if (headerContent !== undefined) {
                    const colIndex = Math.floor(index / rowPerCols!);

                    if (colIndex === col) {
                      return (
                        <div
                          className="flex select-none flex-row items-center space-x-2 rounded-md p-2 duration-100 ease-linear hover:cursor-pointer hover:bg-[#f5f5f4] dark:hover:bg-white/10"
                          key={column.id}
                          onClick={() =>
                            column.toggleVisibility(!column.getIsVisible())
                          }
                        >
                          <Checkbox
                            key={column.id}
                            className="capitalize"
                            isSelected={column.getIsVisible()}
                            onValueChange={(value) =>
                              column.toggleVisibility(!!value)
                            }
                          />
                          <div className="cursor-pointer">{headerContent}</div>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  } else {
                    return null;
                  }
                })}
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { DataTableViewOptions };
