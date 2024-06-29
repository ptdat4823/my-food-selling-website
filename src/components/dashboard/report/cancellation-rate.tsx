import React from "react";
import LayoutCard from "../card/layout-card";
import { LayoutCompareCard } from "../card/compare-card";
import { MonthlyReport } from "@/src/models/Report";
import { Percent } from "lucide-react";
import { cn } from "@/src/utils/func";

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
          <div
            className={cn(
              "h-fit p-2 flex flex-row items-center justify-center rounded-full justify-self-end border-2 outline outline-2",
              "bg-orange-300 text-white border-white outline-orange-300",
              "dark:text-orange-300 dark:bg-transparent dark:border-transparent"
            )}
          >
            <Percent size={20} />
          </div>
        }
      />
    </LayoutCard>
  );
};

export default CancellationRateReport;
