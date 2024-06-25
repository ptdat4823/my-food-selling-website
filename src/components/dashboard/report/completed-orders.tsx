import { MonthlyReport } from "@/src/models/Report";
import { CircleCheckBig } from "lucide-react";
import { LayoutCompareCard } from "../card/compare-card";
import LayoutCard from "../card/layout-card";

interface Props {
  completedOrderReport: MonthlyReport;
}
const CompletedOrderReport = ({ completedOrderReport }: Props) => {
  let valueOffset = 0;
  let value = 0;

  if (completedOrderReport.data.length === 1) {
    value = completedOrderReport.data[0].value;
    valueOffset = value;
  } else if (completedOrderReport.data.length > 1) {
    const length = completedOrderReport.data.length;
    value = completedOrderReport.data[length - 1].value;
    valueOffset = value - completedOrderReport.data[length - 2].value;
  }

  return (
    <LayoutCard>
      <LayoutCompareCard
        title="Completed orders"
        valueOffset={valueOffset}
        value={value}
        unit="orders"
        hasSpace={true}
        className="border-0 p-0 "
        icon={
          <div className="flex flex-row items-center justify-center w-10 h-10 bg-green-300 rounded-full justify-self-end text-white border-2 border-white outline outline-2 outline-green-300">
            <CircleCheckBig size={20} />
          </div>
        }
      />
    </LayoutCard>
  );
};

export default CompletedOrderReport;
