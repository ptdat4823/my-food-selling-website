import {
  FoodReport,
  FoodReportData,
  MonthlyData,
  MonthlyFoodReportData,
  MonthlyReport,
} from "src/models/Report";
import { FoodToReceive } from "./foodConvertor";

const ToMonthLyData = (data: any): MonthlyData => {
  const monthlyData: MonthlyData = {
    month: data.month,
    year: data.year,
    value: data.value,
  };
  return monthlyData;
};

const ToMonthlyReport = (data: any): MonthlyReport => {
  const report: MonthlyReport = {
    data: data.map((item: any) => ToMonthLyData(item)),
  };
  return report;
};

const ToFoodReportData = (data: any): FoodReportData => {
  const foodReportData: FoodReportData = {
    revenue: data.revenue,
    quantity: data.quantity,
    food: FoodToReceive(data.food),
  };
  return foodReportData;
};

const ToMonthlyFoodReportData = (data: any): MonthlyFoodReportData => {
  const report: MonthlyFoodReportData = {
    month: data.month,
    year: data.year,
    data: data.values.map((item: any) => ToFoodReportData(item)),
  };
  return report;
};

const ToFoodReport = (data: any): FoodReport => {
  const report: FoodReport = {
    data: data.map((item: any) => ToMonthlyFoodReportData(item)),
  };
  return report;
};

export { ToFoodReport, ToMonthlyReport };
