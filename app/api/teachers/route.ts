import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET() {
  const teachers = await db.teacher.findMany({
    take: 50,
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, subject: true, email: true },
  }).catch(() => []);

  return NextResponse.json({ teachers });
}
