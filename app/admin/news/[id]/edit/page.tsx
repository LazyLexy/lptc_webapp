import Link from "next/link";
import { notFound } from "next/navigation";

import { db } from "@/lib/db";
import NewsForm from "../../NewsForm";

type AdminNewsEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminNewsEditPage({ params }: AdminNewsEditPageProps) {
  const { id } = await params;
  const [news, categories] = await Promise.all([
    db.news.findUnique({
      where: { id },
      select: {
        id: true,
        categoryId: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        coverImage: true,
        status: true,
      },
    }),
    db.newsCategory.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  if (!news) notFound();

  return (
    <div className="grid gap-6">
      <div>
        <Link href="/admin/news" className="text-sm font-bold text-blue-800 hover:text-blue-950">กลับรายการข่าว</Link>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">แก้ไขข่าว</h1>
      </div>
      <NewsForm categories={categories} news={news} />
    </div>
  );
}
