import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const registerUrl = process.env.BACKEND_HOST + "/api/auth/register";

  try {
    const { name, email, password } = await request.json();

    const res = await fetch(registerUrl, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      throw new Error("Internal Server Error");
    });
    if (!res.ok) {
      return NextResponse.json(
        {},
        { status: 400, statusText: "Email already exists" }
      );
    }
  } catch (e: any) {
    return NextResponse.json({}, { status: 500, statusText: e.message });
  }
  return NextResponse.json(
    {},
    { status: 200, statusText: "Sign up successfully!" }
  );
}
