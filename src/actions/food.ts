"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const GetAllFood = async () => {
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

export async function CreateFood(formData: FormData) {
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

export async function UpdateFood(id: number, formData: FormData) {
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

export async function DeleteFood(id: number) {
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(
    process.env.NEXTAUTH_URL + `/api/inventory/foods/${id}`,
    {
      method: "DELETE",
      headers: {
        Cookie: `access-token=${accessToken}`,
      },
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
