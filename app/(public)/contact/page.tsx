import Link from "next/link";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";

import { getContactContent } from "@/lib/public-content";

export default function ContactPage() {
  const contact = getContactContent();

  return (
    <div className="bg-white text-slate-950">
      <section className="soft-surface border-b border-slate-200">
        <div className="container mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <nav className="text-sm font-semibold text-slate-500">
            <Link href="/" className="hover:text-blue-800">หน้าแรก</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">ติดต่อเรา</span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-end">
            <div className="min-w-0 max-w-3xl">
              <p className="text-sm font-bold text-blue-800">ติดต่อเรา</p>
              <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">
                ติดต่อเรา
              </h1>
              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                ช่องทางติดต่อสำหรับผู้สมัครเรียน นักศึกษา และผู้ปกครอง
                <br />
                รวมถึงหน่วยงานภายนอก
              </p>
            </div>

            <div className="soft-panel p-5">
              <Clock className="h-8 w-8 text-blue-800" />
              <h2 className="mt-4 text-2xl font-black">เวลาทำการ</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{contact.officeHours}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[420px_minmax(0,1fr)] lg:px-8">
          <div className="grid gap-5">
            <div className="soft-panel p-6">
              <MapPin className="h-8 w-8 text-blue-800" />
              <h2 className="mt-4 text-2xl font-black">ที่อยู่</h2>
              <p className="mt-3 text-base leading-7 text-slate-700">{contact.address}</p>
            </div>

            <div className="grid gap-4">
              {contact.channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href ?? "#contact-map"}
                  className="soft-card flex min-h-20 items-center gap-4 p-5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-800">
                    {channel.label === "อีเมล" ? <Mail className="h-6 w-6" /> : <Phone className="h-6 w-6" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-500">{channel.label}</p>
                    <p className="mt-1 font-black text-slate-950">{channel.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="rounded-[2rem] bg-blue-800 p-6 text-white">
              <Send className="h-7 w-7 text-sky-200" />
              <h2 className="mt-4 text-xl font-black">สำหรับผู้สนใจสมัครเรียน</h2>
              <p className="mt-2 text-sm leading-6 text-blue-50">กรอกข้อมูลเบื้องต้นในหน้าสมัครเรียนออนไลน์เพื่อให้เจ้าหน้าที่ติดต่อกลับ</p>
              <Link href="/admissions" className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-blue-900 transition hover:bg-sky-100">
                ไปหน้าสมัครเรียน
              </Link>
            </div>
          </div>

          <div id="contact-map" className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-2xl shadow-slate-950/10">
            <iframe
              title="แผนที่วิทยาลัยเทคนิคลำปาง"
              src={contact.mapEmbedUrl}
              className="h-[520px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  );
}
