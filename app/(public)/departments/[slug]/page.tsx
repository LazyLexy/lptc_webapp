import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, Mail, MapPin, Phone, Users, Wrench } from "lucide-react";

import { getDepartmentBySlug } from "@/lib/public-content";

export default async function DepartmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const department = await getDepartmentBySlug(slug);

  if (!department) {
    notFound();
  }

  const accent = department.color;

  return (
    <div className="bg-white text-slate-950">
      <section className="soft-surface border-b border-slate-200">
        <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Link href="/departments" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4" />
            กลับไปหน้าแผนกวิชา
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-end">
            <div>
              <div className="relative h-24 w-24 overflow-hidden rounded-3xl bg-white p-3 shadow-sm shadow-slate-950/10">
                <Image
                  src={department.logoPath}
                  alt={`โลโก้${department.name}`}
                  fill
                  sizes="96px"
                  className="object-contain p-2"
                />
              </div>
              <p className="mt-8 text-sm font-bold" style={{ color: accent }}>ข้อมูลพื้นฐานแผนก</p>
              <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">{department.name}</h1>
              <p className="mt-2 text-lg font-semibold text-slate-500">{department.englishName}</p>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">{department.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/departments/${department.slug}/site`}
                  className="soft-button inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-black text-white transition hover:brightness-95 focus:outline-none focus:ring-4 focus:ring-blue-100"
                  style={{ backgroundColor: accent }}
                >
                  เข้าสู่ระบบแผนก
                  <ExternalLink className="h-4 w-4" />
                </Link>
                <Link
                  href="/admissions"
                  className="soft-button inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 text-sm font-black text-slate-700 transition hover:bg-blue-50 hover:text-blue-800"
                >
                  สมัครเรียน
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="soft-panel grid grid-cols-2 overflow-hidden">
              <div className="border-r border-slate-200 p-6">
                <Users className="h-7 w-7" style={{ color: accent }} />
                <p className="mt-4 text-3xl font-black">{department.teacherCount}</p>
                <p className="mt-1 text-sm font-semibold text-slate-500">ครูผู้สอน</p>
              </div>
              <div className="p-6">
                <Wrench className="h-7 w-7" style={{ color: accent }} />
                <p className="mt-4 text-3xl font-black">{new Intl.NumberFormat("th-TH").format(department.studentCount)}</p>
                <p className="mt-1 text-sm font-semibold text-slate-500">นักศึกษา</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div className="grid gap-6">
            <div className="soft-panel p-6">
              <div className="mb-5 flex items-center gap-3">
                <BookOpen className="h-6 w-6" style={{ color: accent }} />
                <h2 className="text-2xl font-black">หลักสูตรที่เกี่ยวข้อง</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {department.programs.map((program) => (
                  <Link key={`${program.level}-${program.name}`} href={program.href} className="rounded-3xl border border-slate-200 p-5 transition hover:border-blue-800 hover:bg-blue-50">
                    <p className="text-sm font-black" style={{ color: accent }}>{program.level}</p>
                    <h3 className="mt-3 text-lg font-black leading-7">{program.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{program.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="soft-panel p-6">
              <h2 className="text-2xl font-black">จุดเด่นของแผนก</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {department.facilities.map((item) => (
                  <div key={item} className="rounded-3xl bg-slate-50 p-5 text-sm font-bold leading-6 text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="soft-panel h-max p-6">
            <h2 className="text-2xl font-black">ติดต่อแผนก</h2>
            <ul className="mt-5 grid gap-4 text-sm font-semibold text-slate-700">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0" style={{ color: accent }} />
                <span>{department.contact.room}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5" style={{ color: accent }} />
                <span>{department.contact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5" style={{ color: accent }} />
                <span>{department.contact.email}</span>
              </li>
            </ul>
            <Link
              href={`/departments/${department.slug}/site`}
              className="soft-button mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-black text-white"
              style={{ backgroundColor: accent }}
            >
              เข้าสู่ระบบแผนก
              <ExternalLink className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}
