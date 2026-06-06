import { z } from "zod";

export const admissionSchema = z.object({
  fullName: z.string().trim().min(2, "กรุณากรอกชื่อ-นามสกุล"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{9,15}$/, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"),
  email: z.string().trim().email("กรุณากรอกอีเมลให้ถูกต้อง").optional().or(z.literal("")),
  level: z.enum(["CERTIFICATE", "DIPLOMA"], {
    message: "กรุณาเลือกระดับที่ต้องการสมัคร",
  }),
  departmentSlug: z.string().trim().min(1, "กรุณาเลือกแผนกวิชา"),
  note: z.string().trim().max(500, "หมายเหตุต้องไม่เกิน 500 ตัวอักษร").optional(),
});

export type AdmissionFormValues = z.infer<typeof admissionSchema>;
