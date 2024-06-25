"use client";
import { getAllMonthLabels } from "src/utils/func";
import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { ClassValue } from "clsx";

const ChartUI = ({ type, data }: { type: any; data: any }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current && data) {
      const chart = new Chart(chartRef.current, {
        type: type,
        data: data,
        options: {
          maintainAspectRatio: true,
          responsive: true,
          parsing: {
            xAxisKey: "month",
            yAxisKey: "value",
          },
          ...data.options,
        },
      });
      return () => {
        chart.destroy();
      };
    }
  }, [data]);

  return <canvas id="chart" ref={chartRef} className="w-full"></canvas>;
};
Chart.register(...registerables);
export default ChartUI;
