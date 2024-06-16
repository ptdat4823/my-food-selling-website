"use server";

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
