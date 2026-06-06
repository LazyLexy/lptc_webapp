"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  GraduationCap,
  Layers3,
  Menu,
  X,
} from "lucide-react";

const courses = [
  {
    title: "หลักสูตรประกาศนียบัตรวิชาชีพ",
    shortName: "ปวช.",
    href: "/courses/vocational-certificate",
    description: "สำหรับผู้เรียนระดับมัธยมต้น",
    icon: BookOpen,
  },
  {
    title: "หลักสูตรประกาศนียบัตรวิชาชีพชั้นสูง",
    shortName: "ปวส.",
    href: "/courses/vocational-diploma",
    description: "ต่อยอดทักษะอาชีวะเชิงลึก",
    icon: Layers3,
  },
  {
    title: "หลักสูตรปริญญาตรีสายเทคโนโลยีหรือสายปฏิบัติการ",
    shortName: "ป.ตรี",
    href: "/courses/bachelor-technology",
    description: "ต่อยอดสู่งานเทคโนโลยีระดับสูง",
    icon: GraduationCap,
  },
];

const navItems = [
  { href: "/", label: "หน้าแรก" },
  { href: "/about", label: "เกี่ยวกับวิทยาลัย" },
  { href: "/news", label: "ข่าวสาร" },
  { href: "/events", label: "ปฏิทินกิจกรรม" },
  { href: "/contact", label: "ติดต่อเรา" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCoursesMenuOpen, setIsCoursesMenuOpen] = useState(false);
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 shadow-sm shadow-slate-950/5 backdrop-blur-xl">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl text-lg font-black text-white">
              <Image src="/logo/lptclogo.png" alt="โลโก้วิทยาลัยเทคนิคลำปาง" width={44} height={44} className="h-11 w-11 object-contain" />
            </div>
            <div>
              <span className="block text-lg font-black leading-none text-slate-950">LPTC</span>
              <span className="mt-1 block text-xs font-semibold text-slate-500">วิทยาลัยเทคนิคลำปาง</span>
            </div>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navItems.slice(0, 2).map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-800">
                {item.label}
              </Link>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setIsCoursesMenuOpen(true)}
              onMouseLeave={() => setIsCoursesMenuOpen(false)}
            >
              <button
                type="button"
                className="flex h-20 cursor-pointer items-center gap-1 rounded-full px-3 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-4"
                aria-expanded={isCoursesMenuOpen}
                aria-haspopup="true"
                onClick={() => setIsCoursesMenuOpen((value) => !value)}
              >
                <span>หลักสูตร</span>
                <ChevronDown className={`h-4 w-4 transition ${isCoursesMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {isCoursesMenuOpen ? (
                <div className="soft-menu absolute left-1/2 top-full w-[440px] -translate-x-1/2 rounded-3xl border border-slate-200/90 bg-white/95 p-4 shadow-2xl shadow-slate-950/10 backdrop-blur-xl">
                  <div className="grid gap-2">
                    {courses.map((course) => (
                      <Link
                        key={course.href}
                        href={course.href}
                        className="group flex gap-4 rounded-2xl bg-white p-4 transition hover:bg-slate-950 hover:text-white"
                        onClick={() => setIsCoursesMenuOpen(false)}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-800 transition group-hover:bg-white/10 group-hover:text-sky-200">
                          <course.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-blue-800 group-hover:text-sky-200">{course.shortName}</p>
                          <p className="mt-1 font-bold">{course.title}</p>
                          <p className="mt-1 text-xs text-slate-500 group-hover:text-slate-300">{course.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/courses"
                    className="mt-4 flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-blue-800 transition hover:bg-blue-50 hover:text-blue-950"
                    onClick={() => setIsCoursesMenuOpen(false)}
                  >
                    ดูทุกหลักสูตร
                    <ChevronDown className="-rotate-90 h-4 w-4" />
                  </Link>
                </div>
              ) : null}
            </div>

            {navItems.slice(2).map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-800">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/portal/login"
              className="soft-button inline-flex h-10 items-center rounded-full bg-blue-800 px-5 text-xs font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-900"
            >
              PORTAL LOGIN
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-950 transition hover:bg-blue-50 lg:hidden"
            onClick={() => {
              setIsOpen((value) => !value);
              setIsMobileCoursesOpen(false);
            }}
            aria-label="เปิดเมนู"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="soft-menu border-t border-slate-200 bg-white lg:hidden">
          <div className="container mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="grid gap-2">
              {navItems.slice(0, 2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-2xl px-4 py-3 text-base font-bold text-slate-800 transition hover:bg-blue-50"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between rounded-2xl px-4 py-3 text-left text-base font-bold text-slate-800 transition hover:bg-blue-50"
                onClick={() => setIsMobileCoursesOpen((value) => !value)}
                aria-expanded={isMobileCoursesOpen}
              >
                <span>หลักสูตร</span>
                <ChevronDown className={`h-4 w-4 transition ${isMobileCoursesOpen ? "rotate-180" : ""}`} />
              </button>
              {isMobileCoursesOpen ? (
                <div className="grid gap-2 rounded-3xl bg-slate-50 p-2">
                  {courses.map((course) => (
                    <Link
                      key={course.href}
                      href={course.href}
                      className="flex gap-3 rounded-2xl bg-white p-4 text-slate-800 shadow-sm shadow-slate-950/5"
                      onClick={() => {
                        setIsOpen(false);
                        setIsMobileCoursesOpen(false);
                      }}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-800">
                        <course.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-blue-800">{course.shortName}</p>
                        <p className="mt-1 text-sm font-bold">{course.title}</p>
                      </div>
                    </Link>
                  ))}
                  <Link
                    href="/courses"
                    className="rounded-2xl bg-white p-4 text-sm font-bold text-blue-800 shadow-sm shadow-slate-950/5"
                    onClick={() => {
                      setIsOpen(false);
                      setIsMobileCoursesOpen(false);
                    }}
                  >
                    ดูทุกหลักสูตร
                  </Link>
                </div>
              ) : null}
              {navItems.slice(2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-2xl px-4 py-3 text-base font-bold text-slate-800 transition hover:bg-blue-50"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/portal/login"
                className="soft-button mt-3 flex h-12 items-center justify-center rounded-full bg-blue-800 text-sm font-black text-white shadow-lg shadow-blue-900/20"
                onClick={() => setIsOpen(false)}
              >
                PORTAL LOGIN
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
