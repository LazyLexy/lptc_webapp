"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";

import type { DepartmentSummary } from "@/lib/public-content";

const levelFilters = ["ทั้งหมด", "ปวช.", "ปวส.", "ป.ตรี"] as const;
const categoryFilters = ["ทั้งหมด", "อุตสาหกรรม", "พาณิชยกรรม", "บริการ"] as const;

export default function DepartmentDirectory({ departments }: { departments: DepartmentSummary[] }) {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<(typeof levelFilters)[number]>("ทั้งหมด");
  const [category, setCategory] = useState<(typeof categoryFilters)[number]>("ทั้งหมด");

  const filteredDepartments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return departments.filter((department) => {
      const matchesQuery = normalizedQuery
        ? [
            department.name,
            department.englishName,
            department.description,
            department.careerPaths,
            department.programLevels.join(" "),
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery)
        : true;
      const matchesLevel = level === "ทั้งหมด" || department.programLevels.includes(level);
      const matchesCategory = category === "ทั้งหมด" || department.category === category;

      return matchesQuery && matchesLevel && matchesCategory;
    });
  }, [category, departments, level, query]);

  return (
    <div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5 sm:p-5">
        <label className="block text-base font-black text-slate-950" htmlFor="department-search">
          ค้นหาแผนกหรือหลักสูตร
        </label>
        <div className="relative mt-3">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            id="department-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="พิมพ์ชื่อแผนก ภาษาอังกฤษ หรือระดับหลักสูตร"
            className="min-h-12 w-full rounded-full border border-slate-200 bg-slate-50 pl-12 pr-4 text-base text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold text-slate-600">ระดับหลักสูตร</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {levelFilters.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLevel(item)}
                  className={`min-h-10 rounded-full px-4 text-sm font-bold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 ${
                    level === item ? "bg-blue-800 text-white" : "border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-800"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-600">กลุ่มสายงาน</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {categoryFilters.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`min-h-10 rounded-full px-4 text-sm font-bold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 ${
                    category === item ? "bg-blue-800 text-white" : "border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-800"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filteredDepartments.length ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredDepartments.map((department, index) => (
            <article key={department.slug} className="soft-card group p-6">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-base font-black text-blue-800">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 text-2xl font-black leading-tight text-slate-950">{department.name}</h3>
                  <p className="mt-1 text-base font-semibold text-slate-500">{department.englishName}</p>
                </div>
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-blue-50">
                  <Image
                    src={department.logoPath}
                    alt={`โลโก้${department.name}`}
                    fill
                    sizes="64px"
                    className="object-contain p-1"
                  />
                </div>
              </div>

              <p className="mt-5 line-clamp-3 text-base leading-7 text-slate-700">{department.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {department.programLevels.map((item) => (
                  <span key={item} className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-800">
                    {item}
                  </span>
                ))}
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700">{department.category}</span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2 text-base">
                {department.teacherCount > 0 ? (
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="font-black text-slate-950">{department.teacherCount}</p>
                    <p className="text-sm font-semibold text-slate-500">ครูผู้สอน</p>
                  </div>
                ) : null}
                {department.studentCount > 0 ? (
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="font-black text-slate-950">{new Intl.NumberFormat("th-TH").format(department.studentCount)}</p>
                    <p className="text-sm font-semibold text-slate-500">นักศึกษา</p>
                  </div>
                ) : null}
              </div>

              <Link
                href={`/departments/${department.slug}`}
                className="mt-6 inline-flex min-h-11 w-full items-center justify-between rounded-full bg-blue-800 px-5 text-base font-bold text-white transition hover:bg-blue-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
              >
                ดูข้อมูลแผนก
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <h3 className="text-2xl font-black text-slate-950">ไม่พบแผนกที่ตรงกับการค้นหา</h3>
          <p className="mt-3 text-base text-slate-600">ลองเปลี่ยนคำค้นหา ระดับหลักสูตร หรือกลุ่มสายงานอีกครั้ง</p>
        </div>
      )}
    </div>
  );
}
