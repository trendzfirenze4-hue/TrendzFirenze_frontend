

// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const baseUrl = process.env.API_BASE_URL;

//     if (!baseUrl) {
//       return NextResponse.json(
//         { error: "Missing API_BASE_URL" },
//         { status: 500 }
//       );
//     }

//     const res = await fetch(`${baseUrl}/api/instagram`, {
//       cache: "no-store",
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       return NextResponse.json(
//         { error: data?.error || "Failed to load Instagram posts" },
//         { status: res.status }
//       );
//     }

//     return NextResponse.json(data, {
//       status: 200,
//       headers: {
//         "Cache-Control": "s-maxage=1800, stale-while-revalidate=3600",
//       },
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: error?.message || "Unexpected server error" },
//       { status: 500 }
//     );
//   }
// }











import { NextResponse } from "next/server";

export const revalidate = 900;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || "12";

    const baseUrl = process.env.API_BASE_URL;

    if (!baseUrl) {
      return NextResponse.json(
        { error: "Missing API_BASE_URL" },
        { status: 500 }
      );
    }

    const res = await fetch(`${baseUrl}/api/instagram?limit=${limit}`, {
      next: { revalidate: 900 },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error || "Failed to load Instagram posts" },
        {
          status: res.status,
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          },
        }
      );
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Unexpected server error" },
      {
        status: 500,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  }
}