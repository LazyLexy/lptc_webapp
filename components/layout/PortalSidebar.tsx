"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, ClipboardCheck, GraduationCap, LayoutDashboard, UserRound } from "lucide-react";

const items = [
  { href: "/portal/dashboard", label: "แดชบอร์ด", icon: LayoutDashboard },
  { href: "/portal/profile", label: "โปรไฟล์", icon: UserRound },
  { href: "/portal/attendance", label: "การเข้าเรียน", icon: ClipboardCheck },
  { href: "/portal/schedule", label: "ตารางเรียน", icon: CalendarDays },
];

export default function PortalSidebar() {
  const pathname = usePathname();

  return (
    <>
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white lg:block">
      <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-800 text-white">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div>
          <p className="text-lg font-black text-slate-950">Student Portal</p>
          <p className="text-xs font-semibold text-slate-500">ระบบนักศึกษาและครู</p>
        </div>
      </div>

      <nav className="grid gap-2 p-4">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-12 items-center gap-3 rounded-2xl px-4 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 ${
                active ? "bg-blue-800 text-white shadow-lg shadow-blue-900/15" : "text-slate-600 hover:bg-blue-50 hover:text-blue-800"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 py-2 backdrop-blur lg:hidden">
      <div className="stable-scrollbar flex gap-2 overflow-x-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-14 min-w-20 flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 text-[11px] font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 ${
                active ? "bg-blue-800 text-white" : "text-slate-600 hover:bg-blue-50 hover:text-blue-800"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
    </>
  );
}
