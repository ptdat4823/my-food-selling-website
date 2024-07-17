import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const url = process.env.BACKEND_HOST + "/api/foods";
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
        { status: res.status, statusText: "Food already exists" }
      );
    }
  } catch (e: any) {
    return NextResponse.json({}, { status: 500, statusText: e.message });
  }
  return NextResponse.json(
    {},
    { status: 200, statusText: "Add new food successfully!" }
  );
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const page = params.get("page");
  const size = params.get("size");
  const url = process.env.BACKEND_HOST + `/api/foods?page=${page}&size=${size}`;
  const accessToken = cookies().get("access-token")?.value;

  try {
    const res = await fetch(url, {
      cache: "no-cache",
      headers: {
        Cookie: `access-token=${accessToken}`,
      },
      credentials: "include",
    }).catch(() => {
      throw new Error("Internal Server Error");
    });

    if (!res.ok) {
      return NextResponse.json(
        {},
        {
          status: res.status || 400,
          statusText: res.statusText || "Failed to get foods in page " + page,
        }
      );
    }
  } catch (e: any) {
    return NextResponse.json({}, { status: 500, statusText: e.message });
  }
  return NextResponse.json({}, { status: 200, statusText: "Successfully!" });
}
