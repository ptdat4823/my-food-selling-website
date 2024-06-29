"use client";
import AverageEachOrderReport from "@/src/components/dashboard/report/average-each-order";
import CancellationRateReport from "@/src/components/dashboard/report/cancellation-rate";
import CancelledOrderReport from "@/src/components/dashboard/report/cancelled-order";
import CompletedOrderReport from "@/src/components/dashboard/report/completed-orders";
import { CustomerTransactionReport } from "@/src/components/dashboard/report/customer-transaction-by-month";
import { RevenueByFoodReport } from "@/src/components/dashboard/report/revenue-by-food";
import { TotalRevenueReport } from "@/src/components/dashboard/report/revenue-by-month";
import { OrderReport } from "@/src/components/dashboard/report/total-order-by-month";
import { TrendingFoodReport } from "@/src/components/dashboard/report/trending-food";
import FadeInSection from "@/src/components/ui/fade-in-section";
import { FoodReport, MonthlyReport } from "@/src/models/Report";

import { cn } from "@/src/utils/func";

interface Props {
  completedOrderReport: MonthlyReport;
  averageRevenueReport: MonthlyReport;
  cancelledOrderReport: MonthlyReport;
  cancellationRateReport: MonthlyReport;
  orderReport: MonthlyReport;
  revenueReport: MonthlyReport;
  topFoodByRevenueReport: FoodReport;
  topFoodByOrderReport: FoodReport;
  customerTransactionReport: MonthlyReport;
}
const MainDashboard = ({
  completedOrderReport,
  averageRevenueReport,
  cancelledOrderReport,
  cancellationRateReport,
  orderReport,
  revenueReport,
  topFoodByRevenueReport,
  topFoodByOrderReport,
  customerTransactionReport,
}: Props) => {
  return (
    <div className={cn("flex flex-col gap-12")}>
      <div className="w-full grid grid-cols-4 gap-4">
        <div className="grid 2xl:grid-rows-4 max-2xl:grid-cols-4 max-xl:grid-cols-2 max-md:grid-cols-1 max-2xl:col-span-4 gap-4">
          <FadeInSection>
            <CompletedOrderReport completedOrderReport={completedOrderReport} />
          </FadeInSection>
          <FadeInSection>
            <AverageEachOrderReport
              averageRevenueEachOrderReport={averageRevenueReport}
            />
          </FadeInSection>
          <FadeInSection>
            <CancelledOrderReport cancelledOrderReport={cancelledOrderReport} />
          </FadeInSection>
          <FadeInSection>
            <CancellationRateReport
              cancellationRateReport={cancellationRateReport}
            />
          </FadeInSection>
        </div>
        <FadeInSection className="2xl:col-span-3 max-2xl:col-span-4 shrink-0">
          <OrderReport report={orderReport} />
        </FadeInSection>
      </div>

      <div className="grid grid-cols-6 xl:grid-rows-2 max-xl:grid-rows-3 max-md:grid-rows-4 gap-4">
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
      </div>
    </div>
  );
};

export default MainDashboard;
