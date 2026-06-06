import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  UserRound,
  Users,
} from "lucide-react";

import { getDepartmentBySlug } from "@/lib/public-content";

const sectionLinks = [
  { href: "#home", label: "หน้าแรก" },
  { href: "#about", label: "เกี่ยวกับเรา" },
  { href: "#teachers", label: "บุคลากร" },
  { href: "#schedule", label: "ตารางเรียน" },
  { href: "#faq", label: "FAQ" },
  { href: "#openhouse", label: "OpenHouse" },
  { href: "#activity", label: "เช็คชื่อกิจกรรม" },
];

const faqItems = [
  {
    question: "แผนกนี้เหมาะกับใคร?",
    answer: "เหมาะกับผู้เรียนที่สนใจงานสายอาชีพ ต้องการฝึกทักษะจากงานจริง และอยากต่อยอดไปทำงานหรือเรียนต่อในสาขาที่เลือก",
  },
  {
    question: "การเรียนเน้นทฤษฎีหรือปฏิบัติ?",
    answer: "เรียนทั้งพื้นฐานสำคัญและการลงมือทำในห้องปฏิบัติการ โดยเชื่อมกับโครงงาน กิจกรรม และการฝึกทักษะตามมาตรฐานอาชีวศึกษา",
  },
  {
    question: "ถ้าสนใจสมัครเรียนต้องเริ่มจากตรงไหน?",
    answer: "ดูภาพรวมแผนกและหลักสูตรก่อน จากนั้นใช้ปุ่มสมัครเรียนหรือช่องทางติดต่อเพื่อให้วิทยาลัยประสานข้อมูลรอบรับสมัคร",
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

  return (
    <div className="bg-white text-slate-950">
      <section id="home" className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
        <Image
          src={department.heroImage}
          alt={`บรรยากาศ${department.name}`}
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/80 to-blue-950/55" />
        <div className="absolute inset-x-0 top-0 z-20 border-b border-white/10 bg-slate-950/35 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Link href={`/departments/${department.slug}`} className="flex min-w-0 items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-white p-1">
                <Image src={department.logoPath} alt={`โลโก้${department.name}`} fill sizes="48px" className="object-contain p-1" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-black">{department.name}</p>
                <p className="truncate text-xs font-semibold text-white/65">{department.englishName}</p>
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

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <div className="grid w-full gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
            <div className="max-w-4xl">
              <Link href="/departments" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 text-sm font-bold text-white/80 backdrop-blur transition hover:bg-white/20 hover:text-white">
                <ArrowLeft className="h-4 w-4" />
                กลับไปหน้าแผนกวิชา
              </Link>
              <p className="mt-10 text-sm font-black text-white/75">เว็บไซต์แผนก</p>
              <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">{department.name}</h1>
              <p className="mt-4 text-xl font-bold text-white/75">{department.englishName}</p>
              <p className="mt-8 max-w-3xl text-xl font-semibold leading-9 text-white">{department.headline}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#about" className="soft-button inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black transition hover:bg-slate-100" style={{ color: accent }}>
                  เกี่ยวกับแผนก
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#openhouse" className="soft-button inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/45 bg-white/10 px-6 text-sm font-black text-white backdrop-blur transition hover:bg-white hover:text-slate-950">
                  OpenHouse
                  <Award className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 overflow-hidden rounded-[2rem] border border-white/25 bg-white/10 backdrop-blur-xl">
              <div className="border-r border-white/20 p-6">
                <Users className="h-7 w-7 text-white" />
                <p className="mt-5 text-4xl font-black">{department.teacherCount}</p>
                <p className="mt-1 text-sm font-semibold text-white/70">ครูผู้สอน</p>
              </div>
              <div className="p-6">
                <CheckCircle2 className="h-7 w-7 text-white" />
                <p className="mt-5 text-4xl font-black">{new Intl.NumberFormat("th-TH").format(department.studentCount)}</p>
                <p className="mt-1 text-sm font-semibold text-white/70">นักศึกษา</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/92 shadow-sm shadow-slate-950/5 backdrop-blur-xl lg:hidden">
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

      <section id="about" className="scroll-mt-24 bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-black" style={{ color: accent }}>เกี่ยวกับเรา</p>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">{department.name}</h2>
          </div>
          <div>
            <p className="text-xl leading-9 text-slate-700">{department.description}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {department.facilities.map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <CheckCircle2 className="h-6 w-6" style={{ color: accent }} />
                  <p className="mt-4 text-sm font-black leading-6">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-black text-white/60">Why choose us</p>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">เหตุผลที่เลือกเรียนแผนกนี้</h2>
          </div>
          <div className="grid gap-4">
            {department.achievements.map((item, index) => (
              <div key={item} className="grid grid-cols-[auto_1fr] gap-4 rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-black" style={{ color: accent }}>
                  {index + 1}
                </span>
                <p className="self-center text-lg font-bold leading-7 text-white/90">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="teachers" className="scroll-mt-24 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3 border-b border-slate-200 pb-5">
            <UserRound className="h-6 w-6" style={{ color: accent }} />
            <h2 className="text-3xl font-black">บุคลากร</h2>
          </div>
          {department.teachers.length ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {department.teachers.map((teacher) => (
                <article key={teacher.id} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
                  <div className="flex items-start gap-5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-xl font-black text-white" style={{ backgroundColor: accent }}>
                      {teacher.name.slice(0, 1)}
                    </div>
                    <div>
                      <h3 className="text-xl font-black leading-7">{teacher.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{teacher.subject}</p>
                    </div>
                  </div>
                  {teacher.email ? (
                    <a href={`mailto:${teacher.email}`} className="mt-6 inline-flex items-center gap-2 border-t border-slate-200 pt-4 text-sm font-bold" style={{ color: accent }}>
                      <Mail className="h-4 w-4" />
                      {teacher.email}
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-8 text-sm font-bold text-slate-600">ยังไม่มีข้อมูลบุคลากรในระบบ</div>
          )}
        </div>
      </section>

      <section id="schedule" className="scroll-mt-24 bg-slate-50 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <CalendarDays className="h-7 w-7" style={{ color: accent }} />
            <h2 className="mt-4 text-3xl font-black">ตารางเรียน</h2>
            <p className="mt-4 leading-7 text-slate-600">ภาพรวมช่วงเวลาสำคัญของการเรียนและกิจกรรมแผนก ใช้สำหรับแนะนำผู้สมัครและนักศึกษาที่ต้องการดูบรรยากาศการเรียน</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {department.programs.map((program) => (
              <div key={`${program.level}-${program.name}`} className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <p className="text-sm font-black" style={{ color: accent }}>{program.level}</p>
                <h3 className="mt-3 text-lg font-black leading-7">{program.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[360px_1fr] lg:px-8">
          <div>
            <HelpCircle className="h-7 w-7" style={{ color: accent }} />
            <h2 className="mt-4 text-3xl font-black">FAQ</h2>
          </div>
          <div className="grid gap-4">
            {faqItems.map((item) => (
              <details key={item.question} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                <summary className="cursor-pointer text-lg font-black marker:text-slate-400">{item.question}</summary>
                <p className="mt-4 leading-7 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="openhouse" className="scroll-mt-24 bg-slate-950 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div className="relative min-h-96 overflow-hidden rounded-[2rem]">
            <Image src={department.heroImage} alt={`OpenHouse ${department.name}`} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <Award className="h-7 w-7" style={{ color: accent }} />
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">OpenHouse แผนก</h2>
            <p className="mt-5 leading-8 text-white/75">ใช้หน้านี้เป็นประตูแนะนำแผนก เห็นภาพรวมการเรียน ห้องฝึก บุคลากร จุดเด่น และช่องทางติดต่อ ก่อนตัดสินใจสมัครเรียนหรือเยี่ยมชมแผนกจริง</p>
            <Link href="/admissions" className="soft-button mt-7 inline-flex h-12 max-w-max items-center justify-center rounded-full bg-white px-6 text-sm font-black transition hover:bg-slate-100" style={{ color: accent }}>
              สมัครเรียน
            </Link>
          </div>
        </div>
      </section>

      <section id="activity" className="scroll-mt-24 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <ClipboardCheck className="h-7 w-7" style={{ color: accent }} />
              <h2 className="mt-4 text-3xl font-black">เช็คชื่อกิจกรรม</h2>
              <p className="mt-4 max-w-3xl leading-7 text-slate-600">ส่วนประชาสัมพันธ์กิจกรรมของแผนก สำหรับแจ้งแนวทางการเข้าร่วมกิจกรรม การเตรียมตัว และการติดตามประกาศจากครูประจำแผนก</p>
            </div>
            <div className="rounded-[1.5rem] bg-white p-5">
              <p className="text-sm font-black text-slate-500">ช่องทางติดต่อ</p>
              <ul className="mt-4 grid gap-3 text-sm font-semibold text-slate-700">
                <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0" style={{ color: accent }} />{department.contact.room}</li>
                <li className="flex items-center gap-3"><Phone className="h-5 w-5" style={{ color: accent }} />{department.contact.phone}</li>
                <li className="flex items-center gap-3"><Mail className="h-5 w-5" style={{ color: accent }} />{department.contact.email}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
