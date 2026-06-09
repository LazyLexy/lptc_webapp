import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";

import DocumentCard from "@/components/public/DocumentCard";
import { getDepartmentBySlug } from "@/lib/public-content";

const sectionLinks = [
  { href: "#home", label: "หน้าแรก" },
  { href: "#about", label: "เกี่ยวกับเรา" },
  { href: "#documents", label: "เอกสารภายใน" },
  { href: "#teachers", label: "บุคลากร" },
  { href: "#timetable", label: "ตารางเรียน" },
  { href: "#faq", label: "FAQ" },
  { href: "#openhouse", label: "OpenHouse" },
  { href: "#activity", label: "เช็คชื่อกิจกรรม" },
];

const openHouseActivities = [
  {
    title: "ทดสอบความรู้ IT",
    description: "กิจกรรมสั้นสำหรับประเมินความสนใจด้านเทคโนโลยีและการแก้ปัญหา",
    status: "เร็ว ๆ นี้",
  },
  {
    title: "Cafe IT",
    description: "พูดคุยกับรุ่นพี่และครูผู้สอนเกี่ยวกับบรรยากาศการเรียนในแผนก",
    status: "เปิดลงทะเบียน",
  },
  {
    title: "ทดลองเขียนเว็บเบื้องต้น",
    description: "เวิร์กช็อปทดลองสร้างหน้าเว็บและเข้าใจงานพัฒนาเว็บเบื้องต้น",
    status: "เร็ว ๆ นี้",
  },
  {
    title: "ดูผลงานนักศึกษา",
    description: "ชมตัวอย่างโครงงานและผลงานจากการเรียนรู้แบบลงมือทำ",
    status: "เปิดลงทะเบียน",
  },
  {
    title: "เยี่ยมชมห้องปฏิบัติการ",
    description: "สำรวจพื้นที่ฝึกทักษะ อุปกรณ์ และบรรยากาศการเรียนของแผนก",
    status: "เร็ว ๆ นี้",
  },
  {
    title: "เช็คชื่อกิจกรรม",
    description: "จุดลงทะเบียนและยืนยันการเข้าร่วมกิจกรรมของผู้เข้าชม",
    status: "เปิดลงทะเบียน",
  },
];

export default async function DepartmentWebsitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const department = await getDepartmentBySlug(slug);

  if (!department) {
    notFound();
  }

  const accent = department.color;
  const micrositeDocuments = department.documents.filter(
    (document) => document.visibility === "microsite" || document.visibility === "both",
  );

  return (
    <div className="bg-white text-slate-950">
      <section id="home" className="relative min-h-[720px] overflow-hidden bg-slate-950 text-white">
        <Image
          src={department.heroImage}
          alt={`บรรยากาศ${department.name}`}
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/82 to-blue-950/60" />
        <div className="absolute inset-x-0 top-0 z-20 border-b border-white/10 bg-slate-950/35 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[78rem] items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <Link href={`/departments/${department.slug}`} className="flex min-w-0 items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white p-1">
                <Image src={department.logoPath} alt={`โลโก้${department.name}`} fill sizes="48px" className="object-contain p-1" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-base font-black">{department.name}</p>
                <p className="truncate text-sm font-semibold text-white/65">{department.englishName}</p>
              </div>
            </Link>
            <nav className="hidden items-center gap-1 lg:flex">
              {sectionLinks.map((item) => (
                <a key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm font-bold text-white/80 transition hover:bg-white/10 hover:text-white">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[720px] max-w-[78rem] items-center px-4 pb-16 pt-28 sm:px-6">
          <div className="grid w-full gap-10 lg:grid-cols-[1fr_390px] lg:items-end">
            <div className="max-w-4xl">
              <p className="text-base font-black text-white/70">Microsite แผนก</p>
              <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">{department.name}</h1>
              <p className="mt-4 text-xl font-bold text-white/75">{department.englishName}</p>
              <p className="mt-7 max-w-3xl text-xl font-semibold leading-9 text-white">{department.headline}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={`/departments/${department.slug}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-base font-black transition hover:bg-slate-100" style={{ color: accent }}>
                  ดูหลักสูตรในเว็บหลัก
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#documents" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/45 bg-white/10 px-6 text-base font-black text-white backdrop-blur transition hover:bg-white hover:text-slate-950">
                  เอกสารภายใน
                  <FileText className="h-4 w-4" />
                </a>
                <a href="#openhouse" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/45 bg-white/10 px-6 text-base font-black text-white backdrop-blur transition hover:bg-white hover:text-slate-950">
                  OpenHouse
                  <Award className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
              <BookOpenCheck className="h-8 w-8 text-white" />
              <h2 className="mt-4 text-2xl font-black">พื้นที่กิจกรรมและงานภายในแผนก</h2>
              <p className="mt-3 text-base leading-7 text-white/75">
                ใช้สำหรับข่าวกิจกรรม ตารางเรียน OpenHouse เช็คชื่อกิจกรรม บุคลากร และเอกสารภายในของแผนก
              </p>
            </div>
          </div>
        </div>
      </section>

      <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl lg:hidden">
        <div className="overflow-x-auto px-4">
          <div className="flex min-w-max gap-2 py-3">
            {sectionLinks.map((item) => (
              <a key={item.href} href={item.href} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section id="about" className="scroll-mt-24 bg-white py-14">
        <div className="mx-auto grid max-w-[78rem] gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-base font-black" style={{ color: accent }}>เกี่ยวกับเรา</p>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">{department.name}</h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-slate-700">{department.description}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {department.facilityCards.slice(0, 3).map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <CheckCircle2 className="h-6 w-6" style={{ color: accent }} />
                  <h3 className="mt-4 text-lg font-black">{item.title}</h3>
                  <p className="mt-2 text-base leading-7 text-slate-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="documents" className="scroll-mt-24 bg-slate-50 py-14">
        <div className="mx-auto max-w-[78rem] px-4 sm:px-6">
          <h2 className="text-3xl font-black">Document Center ของแผนก</h2>
          <p className="mt-3 text-base leading-7 text-slate-700">
            แสดงเฉพาะเอกสารภายในแผนกหรือเอกสารที่ใช้ร่วมกับเว็บหลัก โดยใช้ข้อมูลกลางชุดเดียวกัน
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {micrositeDocuments.map((document) => (
              <DocumentCard key={document.id} document={document} contextLabel={department.name} />
            ))}
          </div>
        </div>
      </section>

      <section id="teachers" className="scroll-mt-24 bg-white py-14">
        <div className="mx-auto max-w-[78rem] px-4 sm:px-6">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-5">
            <UserRound className="h-6 w-6" style={{ color: accent }} />
            <h2 className="text-3xl font-black">บุคลากร</h2>
          </div>
          {department.staff.length ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {department.staff.map((staff) => (
                <article key={staff.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
                  <div className="flex items-start gap-5">
                    {staff.image ? (
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                        <Image src={staff.image} alt={staff.name} fill unoptimized sizes="64px" className="object-cover" />
                      </div>
                    ) : (
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-xl font-black text-white" style={{ backgroundColor: accent }}>
                        {staff.name.slice(0, 1)}
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-black leading-7">{staff.name}</h3>
                      <p className="mt-2 text-base leading-6 text-slate-600">{staff.role}</p>
                      {staff.email ? <a href={`mailto:${staff.email}`} className="mt-3 inline-flex text-sm font-bold" style={{ color: accent }}>{staff.email}</a> : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-base font-bold text-slate-600">
              ข้อมูลบุคลากรกำลังปรับปรุง
            </div>
          )}
        </div>
      </section>

      <section id="timetable" className="scroll-mt-24 bg-slate-50 py-14">
        <div className="mx-auto grid max-w-[78rem] gap-8 px-4 sm:px-6 lg:grid-cols-[360px_1fr]">
          <div>
            <CalendarDays className="h-7 w-7" style={{ color: accent }} />
            <h2 className="mt-4 text-3xl font-black">ตารางเรียน</h2>
            <p className="mt-4 text-base leading-7 text-slate-700">
              ตารางเรียนจะแสดงตามระดับชั้น ห้อง และกลุ่ม เมื่อแผนกอัปเดตข้อมูลจริง
            </p>
          </div>
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8">
            <div className="flex flex-wrap gap-2">
              {["ปวช.1", "ปวช.2", "ปวช.3", "ปวส.1", "ปวส.2"].map((level) => (
                <button key={level} type="button" disabled className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-500">
                  {level}
                </button>
              ))}
            </div>
            <p className="mt-6 text-xl font-black text-slate-950">ตารางเรียนกำลังปรับปรุง</p>
            <p className="mt-2 text-base leading-7 text-slate-600">ยังไม่มีข้อมูลตารางเรียนจริงในระบบ จึงไม่แสดงตารางตัวอย่างหรือข้อมูลจำลอง</p>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 bg-white py-14">
        <div className="mx-auto grid max-w-[78rem] gap-8 px-4 sm:px-6 lg:grid-cols-[320px_1fr]">
          <div>
            <HelpCircle className="h-7 w-7" style={{ color: accent }} />
            <h2 className="mt-4 text-3xl font-black">FAQ</h2>
          </div>
          <div className="grid gap-4">
            {department.faqs.slice(0, 4).map((item) => (
              <details key={item.question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                <summary className="cursor-pointer text-lg font-black marker:text-slate-400">{item.question}</summary>
                <p className="mt-4 text-base leading-7 text-slate-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="openhouse" className="scroll-mt-24 bg-slate-950 py-14 text-white">
        <div className="mx-auto max-w-[78rem] px-4 sm:px-6">
          <div className="mb-8">
            <Award className="h-7 w-7" style={{ color: accent }} />
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">OpenHouse Activity Hub</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/70">
              รวมกิจกรรมแนะนำแผนก เยี่ยมชมห้องปฏิบัติการ ดูผลงานนักศึกษา และจุดเช็คชื่อกิจกรรม
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {openHouseActivities.map((activity) => (
              <article key={activity.title} className="rounded-2xl border border-white/10 bg-white/8 p-5">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black" style={{ color: accent }}>{activity.status}</span>
                <h3 className="mt-4 text-xl font-black">{activity.title}</h3>
                <p className="mt-3 text-base leading-7 text-white/70">{activity.description}</p>
                <button type="button" disabled className="mt-5 inline-flex min-h-10 items-center rounded-full bg-white/10 px-4 text-sm font-bold text-white/60">
                  ดูรายละเอียด
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="activity" className="scroll-mt-24 bg-white py-14">
        <div className="mx-auto max-w-[78rem] px-4 sm:px-6">
          <div className="grid gap-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <ClipboardCheck className="h-7 w-7" style={{ color: accent }} />
              <h2 className="mt-4 text-3xl font-black">เช็คชื่อกิจกรรม</h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
                พื้นที่ประชาสัมพันธ์และเตรียมการเช็คชื่อกิจกรรมของแผนก สำหรับกิจกรรม OpenHouse และกิจกรรมภายใน
              </p>
            </div>
            <div className="rounded-2xl bg-white p-5">
              <p className="text-sm font-black text-slate-500">ช่องทางติดต่อ</p>
              <ul className="mt-4 grid gap-3 text-base font-semibold text-slate-700">
                {department.contact.location || department.contact.room ? (
                  <li className="flex items-start gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0" style={{ color: accent }} />{department.contact.location ?? department.contact.room}</li>
                ) : null}
                {department.contact.phone ? <li className="flex items-center gap-3"><Phone className="h-5 w-5" style={{ color: accent }} />{department.contact.phone}</li> : null}
                {department.contact.email ? <li className="flex items-center gap-3"><Mail className="h-5 w-5" style={{ color: accent }} />{department.contact.email}</li> : null}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
