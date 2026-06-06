import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, GraduationCap, Phone } from "lucide-react";

import { getDepartments } from "@/lib/public-content";
import AdmissionForm from "./AdmissionForm";

const steps = [
  "กรอกข้อมูลผู้สมัครและเลือกแผนกวิชา",
  "เจ้าหน้าที่ตรวจสอบข้อมูลและติดต่อกลับ",
  "ติดตามประกาศและเตรียมเอกสารตามรอบรับสมัคร",
];

export default async function AdmissionsPage() {
  const departments = await getDepartments();

  return (
    <div className="bg-white text-slate-950">
      <section className="soft-surface border-b border-slate-200">
        <div className="container mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <nav className="text-sm font-semibold text-slate-500">
            <Link href="/" className="hover:text-blue-800">หน้าแรก</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">สมัครเรียน</span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-end">
            <div className="min-w-0 max-w-3xl">
              <p className="text-sm font-bold text-blue-800">สมัครเรียนออนไลน์</p>
              <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">
                สมัครเรียนออนไลน์
              </h1>
              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                กรอกข้อมูลเบื้องต้น เลือกระดับ และแผนกวิชาที่สนใจ
                <br />
                เพื่อให้เจ้าหน้าที่ติดต่อกลับ
              </p>
            </div>

            <div className="soft-panel p-5">
              <FileText className="h-8 w-8 text-blue-800" />
              <h2 className="mt-4 text-2xl font-black">ข้อมูลที่ต้องเตรียม</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-600">
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-800" />
                  ชื่อ-นามสกุลและเบอร์โทรศัพท์ที่ติดต่อได้
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-800" />
                  ระดับที่ต้องการสมัครและแผนกวิชาที่สนใจ
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-800" />
                  อีเมลสำหรับรับข้อมูลเพิ่มเติมถ้ามี
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
          <div>
            <div className="mb-8 flex items-center gap-3 border-b border-slate-300 pb-5">
              <GraduationCap className="h-6 w-6 text-blue-800" />
              <h2 className="text-2xl font-black">ฟอร์มสมัครเรียน</h2>
            </div>
            <AdmissionForm departments={departments.map((department) => ({ name: department.name, slug: department.slug }))} />
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="soft-panel overflow-hidden">
              <div className="border-b border-slate-200 p-5">
                <h2 className="text-xl font-black">ขั้นตอนหลังส่งข้อมูล</h2>
              </div>
              <div className="divide-y divide-slate-200">
                {steps.map((step, index) => (
                  <div key={step} className="grid grid-cols-[48px_1fr] gap-4 p-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-800 text-lg font-black text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm font-semibold leading-6 text-slate-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[2rem] bg-slate-950 p-6 text-white">
              <Phone className="h-7 w-7 text-sky-200" />
              <h2 className="mt-4 text-xl font-black">สอบถามงานรับสมัคร</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">โทรศัพท์ 0 5421 7106 ในเวลาทำการ</p>
              <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-sky-200 hover:text-white">
                ดูช่องทางติดต่อ
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
