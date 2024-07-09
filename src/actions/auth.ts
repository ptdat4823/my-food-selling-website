"use server";

import { cookies } from "next/headers";

export async function RegisterAction(data: FormData) {
  const name = data.get("username");
  const email = data.get("email");
  const password = data.get("password");

  const res = await fetch(process.env.NEXTAUTH_URL + "/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) {
    return {
      error: res.statusText,
    };
  }
  return {
    message: res.statusText,
  };
}

export async function RegisterWithGoogle(name: string, email: string) {
  const url = process.env.BACKEND_HOST + "/api/auth/register";
  const password = "google";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).catch((error) => {
      throw new Error("Internal Server Error");
    });
    if (!res.ok) {
      return {
        error: "Email already exists",
      };
    }
  } catch (e: any) {
    return {
      error: e.message || "Internal Server Error",
    };
  }
  return {
    message: "Register with google successfully!",
  };
}

export async function LoginWithGoogle(email: string) {
  const url = process.env.BACKEND_HOST + "/api/auth/authenticate";
  const password = "google";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).catch((error) => {
      throw new Error("Internal Server Error");
    });
    if (!res.ok) {
      return {
        error: "Failed to login",
        status: 400,
      };
    }

    const jwt = res.headers.getSetCookie()[0].split("; ")[0].split("=")[1];
    cookies().set("access-token", jwt, { httpOnly: true });
  } catch (e: any) {
    return {
      error: e.message || "Internal Server Error",
      status: 500,
    };
  }
  return {
    message: "Login successfully!",
  };
}

export async function HasAccessToken() {
  const accessToken = cookies().get("access-token")?.value;
  if (!accessToken) return false;
  return true;
}

export async function LogOutAction() {
  const res = await fetch(process.env.BACKEND_HOST + "/api/auth/logout");
  if (!res.ok) {
    return {
      error: "Failed to log out",
    };
  }
  cookies().delete("access-token");
  return {
    message: "Logged out successfully",
  };
}
