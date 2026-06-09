import Link from "next/link";
import { CheckCircle2, Home, Printer } from "lucide-react";

export default function AdmissionSuccessCard({ applicationNo }: { applicationNo: string }) {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-emerald-100 bg-white p-6 text-center shadow-sm shadow-slate-950/5 sm:p-10">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
        <CheckCircle2 className="h-9 w-9" />
      </div>
      <h1 className="mt-6 text-3xl font-black text-slate-950 sm:text-4xl">ส่งใบสมัครสำเร็จ</h1>
      <p className="mt-3 text-base leading-8 text-slate-600">ระบบได้รับข้อมูลใบสมัครของคุณแล้ว กรุณาจดเลขที่ใบสมัครไว้สำหรับค้นหาและพิมพ์ใบสมัคร</p>
      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <p className="text-sm font-black uppercase tracking-wide text-blue-800">เลขที่ใบสมัคร</p>
        <p className="mt-2 text-3xl font-black text-blue-950">{applicationNo}</p>
        <p className="mt-2 text-base font-bold text-slate-700">สถานะ: ส่งใบสมัครแล้ว</p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/admissions/print"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-800 px-6 text-base font-black text-white transition hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          <Printer className="h-4 w-4" />
          พิมพ์ใบสมัคร
        </Link>
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-200 px-6 text-base font-black text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          <Home className="h-4 w-4" />
          กลับหน้าแรก
        </Link>
      </div>
    </div>
  );
}
