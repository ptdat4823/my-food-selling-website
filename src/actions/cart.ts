"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { Cart } from "../models/Cart";
import { fetchData } from "./fetch-util";

export const GetAllCarts = async () => {
  const accessToken = cookies().get("access-token")?.value;
  const url = process.env.BACKEND_HOST + "/api/cart";
  const options = {
    headers: accessToken ? { Cookie: `access-token=${accessToken}` } : {},
    credentials: "include",
  };
  const res = await fetchData(url, options, []);
  return res;
};

export async function AddCart(data: Cart) {
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

export async function DeleteCart(id: number) {
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(process.env.NEXTAUTH_URL + `/api/cart/${id}`, {
    method: "DELETE",
    headers: {
      Cookie: `access-token=${accessToken}`,
    },
  });
  if (!res.ok) {
    return {
      error: res.statusText,
    };
  }
  revalidatePath("/(main)/cart");
  return {
    message: res.statusText,
  };
}

export async function UpdateCart(id: number, data: Cart) {
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(process.env.NEXTAUTH_URL + `/api/cart/${id}`, {
    method: "PUT",
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
  revalidatePath("/(main)/cart");
  return {
    message: res.statusText,
  };
}
