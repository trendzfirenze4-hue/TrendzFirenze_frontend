// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
//     const igUserId = process.env.INSTAGRAM_USER_ID;

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
//     ].join(",");

//     const url = `https://graph.facebook.com/v25.0/${igUserId}/media?fields=${fields}&access_token=${accessToken}`;

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

//     const posts = (data.data || []).map((item) => ({
//       id: item.id,
//       caption: item.caption || "",
//       mediaType: item.media_type,
//       image:
//         item.media_type === "VIDEO"
//           ? item.thumbnail_url || item.media_url
//           : item.media_url,
//       permalink: item.permalink,
//       timestamp: item.timestamp,
//     }));

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

function createAppSecretProof(accessToken, appSecret) {
  return crypto
    .createHmac("sha256", appSecret)
    .update(accessToken)
    .digest("hex");
}

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
    const igUserId = process.env.INSTAGRAM_USER_ID?.trim();
    const appSecret = process.env.INSTAGRAM_APP_SECRET?.trim();

    if (!accessToken || !igUserId) {
      return NextResponse.json(
        { error: "Missing Instagram environment variables" },
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

    let url =
      `https://graph.facebook.com/${GRAPH_VERSION}/${igUserId}/media` +
      `?fields=${encodeURIComponent(fields)}` +
      `&access_token=${encodeURIComponent(accessToken)}`;

    if (process.env.NODE_ENV === "production" && appSecret) {
      const appsecretProof = createAppSecretProof(accessToken, appSecret);
      url += `&appsecret_proof=${appsecretProof}`;
    }

    const res = await fetch(url, {
      next: { revalidate: 1800 },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error?.message || "Failed to fetch Instagram posts" },
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

    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}