import Link from "next/link";

import AdmissionStepForm from "@/components/admissions/AdmissionStepForm";
import { getDepartments } from "@/lib/public-content";

export default async function AdmissionApplyPage() {
  const departments = await getDepartments();

  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <nav className="text-sm font-bold text-slate-500">
            <Link href="/" className="hover:text-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-100">หน้าแรก</Link>
            <span className="mx-2">/</span>
            <Link href="/admissions" className="hover:text-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-100">สมัครเรียนออนไลน์</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">กรอกใบสมัคร</span>
          </nav>
          <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div>
              <p className="text-base font-black text-blue-800">ระบบรับสมัครนักศึกษาใหม่</p>
              <h1 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">กรอกใบสมัครเข้าศึกษาต่อออนไลน์</h1>
              <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
                กรอกข้อมูลตามหมวดเอกสาร แนบหลักฐานที่จำเป็น และตรวจสอบข้อมูลก่อนส่งใบสมัคร ระบบจะแจ้งเลขที่ใบสมัครสำหรับพิมพ์เอกสารหลังส่งสำเร็จ
              </p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-base leading-8 text-blue-950">
              <p className="font-black">เอกสารที่ควรเตรียม</p>
              <p>บัตรประชาชน, ใบรายงานผลการศึกษา, รูปถ่ายหน้าตรง และสำเนาทะเบียนบ้าน</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AdmissionStepForm departments={departments} />
      </section>
    </main>
  );
}
