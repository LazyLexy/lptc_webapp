"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { useForm } from "react-hook-form";

import { admissionSchema, type AdmissionFormValues } from "@/lib/admission-schema";
import { submitAdmission, type AdmissionActionState } from "./actions";

type AdmissionDepartment = {
  name: string;
  slug: string;
};

type AdmissionFormProps = {
  departments: AdmissionDepartment[];
};

const levels = [
  { value: "CERTIFICATE", label: "ปวช.", description: "สำหรับผู้จบระดับมัธยมศึกษาตอนต้น" },
  { value: "DIPLOMA", label: "ปวส.", description: "สำหรับผู้จบ ปวช. หรือ ม.6 ตามเงื่อนไขหลักสูตร" },
] as const;

export default function AdmissionForm({ departments }: AdmissionFormProps) {
  const [result, setResult] = useState<AdmissionActionState | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      level: "CERTIFICATE",
      departmentSlug: departments[0]?.slug ?? "",
      note: "",
    },
  });

  function onSubmit(values: AdmissionFormValues) {
    startTransition(async () => {
      const response = await submitAdmission(values);
      setResult(response);
      if (response.success) {
        reset({
          fullName: "",
          phone: "",
          email: "",
          level: "CERTIFICATE",
          departmentSlug: departments[0]?.slug ?? "",
          note: "",
        });
      }
    });
  }

  const fieldClass =
    "min-h-12 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:ring-4 focus:ring-blue-100";
  const errorClass = "mt-2 text-sm font-semibold text-red-600";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="soft-panel p-5 sm:p-7" noValidate>
      <div className="grid gap-5">
        {result ? (
          <div
            className={`flex gap-3 rounded-3xl border p-4 text-sm font-semibold ${
              result.success
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
            role="status"
          >
            {result.success ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /> : <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />}
            <span>{result.message}</span>
          </div>
        ) : null}

        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-700">ชื่อ-นามสกุล</span>
            <input
              {...register("fullName")}
              className={fieldClass}
              aria-invalid={Boolean(errors.fullName || result?.fieldErrors?.fullName)}
              placeholder="กรอกชื่อผู้สมัคร"
            />
            {errors.fullName?.message || result?.fieldErrors?.fullName ? (
              <span className={errorClass}>{errors.fullName?.message ?? result?.fieldErrors?.fullName}</span>
            ) : null}
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-700">เบอร์โทรศัพท์</span>
            <input
              {...register("phone")}
              className={fieldClass}
              aria-invalid={Boolean(errors.phone || result?.fieldErrors?.phone)}
              placeholder="เช่น 0812345678"
              inputMode="tel"
            />
            {errors.phone?.message || result?.fieldErrors?.phone ? (
              <span className={errorClass}>{errors.phone?.message ?? result?.fieldErrors?.phone}</span>
            ) : null}
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">อีเมล</span>
          <input
            {...register("email")}
            className={fieldClass}
            aria-invalid={Boolean(errors.email || result?.fieldErrors?.email)}
            placeholder="name@example.com"
            inputMode="email"
          />
          {errors.email?.message || result?.fieldErrors?.email ? (
            <span className={errorClass}>{errors.email?.message ?? result?.fieldErrors?.email}</span>
          ) : null}
        </label>

        <fieldset className="grid gap-3">
          <legend className="text-sm font-bold text-slate-700">ระดับที่ต้องการสมัคร</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {levels.map((level) => (
              <label key={level.value} className="cursor-pointer rounded-3xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:bg-blue-50 focus-within:ring-4 focus-within:ring-blue-100">
                <input {...register("level")} type="radio" value={level.value} className="sr-only peer" />
                <span className="block text-xl font-black text-slate-950 peer-checked:text-blue-800">{level.label}</span>
                <span className="mt-2 block text-sm leading-6 text-slate-600">{level.description}</span>
              </label>
            ))}
          </div>
          {errors.level?.message || result?.fieldErrors?.level ? (
            <span className={errorClass}>{errors.level?.message ?? result?.fieldErrors?.level}</span>
          ) : null}
        </fieldset>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">แผนกวิชา</span>
          <select
            {...register("departmentSlug")}
            className={fieldClass}
            aria-invalid={Boolean(errors.departmentSlug || result?.fieldErrors?.departmentSlug)}
          >
            {departments.map((department) => (
              <option key={department.slug} value={department.slug}>
                {department.name}
              </option>
            ))}
          </select>
          {errors.departmentSlug?.message || result?.fieldErrors?.departmentSlug ? (
            <span className={errorClass}>{errors.departmentSlug?.message ?? result?.fieldErrors?.departmentSlug}</span>
          ) : null}
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">หมายเหตุ</span>
          <textarea
            {...register("note")}
            className={`${fieldClass} min-h-32 resize-y`}
            aria-invalid={Boolean(errors.note || result?.fieldErrors?.note)}
            placeholder="ระบุข้อมูลเพิ่มเติมที่ต้องการแจ้งเจ้าหน้าที่"
          />
          {errors.note?.message || result?.fieldErrors?.note ? (
            <span className={errorClass}>{errors.note?.message ?? result?.fieldErrors?.note}</span>
          ) : null}
        </label>

        <button
          type="submit"
          disabled={isPending}
          className="soft-button inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-blue-800 px-6 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          {isPending ? "กำลังส่งข้อมูล" : "ส่งใบสมัคร"}
        </button>
      </div>
    </form>
  );
}
