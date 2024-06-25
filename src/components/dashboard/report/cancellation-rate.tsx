import React from "react";
import LayoutCard from "../card/layout-card";
import { LayoutCompareCard } from "../card/compare-card";
import { MonthlyReport } from "@/src/models/Report";
import { Percent } from "lucide-react";

interface Props {
  cancellationRateReport: MonthlyReport;
}

const CancellationRateReport = ({ cancellationRateReport }: Props) => {
  let valueOffset = 0;
  let value = 0;

  if (cancellationRateReport.data.length === 1) {
    value = cancellationRateReport.data[0].value;
    valueOffset = value;
  } else if (cancellationRateReport.data.length > 1) {
    const length = cancellationRateReport.data.length;
    value = cancellationRateReport.data[length - 1].value;
    valueOffset = value - cancellationRateReport.data[length - 2].value;
  }
  return (
    <LayoutCard>
      <LayoutCompareCard
        title="Cancellation rate"
        value={value}
        valueOffset={valueOffset}
        unit="%"
        className="border-0 p-0"
        isInvertColor={true}
        icon={
          <div className="flex flex-row items-center justify-center w-10 h-10 bg-orange-300 rounded-full justify-self-end text-white border-2 border-white outline outline-2 outline-orange-300">
            <Percent size={20} />
          </div>
        }
      />
    </LayoutCard>
  );
};

export default CancellationRateReport;
