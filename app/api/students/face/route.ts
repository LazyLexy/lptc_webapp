import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

const faceSchema = z.object({
  descriptor: z.array(z.number()).length(128),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session || session.user.role !== "STUDENT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = faceSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid descriptor" }, { status: 400 });
  }

  await db.student.update({
    where: { id: session.user.id },
    data: { faceDescriptor: parsed.data.descriptor },
  });

  return NextResponse.json({ ok: true });
}
