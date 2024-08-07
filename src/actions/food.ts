"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { fetchData } from "./fetch-util";
import { defaultPage } from "../models/Page";

export const GetAllFood = async () => {
  const accessToken = cookies().get("access-token")?.value;
  const url = process.env.BACKEND_HOST + "/api/foods";
  const options = {
    headers: accessToken ? { Cookie: `access-token=${accessToken}` } : {},
    credentials: "include",
  };
  const res = await fetchData(url, options, defaultPage, ["food"]);
  return res;
};

export const GetFoodByPage = async (page: number, size: number) => {
  const accessToken = cookies().get("access-token")?.value;
  const url = process.env.BACKEND_HOST + `/api/foods?page=${page}&size=${size}`;
  const options = {
    headers: accessToken ? { Cookie: `access-token=${accessToken}` } : {},
    credentials: "include",
  };
  const res = await fetchData(url, options, defaultPage, ["food"]);
  return res;
};

export const GetFavouriteFood = async () => {
  const accessToken = cookies().get("access-token")?.value;
  const url = process.env.BACKEND_HOST + "/api/food-favorite";
  const options = {
    headers: accessToken ? { Cookie: `access-token=${accessToken}` } : {},
    credentials: "include",
  };
  const res = await fetchData(url, options, [], ["food", "favorite"]);
  return res;
};

export async function CreateFood(formData: FormData) {
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/inventory/foods`, {
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
  revalidateTag("food");
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
  revalidateTag("food");
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
  revalidateTag("food");
  return {
    message: res.statusText,
  };
}

export async function DeleteFoods(listId: number[]) {
  const accessToken = cookies().get("access-token")?.value;
  const promises = listId.map((id) =>
    fetch(process.env.NEXTAUTH_URL + `/api/inventory/foods/${id}`, {
      method: "DELETE",
      headers: {
        Cookie: `access-token=${accessToken}`,
      },
    })
  );
  const res = await Promise.all(promises);
  const failed = res.filter((result) => !result.ok);

  if (failed.length > 0) {
    return {
      errors: failed.map((result) => result.statusText),
    };
  }
  revalidateTag("food");
  return {
    message: "Deleted successfully!",
  };
}

export async function ChangeStateFavouriteFood(id: number) {
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(
    process.env.BACKEND_HOST + `/api/food-favorite/${id}`,
    {
      method: "POST",
      headers: {
        Cookie: `access-token=${accessToken}`,
      },
    }
  ).catch(() => {
    return NextResponse.json(
      {},
      { status: 500, statusText: "Internal Server Error" }
    );
  });
  if (!res.ok) {
    return {
      error: res.statusText,
    };
  }
  revalidateTag("favorite");
  return {
    message: res.statusText,
  };
}

export const GetFoodComment = async (id: number) => {
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(process.env.BACKEND_HOST + `/api/comments/${id}`, {
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

export async function UploadComment(id: number, comment: any) {
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(process.env.BACKEND_HOST + `/api/comments/${id}`, {
    method: "POST",
    headers: {
      Cookie: `access-token=${accessToken}`,
    },
    body: new Blob([JSON.stringify(comment)], { type: "application/json" }),
  }).catch(() => {
    return NextResponse.json(
      {},
      { status: 500, statusText: "Internal Server Error" }
    );
  });
  if (!res.ok) {
    return {
      error: res.statusText || "Upload comment failed",
    };
  }
  revalidateTag("food");
  return {
    message: "Upload comment successfully!",
  };
}

export async function DeleteComment(id: number) {
  const accessToken = cookies().get("access-token")?.value;
  const res = await fetch(process.env.BACKEND_HOST + `/api/comments/${id}`, {
    method: "DELETE",
    headers: {
      Cookie: `access-token=${accessToken}`,
    },
  }).catch(() => {
    return NextResponse.json(
      {},
      { status: 500, statusText: "Internal Server Error" }
    );
  });
  if (!res.ok) {
    return {
      error: res.statusText || "Deleted comment failed",
    };
  }
  revalidateTag("food");
  return {
    message: "Deleted comment successfully!",
  };
}
