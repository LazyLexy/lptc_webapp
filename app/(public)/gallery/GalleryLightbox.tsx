"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

import type { GalleryImage } from "@/lib/public-content";

type GalleryLightboxProps = {
  images: GalleryImage[];
};

export default function GalleryLightbox({ images }: GalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];
  const categories = useMemo(() => ["ทั้งหมด", ...Array.from(new Set(images.map((image) => image.category)))], [images]);
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");
  const filteredImages = activeCategory === "ทั้งหมด" ? images : images.filter((image) => image.category === activeCategory);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (activeIndex === null) return;
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex((activeIndex + 1) % images.length);
      if (event.key === "ArrowLeft") setActiveIndex((activeIndex - 1 + images.length) % images.length);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, images.length]);

  function openImage(image: GalleryImage) {
    const index = images.findIndex((item) => item.id === image.id);
    setActiveIndex(index >= 0 ? index : 0);
  }

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`min-h-11 cursor-pointer rounded-full border px-4 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 ${
              activeCategory === category
                ? "border-blue-800 bg-blue-800 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredImages.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => openImage(image)}
            className="soft-card group cursor-pointer overflow-hidden text-left focus:outline-none focus:ring-4 focus:ring-blue-100"
            style={{ "--i": index } as CSSProperties}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
              <Image
                src={image.image}
                alt={image.title}
                fill
                unoptimized
                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-slate-950/80 to-transparent p-4 pt-14 text-white">
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-blue-900">{image.category}</span>
                <Maximize2 className="h-5 w-5" />
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm font-bold text-blue-800">{image.date}</p>
              <h3 className="mt-3 text-xl font-black leading-7 text-slate-950">{image.title}</h3>
              <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{image.description}</p>
            </div>
          </button>
        ))}
      </div>

      {activeImage && activeIndex !== null ? (
        <div className="fixed inset-0 z-[80] bg-slate-950/95 p-4 text-white" role="dialog" aria-modal="true" aria-label={activeImage.title}>
          <div className="mx-auto flex h-full max-w-6xl flex-col">
            <div className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-sm font-bold text-sky-200">{activeImage.category}</p>
                <h2 className="mt-1 text-xl font-black sm:text-2xl">{activeImage.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="ปิดภาพ"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden rounded-[2rem] bg-black">
              <Image
                src={activeImage.image}
                alt={activeImage.title}
                fill
                unoptimized
                sizes="100vw"
                className="object-contain"
              />
              <button
                type="button"
                onClick={() => setActiveIndex((activeIndex - 1 + images.length) % images.length)}
                className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="ภาพก่อนหน้า"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex((activeIndex + 1) % images.length)}
                className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="ภาพถัดไป"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </div>

            <p className="py-4 text-sm leading-6 text-slate-300">{activeImage.description}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
