"use client";
import { FoodReportData } from "@/src/models/Report";
import { useEffect, useState } from "react";
import { CircleChartConfig } from "../chart/chart-config";
import LayoutCard from "../card/layout-card";
import ChartUI from "../chart/chart-ui";

export const RevenueByFoodReport = ({
  report,
}: {
  report: FoodReportData[];
}) => {
  const [chartData, setChartData] = useState<any>({});

  useEffect(() => {
    const res = CircleChartConfig(
      report && report.length > 0 ? report.map((item) => item.food.name) : [],
      [
        {
          label: "Revenue",
          data:
            report && report.length > 0
              ? report.map((item) => Math.floor(item.revenue))
              : [],
        },
      ]
    );
    setChartData(res);
  }, [report]);

  return (
    <LayoutCard className="w-full flex flex-col justify-between pb-10">
      <span className="text-2xl">Top revenue by food</span>
      <ChartUI type="doughnut" data={chartData} />
    </LayoutCard>
  );
};
