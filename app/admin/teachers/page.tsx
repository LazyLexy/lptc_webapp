import Image from "next/image";
import { Trash2, UserPlus } from "lucide-react";

import AdminSubmitButton from "@/components/admin/AdminSubmitButton";
import ImageUploader from "@/components/admin/ImageUploader";
import { deleteTeacher, saveTeacher } from "@/app/admin/actions";
import { db } from "@/lib/db";

const inputClass =
  "min-h-11 min-w-0 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-800 focus:ring-4 focus:ring-blue-100";

export default async function AdminTeachersPage() {
  const [departments, teachers] = await Promise.all([
    db.department.findMany({ orderBy: [{ order: "asc" }, { name: "asc" }], select: { id: true, name: true } }).catch(() => []),
    db.teacher.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      include: { department: { select: { name: true } } },
    }).catch(() => []),
  ]);

  return (
    <div className="grid max-w-screen-2xl gap-6">
      <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(320px,420px)_1fr] lg:items-start">
        <div className="grid min-w-0 content-start gap-6">
        <div>
          <p className="text-sm font-bold text-blue-800">Teachers</p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">จัดการอาจารย์</h1>
        </div>
        <form action={saveTeacher} className="soft-panel grid min-w-0 gap-4 p-5">
          <div className="flex items-center gap-3">
            <UserPlus className="h-6 w-6 text-blue-800" />
            <h2 className="text-xl font-black">เพิ่มอาจารย์</h2>
          </div>
          <input name="name" required className={inputClass} placeholder="ชื่อ-นามสกุล" />
          <select name="departmentId" required className={inputClass} defaultValue={departments[0]?.id ?? ""}>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>{department.name}</option>
            ))}
          </select>
          <input name="subject" className={inputClass} placeholder="วิชาหลัก / ตำแหน่ง" />
          <input name="email" type="email" className={inputClass} placeholder="อีเมล" />
          <input name="order" type="number" className={inputClass} defaultValue="0" placeholder="ลำดับ" />
          <textarea name="bio" rows={4} className="min-w-0 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100" placeholder="ประวัติหรือรายละเอียด" />
          <ImageUploader name="photo" label="รูปอาจารย์" folder="teachers" />
          <AdminSubmitButton label="บันทึกอาจารย์" iconName="save" />
        </form>
      </div>

      <section className="grid min-w-0 gap-4">
        {teachers.map((teacher) => (
          <form key={teacher.id} action={saveTeacher} className="soft-panel grid min-w-0 gap-4 p-5">
            <input type="hidden" name="id" value={teacher.id} />
            <div className="grid min-w-0 gap-4 lg:grid-cols-[96px_minmax(0,1fr)]">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
                {teacher.photo ? (
                  <Image src={teacher.photo} alt={teacher.name} fill unoptimized sizes="96px" className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xl font-black text-slate-400">
                    {teacher.name.slice(0, 1)}
                  </div>
                )}
              </div>
              <div className="grid min-w-0 gap-3">
                <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_220px_90px]">
                  <input name="name" required className={inputClass} defaultValue={teacher.name} />
                  <select name="departmentId" className={inputClass} defaultValue={teacher.departmentId}>
                    {departments.map((department) => (
                      <option key={department.id} value={department.id}>{department.name}</option>
                    ))}
                  </select>
                  <input name="order" type="number" className={inputClass} defaultValue={teacher.order} />
                </div>
                <div className="grid min-w-0 gap-3 lg:grid-cols-2">
                  <input name="subject" className={inputClass} defaultValue={teacher.subject ?? ""} placeholder="วิชาหลัก" />
                  <input name="email" type="email" className={inputClass} defaultValue={teacher.email ?? ""} placeholder="อีเมล" />
                </div>
              </div>
            </div>
            <textarea name="bio" rows={3} className="min-w-0 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100" defaultValue={teacher.bio ?? ""} />
            <ImageUploader name="photo" label="รูปอาจารย์" folder="teachers" defaultValue={teacher.photo} />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-bold text-slate-500">{teacher.department.name}</p>
              <div className="flex flex-wrap items-center gap-2">
                <AdminSubmitButton label="บันทึก" pendingLabel="บันทึก" iconName="save" />
                <button
                  formAction={deleteTeacher}
                  className="soft-button inline-flex h-11 max-w-max shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-rose-600 px-5 text-sm font-black leading-none text-white hover:bg-rose-700"
                >
                  <Trash2 className="h-4 w-4" />
                  ลบ
                </button>
              </div>
            </div>
          </form>
        ))}
        {!teachers.length ? (
          <div className="soft-panel p-8 text-center text-sm font-bold text-slate-500">ยังไม่มีข้อมูลอาจารย์</div>
        ) : null}
      </section>
      </div>
    </div>
  );
}
