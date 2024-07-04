import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const url = `http://localhost:8080/api/foods/${params.id}`;
  const accessToken = cookies().get("access-token")?.value;

  try {
    const data = await request.formData();

    const res = await fetch(url, {
      cache: "no-cache",
      method: "PUT",
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
        { status: res.status, statusText: "Updated failed!" }
      );
    }
  } catch (e: any) {
    return NextResponse.json({}, { status: 500, statusText: e.message });
  }
  return NextResponse.json(
    {},
    { status: 200, statusText: "Updated successfully!" }
  );
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const url = `http://localhost:8080/api/foods/${params.id}`;
  const accessToken = cookies().get("access-token")?.value;

  try {
    const res = await fetch(url, {
      cache: "no-cache",
      method: "DELETE",
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
          status: res.status,
          statusText: "Failed to delete food with id " + params.id,
        }
      );
    }
  } catch (e: any) {
    return NextResponse.json({}, { status: 500, statusText: e.message });
  }
  return NextResponse.json(
    {},
    { status: 200, statusText: "Deleted successfully!" }
  );
}
