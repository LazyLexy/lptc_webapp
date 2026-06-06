import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session || !["ADMIN", "TEACHER"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const students = await db.student.findMany({
    take: 50,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      studentCode: true,
      fullName: true,
      classRoom: true,
      department: { select: { name: true } },
    },
  });

  return NextResponse.json({ students });
}
