import Image from "next/image";
import { ImagePlus, Trash2 } from "lucide-react";

import AdminSubmitButton from "@/components/admin/AdminSubmitButton";
import ImageUploader from "@/components/admin/ImageUploader";
import { addPhoto, deleteAlbum, deletePhoto, saveAlbum } from "@/app/admin/actions";
import { db } from "@/lib/db";

const inputClass =
  "min-h-11 min-w-0 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-800 focus:ring-4 focus:ring-blue-100";

function dateValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

export default async function AdminGalleryPage() {
  const [departments, albums] = await Promise.all([
    db.department.findMany({ orderBy: [{ order: "asc" }, { name: "asc" }], select: { id: true, name: true } }).catch(() => []),
    db.album.findMany({
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
      include: {
        department: { select: { name: true } },
        photos: { orderBy: { order: "asc" } },
      },
    }).catch(() => []),
  ]);

  return (
    <div className="grid max-w-screen-2xl gap-6">
      <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(320px,420px)_1fr] lg:items-start">
      <div className="grid min-w-0 content-start gap-6">
        <div>
          <p className="text-sm font-bold text-blue-800">Gallery</p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">จัดการแกลเลอรี่</h1>
        </div>
        <form action={saveAlbum} className="soft-panel grid min-w-0 gap-4 p-5">
          <div className="flex items-center gap-3">
            <ImagePlus className="h-6 w-6 text-blue-800" />
            <h2 className="text-xl font-black">เพิ่มอัลบั้ม</h2>
          </div>
          <input name="title" required className={inputClass} placeholder="ชื่ออัลบั้ม" />
          <select name="departmentId" className={inputClass} defaultValue="">
            <option value="">ภาพรวมวิทยาลัย</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>{department.name}</option>
            ))}
          </select>
          <input name="date" type="date" className={inputClass} defaultValue={new Date().toISOString().slice(0, 10)} />
          <textarea name="description" rows={4} className="min-w-0 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100" placeholder="รายละเอียดอัลบั้ม" />
          <ImageUploader name="coverImage" label="รูปปกอัลบั้ม" folder="gallery" />
          <AdminSubmitButton label="บันทึกอัลบั้ม" iconName="save" />
        </form>
      </div>

      <section className="grid min-w-0 gap-5">
        {albums.map((album) => (
          <article key={album.id} className="soft-panel min-w-0 overflow-hidden">
            <form action={saveAlbum} className="grid min-w-0 gap-4 border-b border-slate-200 p-5">
              <input type="hidden" name="id" value={album.id} />
              <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_220px_150px]">
                <input name="title" required className={inputClass} defaultValue={album.title} />
                <select name="departmentId" className={inputClass} defaultValue={album.departmentId ?? ""}>
                  <option value="">ภาพรวมวิทยาลัย</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>{department.name}</option>
                  ))}
                </select>
                <input name="date" type="date" className={inputClass} defaultValue={dateValue(album.date)} />
              </div>
              <textarea name="description" rows={2} className="min-w-0 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100" defaultValue={album.description ?? ""} />
              <ImageUploader name="coverImage" label="รูปปกอัลบั้ม" folder="gallery" defaultValue={album.coverImage} />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-bold text-slate-500">{album.department?.name ?? "ภาพรวมวิทยาลัย"} · {album.photos.length} รูป</p>
                <div className="flex flex-wrap items-center gap-2">
                  <AdminSubmitButton label="บันทึก" pendingLabel="บันทึก" iconName="save" />
                  <button formAction={deleteAlbum} className="soft-button inline-flex h-11 max-w-max shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-rose-600 px-5 text-sm font-black leading-none text-white hover:bg-rose-700">
                    <Trash2 className="h-4 w-4" />
                    ลบอัลบั้ม
                  </button>
                </div>
              </div>
            </form>

            <div className="grid min-w-0 gap-4 p-5">
              <form action={addPhoto} className="grid min-w-0 gap-4 rounded-2xl bg-slate-50 p-4">
                <input type="hidden" name="albumId" value={album.id} />
                <ImageUploader name="url" label="เพิ่มรูปภาพในอัลบั้ม" folder="gallery" />
                <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_100px_auto] lg:items-center">
                  <input name="caption" className={inputClass} placeholder="คำบรรยายภาพ" />
                  <input name="order" type="number" className={inputClass} defaultValue="0" />
                  <AdminSubmitButton label="เพิ่มรูป" iconName="imagePlus" />
                </div>
              </form>

              <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {album.photos.map((photo) => (
                  <div key={photo.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <div className="relative aspect-[4/3] bg-slate-100">
                      <Image src={photo.url} alt={photo.caption ?? album.title} fill unoptimized sizes="240px" className="object-cover" />
                    </div>
                    <div className="grid gap-3 p-3">
                      <p className="line-clamp-2 text-sm font-bold text-slate-700">{photo.caption ?? "ไม่มีคำบรรยาย"}</p>
                      <form action={deletePhoto}>
                        <input type="hidden" name="id" value={photo.id} />
                        <AdminSubmitButton label="ลบรูป" pendingLabel="ลบรูป" iconName="trash" variant="secondary" className="min-h-9 w-full text-xs" />
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
        {!albums.length ? <div className="soft-panel p-8 text-center text-sm font-bold text-slate-500">ยังไม่มีอัลบั้ม</div> : null}
      </section>
      </div>
    </div>
  );
}
