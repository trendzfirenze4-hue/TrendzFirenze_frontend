



// import { NextResponse } from "next/server";
// import crypto from "crypto";

// const GRAPH_VERSION = "v25.0";

// function createAppSecretProof(accessToken, appSecret) {
//   return crypto
//     .createHmac("sha256", appSecret)
//     .update(accessToken)
//     .digest("hex");
// }

// export async function GET() {
//   try {
//     const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
//     const igUserId = process.env.INSTAGRAM_USER_ID?.trim();
//     const appSecret = process.env.INSTAGRAM_APP_SECRET?.trim();

//     if (!accessToken || !igUserId) {
//       return NextResponse.json(
//         { error: "Missing Instagram environment variables" },
//         { status: 500 }
//       );
//     }

//     const fields = [
//       "id",
//       "caption",
//       "media_type",
//       "media_url",
//       "thumbnail_url",
//       "permalink",
//       "timestamp",
//       "alt_text",
//     ].join(",");

//     let url =
//       `https://graph.facebook.com/${GRAPH_VERSION}/${igUserId}/media` +
//       `?fields=${encodeURIComponent(fields)}` +
//       `&access_token=${encodeURIComponent(accessToken)}`;

//     if (process.env.NODE_ENV === "production" && appSecret) {
//       const appsecretProof = createAppSecretProof(accessToken, appSecret);
//       url += `&appsecret_proof=${appsecretProof}`;
//     }

//     const res = await fetch(url, {
//       next: { revalidate: 1800 },
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       return NextResponse.json(
//         { error: data?.error?.message || "Failed to fetch Instagram posts" },
//         { status: res.status }
//       );
//     }

//     const posts = (data.data || [])
//       .filter(
//         (item) =>
//           item.media_type === "IMAGE" || item.media_type === "CAROUSEL_ALBUM"
//       )
//       .map((item) => ({
//         id: item.id,
//         caption: item.caption || "",
//         image: item.media_url,
//         permalink: item.permalink,
//         timestamp: item.timestamp,
//         alt:
//           item.alt_text ||
//           item.caption?.trim() ||
//           "Trendz Firenze Instagram post",
//       }))
//       .slice(0, 4);

//     return NextResponse.json({ posts });
//   } catch (error) {
//     return NextResponse.json(
//       { error: error.message || "Unexpected server error" },
//       { status: 500 }
//     );
//   }
// }











import { NextResponse } from "next/server";
import crypto from "crypto";

const GRAPH_VERSION = "v25.0";
const REVALIDATE_SECONDS = 1800;

function createAppSecretProof(token, appSecret) {
  return crypto.createHmac("sha256", appSecret).update(token).digest("hex");
}

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const igUserId = process.env.INSTAGRAM_USER_ID;
    const appSecret = process.env.INSTAGRAM_APP_SECRET;

    if (!accessToken || !igUserId || !appSecret) {
      return NextResponse.json(
        {
          error:
            "Missing INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_USER_ID, or INSTAGRAM_APP_SECRET",
        },
        { status: 500 }
      );
    }

    const fields = [
      "id",
      "caption",
      "media_type",
      "media_url",
      "thumbnail_url",
      "permalink",
      "timestamp",
      "alt_text",
    ].join(",");

    const appsecretProof = createAppSecretProof(accessToken, appSecret);

    const url =
      `https://graph.facebook.com/${GRAPH_VERSION}/${igUserId}/media` +
      `?fields=${encodeURIComponent(fields)}` +
      `&access_token=${encodeURIComponent(accessToken)}` +
      `&appsecret_proof=${encodeURIComponent(appsecretProof)}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          error: data?.error?.message || "Failed to fetch Instagram posts",
        },
        { status: res.status }
      );
    }

    const posts = (data.data || [])
      .filter(
        (item) =>
          item.media_type === "IMAGE" || item.media_type === "CAROUSEL_ALBUM"
      )
      .map((item) => ({
        id: item.id,
        caption: item.caption || "",
        image: item.media_url,
        permalink: item.permalink,
        timestamp: item.timestamp,
        alt:
          item.alt_text ||
          item.caption?.trim() ||
          "Trendz Firenze Instagram post",
      }))
      .slice(0, 4);

    return NextResponse.json(
      { posts },
      {
        status: 200,
        headers: {
          "Cache-Control": "s-maxage=1800, stale-while-revalidate=3600",
        },
      }
    );
  } catch (error) {
    const message =
      error?.name === "AbortError"
        ? "Instagram request timed out"
        : error?.message || "Unexpected server error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}