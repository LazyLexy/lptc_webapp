import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Newspaper } from "lucide-react";

import { getNewsBySlug, getNewsList } from "@/lib/public-content";

type NewsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  const relatedNews = (await getNewsList())
    .filter((item) => item.slug !== news.slug)
    .slice(0, 3);

  return (
    <article className="bg-white text-slate-950">
      <section className="soft-surface border-b border-slate-200">
        <div className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <nav className="text-sm font-semibold text-slate-500">
            <Link href="/" className="hover:text-blue-800">หน้าแรก</Link>
            <span className="mx-2">/</span>
            <Link href="/news" className="hover:text-blue-800">ข่าวสาร</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">อ่านข่าว</span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-end">
            <div>
              <Link href="/news" className="inline-flex items-center gap-2 text-sm font-bold text-blue-800 hover:text-blue-950">
                <ArrowLeft className="h-4 w-4" />
                กลับหน้ารายการข่าว
              </Link>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-500">
                <span className="rounded-full bg-blue-800 px-4 py-2 text-white">{news.category}</span>
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-blue-800" />
                  {news.date}
                </span>
              </div>
              <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
                {news.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{news.excerpt}</p>
            </div>

            <div className="soft-panel p-5">
              <Newspaper className="h-8 w-8 text-blue-800" />
              <p className="mt-4 text-sm font-bold text-slate-500">ข่าวประชาสัมพันธ์</p>
              <p className="mt-2 text-2xl font-black text-slate-950">วิทยาลัยเทคนิคลำปาง</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8">
          <div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-slate-200 shadow-2xl shadow-slate-950/10">
              <Image
                src={news.image}
                alt={news.title}
                fill
                unoptimized
                priority
                sizes="(min-width: 1024px) 70vw, 100vw"
                className="object-cover"
              />
            </div>

            <div
              className="rich-content mt-10 max-w-3xl text-lg leading-9 text-slate-700"
              dangerouslySetInnerHTML={{ __html: news.content ?? `<p>${news.excerpt}</p>` }}
            />
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="soft-panel overflow-hidden">
              <div className="border-b border-slate-200 p-5">
                <h2 className="text-xl font-black">ข่าวอื่นที่น่าสนใจ</h2>
              </div>
              <div className="divide-y divide-slate-200">
                {relatedNews.map((item) => (
                  <Link key={item.id} href={`/news/${item.slug}`} className="block p-5 transition hover:bg-blue-50">
                    <p className="text-xs font-bold text-blue-800">{item.category}</p>
                    <h3 className="mt-2 font-bold leading-6 text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-500">{item.date}</p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </article>
  );
}
