import { NextResponse } from "next/server";

import {
  admissionSearchSchema,
  createPrintToken,
  getApplicationStatusLabel,
  getLevelLabel,
  getPrintTokenExpiry,
  hashCitizenId,
  hashPrintToken,
  maskName,
  parseOptionalDate,
} from "@/lib/admissions";
import { db } from "@/lib/db";
import { getDepartmentBySlug } from "@/lib/public-content";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = admissionSearchSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "ข้อมูลค้นหาไม่ถูกต้อง" }, { status: 400 });
  }

  const citizenIdHash = hashCitizenId(parsed.data.citizenId);
  const birthDate = parseOptionalDate(parsed.data.birthDate);

  const application = await db.admissionApplication.findFirst({
    where: {
      citizenIdHash,
      ...(parsed.data.phone ? { phone: parsed.data.phone } : {}),
      ...(birthDate ? { birthDate } : {}),
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      applicationNo: true,
      prefix: true,
      firstName: true,
      lastName: true,
      admissionLevel: true,
      departmentSlug: true,
      status: true,
      submittedAt: true,
    },
  });

  if (!application) {
    return NextResponse.json(
      { message: "ไม่พบข้อมูลใบสมัคร กรุณาตรวจสอบเลขบัตรประชาชนและเบอร์โทรศัพท์อีกครั้ง" },
      { status: 404 },
    );
  }

  const printToken = createPrintToken();
  await db.admissionApplication.update({
    where: { id: application.id },
    data: {
      printTokenHash: hashPrintToken(printToken),
      printTokenExpiresAt: getPrintTokenExpiry(15),
    },
    select: { id: true },
  });

  const department = await getDepartmentBySlug(application.departmentSlug);

  return NextResponse.json({
    applicationNo: application.applicationNo,
    printToken,
    maskedName: maskName(application.prefix, application.firstName, application.lastName),
    admissionLevel: getLevelLabel(application.admissionLevel),
    departmentSlug: application.departmentSlug,
    departmentName: department?.name ?? application.departmentSlug,
    status: application.status,
    statusLabel: getApplicationStatusLabel(application.status),
    submittedAt: application.submittedAt,
  });
}
