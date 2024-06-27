import { format } from "date-fns";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const dateToUrlPath = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};

export type ReportRange = "3-month" | "6-month" | "1-year";

const getRange = (range: "3-month" | "6-month" | "1-year") => {
  const endDate = new Date();
  const startDate = new Date();
  switch (range) {
    case "3-month":
      startDate.setMonth(endDate.getMonth() - 3);
      break;
    case "6-month":
      startDate.setMonth(endDate.getMonth() - 6);
      break;
    case "1-year":
      startDate.setFullYear(endDate.getFullYear() - 1);
      break;
  }
  return { startDate, endDate };
};

const GetOrderByMonth = async (range: "3-month" | "6-month" | "1-year") => {
  const { startDate, endDate } = getRange(range);
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(
    process.env.BACKEND_HOST +
      `/api/reports/order-by-month?start=${dateToUrlPath(
        startDate
      )}&end=${dateToUrlPath(endDate)}`,
    {
      headers: {
        Cookie: `access-token=${accessToken}`,
      },
      credentials: "include",
    }
  ).catch(() => {
    return NextResponse.json(
      {},
      { status: 500, statusText: "Internal Server Error" }
    );
  });
  if (res.ok) return await res.json();
  return [];
};

const GetCompletedOrderByMonth = async (range: ReportRange) => {
  const { startDate, endDate } = getRange(range);
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(
    process.env.BACKEND_HOST +
      `/api/reports/total-completed-order-by-month?start=${dateToUrlPath(
        startDate
      )}&end=${dateToUrlPath(endDate)}`,
    {
      headers: {
        Cookie: `access-token=${accessToken}`,
      },
      credentials: "include",
    }
  ).catch(() => {
    return NextResponse.json(
      {},
      { status: 500, statusText: "Internal Server Error" }
    );
  });
  if (res.ok) return await res.json();
  return [];
};

const GetAverageRevenueByMonth = async (
  range: "3-month" | "6-month" | "1-year"
) => {
  const { startDate, endDate } = getRange(range);
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(
    process.env.BACKEND_HOST +
      `/api/reports/average-revenue-by-month?start=${dateToUrlPath(
        startDate
      )}&end=${dateToUrlPath(endDate)}`,
    {
      headers: {
        Cookie: `access-token=${accessToken}`,
      },
      credentials: "include",
    }
  ).catch(() => {
    return NextResponse.json(
      {},
      { status: 500, statusText: "Internal Server Error" }
    );
  });
  if (res.ok) return await res.json();
  return [];
};

const GetCancelledOrderByMonth = async (
  range: "3-month" | "6-month" | "1-year"
) => {
  const { startDate, endDate } = getRange(range);
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(
    process.env.BACKEND_HOST +
      `/api/reports/cancelled-order-by-month?start=${dateToUrlPath(
        startDate
      )}&end=${dateToUrlPath(endDate)}`,
    {
      headers: {
        Cookie: `access-token=${accessToken}`,
      },
      credentials: "include",
    }
  ).catch(() => {
    return NextResponse.json(
      {},
      { status: 500, statusText: "Internal Server Error" }
    );
  });
  if (res.ok) return await res.json();
  return [];
};

const GetCancellationRateByMonth = async (
  range: "3-month" | "6-month" | "1-year"
) => {
  const { startDate, endDate } = getRange(range);
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(
    process.env.BACKEND_HOST +
      `/api/reports/cancellation-rate-by-month?start=${dateToUrlPath(
        startDate
      )}&end=${dateToUrlPath(endDate)}`,
    {
      headers: {
        Cookie: `access-token=${accessToken}`,
      },
      credentials: "include",
    }
  ).catch(() => {
    return NextResponse.json(
      {},
      { status: 500, statusText: "Internal Server Error" }
    );
  });
  if (res.ok) return await res.json();
  return [];
};

const GetRevenueByMonth = async (range: "3-month" | "6-month" | "1-year") => {
  const { startDate, endDate } = getRange(range);
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(
    process.env.BACKEND_HOST +
      `/api/reports/revenue-by-month?start=${dateToUrlPath(
        startDate
      )}&end=${dateToUrlPath(endDate)}`,
    {
      headers: {
        Cookie: `access-token=${accessToken}`,
      },
      credentials: "include",
    }
  ).catch(() => {
    return NextResponse.json(
      {},
      { status: 500, statusText: "Internal Server Error" }
    );
  });
  if (res.ok) return await res.json();
  return [];
};

const GetCustomerTransactionByMonth = async (
  range: "3-month" | "6-month" | "1-year"
) => {
  const { startDate, endDate } = getRange(range);
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(
    process.env.BACKEND_HOST +
      `/api/reports/customer-transaction?start=${dateToUrlPath(
        startDate
      )}&end=${dateToUrlPath(endDate)}`,
    {
      headers: {
        Cookie: `access-token=${accessToken}`,
      },
      credentials: "include",
    }
  ).catch(() => {
    return NextResponse.json(
      {},
      { status: 500, statusText: "Internal Server Error" }
    );
  });
  if (res.ok) return await res.json();
  return [];
};

const GetTopFoodByRevenue = async (range: "3-month" | "6-month" | "1-year") => {
  const { startDate, endDate } = getRange(range);
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(
    process.env.BACKEND_HOST +
      `/api/reports/top-food-by-revenue?start=${dateToUrlPath(
        startDate
      )}&end=${dateToUrlPath(endDate)}`,
    {
      headers: {
        Cookie: `access-token=${accessToken}`,
      },
      credentials: "include",
    }
  ).catch(() => {
    return NextResponse.json(
      {},
      { status: 500, statusText: "Internal Server Error" }
    );
  });
  if (res.ok) return await res.json();
  return [];
};

const GetTopFoodByOrder = async (range: "3-month" | "6-month" | "1-year") => {
  const { startDate, endDate } = getRange(range);
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(
    process.env.BACKEND_HOST +
      `/api/reports/top-food-by-order?start=${dateToUrlPath(
        startDate
      )}&end=${dateToUrlPath(endDate)}`,
    {
      headers: {
        Cookie: `access-token=${accessToken}`,
      },
      credentials: "include",
    }
  ).catch(() => {
    return NextResponse.json(
      {},
      { status: 500, statusText: "Internal Server Error" }
    );
  });
  if (res.ok) return await res.json();
  return [];
};

export {
  GetOrderByMonth,
  GetCompletedOrderByMonth,
  GetAverageRevenueByMonth,
  GetCancelledOrderByMonth,
  GetCancellationRateByMonth,
  GetRevenueByMonth,
  GetCustomerTransactionByMonth,
  GetTopFoodByRevenue,
  GetTopFoodByOrder,
};
