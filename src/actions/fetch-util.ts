"use server";

export const fetchData = async (url: string, options: any, errorData?: any) => {
  try {
    const res = await fetch(url, { ...options, cache: "force-cache" }).catch(
      () => {
        throw new Error("Internal Server Error");
      }
    );
    if (!res.ok) {
      return {
        error:
          res.statusText || "Something went wrong, please try again later!",
        data: errorData,
      };
    }
    return {
      data: await res.json(),
    };
  } catch (error: any) {
    return {
      error: error.message,
      data: errorData,
    };
  }
};
