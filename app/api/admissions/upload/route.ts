import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
const photoTypes = ["image/png", "image/jpeg"];
const maxSize = 2 * 1024 * 1024;

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const documentType = String(formData.get("documentType") ?? "");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "กรุณาเลือกไฟล์เอกสาร" }, { status: 400 });
  }

  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ message: "รองรับเฉพาะไฟล์ png, jpg, jpeg หรือ pdf" }, { status: 400 });
  }

  if (documentType === "PHOTO" && !photoTypes.includes(file.type)) {
    return NextResponse.json({ message: "รูปถ่ายต้องเป็นไฟล์ png, jpg หรือ jpeg เท่านั้น" }, { status: 400 });
  }

  if (file.size > maxSize) {
    return NextResponse.json({ message: "ขนาดไฟล์ต้องไม่เกิน 2MB" }, { status: 400 });
  }

  // TODO: Store admission documents in private storage such as S3/Cloudinary private delivery.
  // This mock returns metadata only so production does not accidentally expose documents in public/.
  return NextResponse.json({
    fileName: file.name,
    fileSize: file.size,
    mimeType: file.type,
    filePath: `mock-upload://${randomUUID()}-${file.name}`,
    status: "UPLOADED",
  });
}
