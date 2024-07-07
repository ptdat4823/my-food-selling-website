import { cn } from "@/src/utils/func";
import React from "react";
import Skeleton from "../custom/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className={cn("flex flex-col gap-12")}>
      <div className="w-full grid grid-cols-4 gap-4">
        <div className="grid 2xl:grid-rows-4 max-2xl:grid-cols-4 max-xl:grid-cols-2 max-md:grid-cols-1 max-2xl:col-span-4 gap-4">
          <Skeleton className="w-full h-32" />
          <Skeleton className="w-full h-32" />
          <Skeleton className="w-full h-32" />
          <Skeleton className="w-full h-32" />
        </div>
        <div className="2xl:col-span-3 max-2xl:col-span-4 shrink-0">
          <Skeleton className="w-full h-full" />
        </div>
      </div>

      {/* <div className="grid grid-cols-6 xl:grid-rows-2 max-xl:grid-rows-3 max-md:grid-rows-4 gap-4">
          <FadeInSection className="xl:col-span-4 max-xl:col-span-6 row-start-1 row-span-1 mb-8">
            <TotalRevenueReport report={revenueReport} />
          </FadeInSection>
          <FadeInSection className="xl:col-span-2 xl:row-start-1 xl:row-span-1 max-xl:row-start-2 max-xl:col-span-3 max-md:col-span-6 mb-8">
            <RevenueByFoodReport
              report={
                topFoodByRevenueReport && topFoodByRevenueReport.data.length > 0
                  ? topFoodByRevenueReport.data[
                      topFoodByRevenueReport.data.length - 1
                    ].data
                  : []
              }
            />
          </FadeInSection>
          <FadeInSection className="xl:col-span-2 max-xl:col-span-3 row-start-2 row-span-1 max-md:row-start-3 max-md:col-span-6">
            <TrendingFoodReport
              data={
                topFoodByOrderReport && topFoodByOrderReport.data.length > 0
                  ? topFoodByOrderReport.data[
                      topFoodByOrderReport.data.length - 1
                    ].data
                  : []
              }
            />
          </FadeInSection>
  
          <FadeInSection className="xl:col-span-4 max-xl:col-span-6 xl:row-start-2 max-xl:row-start-3 max-md:row-start-4 row-span-1">
            <CustomerTransactionReport report={customerTransactionReport} />
          </FadeInSection>
        </div> */}
    </div>
  );
};

export default DashboardSkeleton;
