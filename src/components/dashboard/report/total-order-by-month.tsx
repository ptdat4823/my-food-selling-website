"use client";
import { TotalOrderReport } from "@/src/models/Report";
import React, { useEffect, useState } from "react";
import { LineChartConfig } from "../chart/chart-config";
import { cn, displayNumber, getMonthLabel } from "@/src/utils/func";
import LayoutCard from "../card/layout-card";
import { MoveRight, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import ChartUI from "../chart/chart-ui";

export const OrderReport = ({ report }: { report: TotalOrderReport }) => {
  const [chartData, setChartData] = useState<any>({});

  const findValue = (report: TotalOrderReport, month: number, year: number) => {
    const res = report.data.find(
      (item) => item.month === month && item.year === year
    );

    if (res) return res.value;
    return 0;
  };

  useEffect(() => {
    const res = LineChartConfig([
      {
        label: "Total order",
        data: report ? report.data.map((item) => item.value) : [],
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
  let formattedOffset;
  if (prevValue !== 0)
    formattedOffset = displayNumber(
      Math.abs(((value - prevValue) / prevValue) * 100),
      "%"
    );
  else
    formattedOffset = displayNumber(
      value,
      value > 1 ? "orders" : "order",
      true
    );

  return (
    <LayoutCard>
      <div className="w-full flex flex-row">
        <div className="w-full flex-1">
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-row justify-between">
              <span className="text-2xl">
                Total order in {getMonthLabel(current.getMonth() + 1)}
              </span>
              <div className="flex flex-row">
                {/* Monthly report button here */}
              </div>
            </div>
            <div className="w-fit flex flex-row gap-10">
              <div className="flex-1 text-xl text-secondary-word">
                {displayNumber(value, value > 1 ? " orders" : " order")}
              </div>
              <div
                className={cn(
                  "flex flex-row gap-2 items-end",
                  value > prevValue && "text-green-500",
                  value === prevValue && "text-secondary-word",
                  value < prevValue && "text-red-500"
                )}
              >
                {value > prevValue && <TrendingUpIcon />}
                {value === prevValue && <MoveRight />}
                {value < prevValue && <TrendingDownIcon />}
                {value >= prevValue && "+"}
                {value < prevValue && "-"}
                {formattedOffset}
                <span className="text-secondary-word">
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
