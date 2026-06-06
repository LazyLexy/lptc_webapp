import { redirect } from "next/navigation";
import { CalendarCheck, GraduationCap, ShieldCheck, UserRound } from "lucide-react";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function PortalDashboardPage() {
  const session = await auth();
  if (!session) redirect("/portal/login");

  const isStudent = session.user.role === "STUDENT";
  const student = isStudent
    ? await db.student.findUnique({
        where: { id: session.user.id },
        select: {
          fullName: true,
          studentCode: true,
          classRoom: true,
          faceDescriptor: true,
          department: { select: { name: true } },
        },
      }).catch(() => null)
    : null;

  const stats = isStudent
    ? [
        { label: "รหัสนักศึกษา", value: student?.studentCode ?? "-", icon: GraduationCap },
        { label: "ห้องเรียน", value: student?.classRoom ?? "-", icon: CalendarCheck },
        { label: "ใบหน้า", value: student?.faceDescriptor ? "ลงทะเบียนแล้ว" : "ยังไม่ลงทะเบียน", icon: ShieldCheck },
      ]
    : [
        { label: "Role", value: session.user.role, icon: UserRound },
        { label: "ระบบ", value: session.user.role === "ADMIN" ? "Admin CMS" : "Teacher Portal", icon: ShieldCheck },
        { label: "รายงาน", value: "พร้อมใช้งาน", icon: CalendarCheck },
      ];

  return (
    <div className="grid gap-6">
      <div>
        <p className="text-sm font-bold text-blue-800">{isStudent ? "Student Dashboard" : "Teacher Dashboard"}</p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">
          {isStudent ? student?.fullName ?? session.user.name : session.user.name}
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {isStudent ? student?.department.name ?? "ข้อมูลนักศึกษา" : "แดชบอร์ดสำหรับครูและบุคลากร"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="soft-panel p-5">
              <Icon className="h-7 w-7 text-blue-800" />
              <p className="mt-5 text-2xl font-black">{stat.value}</p>
              <p className="mt-2 text-sm font-bold text-slate-500">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
