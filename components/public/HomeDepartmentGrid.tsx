"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

import type { DepartmentSummary } from "@/lib/public-content";

const filters = [
  { label: "ทั้งหมด", value: "all" },
  { label: "อุตสาหกรรม", value: "industrial" },
  { label: "พาณิชยกรรม", value: "commerce" },
  { label: "บริการ", value: "service" },
] as const;

const commerceSlugs = new Set(["it"]);
const serviceSlugs = new Set(["architecture"]);

function getGroup(slug: string) {
  if (commerceSlugs.has(slug)) return "commerce";
  if (serviceSlugs.has(slug)) return "service";
  return "industrial";
}

export default function HomeDepartmentGrid({ departments }: { departments: DepartmentSummary[] }) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]["value"]>("all");

  const visibleDepartments = useMemo(() => {
    const items = departments.slice(0, 9);
    if (activeFilter === "all") return items.slice(0, 6);
    return items.filter((department) => getGroup(department.slug) === activeFilter).slice(0, 6);
  }, [activeFilter, departments]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((filter) => {
          const active = activeFilter === filter.value;
          return (
            <button
              key={filter.value}
              type="button"
              className={`min-h-11 rounded-full px-5 text-base font-bold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 ${
                active
                  ? "bg-blue-800 text-white shadow-md shadow-blue-900/15"
                  : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800"
              }`}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visibleDepartments.map((department, index) => (
          <Link
            key={department.slug}
            href={`/departments/${department.slug}`}
            className="group stagger-soft flex h-full flex-col rounded-2xl border border-transparent bg-white p-5 shadow-sm shadow-slate-950/8 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-950/12 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
            style={{ "--i": index } as CSSProperties}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-blue-50">
                <Image
                  src={department.logoPath}
                  alt={`โลโก้${department.name}`}
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-wrap justify-end gap-2">
                {department.programLevels.map((level) => (
                  <span key={level} className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-800">
                    {level}
                  </span>
                ))}
              </div>
            </div>
            <h3 className="mt-5 text-xl font-black leading-snug text-slate-950">{department.name}</h3>
            <p className="mt-3 line-clamp-3 text-base leading-7 text-slate-700">{department.description}</p>
            <div className="mt-4 rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-500">เส้นทางอาชีพ</p>
              <p className="mt-1 line-clamp-2 text-base font-semibold leading-7 text-slate-800">{department.careerPaths}</p>
            </div>
            <div className="mt-auto pt-5">
              <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-blue-50 px-5 text-base font-bold text-blue-800 transition group-hover:bg-blue-800 group-hover:text-white">
                ดูรายละเอียด
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
