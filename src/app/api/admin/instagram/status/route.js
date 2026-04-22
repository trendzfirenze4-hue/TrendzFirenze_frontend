// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const baseUrl = process.env.API_BASE_URL;
//     const adminSecret = process.env.ADMIN_REFRESH_SECRET;

//     console.log("STATUS API_BASE_URL =", baseUrl);
//     console.log("STATUS ADMIN_REFRESH_SECRET =", adminSecret);

//     if (!baseUrl) {
//       return NextResponse.json(
//         { error: "Missing API_BASE_URL" },
//         { status: 500 }
//       );
//     }

//     if (!adminSecret) {
//       return NextResponse.json(
//         { error: "Missing ADMIN_REFRESH_SECRET" },
//         { status: 500 }
//       );
//     }

//     const res = await fetch(`${baseUrl}/api/admin/instagram/status`, {
//       method: "GET",
//       headers: {
//         "X-Admin-Refresh-Secret": adminSecret,
//       },
//       cache: "no-store",
//     });

//     const contentType = res.headers.get("content-type") || "";
//     const data = contentType.includes("application/json")
//       ? await res.json()
//       : { error: await res.text() };

//     console.log("STATUS BACKEND RESPONSE =", data);

//     return NextResponse.json(data, { status: res.status });
//   } catch (error) {
//     return NextResponse.json(
//       { error: error?.message || "Failed to load Instagram status" },
//       { status: 500 }
//     );
//   }
// }








import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseUrl = process.env.API_BASE_URL;
    const adminSecret = process.env.ADMIN_REFRESH_SECRET;

    if (!baseUrl) {
      return NextResponse.json(
        { ok: false, error: "Missing API_BASE_URL" },
        { status: 500 }
      );
    }

    if (!adminSecret) {
      return NextResponse.json(
        { ok: false, error: "Missing ADMIN_REFRESH_SECRET" },
        { status: 500 }
      );
    }

    const res = await fetch(`${baseUrl}/api/admin/instagram/status`, {
      method: "GET",
      headers: {
        "X-Admin-Refresh-Secret": adminSecret,
      },
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await res.json()
      : { ok: false, error: await res.text() };

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Instagram status proxy failed:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to load Instagram status",
      },
      { status: 500 }
    );
  }
}