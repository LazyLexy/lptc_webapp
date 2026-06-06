"use server";

import { db } from "@/lib/db";
import { admissionSchema } from "@/lib/admission-schema";

export type AdmissionActionState = {
  success: boolean;
  message: string;
  fieldErrors?: Partial<Record<"fullName" | "phone" | "email" | "level" | "departmentSlug" | "note", string>>;
};

export async function submitAdmission(values: unknown): Promise<AdmissionActionState> {
  const parsed = admissionSchema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors: AdmissionActionState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof NonNullable<AdmissionActionState["fieldErrors"]>;
      fieldErrors[field] = issue.message;
    }

    return {
      success: false,
      message: "กรุณาตรวจสอบข้อมูลในฟอร์ม",
      fieldErrors,
    };
  }

  try {
    const department = await db.department.findUnique({
      where: { slug: parsed.data.departmentSlug },
      select: { id: true },
    });

    if (!department) {
      return {
        success: false,
        message: "ยังไม่พบแผนกวิชาที่เลือกในระบบรับสมัคร",
        fieldErrors: { departmentSlug: "กรุณาเลือกแผนกวิชาที่เปิดรับสมัคร" },
      };
    }

    await db.admission.create({
      data: {
        departmentId: department.id,
        fullName: parsed.data.fullName,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        level: parsed.data.level,
        note: parsed.data.note || null,
      },
    });

    return {
      success: true,
      message: "ส่งข้อมูลสมัครเรียนเรียบร้อยแล้ว เจ้าหน้าที่จะตรวจสอบและติดต่อกลับ",
    };
  } catch {
    return {
      success: false,
      message: "ยังไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่หรือติดต่อวิทยาลัยโดยตรง",
    };
  }
}
