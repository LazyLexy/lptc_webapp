"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  GraduationCap,
  Layers3,
  LogIn,
  Menu,
  UserPlus,
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
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCoursesMenuOpen, setIsCoursesMenuOpen] = useState(false);
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const isCoursesActive = pathname.startsWith("/courses") || pathname.startsWith("/departments");

  const navLinkClass = (active: boolean) =>
    `relative rounded-full px-3.5 py-2 text-sm font-bold transition hover:bg-blue-50 hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-4 ${
      active ? "bg-blue-50 text-blue-800 after:absolute after:inset-x-4 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-blue-700" : "text-slate-700"
    }`;

  const mobileLinkClass = (active: boolean) =>
    `block rounded-xl px-4 py-3 text-base font-bold transition hover:bg-blue-50 ${
      active ? "bg-blue-50 text-blue-800" : "text-slate-800"
    }`;

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-xl transition-shadow duration-200 ${
        hasScrolled ? "shadow-md shadow-slate-950/10" : "shadow-sm shadow-slate-950/5"
      }`}
    >
      <div className="container mx-auto max-w-[78rem] px-4 sm:px-6">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-3 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl text-lg font-black text-white">
              <Image src="/logo/lptclogo.png" alt="โลโก้วิทยาลัยเทคนิคลำปาง" width={44} height={44} className="h-11 w-11 object-contain" />
            </div>
            <div>
              <span className="block text-lg font-black leading-none text-slate-950">LPTC</span>
              <span className="mt-1 block text-xs font-semibold text-slate-500">วิทยาลัยเทคนิคลำปาง</span>
            </div>
          </Link>

          <div className="hidden min-w-0 items-center gap-3 xl:gap-4 lg:flex">
            {navItems.slice(0, 2).map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClass(isActive(item.href))}>
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
                className={navLinkClass(isCoursesActive).replace("relative ", "relative flex h-11 cursor-pointer items-center gap-1 ")}
                aria-expanded={isCoursesMenuOpen}
                aria-haspopup="true"
                onClick={() => setIsCoursesMenuOpen((value) => !value)}
              >
                <span>หลักสูตร</span>
                <ChevronDown className={`h-4 w-4 transition ${isCoursesMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {isCoursesMenuOpen ? (
                <div className="soft-menu absolute left-1/2 top-[calc(100%+0.75rem)] w-[440px] -translate-x-1/2 rounded-2xl border border-slate-200/90 bg-white/95 p-4 shadow-xl shadow-slate-950/10 backdrop-blur-xl">
                  <div className="grid gap-2">
                    {courses.map((course) => (
                      <Link
                        key={course.href}
                        href={course.href}
                        className="group flex gap-4 rounded-xl bg-white p-4 transition hover:bg-blue-950 hover:text-white"
                        onClick={() => setIsCoursesMenuOpen(false)}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800 transition group-hover:bg-white/10 group-hover:text-sky-200">
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
                    className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-blue-800 transition hover:bg-blue-50 hover:text-blue-950"
                    onClick={() => setIsCoursesMenuOpen(false)}
                  >
                    ดูทุกหลักสูตร
                    <ChevronDown className="-rotate-90 h-4 w-4" />
                  </Link>
                </div>
              ) : null}
            </div>

            {navItems.slice(2).map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClass(isActive(item.href))}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <Link
              href="/admissions"
              className="soft-button inline-flex h-11 items-center gap-2 rounded-full bg-blue-800 px-5 text-sm font-black text-white shadow-md shadow-blue-900/20 transition hover:bg-blue-900"
            >
              <UserPlus className="h-4 w-4" />
              รับสมัครนักศึกษา
            </Link>
            <Link
              href="/portal/login"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-300 bg-white px-4 text-xs font-black text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800"
            >
              <LogIn className="h-4 w-4" />
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
        <div className="soft-menu border-t border-slate-200 bg-white shadow-lg shadow-slate-950/5 lg:hidden">
          <div className="container mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="grid gap-2">
              <Link
                href="/admissions"
                className="soft-button mb-2 flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-800 px-5 text-base font-black text-white shadow-md shadow-blue-900/20"
                onClick={() => setIsOpen(false)}
              >
                <UserPlus className="h-5 w-5" />
                รับสมัครนักศึกษา
              </Link>
              {navItems.slice(0, 2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={mobileLinkClass(isActive(item.href))}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-left text-base font-bold transition hover:bg-blue-50 ${
                  isCoursesActive ? "bg-blue-50 text-blue-800" : "text-slate-800"
                }`}
                onClick={() => setIsMobileCoursesOpen((value) => !value)}
                aria-expanded={isMobileCoursesOpen}
              >
                <span>หลักสูตร</span>
                <ChevronDown className={`h-4 w-4 transition ${isMobileCoursesOpen ? "rotate-180" : ""}`} />
              </button>
              {isMobileCoursesOpen ? (
                <div className="grid gap-2 rounded-2xl bg-slate-50 p-2">
                  {courses.map((course) => (
                    <Link
                      key={course.href}
                      href={course.href}
                      className="flex gap-3 rounded-xl bg-white p-4 text-slate-800 shadow-sm shadow-slate-950/5"
                      onClick={() => {
                        setIsOpen(false);
                        setIsMobileCoursesOpen(false);
                      }}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
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
                    className="rounded-xl bg-white p-4 text-sm font-bold text-blue-800 shadow-sm shadow-slate-950/5"
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
                  className={mobileLinkClass(isActive(item.href))}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/portal/login"
                className="mt-3 flex h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white text-sm font-black text-slate-700 transition hover:bg-blue-50 hover:text-blue-800"
                onClick={() => setIsOpen(false)}
              >
                <LogIn className="h-4 w-4" />
                PORTAL LOGIN
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
