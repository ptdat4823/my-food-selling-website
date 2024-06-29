import React from "react";
import LayoutCard from "../card/layout-card";
import { LayoutCompareCard } from "../card/compare-card";
import { MonthlyReport } from "@/src/models/Report";
import { CircleOff } from "lucide-react";
import { cn } from "@/src/utils/func";

interface Props {
  cancelledOrderReport: MonthlyReport;
}

const CancelledOrderReport = ({ cancelledOrderReport }: Props) => {
  let valueOffset = 0;
  let value = 0;

  if (cancelledOrderReport.data.length === 1) {
    value = cancelledOrderReport.data[0].value;
    valueOffset = value;
  } else if (cancelledOrderReport.data.length > 1) {
    const length = cancelledOrderReport.data.length;
    value = cancelledOrderReport.data[length - 1].value;
    valueOffset = value - cancelledOrderReport.data[length - 2].value;
  }
  return (
    <LayoutCard>
      <LayoutCompareCard
        title="Cancelled orders"
        value={value}
        valueOffset={valueOffset}
        unit="orders"
        hasSpace={true}
        className="border-0 p-0"
        isInvertColor={true}
        icon={
          <div
            className={cn(
              "h-fit p-2 flex flex-row items-center justify-center rounded-full justify-self-end border-2 outline outline-2",
              "bg-red-300 text-white border-white outline-red-300",
              "dark:text-red-300 dark:bg-transparent dark:border-transparent"
            )}
          >
            <CircleOff size={20} />
          </div>
        }
      />
    </LayoutCard>
  );
};

export default CancelledOrderReport;
