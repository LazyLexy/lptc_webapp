import { NextResponse } from "next/server";

import cloudinary from "@/lib/cloudinary";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ ok: false, message: "ไม่มีสิทธิ์อัปโหลดรูป" }, { status: 403 });
  }

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return NextResponse.json({ ok: false, message: "ยังไม่ได้ตั้งค่า Cloudinary ใน .env.local" }, { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const folder = String(formData.get("folder") ?? "admin").replace(/[^a-z0-9-_]/gi, "-");

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, message: "ไม่พบไฟล์รูปภาพ" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ ok: false, message: "รองรับเฉพาะไฟล์รูปภาพ" }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ ok: false, message: "ไฟล์รูปต้องไม่เกิน 5MB" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const dataUri = `data:${file.type};base64,${bytes.toString("base64")}`;
  const uploaded = await cloudinary.uploader.upload(dataUri, {
    folder: `lptc/${folder}`,
    resource_type: "image",
  });

  return NextResponse.json({ ok: true, url: uploaded.secure_url });
}
