import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";

import { getCourseLevelBySlug, getDepartmentsForCourseLevel } from "@/lib/public-content";

export default async function CourseLevelPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const course = getCourseLevelBySlug(level);

  if (!course) {
    notFound();
  }

  const departments = await getDepartmentsForCourseLevel(level);

  return (
    <div className="bg-white text-slate-950">
      <section className="soft-surface border-b border-slate-200">
        <div className="container mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <nav className="text-sm font-semibold text-slate-500">
            <Link href="/" className="hover:text-blue-800">หน้าแรก</Link>
            <span className="mx-2">/</span>
            <Link href="/courses" className="hover:text-blue-800">หลักสูตร</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">{course.shortName}</span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-bold text-blue-800">หลักสูตร</p>
              <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">{course.title}</h1>
              <p className="mt-3 text-lg font-semibold text-slate-500">{course.audience}</p>
              <p className="mt-6 text-lg leading-8 text-slate-600">{course.description}</p>
            </div>

            <div className="soft-panel p-6">
              <GraduationCap className="h-7 w-7 text-blue-800" />
              <p className="mt-4 text-4xl font-black">{departments.length}</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">แผนกที่เปิดให้เลือก</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3 border-b border-slate-300 pb-5">
            <BookOpen className="h-6 w-6 text-blue-800" />
            <h2 className="text-2xl font-black">เลือกแผนก</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((department, index) => (
              <article key={department.slug} className="soft-card stagger-soft p-7" style={{ "--i": index } as CSSProperties}>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-sm font-black" style={{ color: department.color }}>
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

                <Link
                  href={`/departments/${department.slug}?course=${course.slug}`}
                  className="soft-button mt-6 inline-flex h-11 w-full items-center justify-between rounded-full border px-4 text-sm font-bold transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-100"
                  style={{
                    borderColor: department.color,
                    color: department.color,
                  }}
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
