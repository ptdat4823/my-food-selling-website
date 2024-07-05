"use client";
import { RevenueReport } from "@/src/models/Report";
import React, { useEffect, useState } from "react";
import { LineChartConfig } from "../chart/chart-config";
import { cn, displayNumber, getMonthLabel } from "@/src/utils/func";
import { MoveRight, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import ChartUI from "../chart/chart-ui";
import LayoutCard from "../card/layout-card";

export const TotalRevenueReport = ({ report }: { report: RevenueReport }) => {
  const [chartData, setChartData] = useState<any>({});

  useEffect(() => {
    const res = LineChartConfig(
      [
        {
          label: "Total revenue",
          data: report ? report.data.map((item) => Math.floor(item.value)) : [],
        },
      ],
      {
        currency: "$",
      }
    );
    setChartData(res);
  }, [report]);

  const findValue = (report: RevenueReport, month: number, year: number) => {
    const res = report.data.find(
      (item) => item.month === month && item.year === year
    );

    if (res) return res.value;
    return 0;
  };

  const current = new Date();
  const value = report
    ? findValue(report, current.getMonth() + 1, current.getFullYear())
    : 0;
  const prevValue = report
    ? findValue(report, current.getMonth(), current.getFullYear())
    : 0;
  let formattedOffset;
  if (prevValue !== 0)
    formattedOffset = displayNumber(
      ((value - prevValue) / prevValue) * 100,
      "%"
    );
  else formattedOffset = displayNumber(value, "$");

  return (
    <LayoutCard>
      <div className="w-full flex flex-row">
        <div className="w-full flex-1">
          <div className="w-full flex flex-col gap-4">
            <span className="text-2xl">
              Total revenue in {getMonthLabel(current.getMonth() + 1)}
            </span>
            <div className="w-fit flex flex-row gap-10">
              <div className="flex-1 text-xl text-secondary-word dark:text-dark-secondary-word">
                {displayNumber(value, "$")}
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
            <ChartUI type="line" data={chartData} />
          </div>
        </div>
      </div>
    </LayoutCard>
  );
};
