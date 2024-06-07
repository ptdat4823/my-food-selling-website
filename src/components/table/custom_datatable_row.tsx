import { Row, flexRender } from "@tanstack/react-table";
import React, { RefObject } from "react";

import { ClassValue } from "clsx";
import { cn } from "@/src/utils/func";
import { TableCell, TableRow } from "./table";
import { Button } from "../ui/buttons";

export interface TabProps<TData> {
  render: (
    row: Row<TData>,
    setShowTabs: (value: boolean) => any
  ) => React.JSX.Element;
  tabName: string;
}

export interface CustomeDatatableRowProps<TData, TValue> {
  row: Row<TData>;
  rowBorderColor?: ClassValue;
  containerRef: RefObject<HTMLDivElement>;
  tabs?: TabProps<TData>[];
}

export default function CustomDatatableRow<TData, TValue>({
  row,
  rowBorderColor,
  containerRef,
  tabs,
}: CustomeDatatableRowProps<TData, TValue>) {
  const [showInfoRow, setShowInfoRow] = React.useState(false);
  const [showTabIndex, setShowTabIndex] = React.useState(0);
  const ref = React.useRef<HTMLTableRowElement>(null);

  const borderWidth =
    containerRef && containerRef.current
      ? Math.floor(containerRef.current?.getBoundingClientRect().width) -
        1 +
        "px"
      : "100%";

  const handleRowClick = (e: any) => {
    if (ref.current && ref.current.contains(e.target)) {
      setShowInfoRow((prev) => !prev);
    }
  };

  return (
    <React.Fragment>
      <TableRow
        ref={ref}
        data-state={row.getIsSelected() && "selected"}
        className={cn(
          "relative hover:cursor-pointer",
          showInfoRow ? "!border-b-0" : ""
        )}
        onClick={(e) => {
          handleRowClick(e);
        }}
      >
        {row.getVisibleCells().map((cell: any) => (
          <TableCell
            key={cell.id}
            className={cn(
              "whitespace-nowrap",
              showInfoRow && tabs ? "font-semibold" : ""
            )}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
        <td
          className={cn(
            "absolute bottom-0 left-0 right-0 top-0 pointer-events-none",
            rowBorderColor ? rowBorderColor : "border-primary",
            showInfoRow && tabs ? "border-t-2" : "hidden"
          )}
        ></td>
      </TableRow>
      {tabs && showInfoRow ? (
        <>
          <tr className="hidden" />
          {/* maintain odd - even row */}
          <tr>
            <td colSpan={row.getVisibleCells().length} className="p-0">
              <div
                style={{
                  width: borderWidth,
                }}
              >
                <div className="flex w-fit flex-row gap-2 px-2">
                  {tabs.map((tab, tabIdx) => (
                    <div
                      key={tabIdx}
                      className={cn(
                        "flex h-full flex-row items-center justify-center rounded-t-sm p-2 px-4 duration-200 ease-linear hover:cursor-pointer",
                        showTabIndex === tabIdx
                          ? "bg-white font-semibold text-black"
                          : ""
                      )}
                      onClick={(e) => setShowTabIndex(tabIdx)}
                    >
                      <Button className="flex-1 text-sm rounded-xl py-1 bg-gray-100 hover:bg-gray-100 text-secondaryWord hover:text-primaryWord">
                        {tab.tabName}
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-4 p-2 pt-0">
                  {tabs.length > showTabIndex
                    ? tabs[showTabIndex].render(row, setShowInfoRow)
                    : null}
                </div>
              </div>
            </td>
          </tr>
        </>
      ) : null}
    </React.Fragment>
  );
}
