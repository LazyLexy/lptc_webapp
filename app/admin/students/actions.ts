"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

async function requireAdmin() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    throw new Error("ไม่มีสิทธิ์ใช้งานส่วนผู้ดูแลระบบ");
  }
}

const studentImportRowSchema = z.object({
  studentCode: z.string().trim().min(1),
  fullName: z.string().trim().min(1),
  departmentSlug: z.string().trim().min(1),
  classRoom: z.string().trim().optional(),
});

const studentImportSchema = z.array(studentImportRowSchema).min(1);

export async function importStudents(rows: unknown) {
  await requireAdmin();
  const parsed = studentImportSchema.safeParse(rows);

  if (!parsed.success) {
    return { success: false, message: "รูปแบบไฟล์ไม่ถูกต้อง กรุณาตรวจคอลัมน์ studentCode, fullName, departmentSlug" };
  }

  let created = 0;
  let updated = 0;
  const skipped: string[] = [];

  for (const row of parsed.data) {
    const department = await db.department.findUnique({
      where: { slug: row.departmentSlug },
      select: { id: true },
    });

    if (!department) {
      skipped.push(row.studentCode);
      continue;
    }

    const existing = await db.student.findUnique({
      where: { studentCode: row.studentCode },
      select: { id: true, passwordHash: true },
    });
    const passwordHash = existing?.passwordHash ?? await bcrypt.hash(row.studentCode, 10);

    await db.student.upsert({
      where: { studentCode: row.studentCode },
      update: {
        departmentId: department.id,
        fullName: row.fullName,
        classRoom: row.classRoom || null,
        passwordHash,
      },
      create: {
        departmentId: department.id,
        studentCode: row.studentCode,
        passwordHash,
        fullName: row.fullName,
        classRoom: row.classRoom || null,
      },
    });

    if (existing) updated += 1;
    else created += 1;
  }

  return {
    success: true,
    message: `นำเข้าแล้ว ${created} รายการ อัปเดต ${updated} รายการ ข้าม ${skipped.length} รายการ`,
    skipped,
  };
}

const studentAccountSchema = z.object({
  studentCode: z.string().trim().min(1),
  fullName: z.string().trim().min(2),
  departmentId: z.string().trim().min(1),
  classRoom: z.string().trim().optional(),
  password: z.string().min(6).optional().or(z.literal("")),
});

export async function createStudentAccount(values: unknown) {
  await requireAdmin();
  const parsed = studentAccountSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, message: "กรุณากรอกข้อมูลนักศึกษาให้ครบถ้วน" };
  }

  const password = parsed.data.password || parsed.data.studentCode;
  const passwordHash = await bcrypt.hash(password, 10);

  await db.student.upsert({
    where: { studentCode: parsed.data.studentCode },
    update: {
      departmentId: parsed.data.departmentId,
      fullName: parsed.data.fullName,
      classRoom: parsed.data.classRoom || null,
      passwordHash,
    },
    create: {
      departmentId: parsed.data.departmentId,
      studentCode: parsed.data.studentCode,
      fullName: parsed.data.fullName,
      classRoom: parsed.data.classRoom || null,
      passwordHash,
    },
  });

  revalidatePath("/admin/students");
  return { success: true, message: "บันทึกบัญชีนักศึกษาเรียบร้อยแล้ว" };
}

export async function resetStudentPassword(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const student = await db.student.findUnique({
    where: { id },
    select: { studentCode: true },
  });

  if (!student) {
    throw new Error("ไม่พบนักศึกษา");
  }

  await db.student.update({
    where: { id },
    data: { passwordHash: await bcrypt.hash(student.studentCode, 10) },
  });

  revalidatePath("/admin/students");
}

const staffSchema = z.object({
  fullName: z.string().trim().min(2),
  email: z.string().trim().email(),
  password: z.string().min(6),
  role: z.enum(["ADMIN", "TEACHER"]),
  departmentId: z.string().optional(),
});

export async function createStaff(values: unknown) {
  await requireAdmin();
  const parsed = staffSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, message: "กรุณากรอกข้อมูลบุคลากรให้ครบถ้วน" };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  await db.staff.create({
    data: {
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      passwordHash,
      role: parsed.data.role,
      departmentId: parsed.data.departmentId || null,
    },
  });

  return { success: true, message: "เพิ่มบัญชีบุคลากรเรียบร้อยแล้ว" };
}

export async function saveSettings(values: Record<string, string>) {
  await requireAdmin();
  const allowedKeys = [
    "college.name",
    "college.address",
    "college.phone",
    "college.email",
    "geofence.lat",
    "geofence.lng",
    "geofence.radius",
  ];

  for (const key of allowedKeys) {
    await db.setting.upsert({
      where: { key },
      update: { value: String(values[key] ?? "") },
      create: { key, value: String(values[key] ?? "") },
    });
  }

  return { success: true, message: "บันทึกการตั้งค่าเรียบร้อยแล้ว" };
}
