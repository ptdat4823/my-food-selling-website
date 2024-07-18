import {
  ColumnDef,
  ColumnFiltersState,
  Table as ReactTable,
  RowSelectionState,
  SortingState,
  TableMeta,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FileDown, FileUp, Filter } from "lucide-react";
import { Key, useEffect, useMemo, useRef, useState } from "react";

import CustomDataTableContent from "./custom_datatable_content";
import { TabProps } from "./custom_datatable_row";
import { cn } from "@/src/utils/func";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { DataTableViewOptions } from "./my_table_column_visibility_toggle";
import { useSearchParams } from "next/navigation";

export type DatatableConfig<TData> = {
  showDefaultSearchInput?: boolean;
  showFilterButton?: boolean;
  alternativeSearchInput?: JSX.Element;
  showDataTableViewOptions?: boolean;
  showRowSelectedCounter?: boolean;
  onDeleteRowsBtnClick?: (dataToDelete: TData[]) => Promise<any>; // if null, remove button
  onExportExcelBtnClick?: (table: ReactTable<TData>) => void; // if null, remove button
  onImportExcelBtnClick?: (table: ReactTable<TData>) => void; // if null, remove button
  filterOptionKeys?: string[];
  onFilterChange?: (filterInput: string, col: string) => void;
  defaultVisibilityState?: {
    [key: string]: boolean;
  };
  className?: string;
  rowColorDependence?: {
    key: string;
    condition: { value: string; borderColor: string }[];
  };
};

const defaultConfig: DatatableConfig<any> = {
  showDefaultSearchInput: true,
  showFilterButton: true,
  alternativeSearchInput: undefined,
  showDataTableViewOptions: true,
  showRowSelectedCounter: true,
  defaultVisibilityState: {},
  onDeleteRowsBtnClick: undefined,
  onExportExcelBtnClick: undefined,
  onImportExcelBtnClick: undefined,
  filterOptionKeys: [],
  className: "",
  rowColorDependence: undefined,
};

export type CustomDatatableProps<TData> = {
  data: TData[];
  pagination?: {
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
  columns: ColumnDef<TData>[];
  columnTitles: {
    [key: string]: string;
  };
  infoTabs?: TabProps<TData>[];
  buttons?: JSX.Element[];
  config?: DatatableConfig<TData>;
  meta?: TableMeta<TData>;
};

export function CustomDatatable<TData>({
  data,
  pagination,
  columns,
  columnTitles,
  infoTabs,
  buttons,
  config,
  meta,
}: CustomDatatableProps<TData>) {
  config = { ...defaultConfig, ...config };

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    config?.defaultVisibilityState ?? {}
  );
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [colFilterInput, setColFilterInput] = useState("");
  const [filterKeys, setFilterKeys] = useState(config.filterOptionKeys ?? []);
  const [selectedFilterKey, setSelectedFilterKey] = useState("");
  const paginationOption = pagination
    ? {
        pageIndex: pagination.currentPage - 1,
        pageSize: pagination.pageSize,
      }
    : undefined;

  const table = useReactTable<TData>({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: pagination ? undefined : getPaginationRowModel(),
    manualPagination: pagination ? true : undefined,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    pageCount: pagination ? pagination.totalPages : undefined,
    state: {
      ...(paginationOption ? { pagination: paginationOption } : {}),
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: meta,
  });

  const [isDeletingCodes, setIsDeletingCodes] = useState(false);

  const handleFilterChange = (filterInput: string, col: string) => {
    setSelectedFilterKey(col);
    if (config && config.onFilterChange)
      config.onFilterChange(filterInput, col);
  };

  return (
    <div ref={tableContainerRef} className="w-full space-y-2">
      <div
        className={cn(
          "flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-0",
          config.className
        )}
      >
        <div className="flex flex-row items-center justify-stretch gap-2">
          {!config.showDefaultSearchInput ||
          config.alternativeSearchInput ? null : (
            <Input
              placeholder="Search anything..."
              value={colFilterInput}
              onChange={(event) => {
                setColFilterInput(event.target.value);
                handleFilterChange(event.target.value, selectedFilterKey);
              }}
              className="max-w-sm shrink-0 md:w-[300px] max-md:w-auto py-2"
            />
          )}
          {!config.showFilterButton ? null : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  iconBefore={<Filter className="h-4 w-4" />}
                  className={cn(
                    "gap-2 whitespace-nowrap text-secondary-word bg-gray-100 hover:bg-gray-200 ease-linear duration-100 py-2 rounded-md cursor-pointer outline-none select-none",
                    "dark:bg-white/10 dark:hover:bg-white/20"
                  )}
                >
                  {columnTitles[selectedFilterKey] || "Filter"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="font-sans bg-white text-secondary-word dark:bg-dark-secondary-bg dark:text-dark-primary-word z-50">
                <DropdownMenuCheckboxItem
                  key="all"
                  checked={selectedFilterKey === ""}
                  onClick={(checked) => {
                    handleFilterChange(colFilterInput, "");
                  }}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 ease-linear duration-100"
                >
                  All columns
                </DropdownMenuCheckboxItem>
                {filterKeys.map((key) => (
                  <DropdownMenuCheckboxItem
                    key={key}
                    checked={selectedFilterKey === key}
                    onClick={(checked) => {
                      handleFilterChange(colFilterInput, key);
                    }}
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 ease-linear duration-100"
                  >
                    {columnTitles[key]}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {config.alternativeSearchInput}
        <div className="flex flex-row items-center gap-2">
          {config.onDeleteRowsBtnClick !== undefined &&
          table.getSelectedRowModel().rows.length > 0 ? (
            <Button
              className="bg-red-500 hover:bg-red-600 dark:hover:bg-red-600 text-white"
              disabled={isDeletingCodes}
              onClick={() => {
                setIsDeletingCodes(true);
                config!.onDeleteRowsBtnClick!(
                  table.getSelectedRowModel().rows.map((row) => row.original)
                )
                  .then(() => table.toggleAllRowsSelected(false))
                  .finally(() => setIsDeletingCodes(false));
              }}
            >
              Delete
            </Button>
          ) : null}
          {buttons}
          {config.onImportExcelBtnClick !== undefined ? (
            <Button
              className="gap-2 bg-green-500 text-white"
              onClick={() => {
                config!.onImportExcelBtnClick!(table);
              }}
            >
              <FileUp className="h-4 w-4" />
              <span className="max-xl:hidden max-md:visible">Import</span>
            </Button>
          ) : null}
          {config.onExportExcelBtnClick !== undefined ? (
            <Button
              className="gap-2 bg-green-500 text-white"
              onClick={() => {
                config!.onExportExcelBtnClick!(table);
              }}
            >
              <FileDown size={16} />
              <span className="max-xl:hidden max-md:visible">Export</span>
            </Button>
          ) : null}

          {config.showDataTableViewOptions ? (
            <DataTableViewOptions
              title="Columns"
              table={table}
              columnHeaders={columnTitles}
            />
          ) : null}
        </div>
      </div>

      <CustomDataTableContent
        columns={columns}
        table={table}
        tableContainerRef={tableContainerRef}
        infoTabs={infoTabs}
        showRowSelectedCounter={!!config.showRowSelectedCounter}
        rowColorDependence={config.rowColorDependence}
      />
    </div>
  );
}

export const DefaultInformationCellDataTable = ({
  title,
  value,
}: {
  title: string;
  value: string | number | boolean;
}) => {
  return (
    <div className="mb-2 flex flex-row border-b font-medium">
      <p className="w-[120px] font-normal">{title}</p>
      <p>{value}</p>
    </div>
  );
};
