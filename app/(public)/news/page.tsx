import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, CalendarDays, Newspaper, Search } from "lucide-react";

import { getAllNewsCategories, getNewsList } from "@/lib/public-content";

type NewsPageProps = {
  searchParams?: Promise<{
    category?: string;
  }>;
};

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;
  const activeCategory = params?.category ?? "ทั้งหมด";
  const [categories, news] = await Promise.all([
    getAllNewsCategories(),
    getNewsList(activeCategory),
  ]);

  return (
    <div className="bg-white text-slate-950">
      <section className="soft-surface border-b border-slate-200">
        <div className="container mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <nav className="text-sm font-semibold text-slate-500">
            <Link href="/" className="hover:text-blue-800">หน้าแรก</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">ข่าวสาร</span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-bold text-blue-800">ข่าวสาร</p>
              <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">
                ข่าวประชาสัมพันธ์และความเคลื่อนไหวของวิทยาลัย
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                รวมประกาศ ข่าวรับสมัคร ผลงานนักศึกษา และกิจกรรมสำคัญของวิทยาลัยเทคนิคลำปาง
              </p>
            </div>

            <div className="soft-panel p-5">
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5 text-blue-800" />
                <p className="text-sm font-black text-slate-950">เลือกหมวดข่าว</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => {
                  const isActive = category === activeCategory;
                  const href = category === "ทั้งหมด" ? "/news" : `/news?category=${encodeURIComponent(category)}`;

                  return (
                    <Link
                      key={category}
                      href={href}
                      className={`rounded-full border px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 ${
                        isActive
                          ? "border-blue-800 bg-blue-800 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800"
                      }`}
                    >
                      {category}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between gap-4 border-b border-slate-300 pb-5">
            <div className="flex items-center gap-3">
              <Newspaper className="h-6 w-6 text-blue-800" />
              <h2 className="text-2xl font-black">รายการข่าว</h2>
            </div>
            <p className="text-sm font-semibold text-slate-500">{news.length} รายการ</p>
          </div>

          {news.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {news.map((item, index) => (
                <article key={item.id} className="soft-card group stagger-soft overflow-hidden" style={{ "--i": index } as CSSProperties}>
                  <Link href={`/news/${item.slug}`} className="block h-full">
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex min-h-72 flex-col p-5">
                      <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                        <span className="rounded-full bg-blue-50 px-3 py-1 font-bold text-blue-800">{item.category}</span>
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {item.date}
                        </span>
                      </div>
                      <h3 className="mt-4 text-xl font-black leading-8 text-slate-950 group-hover:text-blue-800">
                        {item.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{item.excerpt}</p>
                      <span className="mt-auto flex items-center justify-between border-t border-slate-200 pt-5 text-sm font-bold text-blue-800">
                        อ่านข่าวละเอียด
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="soft-panel p-8 text-center">
              <p className="text-lg font-bold text-slate-950">ยังไม่มีข่าวในหมวดนี้</p>
              <Link href="/news" className="mt-4 inline-flex text-sm font-bold text-blue-800 hover:text-blue-950">
                กลับไปดูข่าวทั้งหมด
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
