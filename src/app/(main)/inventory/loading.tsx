import TableSkeleton from "@/src/components/skeleton/table/table-skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="h-screen flex flex-col p-8 text-primary-word dark:text-dark-primary-word overflow-x-hidden default-scrollbar dark:white-scrollbar">
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-4xl font-bold text-primary dark:text-dark-primary-word">
          Inventory
        </h1>
      </div>
      <TableSkeleton hasMoreButton={true} />
    </div>
  );
};

export default Loading;
