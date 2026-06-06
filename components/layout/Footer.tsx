import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";

const links = [
  { href: "/", label: "หน้าแรก" },
  { href: "/about", label: "เกี่ยวกับวิทยาลัย" },
  { href: "/courses", label: "หลักสูตร" },
  { href: "/admissions", label: "สมัครเรียนออนไลน์" },
  { href: "/news", label: "ข่าวสาร" },
  { href: "/events", label: "ปฏิทินกิจกรรม" },
  { href: "/contact", label: "ติดต่อเรา" },
];

const importantLinks = [
  { href: "/departments", label: "แผนกวิชา" },
  { href: "/gallery", label: "ภาพกิจกรรม" },
  { href: "/portal/login", label: "Student Portal" },
  { href: "/admin", label: "Admin CMS" },
  { href: "/docs/เอกสารใบลา.pdf", label: "แบบฟอร์มนักศึกษา" },
];

const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B9%80%E0%B8%97%E0%B8%84%E0%B8%99%E0%B8%B4%E0%B8%84%E0%B8%A5%E0%B8%B3%E0%B8%9B%E0%B8%B2%E0%B8%87";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-slate-100">
      <div className="container mx-auto grid max-w-[78rem] gap-9 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.15fr_0.75fr_0.75fr_1.1fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-white">
              <Image src="/logo/lptclogo.png" alt="โลโก้วิทยาลัยเทคนิคลำปาง" fill sizes="56px" className="object-contain p-1" />
            </div>
            <div>
              <h2 className="text-xl font-black">วิทยาลัยเทคนิคลำปาง</h2>
              <p className="mt-1 text-base font-semibold text-blue-100">Lampang Technical College</p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-base leading-7 text-blue-100">
            ศูนย์กลางข้อมูลหลักสูตร แผนกวิชา ข่าว กิจกรรม และช่องทางติดต่อสำหรับผู้สมัคร นักศึกษา ผู้ปกครอง และบุคลากร
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/admissions"
              className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-base font-black text-blue-950 transition hover:bg-sky-100"
            >
              สมัครเรียนออนไลน์
            </Link>
            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-base font-bold text-white transition hover:bg-white/10"
            >
              Google Map
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-black text-white">เมนูหลัก</h3>
          <ul className="mt-5 space-y-2">
            {links.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex rounded-full px-2 py-1 text-base text-blue-100 transition hover:bg-white/10 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-black text-white">ลิงก์สำคัญ</h3>
          <ul className="mt-5 space-y-2">
            {importantLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex rounded-full px-2 py-1 text-base text-blue-100 transition hover:bg-white/10 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-black text-white">ติดต่อวิทยาลัย</h3>
          <ul className="mt-5 space-y-4 rounded-2xl border border-white/10 bg-white/6 p-5 text-base leading-7 text-blue-50">
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-sky-200" />
              <span>15 ถนนท่าคราวน้อย ต.สบตุ๋ย อ.เมือง จ.ลำปาง 52100</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-sky-200" />
              <a href="tel:054217106" className="rounded-full transition hover:text-white">0 5421 7106</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-sky-200" />
              <span>โทรสาร 0 5422 4426</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-sky-200" />
              <a href="mailto:saraban@lampangtc.ac.th" className="rounded-full transition hover:text-white">saraban@lampangtc.ac.th</a>
            </li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.facebook.com/lampangtc"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook วิทยาลัยเทคนิคลำปาง"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-blue-950 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-200/40"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto flex max-w-[78rem] flex-col gap-3 px-4 text-sm font-semibold text-blue-100/75 sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} วิทยาลัยเทคนิคลำปาง</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="rounded-full px-2 py-1 transition hover:bg-white/10 hover:text-white">ติดต่อเรา</Link>
            <Link href="/portal/login" className="rounded-full px-2 py-1 transition hover:bg-white/10 hover:text-white">เข้าสู่ระบบ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
