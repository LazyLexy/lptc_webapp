import Link from "next/link";
import { Camera, Images } from "lucide-react";

import { getGalleryImages } from "@/lib/public-content";
import GalleryLightbox from "./GalleryLightbox";

export default async function GalleryPage() {
  const gallery = await getGalleryImages();

  return (
    <div className="bg-white text-slate-950">
      <section className="soft-surface border-b border-slate-200">
        <div className="container mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <nav className="text-sm font-semibold text-slate-500">
            <Link href="/" className="hover:text-blue-800">หน้าแรก</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">แกลเลอรี่</span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
            <div className="min-w-0 max-w-3xl">
              <p className="text-sm font-bold text-blue-800">แกลเลอรี่</p>
              <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">
                แกลเลอรี่ภาพกิจกรรม
              </h1>
              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                รวมภาพกิจกรรม และบรรยากาศของวิทยาลัย
                <br />
                เปิดดูภาพด้วย lightbox
              </p>
            </div>

            <div className="soft-panel p-5">
              <Camera className="h-8 w-8 text-blue-800" />
              <p className="mt-4 text-sm font-bold text-slate-500">ภาพเผยแพร่</p>
              <p className="mt-2 text-4xl font-black text-slate-950">{gallery.length}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">รายการภาพจากอัลบั้มและภาพประชาสัมพันธ์</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col items-start justify-between gap-3 border-b border-slate-300 pb-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <Images className="h-6 w-6 text-blue-800" />
              <h2 className="text-2xl font-black">รายการภาพ</h2>
            </div>
            <p className="text-sm font-semibold text-slate-500">กดที่ภาพเพื่อขยาย</p>
          </div>

          <GalleryLightbox images={gallery} />
        </div>
      </section>
    </div>
  );
}
