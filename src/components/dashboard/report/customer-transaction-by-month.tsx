"use client";
import React, { useEffect, useState } from "react";
import LayoutCard from "../card/layout-card";
import ChartUI from "../chart/chart-ui";
import { MoveRight, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { cn } from "src/utils/func";
import { ClassValue } from "clsx";
import { CustomerByTransactionReport } from "src/models/Report";
import { displayNumber, getMonthLabel } from "src/utils/func";
import { BarChartConfig } from "../chart/chart-config";

export const CustomerTransactionReport = ({
  report,
  className,
}: {
  report: CustomerByTransactionReport;
  className?: ClassValue;
}) => {
  const [chartData, setChartData] = useState<any>({});

  const findValue = (
    report: CustomerByTransactionReport,
    month: number,
    year: number
  ) => {
    const res = report.data.find(
      (item) => item.month === month && item.year === year
    );

    if (res) return res.value;
    return 0;
  };

  useEffect(() => {
    const res = BarChartConfig([
      {
        label: "Total customer",
        data: report ? report.data.map((item) => Math.floor(item.value)) : [],
      },
    ]);
    setChartData(res);
  }, [report]);

  const current = new Date();
  const value = report
    ? findValue(report, current.getMonth() + 1, current.getFullYear())
    : 0;
  const prevValue = report
    ? findValue(report, current.getMonth(), current.getFullYear())
    : 0;
  let formattedOffset = displayNumber(
    value - prevValue,
    value - prevValue > 1 ? " customers" : " customer"
  );

  return (
    <LayoutCard className={className}>
      <div className="w-full h-full flex flex-row">
        <div className="w-full h-full flex-1">
          <div className="w-full h-full flex flex-col gap-4">
            <span className="text-2xl">
              Total number of transaction customers in{" "}
              {getMonthLabel(current.getMonth() + 1)}
            </span>
            <div className="w-fit flex flex-row gap-10">
              <div className="flex-1 text-xl text-secondary-word dark:text-dark-secondary-word">
                {displayNumber(value, value > 1 ? " customers" : " customer")}
              </div>
              <div
                className={cn(
                  "flex flex-row gap-2 items-end",
                  value > prevValue && "text-green-500",
                  value === prevValue &&
                    "text-secondary-word dark:text-dark-secondary-word",
                  value < prevValue && "text-red-500"
                )}
              >
                {value > prevValue && <TrendingUpIcon />}
                {value === prevValue && <MoveRight />}
                {value < prevValue && <TrendingDownIcon />}
                {value >= prevValue && "+"}
                {formattedOffset}
                <span className="text-secondary-word dark:text-dark-secondary-word">
                  {" "}
                  from {getMonthLabel(current.getMonth())}
                </span>
              </div>
            </div>
            <ChartUI type="bar" data={chartData} />
          </div>
        </div>
      </div>
    </LayoutCard>
  );
};
