import Image from "next/image";
import { redirect } from "next/navigation";
import { Mail, UserRound } from "lucide-react";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import FaceRegistration from "./FaceRegistration";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect("/portal/login");

  const student = session.user.role === "STUDENT"
    ? await db.student.findUnique({
        where: { id: session.user.id },
        select: {
          fullName: true,
          studentCode: true,
          photo: true,
          classRoom: true,
          faceDescriptor: true,
          department: { select: { name: true } },
        },
      }).catch(() => null)
    : null;

  const staff = session.user.role !== "STUDENT"
    ? await db.staff.findUnique({
        where: { id: session.user.id },
        select: {
          fullName: true,
          email: true,
          photo: true,
          role: true,
          department: { select: { name: true } },
        },
      }).catch(() => null)
    : null;

  const displayName = student?.fullName ?? staff?.fullName ?? session.user.name ?? "";
  const photo = student?.photo ?? staff?.photo;

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <section className="soft-panel overflow-hidden">
        <div className="relative aspect-[4/3] bg-blue-50">
          {photo ? (
            <Image src={photo} alt={displayName} fill unoptimized sizes="420px" className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center">
              <UserRound className="h-24 w-24 text-blue-800" />
            </div>
          )}
        </div>
        <div className="p-6">
          <p className="text-sm font-bold text-blue-800">{session.user.role}</p>
          <h1 className="mt-2 text-3xl font-black">{displayName}</h1>
          <div className="mt-5 grid gap-3 text-sm text-slate-600">
            {student ? (
              <>
                <p><span className="font-bold text-slate-950">รหัส:</span> {student.studentCode}</p>
                <p><span className="font-bold text-slate-950">แผนก:</span> {student.department.name}</p>
                <p><span className="font-bold text-slate-950">ห้อง:</span> {student.classRoom ?? "-"}</p>
              </>
            ) : (
              <>
                <p className="inline-flex items-center gap-2"><Mail className="h-4 w-4 text-blue-800" /> {staff?.email}</p>
                <p><span className="font-bold text-slate-950">แผนก:</span> {staff?.department?.name ?? "-"}</p>
              </>
            )}
          </div>
        </div>
      </section>

      <div className="grid gap-6">
        {student ? <FaceRegistration /> : (
          <div className="soft-panel p-6">
            <h2 className="text-xl font-black">ข้อมูลบุคลากร</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">บัญชีครูและบุคลากรใช้สำหรับดูรายงาน จัดกิจกรรม และเข้าถึงเครื่องมือที่ได้รับสิทธิ์</p>
          </div>
        )}
      </div>
    </div>
  );
}
