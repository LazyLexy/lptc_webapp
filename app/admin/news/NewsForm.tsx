"use client";

import Link from "next/link";

import AdminSubmitButton from "@/components/admin/AdminSubmitButton";
import ImageUploader from "@/components/admin/ImageUploader";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { saveNews } from "@/app/admin/actions";

type CategoryOption = {
  id: string;
  name: string;
};

type NewsFormValue = {
  id?: string;
  categoryId?: string;
  title?: string;
  slug?: string;
  excerpt?: string | null;
  content?: string;
  coverImage?: string | null;
  status?: string;
};

type NewsFormProps = {
  categories: CategoryOption[];
  news?: NewsFormValue;
};

const inputClass =
  "min-h-11 min-w-0 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-800 focus:ring-4 focus:ring-blue-100";

export default function NewsForm({ categories, news }: NewsFormProps) {
  return (
    <form action={saveNews} className="grid max-w-screen-2xl gap-6">
      <input type="hidden" name="id" value={news?.id ?? ""} />
      <section className="soft-panel grid min-w-0 gap-4 p-5">
        <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            หัวข้อข่าว
            <input name="title" required className={inputClass} defaultValue={news?.title ?? ""} placeholder="หัวข้อข่าวประชาสัมพันธ์" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            สถานะ
            <select name="status" className={inputClass} defaultValue={news?.status ?? "DRAFT"}>
              <option value="DRAFT">แบบร่าง</option>
              <option value="PUBLISHED">เผยแพร่</option>
            </select>
          </label>
        </div>

        <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Slug
            <input name="slug" className={inputClass} defaultValue={news?.slug ?? ""} placeholder="ปล่อยว่างเพื่อสร้างจากหัวข้อ" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            หมวดหมู่
            <select name="categoryId" required className={inputClass} defaultValue={news?.categoryId ?? categories[0]?.id ?? ""}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="grid gap-2 text-sm font-bold text-slate-700">
          สรุปข่าว
          <textarea
            name="excerpt"
            rows={3}
            className="min-w-0 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:ring-4 focus:ring-blue-100"
            defaultValue={news?.excerpt ?? ""}
            placeholder="ข้อความสั้นสำหรับแสดงบนหน้ารายการข่าว"
          />
        </label>

        <ImageUploader name="coverImage" label="รูปหน้าปกข่าว" folder="news" defaultValue={news?.coverImage} />

        <div className="grid min-w-0 gap-2">
          <label className="text-sm font-bold text-slate-700">เนื้อหาข่าว</label>
          <RichTextEditor name="content" defaultValue={news?.content ?? ""} />
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <AdminSubmitButton label="บันทึกข่าว" iconName="save" />
        <Link href="/admin/news" className="soft-button inline-flex min-h-11 items-center justify-center rounded-full border border-slate-200 px-5 text-sm font-black text-slate-700 hover:bg-slate-50">
          ยกเลิก
        </Link>
      </div>
    </form>
  );
}
