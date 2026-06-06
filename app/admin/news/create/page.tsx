import Link from "next/link";

import { db } from "@/lib/db";
import NewsForm from "../NewsForm";

export default async function AdminNewsCreatePage() {
  const categories = await db.newsCategory.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  }).catch(() => []);

  return (
    <div className="grid gap-6">
      <div>
        <Link href="/admin/news" className="text-sm font-bold text-blue-800 hover:text-blue-950">กลับรายการข่าว</Link>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">สร้างข่าวใหม่</h1>
      </div>
      {categories.length ? (
        <NewsForm categories={categories} />
      ) : (
        <div className="soft-panel p-6">
          <p className="font-bold text-slate-700">กรุณาสร้างหมวดหมู่ข่าวก่อนเพิ่มข่าวใหม่</p>
          <Link href="/admin/news" className="mt-4 inline-flex text-sm font-bold text-blue-800">ไปหน้าหมวดหมู่ข่าว</Link>
        </div>
      )}
    </div>
  );
}
