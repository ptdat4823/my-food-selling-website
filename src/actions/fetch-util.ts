"use server";
export const fetchData = async (url: string, options: any) => {
  const res = await fetch(url, options).catch(() => {
    throw new Error("Internal Server Error");
  });
  if (!res.ok) {
    return {
      error: res.statusText || "Something went wrong, please try again later!",
      status: res.status || 400,
    };
  }
  return await res.json();
};
