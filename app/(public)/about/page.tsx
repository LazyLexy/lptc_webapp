import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Building2, MapPin, Phone, ShieldCheck, Users } from "lucide-react";

import { getAboutContent } from "@/lib/public-content";

export default function AboutPage() {
  const about = getAboutContent();

  return (
    <div className="bg-white text-slate-950">
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 text-white">
        <Image
          src="/banner&other/Untitled-1.jpg"
          alt="วิทยาลัยเทคนิคลำปาง"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-blue-950/40" />

        <div className="container relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <nav className="text-sm font-semibold text-slate-300">
            <Link href="/" className="hover:text-white">หน้าแรก</Link>
            <span className="mx-2">/</span>
            <span className="text-white">เกี่ยวกับวิทยาลัย</span>
          </nav>

          <div className="mt-12 max-w-4xl">
            <p className="text-sm font-bold text-sky-200">เกี่ยวกับวิทยาลัย</p>
            <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">
              วิทยาลัยเทคนิคลำปาง ศูนย์กลางทักษะอาชีวะและเทคโนโลยีของลำปาง
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100">
              {about.overview[0]}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
          <div>
            <div className="mb-8 flex items-center gap-3 border-b border-slate-300 pb-5">
              <Building2 className="h-6 w-6 text-blue-800" />
              <h2 className="text-2xl font-black">ภาพรวมวิทยาลัย</h2>
            </div>
            <div className="space-y-5 text-lg leading-9 text-slate-700">
              {about.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {about.identity.map((item) => (
                <div key={item.label} className="soft-card p-5">
                  <p className="text-sm font-bold text-blue-800">{item.label}</p>
                  <p className="mt-3 text-lg font-black leading-7 text-slate-950">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="soft-panel self-start overflow-hidden">
            <div className="relative aspect-[4/3] bg-slate-100">
              <Image
                src="/logo/lptclogo.png"
                alt="ตราวิทยาลัยเทคนิคลำปาง"
                fill
                sizes="420px"
                className="object-contain p-10"
              />
            </div>
            <div className="border-t border-slate-200 p-6">
              <ShieldCheck className="h-8 w-8 text-blue-800" />
              <h2 className="mt-4 text-2xl font-black">ข้อมูลสำหรับผู้เรียนและผู้ปกครอง</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                ดูหลักสูตร แผนกวิชา ข่าว และกิจกรรมได้จากเมนูหลักของเว็บไซต์
              </p>
              <Link href="/courses" className="soft-button mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-blue-800 px-5 text-sm font-bold text-white transition hover:bg-blue-900">
                ดูหลักสูตร
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="soft-surface border-y border-slate-200 py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3 border-b border-slate-300 pb-5">
            <Users className="h-6 w-6 text-blue-800" />
            <h2 className="text-2xl font-black">ผู้บริหาร</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {about.administrators.map((person, index) => (
              <article key={person.id} className="soft-card stagger-soft overflow-hidden" style={{ "--i": index } as CSSProperties}>
                <div className="flex aspect-square items-center justify-center bg-blue-50">
                  {person.photo ? (
                    <Image
                      src={person.photo}
                      alt={person.name}
                      width={320}
                      height={320}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-blue-800 text-4xl font-black text-white">
                      {person.role.slice(0, 1)}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-sm font-bold text-blue-800">{person.role}</p>
                  <h3 className="mt-3 text-xl font-black leading-7">{person.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{person.responsibility}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3 border-b border-slate-300 pb-5">
            <MapPin className="h-6 w-6 text-blue-800" />
            <h2 className="text-2xl font-black">ทิศทางการพัฒนา</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {about.timeline.map((item, index) => (
              <article key={item.title} className="soft-card stagger-soft p-6" style={{ "--i": index } as CSSProperties}>
                <p className="text-sm font-black text-blue-800">{item.year}</p>
                <h3 className="mt-4 text-2xl font-black leading-tight">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] bg-blue-800 p-6 text-white sm:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-black">ติดต่อวิทยาลัยเทคนิคลำปาง</h2>
                <p className="mt-2 flex items-center gap-2 text-sm text-blue-50">
                  <Phone className="h-4 w-4" />
                  0 5421 7106
                </p>
              </div>
              <Link href="/contact" className="soft-button inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-blue-900 transition hover:bg-sky-100">
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
