"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const GetInfo = async () => {
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(process.env.BACKEND_HOST + "/api/user/me", {
    cache: "no-cache",
    headers: {
      Cookie: `access-token=${accessToken}`,
    },
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const UpdateInfo = async (formData: FormData) => {
  const accessToken = cookies().get("access-token")?.value;
  console.log("formdata ------------- ", formData);

  try {
    const res = await fetch(process.env.BACKEND_HOST + "/api/user/me", {
      cache: "no-cache",
      method: "PUT",
      headers: {
        Cookie: `access-token=${accessToken}`,
      },
      body: formData,
      credentials: "include",
    }).catch(() => {
      throw new Error("Internal Server Error");
    });

    if (!res.ok) {
      return {
        error: "Updated failed!",
      };
    }
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
  revalidatePath("/(main)/setting");
  return {
    message: "Updated successfully!",
  };
};

export const ChangePassword = async (formData: FormData) => {
  const accessToken = cookies().get("access-token")?.value;
  console.log("formdata ------------- ", formData);

  try {
    const res = await fetch(
      process.env.BACKEND_HOST + "/api/user/me/change-password",
      {
        cache: "no-cache",
        method: "POST",
        headers: {
          Cookie: `access-token=${accessToken}`,
        },
        body: formData,
        credentials: "include",
      }
    ).catch(() => {
      throw new Error("Internal Server Error");
    });

    if (!res.ok) {
      return {
        error: "Changed password failed!",
      };
    }
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
  revalidatePath("/(main)/setting");
  return {
    message: "Changed password successfully!",
  };
};
