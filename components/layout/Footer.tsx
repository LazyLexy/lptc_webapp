import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const links = [
  { href: "/admissions", label: "สมัครเรียนออนไลน์" },
  { href: "/news", label: "ข่าวประชาสัมพันธ์" },
  { href: "/events", label: "ปฏิทินกิจกรรม" },
  { href: "/gallery", label: "ภาพกิจกรรม" },
];

const departments = [
  { href: "/departments/automotive", label: "แผนกช่างยนต์" },
  { href: "/departments/electric-vehicle", label: "แผนกยานยนต์ไฟฟ้า" },
  { href: "/departments/machine-shop", label: "แผนกช่างกลโรงงาน" },
  { href: "/departments/welding", label: "แผนกช่างเชื่อมโลหะ" },
  { href: "/departments/electric-power", label: "แผนกช่างไฟฟ้ากำลัง" },
  { href: "/departments/electronics", label: "แผนกช่างอิเล็กทรอนิกส์" },
  { href: "/departments/construction", label: "แผนกช่างก่อสร้าง" },
  { href: "/departments/civil", label: "แผนกช่างโยธา" },
  { href: "/departments/architecture", label: "แผนกสถาปัตยกรรม" },
  { href: "/departments/mechatronics", label: "แผนกเมคคาทรอนิกส์" },
  { href: "/departments/it", label: "แผนกเทคโนโลยีสารสนเทศ" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-100">
      <div className="container mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-xl font-black text-white shadow-lg shadow-blue-500/20">
              L
            </div>
            <div>
              <h2 className="text-xl font-black">วิทยาลัยเทคนิคลำปาง</h2>
              <p className="mt-1 text-xs font-semibold text-slate-400">Lampang Technical College</p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
            มุ่งพัฒนาผู้เรียนอาชีวศึกษาให้มีทักษะวิชาชีพ คุณธรรม และความพร้อมต่อการทำงานในสังคมดิจิทัล
          </p>
        </div>

        <div>
          <h3 className="text-sm font-black text-white">เมนูหลัก</h3>
          <ul className="mt-5 space-y-3">
            {links.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex rounded-full px-2 py-1 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-black text-white">แผนกวิชา</h3>
          <ul className="mt-5 space-y-3">
            {departments.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex rounded-full px-2 py-1 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-black text-white">ติดต่อวิทยาลัย</h3>
          <ul className="mt-5 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
              <span>ที่อยู่ : 15 ถนนท่าคราวน้อย ต.สบตุ๋ย อ.เมือง จ.ลำปาง  52100</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-sky-300" />
              <span>โทรศัพท์ : 0 5421 7106</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-sky-300" />
              <span>โทรสาร : 0 5422 4426</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-sky-300" />
              <span>Email : saraban@lampangtc.ac.th</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto flex max-w-7xl flex-col gap-3 px-4 text-xs font-semibold text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} นายออมทรัพย์ อินต๊ะราชา นักศึกษา ปวช.3 แผนกเทคโนโลยีสารสนเทศ</p>
          <div className="flex gap-5">
            <Link href="/contact" className="rounded-full px-2 py-1 transition hover:bg-white/10 hover:text-slate-300">ติดต่อเรา</Link>
            <Link href="/portal/login" className="rounded-full px-2 py-1 transition hover:bg-white/10 hover:text-slate-300">เข้าสู่ระบบ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
