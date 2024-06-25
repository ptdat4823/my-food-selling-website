import React from "react";
import LayoutCard from "../card/layout-card";
import { LayoutCompareCard } from "../card/compare-card";
import { CircleDollarSign } from "lucide-react";
import { MonthlyReport } from "@/src/models/Report";

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
        title="Average sale each order"
        value={value}
        valueOffset={valueOffset}
        unit="$"
        className="border-0 p-0"
        icon={
          <div className="flex flex-row items-center justify-center w-10 h-10 bg-yellow-300 rounded-full justify-self-end text-white border-2 border-white outline outline-2 outline-yellow-300">
            <CircleDollarSign size={20} />
          </div>
        }
      />
    </LayoutCard>
  );
};

export default AverageEachOrderReport;
