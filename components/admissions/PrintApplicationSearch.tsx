"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { AlertCircle, FileSearch, Printer, ShieldCheck } from "lucide-react";

import { readJsonResponse } from "@/lib/safe-json";

type SearchResult = {
  applicationNo: string;
  printToken: string;
  maskedName: string;
  admissionLevel: string;
  departmentName: string;
  status: string;
  statusLabel: string;
  submittedAt: string | null;
};

export default function PrintApplicationSearch() {
  const [citizenId, setCitizenId] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [message, setMessage] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSearching(true);
    setMessage("");
    setResult(null);

    const response = await fetch("/api/admissions/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ citizenId, phone, birthDate }),
    });
    const data = await readJsonResponse<Partial<SearchResult> & { message?: string }>(
      response,
      { message: "ไม่พบข้อมูลใบสมัคร กรุณาตรวจสอบข้อมูลอีกครั้ง" },
    );
    setIsSearching(false);

    if (!response.ok) {
      setMessage(data.message ?? "ไม่พบข้อมูลใบสมัคร กรุณาตรวจสอบข้อมูลอีกครั้ง");
      return;
    }

    if (!data.applicationNo || !data.printToken || !data.maskedName || !data.admissionLevel || !data.departmentName || !data.statusLabel) {
      setMessage("ข้อมูลใบสมัครที่ระบบส่งกลับไม่ครบ กรุณาค้นหาอีกครั้ง");
      return;
    }

    setResult({
      applicationNo: data.applicationNo,
      printToken: data.printToken,
      maskedName: data.maskedName,
      admissionLevel: data.admissionLevel,
      departmentName: data.departmentName,
      status: data.status ?? "",
      statusLabel: data.statusLabel,
      submittedAt: data.submittedAt ?? null,
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
      <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <FileSearch className="h-7 w-7 text-blue-800" />
          <h1 className="text-3xl font-black text-slate-950">ค้นหาใบสมัคร</h1>
        </div>
        <p className="mt-3 text-base leading-8 text-slate-600">
          กรอกเลขบัตรประชาชนร่วมกับเบอร์โทรศัพท์ หรือวันเกิด เพื่อสร้างรหัสเปิดใบสมัครสำหรับพิมพ์ รหัสนี้ใช้ได้ชั่วคราวและไม่แสดงข้อมูลส่วนตัวใน URL
        </p>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-base font-bold text-slate-700">
            เลขบัตรประชาชน 13 หลัก
            <input
              value={citizenId}
              onChange={(event) => setCitizenId(event.target.value.replace(/\D/g, "").slice(0, 13))}
              inputMode="numeric"
              className="min-h-12 rounded-xl border border-slate-200 px-4 text-base outline-none transition focus:border-blue-700 focus:ring-4 focus:ring-blue-100"
              required
            />
          </label>
          <label className="grid gap-2 text-base font-bold text-slate-700">
            เบอร์โทรศัพท์
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              inputMode="tel"
              className="min-h-12 rounded-xl border border-slate-200 px-4 text-base outline-none transition focus:border-blue-700 focus:ring-4 focus:ring-blue-100"
              placeholder="ใช้เบอร์โทรหรือวันเกิดอย่างใดอย่างหนึ่ง"
            />
          </label>
          <label className="grid gap-2 text-base font-bold text-slate-700">
            วันเกิด
            <input
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
              type="date"
              className="min-h-12 rounded-xl border border-slate-200 px-4 text-base outline-none transition focus:border-blue-700 focus:ring-4 focus:ring-blue-100"
            />
          </label>
        </div>

        {message ? (
          <div className="mt-5 flex gap-3 rounded-2xl bg-red-50 p-4 text-base font-bold text-red-700">
            <AlertCircle className="h-5 w-5 shrink-0" />
            {message}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSearching}
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-800 px-6 text-base font-black text-white transition hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FileSearch className="h-4 w-4" />
          {isSearching ? "กำลังค้นหา" : "ค้นหาใบสมัคร"}
        </button>
      </form>

      <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-black text-slate-950">ผลการค้นหา</h2>
        {result ? (
          <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-sm font-black text-blue-800">เลขที่ใบสมัคร</p>
            <p className="mt-2 text-2xl font-black text-blue-950">{result.applicationNo}</p>
            <dl className="mt-5 grid gap-3 text-base text-slate-700">
              <div><dt className="font-black">ชื่อผู้สมัคร</dt><dd>{result.maskedName}</dd></div>
              <div><dt className="font-black">ระดับที่สมัคร</dt><dd>{result.admissionLevel}</dd></div>
              <div><dt className="font-black">แผนก</dt><dd>{result.departmentName}</dd></div>
              <div><dt className="font-black">สถานะ</dt><dd>{result.statusLabel}</dd></div>
            </dl>
            <div className="mt-5 flex gap-2 rounded-xl bg-white p-3 text-sm font-bold text-slate-600">
              <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-700" />
              รหัสเปิดใบสมัครมีอายุประมาณ 15 นาที และ URL ไม่มีเลขบัตรประชาชนหรือเบอร์โทรศัพท์
            </div>
            <Link
              href={`/admissions/print/${result.applicationNo}?token=${encodeURIComponent(result.printToken)}`}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-800 px-6 text-base font-black text-white transition hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              <Printer className="h-4 w-4" />
              ดูใบสมัคร / พิมพ์ใบสมัคร
            </Link>
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 p-6 text-base leading-8 text-slate-600">
            กรอกข้อมูลทางซ้ายเพื่อค้นหาใบสมัคร ระบบจะแสดงข้อมูลแบบปกปิดก่อนเปิดหน้าใบสมัครสำหรับพิมพ์
          </div>
        )}
      </aside>
    </div>
  );
}
