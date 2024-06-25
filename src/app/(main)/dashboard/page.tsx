import {
  GetAverageRevenueByMonth,
  GetCancellationRateByMonth,
  GetCancelledOrderByMonth,
  GetCompletedOrderByMonth,
  GetCustomerTransactionByMonth,
  GetOrderByMonth,
  GetRevenueByMonth,
  GetTopFoodByOrder,
  GetTopFoodByRevenue,
} from "@/src/actions/dashboard";
import MainDashboard from "@/src/components/dashboard/main/main-dashboard";
import { ToFoodReport, ToMonthlyReport } from "@/src/convertor/reportConvertor";
import { FoodReport, MonthlyReport } from "@/src/models/Report";

export default async function DashboardPage() {
  const [
    orderReportRes,
    completedOrderReportRes,
    averageRevenueReportRes,
    cancelledOrderReportRes,
    cancellationRateReportRes,
    revenueReportRes,
    customerTransactionReportRes,
    topFoodByRevenueReportRes,
    topFoodByOrderReportRes,
  ] = await Promise.allSettled([
    GetOrderByMonth("6-month"),
    GetCompletedOrderByMonth("6-month"),
    GetAverageRevenueByMonth("6-month"),
    GetCancelledOrderByMonth("6-month"),
    GetCancellationRateByMonth("6-month"),
    GetRevenueByMonth("6-month"),
    GetCustomerTransactionByMonth("6-month"),
    GetTopFoodByRevenue("6-month"),
    GetTopFoodByOrder("6-month"),
  ]);

  const defaultMonthlyReport: MonthlyReport = {
    data: [],
  };

  const defaultFoodReport: FoodReport = {
    data: [],
  };

  const orderReport =
    orderReportRes.status === "fulfilled"
      ? ToMonthlyReport(orderReportRes.value)
      : defaultMonthlyReport;
  const completedOrderReport =
    completedOrderReportRes.status === "fulfilled"
      ? ToMonthlyReport(completedOrderReportRes.value)
      : defaultMonthlyReport;
  const averageRevenueReport =
    averageRevenueReportRes.status === "fulfilled"
      ? ToMonthlyReport(averageRevenueReportRes.value)
      : defaultMonthlyReport;
  const cancelledOrderReport =
    cancelledOrderReportRes.status === "fulfilled"
      ? ToMonthlyReport(cancelledOrderReportRes.value)
      : defaultMonthlyReport;
  const cancellationRateReport =
    cancellationRateReportRes.status === "fulfilled"
      ? ToMonthlyReport(cancellationRateReportRes.value)
      : defaultMonthlyReport;
  const revenueReport =
    revenueReportRes.status === "fulfilled"
      ? ToMonthlyReport(revenueReportRes.value)
      : defaultMonthlyReport;
  const customerTransactionReport =
    customerTransactionReportRes.status === "fulfilled"
      ? ToMonthlyReport(customerTransactionReportRes.value)
      : defaultMonthlyReport;
  const topFoodByRevenueReport =
    topFoodByRevenueReportRes.status === "fulfilled"
      ? ToFoodReport(topFoodByRevenueReportRes.value)
      : defaultFoodReport;
  const topFoodByOrderReport =
    topFoodByOrderReportRes.status === "fulfilled"
      ? ToFoodReport(topFoodByOrderReportRes.value)
      : defaultFoodReport;

  return (
    <MainDashboard
      completedOrderReport={completedOrderReport}
      averageRevenueReport={averageRevenueReport}
      cancelledOrderReport={cancelledOrderReport}
      cancellationRateReport={cancellationRateReport}
      orderReport={orderReport}
      revenueReport={revenueReport}
      topFoodByRevenueReport={topFoodByRevenueReport}
      topFoodByOrderReport={topFoodByOrderReport}
      customerTransactionReport={customerTransactionReport}
    />
  );
}
