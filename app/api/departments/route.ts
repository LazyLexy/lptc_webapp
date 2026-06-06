import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET() {
  const departments = await db.department.findMany({
    where: { isActive: true },
    orderBy: [{ order: "asc" }, { name: "asc" }],
    select: { id: true, name: true, slug: true },
  }).catch(() => []);

  return NextResponse.json({ departments });
}
