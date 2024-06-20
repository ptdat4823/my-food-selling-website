"use server";
import { cookies } from "next/headers";

export const getAllFood = async () => {
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(process.env.BACKEND_HOST + "/api/foods", {
    cache: "no-cache",
    headers: {
      Cookie: `access-token=${accessToken}`,
    },
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const getAllCategories = async () => {
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(process.env.BACKEND_HOST + "/api/categories", {
    cache: "no-cache",
    headers: {
      Cookie: `access-token=${accessToken}`,
    },
    credentials: "include",
  });
  const data = await res.json();
  return data;
};
