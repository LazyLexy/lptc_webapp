"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, FileText, FileUp, Send } from "lucide-react";

import { admissionSubmitSchema, documentTypes } from "@/lib/admissions-shared";
import type { DepartmentSummary } from "@/lib/public-content";
import { readJsonResponse } from "@/lib/safe-json";

type FormState = {
  prefix: string;
  firstName: string;
  lastName: string;
  nickName: string;
  citizenId: string;
  birthDate: string;
  birthProvince: string;
  age: string;
  bloodType: string;
  weight: string;
  height: string;
  disabilityStatus: string;
  disabilityDetail: string;
  ethnicity: string;
  nationality: string;
  religion: string;
  homePhone: string;
  phone: string;
  email: string;
  specialAbility: string;
  houseCode: string;
  houseNo: string;
  villageNo: string;
  soi: string;
  road: string;
  province: string;
  district: string;
  subDistrict: string;
  postalCode: string;
  contactAddressSameAsHouseAddress: boolean;
  contactHouseNo: string;
  contactVillageNo: string;
  contactSoi: string;
  contactRoad: string;
  contactProvince: string;
  contactDistrict: string;
  contactSubDistrict: string;
  contactPostalCode: string;
  contactPhone: string;
  fatherPrefix: string;
  fatherFirstName: string;
  fatherLastName: string;
  fatherDisabilityStatus: string;
  fatherLivingStatus: string;
  fatherOccupation: string;
  fatherMonthlyIncome: string;
  fatherPhone: string;
  motherPrefix: string;
  motherFirstName: string;
  motherLastName: string;
  motherDisabilityStatus: string;
  motherLivingStatus: string;
  motherOccupation: string;
  motherMonthlyIncome: string;
  motherPhone: string;
  parentMaritalStatus: string;
  totalSiblings: string;
  studyingSiblings: string;
  guardianPrefix: string;
  guardianFirstName: string;
  guardianLastName: string;
  guardianOccupation: string;
  guardianMonthlyIncome: string;
  guardianPhone: string;
  guardianRelationship: string;
  previousEducationLevel: string;
  previousSchool: string;
  previousSchoolProvince: string;
  previousClassLevel: string;
  graduationYear: string;
  previousMajor: string;
  gpax: string;
  admissionYear: string;
  admissionRound: string;
  admissionType: string;
  admissionLevel: "PVOC" | "HIGH_VOC";
  departmentSlug: string;
  programSlug: string;
  majorSlug: string;
  branchName: string;
  consentAccepted: boolean;
};

type UploadedDocument = {
  type: string;
  title: string;
  fileName?: string;
  filePath?: string;
  fileSize?: number;
  mimeType?: string;
  error?: string;
};

type FieldConfig = {
  name: keyof FormState;
  label: string;
  required?: boolean;
  type?: string;
  inputMode?: "numeric" | "decimal" | "tel" | "email";
  span?: string;
  placeholder?: string;
  options?: readonly string[];
};

const steps = [
  "ข้อมูลผู้สมัคร",
  "ข้อมูลที่อยู่",
  "ข้อมูลบิดาและมารดา",
  "ข้อมูลการศึกษาเดิม",
  "หลักสูตรและสาขาที่สมัคร",
  "เอกสารประกอบการสมัคร",
  "ตรวจสอบและยืนยันข้อมูล",
];

const initialForm: FormState = {
  prefix: "นาย",
  firstName: "",
  lastName: "",
  nickName: "",
  citizenId: "",
  birthDate: "",
  birthProvince: "",
  age: "",
  bloodType: "",
  weight: "",
  height: "",
  disabilityStatus: "ไม่พิการ",
  disabilityDetail: "",
  ethnicity: "ไทย",
  nationality: "ไทย",
  religion: "",
  homePhone: "",
  phone: "",
  email: "",
  specialAbility: "",
  houseCode: "",
  houseNo: "",
  villageNo: "",
  soi: "",
  road: "",
  province: "",
  district: "",
  subDistrict: "",
  postalCode: "",
  contactAddressSameAsHouseAddress: true,
  contactHouseNo: "",
  contactVillageNo: "",
  contactSoi: "",
  contactRoad: "",
  contactProvince: "",
  contactDistrict: "",
  contactSubDistrict: "",
  contactPostalCode: "",
  contactPhone: "",
  fatherPrefix: "นาย",
  fatherFirstName: "",
  fatherLastName: "",
  fatherDisabilityStatus: "ไม่พิการ",
  fatherLivingStatus: "มีชีวิต",
  fatherOccupation: "",
  fatherMonthlyIncome: "",
  fatherPhone: "",
  motherPrefix: "นาง",
  motherFirstName: "",
  motherLastName: "",
  motherDisabilityStatus: "ไม่พิการ",
  motherLivingStatus: "มีชีวิต",
  motherOccupation: "",
  motherMonthlyIncome: "",
  motherPhone: "",
  parentMaritalStatus: "",
  totalSiblings: "",
  studyingSiblings: "",
  guardianPrefix: "",
  guardianFirstName: "",
  guardianLastName: "",
  guardianOccupation: "",
  guardianMonthlyIncome: "",
  guardianPhone: "",
  guardianRelationship: "",
  previousEducationLevel: "",
  previousSchool: "",
  previousSchoolProvince: "",
  previousClassLevel: "",
  graduationYear: "",
  previousMajor: "",
  gpax: "",
  admissionYear: "2569",
  admissionRound: "รอบทั่วไป",
  admissionType: "ทั่วไป",
  admissionLevel: "PVOC",
  departmentSlug: "",
  programSlug: "",
  majorSlug: "",
  branchName: "",
  consentAccepted: false,
};

const fieldClass =
  "min-h-11 rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-blue-700 focus:ring-4 focus:ring-blue-100";
const labelClass = "grid gap-1.5 text-sm font-bold text-slate-700";
const errorClass = "text-sm font-semibold text-red-600";

const requiredDocumentTypes = ["CITIZEN_ID", "TRANSCRIPT", "PHOTO", "HOUSE_REGISTRATION"];
const prefixOptions = ["นาย", "นาง", "นางสาว", "เด็กชาย", "เด็กหญิง"] as const;
const disabilityOptions = ["ไม่พิการ", "พิการ"] as const;
const livingStatusOptions = ["มีชีวิต", "เสียชีวิต"] as const;
const bloodTypeOptions = ["", "A", "B", "AB", "O"] as const;
const maritalStatusOptions = ["", "อยู่ด้วยกัน", "แยกกันอยู่", "หย่าร้าง", "อื่น ๆ"] as const;

function formatFileSize(size?: number) {
  if (!size) return "";
  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}

function asNumber(value: string) {
  return value.trim() ? Number(value) : undefined;
}

export default function AdmissionStepForm({ departments }: { departments: DepartmentSummary[] }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({ ...initialForm, departmentSlug: departments[0]?.slug ?? "" });
  const [documents, setDocuments] = useState<UploadedDocument[]>(
    documentTypes.map((document) => ({ type: document.type, title: document.title })),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedLevelLabel = form.admissionLevel === "PVOC" ? "ปวช." : "ปวส.";
  const availableDepartments = useMemo(
    () => departments.filter((department) => department.programLevels.includes(selectedLevelLabel)),
    [departments, selectedLevelLabel],
  );
  const selectedDepartment = departments.find((department) => department.slug === form.departmentSlug);

  function updateField(name: keyof FormState, value: string | boolean) {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function validateCurrentStep() {
    const requiredByStep: Record<number, (keyof FormState)[]> = {
      0: ["prefix", "firstName", "lastName", "citizenId", "phone"],
      1: [],
      2: [],
      3: [],
      4: ["admissionYear", "admissionLevel", "departmentSlug"],
      5: [],
      6: ["consentAccepted"],
    };
    const nextErrors: Record<string, string> = {};

    for (const key of requiredByStep[step] ?? []) {
      if (!form[key]) nextErrors[key] = "จำเป็นต้องกรอก";
    }

    if (step === 0 && form.citizenId && !/^\d{13}$/.test(form.citizenId)) {
      nextErrors.citizenId = "เลขบัตรประชาชนต้องเป็นตัวเลข 13 หลัก";
    }
    if (step === 0 && form.phone && !/^0[689]\d{8}$|^0[2-7]\d{7,8}$/.test(form.phone)) {
      nextErrors.phone = "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง";
    }
    if (step === 0 && form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    }
    if (step === 3 && form.gpax) {
      const gpax = Number(form.gpax);
      if (!Number.isFinite(gpax) || gpax < 0 || gpax > 4) nextErrors.gpax = "GPAX ต้องอยู่ระหว่าง 0.00 - 4.00";
    }

    const requiredDocumentsMissing = documents.filter((document) =>
      requiredDocumentTypes.includes(document.type) && !document.fileName,
    );
    if (step === 5 && requiredDocumentsMissing.length) {
      nextErrors.documents = "กรุณาแนบเอกสารที่จำเป็นให้ครบ";
    }
    if (step === 6 && !form.consentAccepted) {
      nextErrors.consentAccepted = "ต้องยืนยันข้อมูลก่อนส่งใบสมัคร";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function nextStep() {
    if (!validateCurrentStep()) return;
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function previousStep() {
    setStep((current) => Math.max(current - 1, 0));
  }

  async function handleFile(type: string, file?: File) {
    if (!file) return;
    const isPhoto = type === "PHOTO";
    const allowed = isPhoto ? ["image/png", "image/jpeg"] : ["image/png", "image/jpeg", "application/pdf"];
    const maxSize = 2 * 1024 * 1024;
    const title = documents.find((document) => document.type === type)?.title ?? "เอกสาร";

    if (!allowed.includes(file.type)) {
      setDocuments((items) => items.map((item) => item.type === type ? { ...item, error: isPhoto ? "รูปถ่ายต้องเป็น png, jpg หรือ jpeg" : "รองรับเฉพาะ png, jpg, jpeg หรือ pdf" } : item));
      return;
    }

    if (file.size > maxSize) {
      setDocuments((items) => items.map((item) => item.type === type ? { ...item, error: "ขนาดไฟล์ต้องไม่เกิน 2MB" } : item));
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", type);

    const response = await fetch("/api/admissions/upload", { method: "POST", body: formData });
    const result = await readJsonResponse<{
      message?: string;
      fileName?: string;
      filePath?: string;
      fileSize?: number;
      mimeType?: string;
    }>(response, { message: "อัปโหลดไม่สำเร็จ" });

    if (!response.ok) {
      setDocuments((items) => items.map((item) => item.type === type ? { ...item, error: result.message ?? "อัปโหลดไม่สำเร็จ" } : item));
      return;
    }

    setDocuments((items) => items.map((item) => item.type === type ? {
      type,
      title,
      fileName: result.fileName ?? file.name,
      filePath: result.filePath,
      fileSize: result.fileSize,
      mimeType: result.mimeType,
    } : item));
    setErrors((current) => {
      const next = { ...current };
      delete next.documents;
      return next;
    });
  }

  async function submit() {
    if (!validateCurrentStep()) return;
    setIsSubmitting(true);
    setSubmitError("");

    const guardianName = [form.guardianPrefix, form.guardianFirstName, form.guardianLastName].filter(Boolean).join(" ");
    const payload = {
      ...form,
      age: asNumber(form.age),
      weight: asNumber(form.weight),
      height: asNumber(form.height),
      fatherMonthlyIncome: asNumber(form.fatherMonthlyIncome),
      motherMonthlyIncome: asNumber(form.motherMonthlyIncome),
      totalSiblings: asNumber(form.totalSiblings),
      studyingSiblings: asNumber(form.studyingSiblings),
      guardianMonthlyIncome: asNumber(form.guardianMonthlyIncome),
      gpax: asNumber(form.gpax),
      guardianName,
      relationship: form.guardianRelationship,
      documents: documents.map(({ type, title, fileName, filePath, fileSize, mimeType }) => ({
        type,
        title,
        fileName,
        filePath,
        fileSize,
        mimeType,
      })),
    };
    const parsed = admissionSubmitSchema.safeParse(payload);

    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        nextErrors[String(issue.path[0])] = issue.message;
      }
      setErrors(nextErrors);
      setIsSubmitting(false);
      return;
    }

    const response = await fetch("/api/admissions/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    const result = await readJsonResponse<{ message?: string; applicationNo?: string }>(
      response,
      { message: "ส่งใบสมัครไม่สำเร็จ" },
    );
    setIsSubmitting(false);

    if (!response.ok) {
      setSubmitError(result.message ?? "ส่งใบสมัครไม่สำเร็จ");
      return;
    }

    if (!result.applicationNo) {
      setSubmitError("ส่งใบสมัครสำเร็จไม่สมบูรณ์ ระบบยังไม่ส่งเลขที่ใบสมัครกลับมา");
      return;
    }

    router.push(`/admissions/success/${result.applicationNo}`);
  }

  return (
    <div className="grid gap-6">
      <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element -- Public college logo is small and stable in this official form header. */}
            <img src="/logo/lptclogo.png" alt="โลโก้วิทยาลัยเทคนิคลำปาง" className="h-16 w-16 rounded-full object-contain" />
            <div>
              <p className="text-base font-black text-blue-800">วิทยาลัยเทคนิคลำปาง</p>
              <h2 className="text-2xl font-black text-slate-950">ใบสมัครเข้าศึกษาต่อออนไลน์</h2>
              <p className="text-base text-slate-600">ปีการศึกษา {form.admissionYear} ประเภทการสมัคร {form.admissionType || "ทั่วไป"}</p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
            ระดับที่เลือก: <span className="text-blue-800">{selectedLevelLabel}</span>
          </div>
        </div>
      </section>

      <nav className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm" aria-label="ขั้นตอนการสมัคร">
        <div className="grid gap-2 md:grid-cols-7">
          {steps.map((item, index) => (
            <button
              key={item}
              type="button"
              onClick={() => index < step && setStep(index)}
              className={`rounded-lg px-3 py-2 text-left text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                index === step ? "bg-blue-800 text-white" : index < step ? "bg-blue-50 text-blue-800 hover:bg-blue-100" : "bg-slate-100 text-slate-500"
              }`}
            >
              {index + 1}. {item}
            </button>
          ))}
        </div>
      </nav>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-5 border-b border-slate-200 pb-4">
          <p className="text-base font-black text-blue-800">ตอนที่ {step + 1}</p>
          <h2 className="text-2xl font-black text-slate-950">{steps[step]}</h2>
        </div>

        {step === 0 ? (
          <div className="grid gap-5">
            <FieldGrid fields={[
              { name: "prefix", label: "คำนำหน้า", required: true, options: prefixOptions },
              { name: "firstName", label: "ชื่อ", required: true },
              { name: "lastName", label: "นามสกุล", required: true },
              { name: "nickName", label: "ชื่อเล่น" },
              { name: "citizenId", label: "เลขบัตรประชาชน", required: true, inputMode: "numeric" },
              { name: "birthDate", label: "วันเกิด", type: "date" },
              { name: "birthProvince", label: "จังหวัดที่เกิด" },
              { name: "age", label: "อายุ", inputMode: "numeric" },
              { name: "bloodType", label: "หมู่เลือด", options: bloodTypeOptions },
              { name: "weight", label: "น้ำหนัก", inputMode: "decimal" },
              { name: "height", label: "ส่วนสูง", inputMode: "decimal" },
              { name: "disabilityStatus", label: "ความพิการ", options: disabilityOptions },
              { name: "disabilityDetail", label: "รายละเอียดความพิการ", span: "md:col-span-2" },
              { name: "ethnicity", label: "เชื้อชาติ" },
              { name: "nationality", label: "สัญชาติ" },
              { name: "religion", label: "ศาสนา" },
              { name: "homePhone", label: "โทรศัพท์บ้าน", inputMode: "tel" },
              { name: "phone", label: "โทรศัพท์มือถือ", required: true, inputMode: "tel" },
              { name: "email", label: "อีเมล", inputMode: "email" },
              { name: "specialAbility", label: "ความสามารถพิเศษ", span: "md:col-span-3" },
            ]} form={form} errors={errors} updateField={updateField} />
          </div>
        ) : null}

        {step === 1 ? (
          <div className="grid gap-5">
            <FieldGrid fields={[
              { name: "houseCode", label: "รหัสบ้าน" },
              { name: "houseNo", label: "บ้านเลขที่" },
              { name: "villageNo", label: "หมู่" },
              { name: "soi", label: "ซอย" },
              { name: "road", label: "ถนน" },
              { name: "subDistrict", label: "ตำบล" },
              { name: "district", label: "อำเภอ" },
              { name: "province", label: "จังหวัด" },
              { name: "postalCode", label: "รหัสไปรษณีย์", inputMode: "numeric" },
            ]} form={form} errors={errors} updateField={updateField} />
            <label className="flex items-start gap-3 rounded-xl bg-blue-50 p-4 text-base font-bold text-blue-950">
              <input
                type="checkbox"
                checked={form.contactAddressSameAsHouseAddress}
                onChange={(event) => updateField("contactAddressSameAsHouseAddress", event.target.checked)}
                className="mt-1 h-5 w-5 rounded border-slate-300 text-blue-800 focus:ring-blue-100"
              />
              ที่อยู่ติดต่อใช้ที่อยู่เดียวกับที่อยู่ตามทะเบียนบ้าน
            </label>
            {!form.contactAddressSameAsHouseAddress ? (
              <FieldGrid fields={[
                { name: "contactHouseNo", label: "บ้านเลขที่ติดต่อ" },
                { name: "contactVillageNo", label: "หมู่" },
                { name: "contactSoi", label: "ซอย" },
                { name: "contactRoad", label: "ถนน" },
                { name: "contactSubDistrict", label: "ตำบล" },
                { name: "contactDistrict", label: "อำเภอ" },
                { name: "contactProvince", label: "จังหวัด" },
                { name: "contactPostalCode", label: "รหัสไปรษณีย์" },
                { name: "contactPhone", label: "โทรศัพท์ติดต่อกลับ", inputMode: "tel" },
              ]} form={form} errors={errors} updateField={updateField} />
            ) : null}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-6">
            <FormSubheading title="ข้อมูลบิดา" />
            <FieldGrid fields={[
              { name: "fatherPrefix", label: "คำนำหน้า", options: prefixOptions },
              { name: "fatherFirstName", label: "ชื่อบิดา" },
              { name: "fatherLastName", label: "นามสกุลบิดา" },
              { name: "fatherDisabilityStatus", label: "ความพิการ", options: disabilityOptions },
              { name: "fatherLivingStatus", label: "สถานะ", options: livingStatusOptions },
              { name: "fatherOccupation", label: "อาชีพ" },
              { name: "fatherMonthlyIncome", label: "รายได้ต่อเดือน", inputMode: "decimal" },
              { name: "fatherPhone", label: "เบอร์โทร", inputMode: "tel" },
            ]} form={form} errors={errors} updateField={updateField} />

            <FormSubheading title="ข้อมูลมารดา" />
            <FieldGrid fields={[
              { name: "motherPrefix", label: "คำนำหน้า", options: prefixOptions },
              { name: "motherFirstName", label: "ชื่อมารดา" },
              { name: "motherLastName", label: "นามสกุลมารดา" },
              { name: "motherDisabilityStatus", label: "ความพิการ", options: disabilityOptions },
              { name: "motherLivingStatus", label: "สถานะ", options: livingStatusOptions },
              { name: "motherOccupation", label: "อาชีพ" },
              { name: "motherMonthlyIncome", label: "รายได้ต่อเดือน", inputMode: "decimal" },
              { name: "motherPhone", label: "เบอร์โทร", inputMode: "tel" },
            ]} form={form} errors={errors} updateField={updateField} />

            <FormSubheading title="ข้อมูลครอบครัวและผู้ปกครอง" />
            <FieldGrid fields={[
              { name: "parentMaritalStatus", label: "สถานภาพบิดามารดา", options: maritalStatusOptions },
              { name: "totalSiblings", label: "จำนวนพี่น้องทั้งหมด", inputMode: "numeric" },
              { name: "studyingSiblings", label: "จำนวนพี่น้องที่กำลังศึกษา", inputMode: "numeric" },
              { name: "guardianPrefix", label: "คำนำหน้าผู้ปกครอง", options: prefixOptions },
              { name: "guardianFirstName", label: "ชื่อผู้ปกครอง" },
              { name: "guardianLastName", label: "นามสกุลผู้ปกครอง" },
              { name: "guardianOccupation", label: "อาชีพผู้ปกครอง" },
              { name: "guardianMonthlyIncome", label: "รายได้ผู้ปกครอง", inputMode: "decimal" },
              { name: "guardianPhone", label: "เบอร์โทรผู้ปกครอง", inputMode: "tel" },
              { name: "guardianRelationship", label: "ความสัมพันธ์", span: "md:col-span-2" },
            ]} form={form} errors={errors} updateField={updateField} />
          </div>
        ) : null}

        {step === 3 ? (
          <FieldGrid fields={[
            { name: "previousEducationLevel", label: "ระดับการศึกษาเดิม" },
            { name: "previousClassLevel", label: "ระดับชั้นที่จบ" },
            { name: "previousSchool", label: "สถานศึกษาเดิม" },
            { name: "previousSchoolProvince", label: "จังหวัดสถานศึกษา" },
            { name: "graduationYear", label: "ปีที่จบ" },
            { name: "previousMajor", label: "สาขา/แผนการเรียนเดิม" },
            { name: "gpax", label: "GPAX", inputMode: "decimal" },
          ]} form={form} errors={errors} updateField={updateField} />
        ) : null}

        {step === 4 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <FieldGrid fields={[
              { name: "admissionYear", label: "ปีการศึกษา", required: true },
              { name: "admissionRound", label: "รอบรับสมัคร" },
              { name: "admissionType", label: "ประเภทการสมัคร" },
            ]} form={form} errors={errors} updateField={updateField} />
            <label className={labelClass}>
              <span>ระดับที่สมัคร <span className="text-red-600">*</span></span>
              <select className={fieldClass} value={form.admissionLevel} onChange={(event) => {
                const nextLevel = event.target.value as "PVOC" | "HIGH_VOC";
                const nextLabel = nextLevel === "PVOC" ? "ปวช." : "ปวส.";
                const nextDepartment = departments.find((department) => department.programLevels.includes(nextLabel));
                setForm((current) => ({ ...current, admissionLevel: nextLevel, departmentSlug: nextDepartment?.slug ?? "" }));
              }}>
                <option value="PVOC">ปวช.</option>
                <option value="HIGH_VOC">ปวส.</option>
              </select>
            </label>
            <label className={labelClass}>
              <span>แผนกวิชา <span className="text-red-600">*</span></span>
              <span className={errorClass}>{errors.departmentSlug}</span>
              <select className={fieldClass} value={form.departmentSlug} onChange={(event) => updateField("departmentSlug", event.target.value)}>
                {availableDepartments.map((department) => <option key={department.slug} value={department.slug}>{department.name}</option>)}
              </select>
            </label>
            <label className={labelClass}>
              รหัสหลักสูตร
              <input className={fieldClass} value={form.programSlug} onChange={(event) => updateField("programSlug", event.target.value)} placeholder="ถ้ามี" />
            </label>
            <label className={labelClass}>
              สาขางาน
              <input className={fieldClass} value={form.branchName} onChange={(event) => updateField("branchName", event.target.value)} />
            </label>
          </div>
        ) : null}

        {step === 5 ? (
          <div className="grid gap-5">
            {errors.documents ? <div className="rounded-xl bg-red-50 p-4 text-base font-bold text-red-700">{errors.documents}</div> : null}
            <div className="grid gap-4 md:grid-cols-2">
              {documentTypes.map((document) => {
                const item = documents.find((uploaded) => uploaded.type === document.type);
                return (
                  <label key={document.type} className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4">
                    <span className="text-base font-black text-slate-950">{document.title} {document.required ? <span className="text-red-600">*</span> : null}</span>
                    <input className={fieldClass} type="file" accept={document.type === "PHOTO" ? ".png,.jpg,.jpeg,image/png,image/jpeg" : ".png,.jpg,.jpeg,.pdf,image/png,image/jpeg,application/pdf"} onChange={(event) => handleFile(document.type, event.target.files?.[0])} />
                    {item?.fileName ? <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700"><CheckCircle2 className="h-4 w-4" />{item.fileName} {formatFileSize(item.fileSize)}</span> : <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500"><FileUp className="h-4 w-4" />ยังไม่อัปโหลด รองรับไฟล์ไม่เกิน 2MB</span>}
                    {item?.error ? <span className={errorClass}>{item.error}</span> : null}
                  </label>
                );
              })}
            </div>
          </div>
        ) : null}

        {step === 6 ? (
          <div className="grid gap-5">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-xl font-black text-slate-950">ตรวจสอบข้อมูลก่อนส่ง</h3>
              <dl className="mt-4 grid gap-3 text-base text-slate-700 md:grid-cols-2">
                <SummaryItem label="ชื่อผู้สมัคร" value={`${form.prefix} ${form.firstName} ${form.lastName}`} />
                <SummaryItem label="เลขบัตรประชาชน" value={form.citizenId.replace(/^(\d)(\d{4})(\d{5})(\d{2})(\d)$/, "$1-$2-xxxxx-$4-$5")} />
                <SummaryItem label="เบอร์โทร" value={form.phone} />
                <SummaryItem label="ระดับที่สมัคร" value={selectedLevelLabel} />
                <SummaryItem label="แผนก" value={selectedDepartment?.name ?? form.departmentSlug} />
                <SummaryItem label="สถานศึกษาเดิม" value={form.previousSchool || "ยังไม่ได้กรอก"} />
              </dl>
            </div>
            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="flex items-center gap-2 text-lg font-black text-slate-950"><FileText className="h-5 w-5 text-blue-800" /> เอกสารแนบ</h3>
              <ul className="mt-3 grid gap-2 text-base text-slate-700 md:grid-cols-2">
                {documents.map((document) => (
                  <li key={document.type} className="flex items-center gap-2">
                    {document.fileName ? <CheckCircle2 className="h-4 w-4 text-emerald-700" /> : <AlertCircle className="h-4 w-4 text-slate-400" />}
                    {document.title}: {document.fileName ? "อัปโหลดแล้ว" : "ยังไม่อัปโหลด"}
                  </li>
                ))}
              </ul>
            </div>
            <label className="flex items-start gap-3 rounded-xl bg-blue-50 p-4 text-base font-bold text-blue-950">
              <input
                type="checkbox"
                checked={form.consentAccepted}
                onChange={(event) => updateField("consentAccepted", event.target.checked)}
                className="mt-1 h-5 w-5 rounded border-slate-300 text-blue-800 focus:ring-blue-100"
              />
              ข้าพเจ้าขอรับรองว่าข้อมูลและหลักฐานในการสมัครเป็นความจริงทุกประการ
            </label>
            {errors.consentAccepted ? <span className={errorClass}>{errors.consentAccepted}</span> : null}
          </div>
        ) : null}

        {submitError ? (
          <div className="mt-6 flex gap-3 rounded-xl bg-red-50 p-4 text-base font-bold text-red-700">
            <AlertCircle className="h-5 w-5 shrink-0" />
            {submitError}
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={previousStep}
            disabled={step === 0}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 text-base font-black text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArrowLeft className="h-4 w-4" />
            ย้อนกลับ
          </button>
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-800 px-6 text-base font-black text-white transition hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              ถัดไป
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={isSubmitting}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-800 px-6 text-base font-black text-white transition hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? "กำลังส่งใบสมัคร" : "ส่งใบสมัคร"}
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

function FieldGrid({
  fields,
  form,
  errors,
  updateField,
}: {
  fields: FieldConfig[];
  form: FormState;
  errors: Record<string, string>;
  updateField: (name: keyof FormState, value: string | boolean) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {fields.map((field) => (
        <label key={String(field.name)} className={`${labelClass} ${field.span ?? ""}`}>
          <span>{field.label} {field.required ? <span className="text-red-600">*</span> : null}</span>
          {errors[String(field.name)] ? <span className={errorClass}>{errors[String(field.name)]}</span> : null}
          {field.options ? (
            <select
              className={fieldClass}
              value={String(form[field.name] ?? "")}
              onChange={(event) => updateField(field.name, event.target.value)}
            >
              {field.options.map((option) => (
                <option key={option} value={option}>{option || "เลือก"}</option>
              ))}
            </select>
          ) : (
            <input
              className={fieldClass}
              type={field.type ?? "text"}
              inputMode={field.inputMode}
              placeholder={field.placeholder}
              value={String(form[field.name] ?? "")}
              onChange={(event) => updateField(field.name, field.name === "citizenId" ? event.target.value.replace(/\D/g, "").slice(0, 13) : event.target.value)}
            />
          )}
        </label>
      ))}
    </div>
  );
}

function FormSubheading({ title }: { title: string }) {
  return <h3 className="border-b border-slate-200 pb-2 text-lg font-black text-blue-900">{title}</h3>;
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-black text-slate-950">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
