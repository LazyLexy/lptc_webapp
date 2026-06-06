import { NextResponse } from "next/server";

import { getNewsList } from "@/lib/public-content";

export async function GET() {
  return NextResponse.json({ news: await getNewsList() });
}
