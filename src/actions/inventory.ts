"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function CreateCategoryAction(formData: FormData) {
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

export async function CreateFoodAction(formData: FormData) {
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(process.env.NEXTAUTH_URL + "/api/inventory/foods", {
    method: "POST",
    headers: {
      Cookie: `access-token=${accessToken}`,
    },
    body: formData,
  });
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

export async function UpdateFoodAction(id: number, formData: FormData) {
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(
    process.env.NEXTAUTH_URL + `/api/inventory/foods/${id}`,
    {
      method: "PUT",
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
