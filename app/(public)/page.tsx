import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  CalendarDays,
  GraduationCap,
  Newspaper,
  School,
  Users,
} from "lucide-react";

import { getHomeContent } from "@/lib/public-content";

const quickLinks = [
  {
    title: "นักศึกษา",
    description: "เข้าสู่ระบบเช็คชื่อ ตารางเรียน เกรด และข้อมูลส่วนตัว",
    href: "/portal/login",
    icon: GraduationCap,
  },
  {
    title: "ครูและบุคลากร",
    description: "จัดการข่าว แผนก นักศึกษา และรายงานการเข้าเรียน",
    href: "/admin/dashboard",
    icon: School,
  },
  {
    title: "ผู้ปกครอง",
    description: "ติดตามข่าวประกาศ กิจกรรมสำคัญ และช่องทางติดต่อวิทยาลัย",
    href: "/contact",
    icon: Users,
  },
];

function formatNumber(value: number) {
  return new Intl.NumberFormat("th-TH").format(value);
}

export default async function HomePage() {
  const { departments, news, events, stats } = await getHomeContent();

  return (
    <div className="bg-white text-slate-950">
      <section className="relative min-h-[calc(100vh-80px)] overflow-hidden border-b border-slate-200">
        <Image
          src="/banner&other/Untitled-1.jpg"
          alt="ปกภาพหน้าแรก"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white to-transparent" />

        <div className="container relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col justify-end px-4 pb-10 pt-24 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="reveal-soft max-w-3xl pb-8 text-white">
              <p className="mb-5 text-sm font-semibold tracking-[0.18em] text-sky-200">
                วิทยาลัยเทคนิคลำปาง
              </p>
              <h1 className="text-5xl font-black leading-[0.96] tracking-normal sm:text-6xl lg:text-7xl">
                สร้างคนอาชีวะ
                <span className="block text-sky-200">พร้อมทำงานจริง</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-100">
                ศูนย์กลางการเรียนรู้ด้านเทคโนโลยี งานช่าง ธุรกิจ และบริการ
                ที่เชื่อมต่อทักษะวิชาชีพกับสถานประกอบการในจังหวัดลำปาง
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/admissions"
                  className="soft-button inline-flex h-12 items-center justify-center gap-2 rounded-full bg-blue-700 px-6 text-sm font-bold text-white shadow-lg shadow-blue-950/25 transition hover:bg-blue-800"
                >
                  สมัครเรียนออนไลน์
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/departments"
                  className="soft-button inline-flex h-12 items-center justify-center rounded-full border border-white/70 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur transition hover:bg-white hover:text-blue-950"
                >
                  ดูแผนกวิชา
                </Link>
              </div>
            </div>

            <div className="reveal-soft grid overflow-hidden rounded-3xl border border-white/40 bg-white/95 shadow-2xl shadow-blue-950/20 backdrop-blur md:grid-cols-3 lg:mb-10" data-delay="1">
              {quickLinks.map((item, index) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group stagger-soft border-b border-slate-200 p-5 transition hover:bg-blue-700 hover:text-white md:border-b-0 md:border-r md:last:border-r-0"
                  style={{ "--i": index } as CSSProperties}
                >
                  <item.icon className="mb-5 h-7 w-7 text-blue-700 transition group-hover:text-white" />
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600 transition group-hover:text-blue-50">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="container mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { label: "นักศึกษา", value: stats.students, suffix: "+" },
            { label: "แผนกวิชา", value: stats.departments, suffix: "" },
            { label: "ครูผู้สอน", value: stats.teachers, suffix: "+" },
            { label: "ข่าวเผยแพร่", value: stats.news, suffix: "" },
          ].map((stat) => (
            <div key={stat.label} className="py-10 pl-0 pr-5 sm:pl-6 lg:border-r lg:border-slate-200 lg:last:border-r-0">
              <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
              <p className="mt-3 text-4xl font-black text-blue-800 sm:text-5xl">
                {formatNumber(stat.value)}
                {stat.suffix}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="soft-surface py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-5 border-b border-slate-300 pb-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold text-blue-700">ข่าวสารล่าสุด</p>
              <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">
                ความเคลื่อนไหวของวิทยาลัย
              </h2>
            </div>
            <Link href="/news" className="inline-flex items-center gap-2 text-sm font-bold text-blue-800 hover:text-blue-950">
              ดูข่าวทั้งหมด
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="grid gap-6 md:grid-cols-3">
              {news.map((item) => (
                <article key={item.id} className="soft-card group overflow-hidden">
                  <Link href={`/news/${item.slug}`} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 28vw, (min-width: 768px) 33vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                        <span className="text-blue-700">{item.category}</span>
                        <span>{item.date}</span>
                      </div>
                      <h3 className="mt-4 min-h-16 text-lg font-bold leading-7 text-slate-950 group-hover:text-blue-800">
                        {item.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{item.excerpt}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            <aside className="soft-panel overflow-hidden">
              <div className="flex items-center gap-3 border-b border-slate-200 p-5">
                <CalendarDays className="h-6 w-6 text-blue-700" />
                <h2 className="text-xl font-black text-slate-950">ปฏิทินกิจกรรม</h2>
              </div>
              <div className="divide-y divide-slate-200">
                {events.map((event) => (
                  <div key={event.id} className="grid grid-cols-[72px_1fr] gap-4 p-5">
                    <div className="flex h-16 items-center justify-center rounded-2xl bg-blue-800 text-center text-sm font-black text-white">
                      {event.date}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-blue-700">{event.type}</p>
                      <h3 className="mt-1 font-bold leading-6 text-slate-950">{event.title}</h3>
                      <p className="mt-1 text-sm text-slate-500">{event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/events"
                className="flex items-center justify-between border-t border-slate-200 p-5 text-sm font-bold text-blue-800 transition hover:bg-blue-50"
              >
                ดูปฏิทินทั้งหมด
                <ArrowRight className="h-4 w-4" />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-5 border-b border-slate-300 pb-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold text-blue-700">แผนกวิชา</p>
              <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">
                เลือกเส้นทางอาชีพที่ถนัด
              </h2>
            </div>
            <Link href="/departments" className="inline-flex items-center gap-2 text-sm font-bold text-blue-800 hover:text-blue-950">
              ดูทุกแผนก
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {departments.slice(0, 6).map((department, index) => (
              <Link
                key={department.slug}
                href={`/departments/${department.slug}`}
                className="soft-card group stagger-soft p-6 hover:bg-blue-50"
                style={{ "--i": index } as CSSProperties}
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-white shadow-sm shadow-slate-950/10">
                  <Image
                    src={department.logoPath}
                    alt={`โลโก้${department.name}`}
                    fill
                    sizes="64px"
                    className="object-contain p-1"
                  />
                </div>
                <h3 className="mt-6 text-xl font-black">{department.name}</h3>
                <p className="mt-3 min-h-20 text-sm leading-6 text-slate-600 transition group-hover:text-slate-700">
                  {department.description}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-sm font-bold text-blue-800 transition group-hover:border-blue-200">
                  <span>{department.teacherCount} ครูผู้สอน</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-blue-800 py-14 text-white">
        <div className="container mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <Newspaper className="mb-4 h-8 w-8 text-sky-200" />
            <h2 className="text-3xl font-black">ติดตามประกาศรับสมัครและข่าววิทยาลัย</h2>
            <p className="mt-3 max-w-2xl text-blue-50">
              รวมข้อมูลสำหรับนักศึกษาใหม่ ผู้ปกครอง และสถานประกอบการไว้ในที่เดียว
            </p>
          </div>
          <Link
            href="/admissions"
            className="soft-button inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-blue-900 transition hover:bg-sky-100"
          >
            สมัครเรียน
          </Link>
        </div>
      </section>
    </div>
  );
}
