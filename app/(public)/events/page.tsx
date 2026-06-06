import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, CalendarCheck, CalendarDays, MapPin, Star } from "lucide-react";

import { getEvents } from "@/lib/public-content";

export default async function EventsPage() {
  const events = await getEvents();
  const highlighted = events.find((event) => event.isHighlight) ?? events[0];
  const groupedEvents = events.reduce<Record<string, typeof events>>((groups, event) => {
    const key = event.fullDate?.split(" ").slice(1).join(" ") || "กำหนดการ";
    groups[key] = [...(groups[key] ?? []), event];
    return groups;
  }, {});

  return (
    <div className="bg-white text-slate-950">
      <section className="soft-surface border-b border-slate-200">
        <div className="container mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <nav className="text-sm font-semibold text-slate-500">
            <Link href="/" className="hover:text-blue-800">หน้าแรก</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">ปฏิทินกิจกรรม</span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-bold text-blue-800">ปฏิทินกิจกรรม</p>
              <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">
                กำหนดการสำคัญของวิทยาลัยแบบเต็ม
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                รวมกิจกรรมวิชาการ กิจกรรมนักศึกษา ประชุมผู้ปกครอง และงานบริการชุมชนที่เผยแพร่บนเว็บไซต์
              </p>
            </div>

            {highlighted ? (
              <div className="soft-panel overflow-hidden">
                <div className="bg-blue-800 p-5 text-white">
                  <div className="flex items-center gap-2 text-sm font-bold text-sky-100">
                    <Star className="h-4 w-4" />
                    กิจกรรมเด่น
                  </div>
                  <h2 className="mt-4 text-2xl font-black leading-tight">{highlighted.title}</h2>
                </div>
                <div className="p-5">
                  <p className="text-sm font-bold text-blue-800">{highlighted.fullDate ?? highlighted.date}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{highlighted.description}</p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <MapPin className="h-4 w-4 text-blue-800" />
                    {highlighted.location}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between gap-4 border-b border-slate-300 pb-5">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-6 w-6 text-blue-800" />
              <h2 className="text-2xl font-black">รายการกิจกรรมทั้งหมด</h2>
            </div>
            <p className="text-sm font-semibold text-slate-500">{events.length} กิจกรรม</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
            <aside className="soft-panel self-start p-5 lg:sticky lg:top-28">
              <CalendarCheck className="h-8 w-8 text-blue-800" />
              <h3 className="mt-4 text-xl font-black">เดือนในปฏิทิน</h3>
              <div className="mt-5 grid gap-2">
                {Object.keys(groupedEvents).map((month) => (
                  <a
                    key={month}
                    href={`#${month}`}
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800"
                  >
                    {month}
                  </a>
                ))}
              </div>
            </aside>

            <div className="space-y-8">
              {Object.entries(groupedEvents).map(([month, monthEvents]) => (
                <section key={month} id={month} className="scroll-mt-28">
                  <h3 className="mb-4 text-2xl font-black">{month}</h3>
                  <div className="grid gap-4">
                    {monthEvents.map((event, index) => (
                      <article key={event.id} id={event.id} className="soft-card stagger-soft scroll-mt-28 p-5 sm:p-6" style={{ "--i": index } as CSSProperties}>
                        <div className="grid gap-5 sm:grid-cols-[96px_1fr]">
                          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-800 text-center text-lg font-black text-white">
                            {event.date}
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800">{event.type}</span>
                              {event.isHighlight ? (
                                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">กิจกรรมเด่น</span>
                              ) : null}
                            </div>
                            <h4 className="mt-3 text-2xl font-black leading-tight">{event.title}</h4>
                            <p className="mt-3 text-sm leading-6 text-slate-600">{event.description}</p>
                            <div className="mt-5 grid gap-3 text-sm font-semibold text-slate-500 sm:grid-cols-2">
                              <span className="inline-flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 text-blue-800" />
                                {event.fullDate ?? event.date}
                              </span>
                              <span className="inline-flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-blue-800" />
                                {event.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-black">ต้องการสอบถามกำหนดการเพิ่มเติม</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">ติดต่อวิทยาลัยเพื่อยืนยันสถานที่ เวลา และรายละเอียดกิจกรรมล่าสุด</p>
              </div>
              <Link href="/contact" className="soft-button inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-slate-950 transition hover:bg-sky-100">
                ติดต่อเรา
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
