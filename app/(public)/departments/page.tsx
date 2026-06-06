import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, BookOpen, Building2, GraduationCap, Users } from "lucide-react";

import { getDepartments } from "@/lib/public-content";

export default async function DepartmentsPage() {
  const departments = await getDepartments();
  const totalTeachers = departments.reduce((total, department) => total + department.teacherCount, 0);
  const totalStudents = departments.reduce((total, department) => total + department.studentCount, 0);

  return (
    <div className="bg-white text-slate-950">
      <section className="soft-surface border-b border-slate-200">
        <div className="container mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <nav className="text-sm font-semibold text-slate-500">
                <Link href="/" className="hover:text-blue-800">หน้าแรก</Link>
                <span className="mx-2">/</span>
                <span className="text-slate-900">แผนกวิชา</span>
              </nav>
              <p className="mt-8 text-sm font-bold text-blue-800">แผนกวิชา</p>
              <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">
                เลือกแผนกและเข้าสู่หน้าเว็บของแต่ละแผนก
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                รูปแบบเดียวกับ directory คณะของมหาวิทยาลัย: เห็นรายชื่อแผนกทั้งหมด กดปุ่มเพื่อไปยังหน้าเว็บแผนกย่อยที่รวมหลักสูตร บุคลากร ผลงาน บริการ และช่องทางติดต่อ
              </p>
            </div>

            <div className="soft-panel grid min-w-72 grid-cols-3 overflow-hidden">
              <div className="border-r border-slate-200 p-5">
                <BookOpen className="h-6 w-6 text-blue-800" />
                <p className="mt-4 text-3xl font-black">{departments.length}</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">แผนก</p>
              </div>
              <div className="border-r border-slate-200 p-5">
                <Users className="h-6 w-6 text-blue-800" />
                <p className="mt-4 text-3xl font-black">{totalTeachers}</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">ครู</p>
              </div>
              <div className="p-5">
                <GraduationCap className="h-6 w-6 text-blue-800" />
                <p className="mt-4 text-3xl font-black">{new Intl.NumberFormat("th-TH").format(totalStudents)}</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">นักศึกษา</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3 border-b border-slate-300 pb-5">
            <Building2 className="h-6 w-6 text-blue-800" />
            <h2 className="text-2xl font-black">รายชื่อแผนกวิชา</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((department, index) => (
              <article key={department.slug} className="soft-card group stagger-soft p-7" style={{ "--i": index } as CSSProperties}>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-sm font-black text-blue-800">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-5 text-2xl font-black leading-tight">{department.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-slate-500">{department.englishName}</p>
                  </div>
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm shadow-slate-950/10">
                    <Image
                      src={department.logoPath}
                      alt={`โลโก้${department.name}`}
                      fill
                      sizes="64px"
                      className="object-contain p-1"
                    />
                  </div>
                </div>

                <p className="mt-6 min-h-24 text-sm leading-6 text-slate-600">
                  {department.description}
                </p>

                <div className="mt-8 grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-black">{department.teacherCount}</p>
                    <p className="mt-1 text-slate-500">ครูผู้สอน</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-black">{new Intl.NumberFormat("th-TH").format(department.studentCount)}</p>
                    <p className="mt-1 text-slate-500">นักศึกษา</p>
                  </div>
                </div>

                <Link
                  href={`/departments/${department.slug}`}
                  className="soft-button mt-6 inline-flex h-11 w-full items-center justify-between rounded-full border border-blue-800 px-4 text-sm font-bold text-blue-800 transition hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2"
                >
                  ดูข้อมูลแผนก
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
