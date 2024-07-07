import React from "react";
import Skeleton from "../custom/skeleton";

interface Props {
  hasMoreButton?: boolean;
}
const TableSkeleton = ({ hasMoreButton = false }: Props) => {
  return (
    <div className="space-y-2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <Skeleton className="w-64 h-10" />
          <Skeleton className="w-24 h-10" />
        </div>
        <div className="flex flex-row gap-2">
          {hasMoreButton && <Skeleton className="w-28 h-10" />}
          <Skeleton className="w-24 h-10" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="w-full h-[65vh]" />
        <div className="flex flex-row justify-between">
          <Skeleton className="w-48 h-6 opacity-0" />
          <Skeleton className="w-64 h-8" />
          <Skeleton className="w-48 h-8" />
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
