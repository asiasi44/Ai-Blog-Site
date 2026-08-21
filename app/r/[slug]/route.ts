import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import AllProduct from "@/models/AllProduct";
import { ClickLog } from "@/models/ClickLog";

const AFFILIATE_TAG = "soundbar_ranknest-20";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const searchParams = request.nextUrl.searchParams;
  const refQuery = searchParams.get("ref");
  const videoId = searchParams.get("video") || undefined;

  // 1. Extract or Generate Persistent Visitor Cookie
  let visitorId = request.cookies.get("visitor_id")?.value;
  const isNewVisitor = !visitorId;

  if (!visitorId) {
    visitorId = crypto.randomUUID();
  }

  // 2. Extract Request Metadata
  const userAgent = request.headers.get("user-agent") ?? "Unknown";
  const country =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    "Unknown";
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ??
    request.headers.get("cf-connecting-ip") ??
    "127.0.0.1";

  const headerReferer = request.headers.get("referer") || "";
  let refSource = refQuery ?? "direct";

  if (!refQuery) {
    if (
      headerReferer.includes("youtube.com") ||
      headerReferer.includes("youtu.be")
    ) {
      refSource = "youtube";
    } else if (headerReferer.includes("pinterest.com")) {
      refSource = "pinterest";
    }
  }

  await dbConnect();
  const product = await AllProduct.findOne({ slug }).lean();
  const asin = product?.asin;

  if (!asin) {
    return NextResponse.redirect("https://www.amazon.com", 302);
  }

  // 3. Log with Visitor ID
  ClickLog.create({
    slug,
    asin,
    refSource,
    videoId,
    visitorId,
    country,
    userAgent,
    ip,
    timestamp: new Date(),
  }).catch((err) => console.error("Logging Error:", err));

  // 4. Construct Redirect Response & Set Cookie
  const amazonUrl = `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
  const response = NextResponse.redirect(amazonUrl, 302);

  if (isNewVisitor) {
    response.cookies.set("visitor_id", visitorId, {
      maxAge: 60 * 60 * 24 * 365, // 1 Year
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  return response;
}
