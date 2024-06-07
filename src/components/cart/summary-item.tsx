import { cn, displayNumber } from "@/src/utils/func";
import { X } from "lucide-react";

export const SummaryItem = ({
  title,
  quantity,
  total,
}: {
  title: string;
  quantity?: number;
  total: number;
}) => {
  return (
    <div className="flex flex-row items-center justify-between text-nowrap">
      <div className="w-2/3 flex flex-row items-center gap-2">
        {title}
        <span className={cn("text-nowrap", quantity ? "" : "hidden")}>
          <X size={16} className="inline-block" />
          {quantity ? quantity : 0}
        </span>
      </div>
      <span>{displayNumber(total, "$")}</span>
    </div>
  );
};
