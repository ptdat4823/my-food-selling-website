import React from "react";
import Skeleton from "../custom/skeleton";

const FoodListSkeleton = () => {
  return (
    <div className="w-full flex gap-[calc((100%-99%)/3)]">
      <Skeleton className="h-72 xl:flex-[0_0_33%] max-xl:flex-[0_0_50%] max-md:flex-[0_0_100%] min-w-0" />
      <Skeleton className="h-72 xl:flex-[0_0_33%] max-xl:flex-[0_0_50%] max-md:flex-[0_0_100%] min-w-0" />
      <Skeleton className="h-72 xl:flex-[0_0_33%] max-xl:flex-[0_0_50%] max-md:flex-[0_0_100%] min-w-0" />
    </div>
  );
};

export default FoodListSkeleton;
