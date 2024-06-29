"use client";
import { Chart, registerables } from "chart.js";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

const ChartUI = ({ type, data }: { type: any; data: any }) => {
  const { theme } = useTheme();
  const chartRef = useRef<HTMLCanvasElement>(null);

  const optionForWhiteGrid = {
    scales: {
      x: {
        grid: {
          borderColor: "rgba(255, 255, 255, 0.2)",
          color: "rgba(255, 255, 255, 0.2)",
        },
        ticks: {
          color: "white",
        },
      },
      y: {
        grid: {
          borderColor: "rgba(255, 255, 255, 0.2)",
          color: "rgba(255, 255, 255, 0.2)",
        },
        ticks: {
          color: "white",
        },
      },
    },
  };
  const optionForWhiteLegend = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "white",
        },
      },
    },
  };

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
          ...(theme === "dark" && type !== "doughnut" && optionForWhiteGrid),
          ...(theme === "dark" && optionForWhiteLegend),
        },
      });
      return () => {
        chart.destroy();
      };
    }
  }, [data, theme]);

  return <canvas id="chart" ref={chartRef} className="w-full"></canvas>;
};

Chart.register(...registerables);
export default ChartUI;
