"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { Order } from "../models/Order";

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
