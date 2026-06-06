import Link from "next/link";
import { CalendarDays, FileText, GraduationCap, Images, Newspaper, UserCog, Users } from "lucide-react";

import { db } from "@/lib/db";

export default async function AdminDashboardPage() {
  const [news, teachers, admissions, departments, events, albums, students] = await Promise.all([
    db.news.count().catch(() => 0),
    db.teacher.count().catch(() => 0),
    db.admission.count().catch(() => 0),
    db.department.count().catch(() => 0),
    db.event.count().catch(() => 0),
    db.album.count().catch(() => 0),
    db.student.count().catch(() => 0),
  ]);
  const stats = [
    { label: "ข่าว", value: news, icon: Newspaper, href: "/admin/news" },
    { label: "อาจารย์", value: teachers, icon: UserCog, href: "/admin/teachers" },
    { label: "ใบสมัคร", value: admissions, icon: FileText, href: "/admin/admissions" },
    { label: "แผนกวิชา", value: departments, icon: Users, href: "/admin/departments" },
    { label: "กิจกรรม", value: events, icon: CalendarDays, href: "/admin/events" },
    { label: "อัลบั้ม", value: albums, icon: Images, href: "/admin/gallery" },
    { label: "นักศึกษา", value: students, icon: GraduationCap, href: "/admin/students" },
  ];

  return (
    <div className="grid max-w-screen-2xl gap-6">
      <div>
        <p className="text-sm font-bold text-blue-800">Admin CMS</p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">ภาพรวมระบบจัดการวิทยาลัย</h1>
      </div>
      <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href} className="soft-card block min-w-0 p-5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100">
              <Icon className="h-7 w-7 text-blue-800" />
              <p className="mt-5 text-4xl font-black">{new Intl.NumberFormat("th-TH").format(stat.value)}</p>
              <p className="mt-2 text-sm font-bold text-slate-500">{stat.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
