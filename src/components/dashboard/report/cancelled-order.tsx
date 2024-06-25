import React from "react";
import LayoutCard from "../card/layout-card";
import { LayoutCompareCard } from "../card/compare-card";
import { MonthlyReport } from "@/src/models/Report";
import { CircleOff } from "lucide-react";

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
          <div className="flex flex-row items-center justify-center w-10 h-10 bg-red-300 rounded-full justify-self-end text-white border-2 border-white outline outline-2 outline-red-300">
            <CircleOff size={20} />
          </div>
        }
      />
    </LayoutCard>
  );
};

export default CancelledOrderReport;
