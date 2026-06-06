import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl content-center gap-6">
      <Link href="/" className="inline-flex min-h-10 max-w-max items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-black text-slate-700 transition hover:bg-blue-50 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100">
        <ArrowLeft className="h-4 w-4" />
        กลับหน้าหลัก
      </Link>
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_440px]">
      <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/15 sm:p-10">
        <Image
          src="/banner&other/Untitled-1.jpg"
          alt="วิทยาลัยเทคนิคลำปาง"
          fill
          priority
          unoptimized
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover opacity-35"
        />
        <div className="relative z-10">
          <ShieldCheck className="h-10 w-10 text-sky-200" />
          <p className="mt-12 text-sm font-bold text-sky-200">LPTC Portal</p>
          <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">เข้าสู่ระบบ</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-100">
            สำหรับนักศึกษา ครู และบุคลากร
            <br />
            เพื่อเข้าสู่แดชบอร์ดและโปรไฟล์ของตนเอง
          </p>
        </div>
      </section>

      <section>
        <div className="mb-5">
          <p className="text-sm font-bold text-blue-800">Login</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">เข้าสู่ระบบ</h2>
        </div>
        <LoginForm />
      </section>
      </div>
    </div>
  );
}
