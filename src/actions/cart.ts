"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { Cart } from "../models/Cart";

export const GetAllCarts = async () => {
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(process.env.BACKEND_HOST + "/api/cart", {
    cache: "no-cache",
    headers: {
      Cookie: `access-token=${accessToken}`,
    },
    credentials: "include",
  });
  revalidatePath("/(main)");
  const data = await res.json();
  return data;
};

export async function AddCart(data: Cart) {
  console.log("data ------------ ", data);
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(process.env.NEXTAUTH_URL + "/api/cart", {
    method: "POST",
    headers: {
      Cookie: `access-token=${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    return {
      error: res.statusText,
    };
  }
  revalidatePath("/(main)");
  return {
    message: res.statusText,
  };
}
