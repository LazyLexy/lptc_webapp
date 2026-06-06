import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ ok: true, message: "LINE notify is not configured yet" });
}
