import { MonthlyReport } from "@/src/models/Report";
import { CircleCheckBig } from "lucide-react";
import { LayoutCompareCard } from "../card/compare-card";
import LayoutCard from "../card/layout-card";
import { cn } from "@/src/utils/func";

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
          <div
            className={cn(
              "h-fit p-2 flex flex-row items-center justify-center rounded-full justify-self-end border-2 outline outline-2",
              "bg-green-300 text-white border-white outline-green-300",
              "dark:text-green-300 dark:bg-transparent dark:border-transparent"
            )}
          >
            <CircleCheckBig size={20} />
          </div>
        }
      />
    </LayoutCard>
  );
};

export default CompletedOrderReport;
