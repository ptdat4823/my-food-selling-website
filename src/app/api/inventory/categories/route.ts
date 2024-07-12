"use server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const url = process.env.BACKEND_HOST + "/api/categories";
  const accessToken = cookies().get("access-token")?.value;

  try {
    const data = await request.formData();

    const res = await fetch(url, {
      cache: "no-cache",
      method: "POST",
      headers: {
        Cookie: `access-token=${accessToken}`,
      },
      body: data,
      credentials: "include",
    }).catch(() => {
      throw new Error("Internal Server Error");
    });

    if (!res.ok) {
      return NextResponse.json(
        {},
        { status: res.status, statusText: "Categories already exists" }
      );
    }
  } catch (e: any) {
    return NextResponse.json({}, { status: 500, statusText: e.message });
  }
  return NextResponse.json(
    {},
    { status: 200, statusText: "Add new category successfully!" }
  );
}
