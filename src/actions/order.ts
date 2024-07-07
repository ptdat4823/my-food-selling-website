"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { Feedback, Order } from "../models/Order";
import { NextResponse } from "next/server";

export const CreateOrder = async (order: Order) => {
  const accessToken = cookies().get("access-token")?.value;

  try {
    const res = await fetch(process.env.BACKEND_HOST + "/api/orders", {
      cache: "no-cache",
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
  const res = await fetch(process.env.BACKEND_HOST + "/api/orders", {
    cache: "no-cache",
    method: "GET",
    headers: {
      Cookie: `access-token=${accessToken}`,
    },
    credentials: "include",
  }).catch(() => {
    return NextResponse.json(
      {},
      { status: 500, statusText: "Internal Server Error" }
    );
  });
  if (!res.ok) {
    return {
      error: res.statusText,
    };
  }
  return await res.json();
};

export const UpdateOrder = async (id: number, order: Order) => {
  const accessToken = cookies().get("access-token")?.value;

  try {
    const res = await fetch(process.env.BACKEND_HOST + `/api/orders/${id}`, {
      cache: "no-cache",
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
        cache: "no-cache",
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
