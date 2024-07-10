import TableSkeleton from "@/src/components/skeleton/table/table-skeleton";
import { cn } from "@/src/utils/func";
import React from "react";

const Loading = () => {
  return (
    <div
      className={cn(
        "h-screen flex flex-col p-8 text-primary-word dark:text-dark-primary-word overflow-y-scroll default-scrollbar dark:white-scrollbar",
        "dark:text-dark-primary-word"
      )}
    >
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-4xl font-bold text-primary dark:text-dark-primary-word">
          History
        </h1>
      </div>
      <TableSkeleton />
    </div>
  );
};

export default Loading;
