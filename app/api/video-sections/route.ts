import { NextResponse } from "next/server";
import { BACKEND_URL_API } from "../backendurl";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * GET /api/video-sections
 * GET /api/video-sections?slug=xyz
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    // Build backend URL
    const backendUrl = slug
      ? `${BACKEND_URL_API}/video-sections/${encodeURIComponent(slug)}`
      : `${BACKEND_URL_API}/video-sections`;

    console.log("Fetching video sections from:", backendUrl);

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("❌ Backend error:", response.status, text);

      return NextResponse.json(
        {
          error: "Failed to fetch video section(s)",
          status: response.status,
          details: text,
        },
        { status: response.status },
      );
    }

    const data = await response.json();

    console.log("✅ Successfully fetched video section(s)");

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Error fetching video section(s):", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    );
  }
}
