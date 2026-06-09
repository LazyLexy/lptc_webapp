import Link from "next/link";
import { BookOpen, FileText, GraduationCap, Users } from "lucide-react";

import DepartmentDirectory from "@/components/public/DepartmentDirectory";
import DocumentCard from "@/components/public/DocumentCard";
import { applicantDocuments, getDepartments } from "@/lib/public-content";

export default async function CoursesPage() {
  const departments = await getDepartments();
  const totalTeachers = departments.reduce((total, department) => total + department.teacherCount, 0);
  const totalStudents = departments.reduce((total, department) => total + department.studentCount, 0);

  const stats = [
    { label: "แผนกวิชา", value: `${departments.length} แผนกวิชา`, icon: BookOpen },
    ...(totalTeachers > 0 ? [{ label: "ครูผู้สอน", value: `${new Intl.NumberFormat("th-TH").format(totalTeachers)} ครูผู้สอน`, icon: Users }] : []),
    ...(totalStudents > 0 ? [{ label: "นักศึกษา", value: `${new Intl.NumberFormat("th-TH").format(totalStudents)} นักศึกษา`, icon: GraduationCap }] : []),
  ];

  return (
    <div className="bg-white text-slate-950">
      <section className="soft-surface border-b border-slate-200">
        <div className="container mx-auto max-w-[78rem] px-4 py-14 sm:px-6">
          <nav className="text-base font-semibold text-slate-500">
            <Link href="/" className="hover:text-blue-800">หน้าแรก</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">หลักสูตรที่เปิดสอน</span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-base font-bold text-blue-800">Academic Directory</p>
              <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">
                ค้นหาแผนกและหลักสูตรที่เปิดสอน
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-700">
                เลือกแผนกวิชาที่สนใจ ดูข้อมูลหลักสูตร เอกสารประกอบการสมัคร และเส้นทางอาชีพของแต่ละแผนก
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                  <stat.icon className="h-6 w-6 text-blue-800" />
                  <p className="mt-3 text-2xl font-black text-slate-950">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto max-w-[78rem] px-4 sm:px-6">
          <div className="mb-6 flex items-center gap-3">
            <FileText className="h-6 w-6 text-blue-800" />
            <h2 className="text-3xl font-black">เอกสารสำหรับผู้สมัคร</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {applicantDocuments.map((document) => (
              <DocumentCard key={document.title} document={document} contextLabel="สำหรับผู้สมัคร" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-12">
        <div className="container mx-auto max-w-[78rem] px-4 sm:px-6">
          <div className="mb-6">
            <h2 className="text-3xl font-black text-slate-950">รายชื่อแผนกและหลักสูตรทั้งหมด</h2>
            <p className="mt-3 text-base leading-7 text-slate-700">
              กด “ดูข้อมูลแผนก” เพื่อเข้าสู่หน้า official department detail ภายในเว็บหลัก LPTC
            </p>
          </div>
          <DepartmentDirectory departments={departments} />
        </div>
      </section>
    </div>
  );
}
