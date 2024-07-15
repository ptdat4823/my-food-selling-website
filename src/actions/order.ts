"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { Feedback, Order } from "../models/Order";
import { fetchData } from "./fetch-util";

export const CreateOrder = async (order: Order) => {
  const accessToken = cookies().get("access-token")?.value;

  try {
    const res = await fetch(process.env.BACKEND_HOST + "/api/orders", {
      method: "POST",
      headers: {
        Cookie: `access-token=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
      credentials: "include",
    }).catch(() => {
      throw new Error("Internal Server Error");
    });

    if (!res.ok) {
      return {
        error: "Failed to make order!",
      };
    }
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
  revalidatePath("/(main)/cart");
  return {
    message: "Make order successfully!",
  };
};

export const GetAllOrders = async () => {
  const accessToken = cookies().get("access-token")?.value;
  const url = process.env.BACKEND_HOST + "/api/orders";

  const options = {
    headers: accessToken ? { Cookie: `access-token=${accessToken}` } : {},
    credentials: "include",
  };
  const res = await fetchData(url, options);
  if (res.error) return res.error;
  return res;
};

export const UpdateOrder = async (id: number, order: Order) => {
  const accessToken = cookies().get("access-token")?.value;

  try {
    const res = await fetch(process.env.BACKEND_HOST + `/api/orders/${id}`, {
      method: "PUT",
      headers: {
        Cookie: `access-token=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
      credentials: "include",
    }).catch(() => {
      throw new Error("Internal Server Error");
    });

    if (!res.ok) {
      return {
        error: "Failed to update order!",
      };
    }
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
  revalidatePath("/(main)/order-management");
  return {
    message: "Updated successfully!",
  };
};

export const RateOrder = async (id: number, feedback: Feedback) => {
  const accessToken = cookies().get("access-token")?.value;

  try {
    const res = await fetch(
      process.env.BACKEND_HOST + `/api/orders/${id}/feedback`,
      {
        method: "POST",
        headers: {
          Cookie: `access-token=${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
        credentials: "include",
      }
    ).catch(() => {
      throw new Error("Internal Server Error");
    });

    if (!res.ok) {
      return {
        error: "Failed to send feedback!",
      };
    }
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
  revalidatePath("/(main)");
  return {
    message: "Sent feedback successfully!",
  };
};
