import { Building2, Trash2 } from "lucide-react";

import AdminSubmitButton from "@/components/admin/AdminSubmitButton";
import { deleteDepartment, saveDepartment } from "@/app/admin/actions";
import { db } from "@/lib/db";

const inputClass =
  "min-h-11 min-w-0 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-800 focus:ring-4 focus:ring-blue-100";

export default async function AdminDepartmentsPage() {
  const departments = await db.department.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
    include: { _count: { select: { teachers: true, students: true, admissions: true } } },
  }).catch(() => []);

  return (
    <div className="grid max-w-screen-2xl gap-6">
      <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(320px,420px)_1fr] lg:items-start">
      <div className="grid min-w-0 content-start gap-6">
        <div>
          <p className="text-sm font-bold text-blue-800">Departments</p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">จัดการแผนกวิชา</h1>
        </div>
        <form action={saveDepartment} className="soft-panel grid min-w-0 gap-4 p-5">
          <div className="flex items-center gap-3">
            <Building2 className="h-6 w-6 text-blue-800" />
            <h2 className="text-xl font-black">เพิ่มแผนกใหม่</h2>
          </div>
          <input name="name" required className={inputClass} placeholder="ชื่อแผนก" />
          <input name="slug" className={inputClass} placeholder="slug เช่น information-technology" />
          <textarea name="description" rows={4} className="min-w-0 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100" placeholder="คำอธิบายแผนก" />
          <div className="grid min-w-0 gap-3 sm:grid-cols-3">
            <input name="icon" className={inputClass} placeholder="icon" />
            <input name="color" type="color" defaultValue="#1D4ED8" className="h-11 w-full cursor-pointer rounded-2xl border border-slate-200 bg-white p-1" />
            <input name="order" type="number" className={inputClass} defaultValue="0" placeholder="ลำดับ" />
          </div>
          <label className="flex min-h-11 items-center gap-3 rounded-2xl border border-slate-200 px-4 text-sm font-bold text-slate-700">
            <input name="isActive" type="checkbox" defaultChecked className="h-4 w-4" />
            แสดงบนเว็บไซต์
          </label>
          <AdminSubmitButton label="บันทึกแผนก" iconName="save" />
        </form>
      </div>

      <section className="soft-panel min-w-0 overflow-hidden">
        <div className="border-b border-slate-200 p-5">
          <h2 className="text-xl font-black">รายชื่อแผนกวิชา</h2>
        </div>
        <div className="divide-y divide-slate-200">
          {departments.map((department) => (
            <form key={department.id} action={saveDepartment} className="grid min-w-0 gap-4 p-5">
              <input type="hidden" name="id" value={department.id} />
              <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_160px_110px]">
                <input name="name" required className={inputClass} defaultValue={department.name} />
                <input name="slug" className={inputClass} defaultValue={department.slug} />
                <input name="order" type="number" className={inputClass} defaultValue={department.order} />
              </div>
              <textarea name="description" rows={3} className="min-w-0 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100" defaultValue={department.description ?? ""} />
              <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_120px_minmax(180px,1fr)_auto_auto] lg:items-center">
                <input name="icon" className={inputClass} defaultValue={department.icon ?? ""} placeholder="icon" />
                <input name="color" type="color" className="h-11 w-full cursor-pointer rounded-2xl border border-slate-200 bg-white p-1" defaultValue={department.color ?? "#1D4ED8"} />
                <label className="flex min-h-11 items-center gap-3 rounded-2xl border border-slate-200 px-4 text-sm font-bold text-slate-700">
                  <input name="isActive" type="checkbox" defaultChecked={department.isActive} className="h-4 w-4" />
                  แสดงบนเว็บ
                </label>
                <AdminSubmitButton label="บันทึก" pendingLabel="บันทึก" iconName="save" />
                <button
                  formAction={async (formData) => {
                    "use server";
                    await deleteDepartment(formData);
                  }}
                  className="soft-button inline-flex h-11 max-w-max shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-rose-600 px-5 text-sm font-black leading-none text-white hover:bg-rose-700"
                >
                  <Trash2 className="h-4 w-4" />
                  ลบ
                </button>
              </div>
              <p className="text-xs font-bold text-slate-500">
                ครู {department._count.teachers} คน · นักศึกษา {department._count.students} คน · ใบสมัคร {department._count.admissions} รายการ
              </p>
            </form>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
}
