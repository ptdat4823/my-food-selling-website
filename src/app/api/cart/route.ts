import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const url = "http://localhost:8080/api/cart";
  const accessToken = cookies().get("access-token")?.value;

  try {
    const data = await request.json();

    const res = await fetch(url, {
      cache: "no-cache",
      method: "POST",
      headers: {
        Cookie: `access-token=${accessToken}`,
      },
      body: new Blob([JSON.stringify(data)], { type: "application/json" }),
      credentials: "include",
    }).catch(() => {
      throw new Error("Internal Server Error");
    });

    if (!res.ok) {
      return NextResponse.json(
        {},
        { status: res.status, statusText: "Add to cart failed" }
      );
    }
  } catch (e: any) {
    return NextResponse.json({}, { status: 500, statusText: e.message });
  }
  return NextResponse.json(
    {},
    { status: 200, statusText: "Add to cart successfully!" }
  );
}
