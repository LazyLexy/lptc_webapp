import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  Megaphone,
  Newspaper,
  School,
  UserRoundCheck,
  Users,
} from "lucide-react";

import HomeDepartmentGrid from "@/components/public/HomeDepartmentGrid";
import { getHomeContent, type EventItem, type NewsItem } from "@/lib/public-content";

const quickLinks = [
  {
    title: "ผู้สนใจสมัครเรียน",
    description: "ดูรอบรับสมัคร หลักสูตร ค่าใช้จ่าย เอกสารสมัคร และขั้นตอนยืนยันสิทธิ์",
    href: "/admissions",
    icon: UserRoundCheck,
    recommended: true,
  },
  {
    title: "นักศึกษา",
    description: "เข้าสู่ระบบนักศึกษาเพื่อตรวจตารางเรียน เกรด กิจกรรม และข้อมูลส่วนตัว",
    href: "/portal/login",
    icon: GraduationCap,
  },
  {
    title: "ครูและบุคลากร",
    description: "ติดตามข่าว แผนงาน ระบบงานภายใน และรายงานการเข้าเรียนของนักศึกษา",
    href: "/admin/dashboard",
    icon: School,
  },
  {
    title: "ผู้ปกครอง",
    description: "ติดตามประกาศ กิจกรรมสำคัญ ช่องทางติดต่อ และข้อมูลสนับสนุนผู้เรียน",
    href: "/contact",
    icon: Users,
  },
];

const newsTabs = [
  { label: "ทั้งหมด", href: "/news" },
  { label: "รับสมัคร", href: "/news?category=รับสมัคร" },
  { label: "ประกาศ", href: "/news?category=ประกาศ" },
  { label: "กิจกรรม", href: "/news?category=กิจกรรม" },
];

function eventBadge(event: EventItem) {
  const text = `${event.type} ${event.title}`;

  if (text.includes("ปฐมนิเทศ") || text.includes("ใหม่")) return "นักศึกษาใหม่";
  if (text.includes("ผู้ปกครอง")) return "ผู้ปกครอง";
  if (text.includes("ชุมชน") || text.includes("บริการ")) return "บริการชุมชน";
  if (text.includes("วิชาการ") || text.includes("เปิดภาค")) return "วิชาการ";

  return event.type || "กิจกรรม";
}

function NewsTile({ item, featured = false }: { item: NewsItem; featured?: boolean }) {
  return (
    <article className={`group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm shadow-slate-950/8 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-950/12 ${featured ? "lg:min-h-full" : ""}`}>
      <Link href={`/news/${item.slug}`} className="grid h-full focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200">
        <div className="relative aspect-video overflow-hidden bg-slate-200">
          <Image
            src={item.image}
            alt={item.title}
            fill
            unoptimized
            sizes={featured ? "(min-width: 1024px) 46vw, 100vw" : "(min-width: 1024px) 22vw, 100vw"}
            className="object-cover"
          />
          <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-sm font-bold text-blue-800 shadow-sm shadow-slate-950/10">
            {item.category}
          </div>
        </div>
        <div className={featured ? "p-5 sm:p-6" : "p-5"}>
          <p className="text-base font-semibold text-slate-600">{item.date}</p>
          <h3 className={`mt-2 font-black leading-snug text-slate-950 transition group-hover:text-blue-800 ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
            {item.title}
          </h3>
          <p className="mt-3 line-clamp-2 text-base leading-7 text-slate-700">{item.excerpt}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-base font-bold text-blue-800">
            อ่านต่อ
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}

export default async function HomePage() {
  const { departments, news, events, stats } = await getHomeContent();
  const featuredNews = news[0];
  const secondaryNews = news.slice(1, 3);

  const valueStats = [
    {
      icon: School,
      value: `${stats.departments} แผนกวิชา`,
      description: "ครอบคลุมกลุ่มอุตสาหกรรม พาณิชยกรรม บริการ และเทคโนโลยี",
    },
    {
      icon: BookOpenCheck,
      value: "ปวช. และ ปวส.",
      description: "เปิดเส้นทางเรียนต่อสายอาชีพตั้งแต่พื้นฐานจนถึงทักษะเฉพาะทาง",
    },
    {
      icon: GraduationCap,
      value: "หลักสูตรหลากหลาย",
      description: "เลือกแผนกตามความถนัด เป้าหมายอาชีพ และความสนใจของผู้เรียน",
    },
    {
      icon: BriefcaseBusiness,
      value: "ร่วมมือสถานประกอบการ",
      description: "เน้นการฝึกปฏิบัติ โครงงาน และประสบการณ์งานจริง",
    },
  ];

  return (
    <div className="bg-white text-slate-950">
      <section className="relative isolate min-h-[560px] overflow-hidden bg-blue-950 lg:h-[680px] lg:min-h-0">
        <Image
          src="/banner&other/Untitled-1.jpg"
          alt="บรรยากาศวิทยาลัยเทคนิคลำปางและการเรียนสายอาชีพ"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover opacity-85 saturate-[0.95]"
        />
        <div className="absolute inset-0 bg-blue-950/52" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.84)_0%,rgba(30,64,175,0.52)_48%,rgba(15,23,42,0.24)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent" />

        <div className="container relative z-10 mx-auto flex min-h-[560px] max-w-[78rem] items-center px-4 py-14 sm:px-6 lg:h-[680px] lg:min-h-0 lg:py-16">
          <div className="reveal-soft max-w-3xl text-white">
            <p className="text-lg font-bold text-sky-100">วิทยาลัยเทคนิคลำปาง</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl">
              สร้างทักษะอาชีพ สู่การทำงานจริง
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50 sm:text-xl">
              วิทยาลัยเทคนิคลำปาง เปิดสอนสายอาชีพที่ตอบโจทย์อุตสาหกรรมยุคใหม่
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/admissions"
                className="soft-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-700 px-7 text-base font-black text-white shadow-md shadow-blue-950/25 transition hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-950/30"
              >
                สมัครเรียนออนไลน์
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/courses"
                className="soft-button inline-flex min-h-12 items-center justify-center rounded-full border border-white/80 bg-white/10 px-7 text-base font-black text-white backdrop-blur transition hover:bg-white hover:text-blue-950 hover:shadow-lg hover:shadow-blue-950/20"
              >
                ดูหลักสูตรที่เปิดสอน
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-12">
        <div className="container mx-auto max-w-[78rem] px-4 sm:px-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className={`group stagger-soft flex h-full flex-col rounded-2xl border p-6 shadow-sm shadow-slate-950/8 transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg hover:shadow-slate-950/12 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 ${
                  item.recommended ? "border-blue-200 bg-blue-50/45" : "border-transparent bg-white"
                }`}
                style={{ "--i": index } as CSSProperties}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-800 transition group-hover:bg-blue-800 group-hover:text-white">
                    <item.icon className="h-6 w-6" />
                  </div>
                  {item.recommended ? (
                    <span className="rounded-full bg-blue-800 px-3 py-1 text-sm font-bold text-white">แนะนำ</span>
                  ) : null}
                </div>
                <h2 className="mt-5 text-xl font-black text-slate-950">{item.title}</h2>
                <p className="mt-3 text-base leading-7 text-slate-700">{item.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-base font-bold text-blue-800">
                  เข้าดูข้อมูล
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-12 sm:py-16">
        <div className="container mx-auto max-w-[78rem] px-4 sm:px-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {valueStats.map((stat) => (
              <div key={stat.value} className="flex h-full min-h-48 flex-col rounded-2xl bg-white p-6 shadow-sm shadow-slate-950/8">
                <stat.icon className="h-7 w-7 shrink-0 text-blue-800" />
                <p className="mt-5 text-2xl font-black leading-snug text-slate-950">{stat.value}</p>
                <p className="mt-3 text-base leading-7 text-slate-700">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18 lg:py-20">
        <div className="container mx-auto max-w-[78rem] px-4 sm:px-6">
          <div className="mb-8 flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-3 text-blue-800">
                <Newspaper className="h-6 w-6" />
                <p className="text-lg font-black">ข่าวสารล่าสุด</p>
              </div>
              <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                ความเคลื่อนไหวของวิทยาลัย
              </h2>
            </div>
            <Link href="/news" className="inline-flex items-center gap-2 text-base font-bold text-blue-800 transition hover:text-blue-950">
              ดูข่าวทั้งหมด
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mb-6 flex flex-wrap gap-2">
            {newsTabs.map((tab, index) => (
              <Link
                key={tab.label}
                href={tab.href}
                className={`min-h-10 rounded-full px-4 py-2 text-base font-bold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 ${
                  index === 0
                    ? "bg-blue-800 text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              {featuredNews ? <NewsTile item={featuredNews} featured /> : null}
              <div className="grid gap-4">
                {secondaryNews.map((item) => (
                  <NewsTile key={item.id} item={item} />
                ))}
              </div>
            </div>

            <aside className="overflow-hidden rounded-2xl bg-blue-900 text-white shadow-sm shadow-slate-950/10">
              <div className="flex items-center justify-between gap-4 border-b border-white/15 p-4">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-6 w-6 text-sky-200" />
                  <h2 className="text-xl font-black">ปฏิทินกิจกรรม</h2>
                </div>
                <Link href="/events" className="text-sm font-bold text-sky-100 transition hover:text-white">
                  ดูทั้งหมด
                </Link>
              </div>
              <div className="divide-y divide-white/12">
                {events.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events#${event.id}`}
                    className="grid grid-cols-[68px_1fr] gap-3 p-4 transition hover:bg-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-200/40"
                  >
                    <div className="flex h-14 items-center justify-center rounded-xl bg-white text-center text-sm font-black leading-tight text-blue-950">
                      {event.date}
                    </div>
                    <div>
                      <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-blue-950">
                        {eventBadge(event)}
                      </span>
                      <h3 className="mt-2 text-base font-black leading-6 text-white">{event.title}</h3>
                      <p className="mt-1 text-base leading-6 text-blue-100">{event.location}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/events"
                className="flex items-center justify-between border-t border-white/15 p-4 text-base font-bold text-sky-100 transition hover:bg-white/10 hover:text-white"
              >
                ดูปฏิทินทั้งหมด
                <ArrowRight className="h-4 w-4" />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14 sm:py-18 lg:py-20">
        <div className="container mx-auto max-w-[78rem] px-4 sm:px-6">
          <div className="mb-8 flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 md:flex-row md:items-end">
            <div>
              <p className="text-lg font-black text-blue-800">แผนกวิชา</p>
              <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                เลือกเส้นทางอาชีพที่ถนัด
              </h2>
            </div>
            <Link href="/departments" className="inline-flex items-center gap-2 text-base font-bold text-blue-800 transition hover:text-blue-950">
              ดูทุกแผนก
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <HomeDepartmentGrid departments={departments} />
        </div>
      </section>

      <section className="bg-blue-800 py-14 text-white">
        <div className="container mx-auto flex max-w-[78rem] flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Megaphone className="mb-4 h-8 w-8 text-sky-200" />
            <h2 className="text-3xl font-black leading-tight">ติดตามประกาศรับสมัครและข่าววิทยาลัย</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-blue-50">
              รวมข้อมูลสำหรับนักศึกษาใหม่ ผู้ปกครอง และสถานประกอบการไว้ในที่เดียว
            </p>
          </div>
          <Link
            href="/admissions"
            className="soft-button inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 text-base font-black text-blue-900 transition hover:bg-sky-100"
          >
            สมัครเรียนออนไลน์
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
