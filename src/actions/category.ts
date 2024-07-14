"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GetAllCategories = async () => {
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(process.env.BACKEND_HOST + "/api/categories", {
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
  if (res.ok) return await res.json();
  return [];
};

// export async function CreateCategory(formData: FormData) {
//   const accessToken = cookies().get("access-token")?.value;
//   const res = await fetch(
//     process.env.NEXTAUTH_URL + "/api/inventory/categories",
//     {
//       method: "POST",
//       headers: {
//         Cookie: `access-token=${accessToken}`,
//       },
//       body: formData,
//     }
//   );
//   if (!res.ok) {
//     return {
//       error: res.statusText,
//     };
//   }
//   revalidatePath("/(main)/inventory");
//   return {
//     message: res.statusText,
//   };
// }

export async function CreateCategory(formData: FormData) {
  const url = process.env.BACKEND_HOST + "/api/categories";
  const accessToken = cookies().get("access-token")?.value;

  try {
    const res = await fetch(url, {
      cache: "no-cache",
      method: "POST",
      headers: {
        Cookie: `access-token=${accessToken}`,
      },
      body: formData,
      credentials: "include",
    }).catch(() => {
      throw new Error("Internal Server Error");
    });

    if (!res.ok) {
      if (res.status === 400)
        return {
          error: "Category already exists!",
        };
      return {
        error: "Create new category failed!",
      };
    }
  } catch (e: any) {
    return {
      error: e.message || "Internal Server Error",
    };
  }
  revalidatePath("/(main)/inventory", "layout");
  return {
    message: "Create new category successfully!",
  };
}
