import Link from "next/link";
import { Building2, FileText } from "lucide-react";

import DepartmentDirectory from "@/components/public/DepartmentDirectory";
import DocumentCard from "@/components/public/DocumentCard";
import { applicantDocuments, getDepartments } from "@/lib/public-content";

export default async function DepartmentsPage() {
  const departments = await getDepartments();

  return (
    <div className="bg-white text-slate-950">
      <section className="soft-surface border-b border-slate-200">
        <div className="container mx-auto max-w-[78rem] px-4 py-14 sm:px-6">
          <nav className="text-base font-semibold text-slate-500">
            <Link href="/" className="hover:text-blue-800">หน้าแรก</Link>
            <span className="mx-2">/</span>
            <Link href="/courses" className="hover:text-blue-800">หลักสูตรที่เปิดสอน</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">แผนกวิชา</span>
          </nav>
          <div className="mt-8 max-w-3xl">
            <p className="text-base font-bold text-blue-800">Department Directory</p>
            <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">
              เลือกแผนกวิชาในเว็บหลัก LPTC
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              หน้าแผนกจะแสดงข้อมูลทางการของแผนก หลักสูตร เอกสาร PDF บุคลากร เส้นทางอาชีพ และช่องทางติดต่อ ก่อนเข้าสู่เว็บไซต์แผนกย่อย
            </p>
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
          <div className="mb-6 flex items-center gap-3">
            <Building2 className="h-6 w-6 text-blue-800" />
            <h2 className="text-3xl font-black">รายชื่อแผนกวิชา</h2>
          </div>
          <DepartmentDirectory departments={departments} />
        </div>
      </section>
    </div>
  );
}
