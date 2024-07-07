"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { Cart } from "../models/Cart";
import { NextResponse } from "next/server";

export const GetAllCarts = async () => {
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(process.env.BACKEND_HOST + "/api/cart", {
    cache: "no-cache",
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
  if (res.ok) {
    return await res.json();
  }
  return [];
};

export async function AddCart(data: Cart) {
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(process.env.NEXTAUTH_URL + "/api/cart", {
    cache: "no-cache",
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
    cache: "no-cache",
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
    cache: "no-cache",
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
