import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, FileText, GraduationCap, Printer, ShieldCheck } from "lucide-react";

const admissionSteps = [
  "เตรียมเอกสาร",
  "กรอกข้อมูลผู้สมัคร",
  "แนบหลักฐาน",
  "ตรวจสอบและส่งใบสมัคร",
  "พิมพ์ใบสมัคร",
];

const requiredDocuments = [
  "สำเนาบัตรประชาชน",
  "ใบรายงานผลการศึกษา / ปพ.",
  "รูปถ่ายหน้าตรง",
  "สำเนาทะเบียนบ้าน ถ้ามี",
  "เอกสารอื่น ๆ ตามประกาศรับสมัคร",
];

export default function AdmissionsPage() {
  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="border-b border-blue-100 bg-gradient-to-br from-blue-950 via-blue-900 to-sky-800 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-wide text-sky-200">LPTC Admissions</p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">สมัครเรียนออนไลน์</h1>
            <p className="mt-5 text-base leading-8 text-blue-50 sm:text-lg">
              ระบบรับสมัครนักเรียน นักศึกษา วิทยาลัยเทคนิคลำปาง สำหรับผู้สนใจเข้าศึกษาต่อระดับ ปวช. และ ปวส.
              กรอกข้อมูล แนบเอกสาร และพิมพ์ใบสมัครได้ในที่เดียว
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/admissions/apply"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-base font-black text-blue-900 shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-sky-50 focus:outline-none focus:ring-4 focus:ring-white/40"
              >
                กรอกใบสมัคร
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/admissions/print"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/40 px-6 text-base font-black text-white transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                <Printer className="h-4 w-4" />
                พิมพ์ใบสมัคร
              </Link>
              <button
                type="button"
                disabled
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-6 text-base font-black text-white/50"
              >
                ตรวจสอบสถานะ
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur">
            <ShieldCheck className="h-10 w-10 text-sky-200" />
            <h2 className="mt-4 text-2xl font-black">ข้อมูลปลอดภัยและตรวจสอบได้</h2>
            <p className="mt-3 text-base leading-7 text-blue-50">
              เลขบัตรประชาชนใช้สำหรับยืนยันตัวตนและค้นหาใบสมัคร โดยระบบจัดเก็บในรูปแบบ hash/mask ตามแนวทางปกป้องข้อมูลส่วนบุคคล
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-5 lg:px-8">
        {admissionSteps.map((step, index) => (
          <div key={step} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-800 text-lg font-black text-white">{index + 1}</div>
            <h2 className="mt-4 text-lg font-black text-slate-950">{step}</h2>
          </div>
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
          <div className="flex items-center gap-3">
            <FileText className="h-7 w-7 text-blue-800" />
            <h2 className="text-2xl font-black">เอกสารที่ต้องเตรียม</h2>
          </div>
          <ul className="mt-5 grid gap-3 text-base leading-7 text-slate-700">
            {requiredDocuments.map((document) => (
              <li key={document} className="flex gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-800" />
                {document}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-7 w-7 text-blue-800" />
            <h2 className="text-2xl font-black">ระดับที่เปิดรับ</h2>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {["ปวช.", "ปวส."].map((level) => (
              <div key={level} className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <p className="text-3xl font-black text-blue-900">{level}</p>
                <p className="mt-2 text-base leading-7 text-slate-700">เลือกแผนกวิชาจากข้อมูลหลักสูตรกลางของเว็บไซต์ LPTC</p>
              </div>
            ))}
          </div>
          <Link
            href="/courses"
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-blue-200 px-5 text-base font-black text-blue-800 transition hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            ดูหลักสูตรที่เปิดสอน
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-black">พร้อมสมัครเรียนกับวิทยาลัยเทคนิคลำปาง</h2>
            <p className="mt-2 text-base text-slate-600">เริ่มกรอกใบสมัครได้ทันที และกลับมาค้นหาเพื่อพิมพ์ใบสมัครภายหลังได้</p>
          </div>
          <Link
            href="/admissions/apply"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-800 px-6 text-base font-black text-white transition hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            <ClipboardCheck className="h-4 w-4" />
            เริ่มสมัครเรียน
          </Link>
        </div>
      </section>
    </main>
  );
}
