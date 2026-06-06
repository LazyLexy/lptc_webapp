import Link from "next/link";
import { CalendarDays, Edit, Plus } from "lucide-react";

import AdminSubmitButton from "@/components/admin/AdminSubmitButton";
import { createNewsCategory, deleteNews, deleteNewsCategory } from "@/app/admin/actions";
import { db } from "@/lib/db";

export default async function AdminNewsPage() {
  const [news, categories] = await Promise.all([
    db.news.findMany({
      orderBy: [{ createdAt: "desc" }],
      include: { category: true },
    }).catch(() => []),
    db.newsCategory.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { news: true } } },
    }).catch(() => []),
  ]);

  return (
    <div className="grid max-w-screen-2xl gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold text-blue-800">News</p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">จัดการข่าว</h1>
        </div>
        <Link href="/admin/news/create" className="soft-button inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-blue-800 px-5 text-sm font-black text-white hover:bg-blue-900">
          <Plus className="h-4 w-4" />
          เพิ่มข่าว
        </Link>
      </div>

      <section className="grid min-w-0 gap-4 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="soft-panel min-w-0 overflow-hidden">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-xl font-black">รายการข่าวทั้งหมด</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-5 py-3">ข่าว</th>
                  <th className="px-5 py-3 whitespace-nowrap">หมวด</th>
                  <th className="px-5 py-3 whitespace-nowrap">สถานะ</th>
                  <th className="px-5 py-3 whitespace-nowrap">วันที่</th>
                  <th className="px-5 py-3 text-right">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {news.map((item) => (
                  <tr key={item.id} className="align-top hover:bg-blue-50/60">
                    <td className="px-5 py-4">
                      <p className="font-black text-slate-950">{item.title}</p>
                      <p className="mt-1 line-clamp-2 text-slate-500">{item.excerpt ?? item.slug}</p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="inline-flex min-w-max items-center rounded-full px-3 py-1 text-xs font-black leading-none whitespace-nowrap text-white" style={{ backgroundColor: item.category.color }}>
                        {item.category.name}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-flex min-w-max items-center rounded-full px-3 py-1 text-xs font-black leading-none whitespace-nowrap ${item.status === "PUBLISHED" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                        {item.status === "PUBLISHED" ? "เผยแพร่" : "แบบร่าง"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      <span className="inline-flex min-w-max items-center gap-2 whitespace-nowrap">
                        <CalendarDays className="h-4 w-4 text-blue-800" />
                        {new Intl.DateTimeFormat("th-TH").format(item.publishedAt ?? item.createdAt)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        <Link href={`/admin/news/${item.id}/edit`} className="inline-flex h-10 max-w-max shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-slate-200 px-4 text-xs font-black text-slate-700 hover:bg-white">
                          <Edit className="mr-2 h-4 w-4" />
                          แก้ไข
                        </Link>
                        <form action={deleteNews}>
                          <input type="hidden" name="id" value={item.id} />
                          <AdminSubmitButton label="ลบ" pendingLabel="ลบ" iconName="trash" variant="danger" className="min-h-10 px-4 text-xs" />
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
                {!news.length ? (
                  <tr>
                    <td className="px-5 py-10 text-center text-sm font-bold text-slate-500" colSpan={5}>
                      ยังไม่มีข่าวในระบบ
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="grid min-w-0 content-start gap-4">
          <form action={createNewsCategory} className="soft-panel grid min-w-0 gap-3 p-5">
            <h2 className="text-xl font-black">เพิ่มหมวดหมู่</h2>
            <input name="name" required className="min-h-11 min-w-0 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100" placeholder="ชื่อหมวดหมู่" />
            <input name="slug" className="min-h-11 min-w-0 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100" placeholder="slug" />
            <input name="color" type="color" defaultValue="#1D9E75" className="h-11 w-full cursor-pointer rounded-2xl border border-slate-200 bg-white p-1" />
            <AdminSubmitButton label="เพิ่มหมวดหมู่" iconName="plus" />
          </form>

          <div className="soft-panel min-w-0 overflow-hidden">
            <div className="border-b border-slate-200 p-5">
              <h2 className="text-xl font-black">หมวดหมู่ข่าว</h2>
            </div>
            <div className="divide-y divide-slate-200">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between gap-3 p-4">
                  <div>
                    <p className="font-black">{category.name}</p>
                    <p className="text-xs text-slate-500">{category._count.news} ข่าว</p>
                  </div>
                  <form action={deleteNewsCategory}>
                    <input type="hidden" name="id" value={category.id} />
                    <AdminSubmitButton label="ลบ" pendingLabel="ลบ" iconName="trash" variant="secondary" className="min-h-9 px-3 text-xs" />
                  </form>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
