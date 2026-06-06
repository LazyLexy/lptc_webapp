import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, BookOpen, GraduationCap, Layers3 } from "lucide-react";

import { courseLevels } from "@/lib/public-content";

const icons = [BookOpen, Layers3, GraduationCap];

export default function CoursesPage() {
  return (
    <div className="bg-white text-slate-950">
      <section className="soft-surface border-b border-slate-200">
        <div className="container mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <nav className="text-sm font-semibold text-slate-500">
            <Link href="/" className="hover:text-blue-800">หน้าแรก</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">หลักสูตร</span>
          </nav>

          <div className="reveal-soft mt-8 max-w-3xl">
            <p className="text-sm font-bold text-blue-800">หลักสูตร</p>
            <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">
              เลือกระดับหลักสูตรก่อนเลือกแผนก
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              เลือกระดับการเรียนที่สนใจ จากนั้นระบบจะแสดงรายชื่อแผนกแบบ directory เพื่อเข้าสู่หน้าเว็บแผนกที่ต้องการ
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {courseLevels.map((course, index) => {
              const Icon = icons[index] ?? BookOpen;

              return (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="soft-card group stagger-soft p-7 hover:bg-blue-50"
                  style={{ "--i": index } as CSSProperties}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-800 transition group-hover:bg-white group-hover:text-blue-900">
                    <Icon className="h-7 w-7" />
                  </div>
                  <p className="mt-8 inline-flex rounded-full border border-blue-800 px-3 py-1 text-sm font-black text-blue-800 transition group-hover:border-blue-900 group-hover:text-blue-900">
                    {course.shortName}
                  </p>
                  <h2 className="mt-5 text-2xl font-black leading-tight">{course.title}</h2>
                  <p className="mt-2 text-sm font-semibold text-slate-500 transition group-hover:text-slate-600">
                    {course.audience}
                  </p>
                  <p className="mt-5 min-h-28 text-sm leading-7 text-slate-600 transition group-hover:text-slate-700">
                    {course.description}
                  </p>
                  <span className="mt-7 flex items-center justify-between border-t border-slate-200 pt-5 text-sm font-bold text-blue-800 transition group-hover:border-blue-200 group-hover:text-blue-900">
                    ดูแผนกในหลักสูตรนี้
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
