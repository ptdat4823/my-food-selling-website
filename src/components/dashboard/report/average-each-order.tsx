import React from "react";
import LayoutCard from "../card/layout-card";
import { LayoutCompareCard } from "../card/compare-card";
import { CircleDollarSign } from "lucide-react";
import { MonthlyReport } from "@/src/models/Report";
import { cn } from "@/src/utils/func";

interface Props {
  averageRevenueEachOrderReport: MonthlyReport;
}
const AverageEachOrderReport = ({ averageRevenueEachOrderReport }: Props) => {
  let valueOffset = 0;
  let value = 0;

  if (averageRevenueEachOrderReport.data.length === 1) {
    value = averageRevenueEachOrderReport.data[0].value;
    valueOffset = value;
  } else if (averageRevenueEachOrderReport.data.length > 1) {
    const length = averageRevenueEachOrderReport.data.length;
    value = averageRevenueEachOrderReport.data[length - 1].value;
    valueOffset = value - averageRevenueEachOrderReport.data[length - 2].value;
  }
  return (
    <LayoutCard>
      <LayoutCompareCard
        title="Revenue per order"
        value={value}
        valueOffset={valueOffset}
        unit="$"
        className="border-0 p-0"
        icon={
          <div
            className={cn(
              "h-fit p-2 flex flex-row items-center justify-center rounded-full justify-self-end border-2 outline outline-2",
              "bg-yellow-300 text-white border-white outline-yellow-300",
              "dark:text-yellow-300 dark:bg-transparent dark:border-transparent"
            )}
          >
            <CircleDollarSign size={20} />
          </div>
        }
      />
    </LayoutCard>
  );
};

export default AverageEachOrderReport;
