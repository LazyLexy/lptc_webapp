import Link from "next/link";

import PrintApplicationSearch from "@/components/admissions/PrintApplicationSearch";

export default function AdmissionPrintSearchPage() {
  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <nav className="text-sm font-bold text-slate-500">
            <Link href="/" className="hover:text-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-100">หน้าแรก</Link>
            <span className="mx-2">/</span>
            <Link href="/admissions" className="hover:text-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-100">สมัครเรียนออนไลน์</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">พิมพ์ใบสมัคร</span>
          </nav>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <PrintApplicationSearch />
      </section>
    </main>
  );
}
