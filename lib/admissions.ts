import crypto from "crypto";

import { db } from "@/lib/db";

export { admissionLevels, admissionSearchSchema, admissionSubmitSchema, documentTypes } from "@/lib/admissions-shared";

export function hashCitizenId(citizenId: string) {
  return crypto.createHash("sha256").update(`lptc:${citizenId}`).digest("hex");
}

export function hashPrintToken(token: string) {
  return crypto.createHash("sha256").update(`lptc-print:${token}`).digest("hex");
}

export function createPrintToken() {
  return crypto.randomBytes(32).toString("base64url");
}

export function getPrintTokenExpiry(minutes = 15) {
  return new Date(Date.now() + minutes * 60 * 1000);
}

export function maskCitizenId(citizenId: string) {
  return `${citizenId.slice(0, 1)}-${citizenId.slice(1, 5)}-xxxxx-${citizenId.slice(10, 12)}-${citizenId.slice(12)}`;
}

export function maskName(prefix: string, firstName: string, lastName: string) {
  return `${prefix} ${firstName.slice(0, 1)}*** ${lastName.slice(0, 1)}***`;
}

export function maybeEncryptCitizenId(citizenId: string) {
  const key = process.env.CITIZEN_ID_ENCRYPTION_KEY;
  // TODO: Require a stable 32-byte CITIZEN_ID_ENCRYPTION_KEY in production before storing decryptable citizen IDs.
  if (!key || key.length < 32) return undefined;

  const normalizedKey = crypto.createHash("sha256").update(key).digest();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", normalizedKey, iv);
  const encrypted = Buffer.concat([cipher.update(citizenId, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("hex")}:${tag.toString("hex")}:${encrypted.toString("hex")}`;
}

export function parseOptionalDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function generateApplicationNo(admissionYear: string) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const count = await db.admissionApplication.count({
      where: { admissionYear },
    });
    const number = String(count + attempt + 1).padStart(6, "0");
    const applicationNo = `LPTC${admissionYear}-${number}`;
    const existing = await db.admissionApplication.findUnique({
      where: { applicationNo },
      select: { id: true },
    });
    if (!existing) return applicationNo;
  }

  return `LPTC${admissionYear}-${Date.now().toString().slice(-6)}`;
}

export function getLevelLabel(level: string) {
  if (level === "PVOC") return "ปวช.";
  if (level === "HIGH_VOC") return "ปวส.";
  return level;
}

export function getApplicationStatusLabel(status: string) {
  const labels: Record<string, string> = {
    DRAFT: "ฉบับร่าง",
    SUBMITTED: "ส่งใบสมัครแล้ว",
    REVIEWING: "อยู่ระหว่างตรวจสอบ",
    NEED_MORE_DOCUMENTS: "ต้องแก้ไขเอกสาร",
    ACCEPTED: "ผ่านการตรวจสอบ",
    REJECTED: "ไม่ผ่านการตรวจสอบ",
  };

  return labels[status] ?? status;
}

export function documentStatusFor(filePath?: string): "UPLOADED" | "PENDING" {
  return filePath ? "UPLOADED" : "PENDING";
}
