"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const GetAllCategories = async () => {
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

export async function CreateCategory(formData: FormData) {
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(
    process.env.NEXTAUTH_URL + "/api/inventory/categories",
    {
      method: "POST",
      headers: {
        Cookie: `access-token=${accessToken}`,
      },
      body: formData,
    }
  );
  if (!res.ok) {
    return {
      error: res.statusText,
    };
  }
  revalidatePath("/(main)/inventory");
  return {
    message: res.statusText,
  };
}
