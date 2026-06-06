import { CalendarPlus, Trash2 } from "lucide-react";

import AdminSubmitButton from "@/components/admin/AdminSubmitButton";
import { deleteEvent, saveEvent } from "@/app/admin/actions";
import { db } from "@/lib/db";

const inputClass =
  "min-h-11 min-w-0 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-800 focus:ring-4 focus:ring-blue-100";

function dateValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

export default async function AdminEventsPage() {
  const events = await db.event.findMany({
    orderBy: [{ startDate: "asc" }, { title: "asc" }],
  }).catch(() => []);

  return (
    <div className="grid max-w-screen-2xl gap-6">
      <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(320px,420px)_1fr] lg:items-start">
      <div className="grid min-w-0 content-start gap-6">
        <div>
          <p className="text-sm font-bold text-blue-800">Events</p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">จัดการกิจกรรม</h1>
        </div>
        <form action={saveEvent} className="soft-panel grid min-w-0 gap-4 p-5">
          <div className="flex items-center gap-3">
            <CalendarPlus className="h-6 w-6 text-blue-800" />
            <h2 className="text-xl font-black">เพิ่มกิจกรรม</h2>
          </div>
          <input name="title" required className={inputClass} placeholder="ชื่อกิจกรรม" />
          <div className="grid min-w-0 gap-3 sm:grid-cols-2">
            <input name="startDate" required type="date" className={inputClass} />
            <input name="endDate" type="date" className={inputClass} />
          </div>
          <div className="grid min-w-0 gap-3 sm:grid-cols-2">
            <input name="type" className={inputClass} defaultValue="GENERAL" placeholder="ประเภท" />
            <input name="location" className={inputClass} placeholder="สถานที่" />
          </div>
          <textarea name="description" rows={4} className="min-w-0 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100" placeholder="รายละเอียดกิจกรรม" />
          <label className="flex min-h-11 items-center gap-3 rounded-2xl border border-slate-200 px-4 text-sm font-bold text-slate-700">
            <input name="isHighlight" type="checkbox" className="h-4 w-4" />
            กิจกรรมเด่น
          </label>
          <AdminSubmitButton label="บันทึกกิจกรรม" iconName="save" />
        </form>
      </div>

      <section className="grid min-w-0 gap-4">
        {events.map((event) => (
          <form key={event.id} action={saveEvent} className="soft-panel grid min-w-0 gap-4 p-5">
            <input type="hidden" name="id" value={event.id} />
            <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_150px_150px]">
              <input name="title" required className={inputClass} defaultValue={event.title} />
              <input name="startDate" type="date" required className={inputClass} defaultValue={dateValue(event.startDate)} />
              <input name="endDate" type="date" className={inputClass} defaultValue={dateValue(event.endDate)} />
            </div>
            <div className="grid min-w-0 gap-3 lg:grid-cols-[180px_minmax(0,1fr)_auto] lg:items-center">
              <input name="type" className={inputClass} defaultValue={event.type} />
              <input name="location" className={inputClass} defaultValue={event.location ?? ""} placeholder="สถานที่" />
              <label className="flex min-h-11 items-center gap-3 rounded-2xl border border-slate-200 px-4 text-sm font-bold text-slate-700">
                <input name="isHighlight" type="checkbox" defaultChecked={event.isHighlight} className="h-4 w-4" />
                กิจกรรมเด่น
              </label>
            </div>
            <textarea name="description" rows={3} className="min-w-0 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100" defaultValue={event.description ?? ""} />
            <div className="flex flex-wrap items-center justify-end gap-2">
              <AdminSubmitButton label="บันทึก" pendingLabel="บันทึก" iconName="save" />
              <button formAction={deleteEvent} className="soft-button inline-flex h-11 max-w-max shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-rose-600 px-5 text-sm font-black leading-none text-white hover:bg-rose-700">
                <Trash2 className="h-4 w-4" />
                ลบ
              </button>
            </div>
          </form>
        ))}
        {!events.length ? <div className="soft-panel p-8 text-center text-sm font-bold text-slate-500">ยังไม่มีกิจกรรม</div> : null}
      </section>
      </div>
    </div>
  );
}
