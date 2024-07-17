"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { fetchData } from "./fetch-util";

export const GetInfo = async () => {
  const accessToken = cookies().get("access-token")?.value;
  const url = process.env.BACKEND_HOST + "/api/user/me";
  const options = {
    headers: accessToken ? { Cookie: `access-token=${accessToken}` } : {},
    credentials: "include",
  };
  const res = await fetchData(url, options, undefined);
  return res;
};

export const UpdateInfo = async (formData: FormData) => {
  const accessToken = cookies().get("access-token")?.value;

  try {
    const res = await fetch(process.env.BACKEND_HOST + "/api/user/me", {
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

  try {
    const res = await fetch(
      process.env.BACKEND_HOST + "/api/user/me/change-password",
      {
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
  revalidatePath("/(main)");
  return {
    message: "Changed password successfully!",
  };
};
