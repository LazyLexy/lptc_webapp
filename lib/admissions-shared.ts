import { z } from "zod";

export const admissionLevels = [
  { value: "PVOC", label: "ปวช.", programLevel: "ปวช." },
  { value: "HIGH_VOC", label: "ปวส.", programLevel: "ปวส." },
] as const;

export const documentTypes = [
  { type: "CITIZEN_ID", title: "สำเนาบัตรประชาชนผู้สมัคร", required: true },
  { type: "TRANSCRIPT", title: "ใบรายงานผลการศึกษา / ปพ.", required: true },
  { type: "PHOTO", title: "รูปถ่ายหน้าตรง", required: true },
  { type: "HOUSE_REGISTRATION", title: "สำเนาทะเบียนบ้านผู้สมัคร", required: true },
  { type: "FATHER_CITIZEN_ID", title: "สำเนาบัตรประชาชนบิดา", required: false },
  { type: "MOTHER_CITIZEN_ID", title: "สำเนาบัตรประชาชนมารดา", required: false },
  { type: "GUARDIAN_CITIZEN_ID", title: "สำเนาบัตรประชาชนผู้ปกครอง", required: false },
  { type: "OTHER", title: "เอกสารอื่น ๆ", required: false },
] as const;

const requiredText = (label: string) => z.string().trim().min(1, `${label}จำเป็นต้องกรอก`);
const optionalText = z.string().trim().optional().or(z.literal(""));
const optionalBoolean = z.boolean().optional().default(true);
const thaiPhonePattern = /^$|^0[689]\d{8}$|^0[2-7]\d{7,8}$/;
const thaiPhoneRequiredPattern = /^0[689]\d{8}$|^0[2-7]\d{7,8}$/;

const optionalPhone = (label: string) =>
  z.string().trim().regex(thaiPhonePattern, `${label}ไม่ถูกต้อง`).optional().or(z.literal(""));

const optionalNumber = (label: string, min = 0, max = Number.MAX_SAFE_INTEGER) =>
  z
    .union([z.number(), z.string().trim()])
    .optional()
    .transform((value) => (value === "" || value === undefined ? undefined : Number(value)))
    .refine(
      (value) => value === undefined || (Number.isFinite(value) && value >= min && value <= max),
      `${label}ต้องเป็นตัวเลขที่ถูกต้อง`,
    );

const thaiPhoneSchema = z
  .string()
  .trim()
  .regex(thaiPhoneRequiredPattern, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง");

const citizenIdSchema = z
  .string()
  .trim()
  .regex(/^\d{13}$/, "เลขบัตรประชาชนต้องเป็นตัวเลข 13 หลัก");

export const admissionSubmitSchema = z.object({
  prefix: requiredText("คำนำหน้า"),
  firstName: requiredText("ชื่อ"),
  lastName: requiredText("นามสกุล"),
  nickName: optionalText,
  citizenId: citizenIdSchema,
  birthDate: optionalText,
  birthProvince: optionalText,
  age: optionalNumber("อายุ", 0, 120),
  bloodType: optionalText,
  weight: optionalNumber("น้ำหนัก", 0, 300),
  height: optionalNumber("ส่วนสูง", 0, 250),
  disabilityStatus: optionalText,
  disabilityDetail: optionalText,
  ethnicity: optionalText,
  nationality: optionalText,
  religion: optionalText,
  homePhone: optionalPhone("โทรศัพท์บ้าน"),
  phone: thaiPhoneSchema,
  email: z.string().trim().email("รูปแบบอีเมลไม่ถูกต้อง").optional().or(z.literal("")),
  specialAbility: optionalText,

  houseCode: optionalText,
  houseNo: optionalText,
  villageNo: optionalText,
  soi: optionalText,
  road: optionalText,
  province: optionalText,
  district: optionalText,
  subDistrict: optionalText,
  postalCode: z.string().trim().regex(/^$|^\d{5}$/, "รหัสไปรษณีย์ต้องเป็นตัวเลข 5 หลัก").optional().or(z.literal("")),
  contactAddressSameAsHouseAddress: optionalBoolean,
  contactHouseNo: optionalText,
  contactVillageNo: optionalText,
  contactSoi: optionalText,
  contactRoad: optionalText,
  contactProvince: optionalText,
  contactDistrict: optionalText,
  contactSubDistrict: optionalText,
  contactPostalCode: z.string().trim().regex(/^$|^\d{5}$/, "รหัสไปรษณีย์ติดต่อกลับต้องเป็นตัวเลข 5 หลัก").optional().or(z.literal("")),
  contactPhone: optionalPhone("โทรศัพท์ติดต่อกลับ"),

  fatherPrefix: optionalText,
  fatherFirstName: optionalText,
  fatherLastName: optionalText,
  fatherDisabilityStatus: optionalText,
  fatherLivingStatus: optionalText,
  fatherOccupation: optionalText,
  fatherMonthlyIncome: optionalNumber("รายได้บิดา"),
  fatherPhone: optionalPhone("เบอร์โทรศัพท์บิดา"),
  motherPrefix: optionalText,
  motherFirstName: optionalText,
  motherLastName: optionalText,
  motherDisabilityStatus: optionalText,
  motherLivingStatus: optionalText,
  motherOccupation: optionalText,
  motherMonthlyIncome: optionalNumber("รายได้มารดา"),
  motherPhone: optionalPhone("เบอร์โทรศัพท์มารดา"),
  parentMaritalStatus: optionalText,
  totalSiblings: optionalNumber("จำนวนพี่น้อง", 0, 30),
  studyingSiblings: optionalNumber("จำนวนพี่น้องที่กำลังศึกษา", 0, 30),
  guardianPrefix: optionalText,
  guardianFirstName: optionalText,
  guardianLastName: optionalText,
  guardianOccupation: optionalText,
  guardianMonthlyIncome: optionalNumber("รายได้ผู้ปกครอง"),
  guardianPhone: optionalPhone("เบอร์โทรศัพท์ผู้ปกครอง"),
  guardianRelationship: optionalText,
  guardianName: optionalText,
  relationship: optionalText,

  previousEducationLevel: optionalText,
  previousSchool: optionalText,
  previousSchoolProvince: optionalText,
  previousClassLevel: optionalText,
  graduationYear: optionalText,
  previousMajor: optionalText,
  gpax: optionalNumber("GPAX", 0, 4),

  admissionYear: requiredText("ปีการศึกษา"),
  admissionRound: optionalText,
  admissionType: optionalText,
  admissionLevel: z.enum(["PVOC", "HIGH_VOC"], { error: "กรุณาเลือกระดับที่สมัคร" }),
  departmentSlug: requiredText("แผนกวิชา"),
  programSlug: optionalText,
  majorSlug: optionalText,
  branchName: optionalText,
  documents: z
    .array(
      z.object({
        type: z.enum([
          "CITIZEN_ID",
          "TRANSCRIPT",
          "PHOTO",
          "HOUSE_REGISTRATION",
          "FATHER_CITIZEN_ID",
          "MOTHER_CITIZEN_ID",
          "GUARDIAN_CITIZEN_ID",
          "OTHER",
        ]),
        title: z.string(),
        fileName: z.string().optional(),
        filePath: z.string().optional(),
        fileSize: z.number().int().positive().optional(),
        mimeType: z.string().optional(),
      }),
    )
    .default([]),
  consentAccepted: z.literal(true, { error: "ต้องยืนยันข้อมูลก่อนส่งใบสมัคร" }),
});

export const admissionSearchSchema = z
  .object({
    citizenId: citizenIdSchema,
    phone: z.string().trim().optional(),
    birthDate: z.string().trim().optional(),
  })
  .refine(
    (value) => Boolean(value.phone || value.birthDate),
    "กรุณากรอกเบอร์โทรศัพท์หรือวันเกิดเพื่อยืนยันตัวตน",
  );

export type AdmissionSubmitInput = z.infer<typeof admissionSubmitSchema>;
