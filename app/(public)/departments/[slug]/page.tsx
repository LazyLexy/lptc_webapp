import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Users,
} from "lucide-react";

import DocumentCard from "@/components/public/DocumentCard";
import { getDepartmentBySlug } from "@/lib/public-content";

const sectionLinks = [
  { href: "#overview", label: "ภาพรวม" },
  { href: "#documents", label: "เอกสาร" },
  { href: "#programs", label: "หลักสูตร" },
  { href: "#highlights", label: "จุดเด่น" },
  { href: "#careers", label: "เส้นทางอาชีพ" },
  { href: "#facilities", label: "Facilities" },
  { href: "#staff", label: "บุคลากร" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "ติดต่อ" },
];

function MissingDocumentActions({ label }: { label: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="inline-flex min-h-10 items-center rounded-full bg-slate-100 px-4 text-sm font-bold text-slate-500">
        ยังไม่มีไฟล์
      </span>
      <span className="sr-only">{label}</span>
    </div>
  );
}

export default async function DepartmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const department = await getDepartmentBySlug(slug);

  if (!department) {
    notFound();
  }

  const statCards = [
    department.teacherCount > 0 ? { label: "ครูผู้สอน", value: department.teacherCount.toString(), icon: Users } : null,
    department.studentCount > 0
      ? { label: "นักศึกษา", value: new Intl.NumberFormat("th-TH").format(department.studentCount), icon: Building2 }
      : null,
    { label: "หลักสูตร", value: `${department.programs.length} ระดับ`, icon: FileText },
  ].filter(Boolean) as { label: string; value: string; icon: typeof Users }[];
  const mainDocuments = department.documents.filter((document) => document.visibility === "main" || document.visibility === "both");

  return (
    <div className="bg-white text-slate-950">
      <section className="soft-surface border-b border-slate-200">
        <div className="container mx-auto max-w-[78rem] px-4 py-12 sm:px-6">
          <nav className="text-base font-semibold text-slate-500">
            <Link href="/" className="hover:text-blue-800">หน้าหลัก</Link>
            <span className="mx-2">/</span>
            <Link href="/courses" className="hover:text-blue-800">หลักสูตรที่เปิดสอน</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">{department.name}</span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-white shadow-sm shadow-slate-950/10">
                <Image src={department.logoPath} alt={`โลโก้${department.name}`} fill sizes="96px" className="object-contain p-2" />
              </div>
              <p className="mt-7 text-base font-bold text-blue-800">ข้อมูลแผนก</p>
              <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">{department.name}</h1>
              <p className="mt-2 text-xl font-semibold text-slate-500">{department.englishName}</p>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">{department.headline}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {department.programLevels.map((level) => (
                  <span key={level} className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-800">{level}</span>
                ))}
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700">{department.category}</span>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={department.admissionUrl} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-800 px-6 text-base font-black text-white transition hover:bg-blue-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200">
                  สมัครเรียน
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#documents" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-blue-200 bg-white px-6 text-base font-black text-blue-800 transition hover:bg-blue-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200">
                  ดูเอกสารหลักสูตร
                  <FileText className="h-4 w-4" />
                </a>
                <Link href={department.websiteUrl} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 text-base font-black text-slate-700 transition hover:bg-slate-50 hover:text-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200">
                  เข้าสู่เว็บไซต์แผนก
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {statCards.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                  <stat.icon className="h-6 w-6 text-blue-800" />
                  <p className="mt-3 text-3xl font-black">{stat.value}</p>
                  <p className="mt-1 text-base font-semibold text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <nav className="sticky top-20 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="container mx-auto max-w-[78rem] overflow-x-auto px-4 sm:px-6">
          <div className="flex min-w-max gap-2 py-3">
            {sectionLinks.map((item) => (
              <a key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section id="documents" className="scroll-mt-36 bg-white py-12">
        <div className="container mx-auto max-w-[78rem] px-4 sm:px-6">
          <h2 className="text-3xl font-black">เอกสารแผนกและหลักสูตร</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mainDocuments.map((document) => (
              <DocumentCard key={`${document.title}-${document.level}`} document={document} contextLabel={department.name} />
            ))}
          </div>
        </div>
      </section>

      <section id="overview" className="scroll-mt-36 bg-blue-50 py-12">
        <div className="container mx-auto grid max-w-[78rem] gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_420px]">
          <div className="rounded-2xl bg-white p-6 shadow-sm shadow-slate-950/5">
            <h2 className="text-3xl font-black">ภาพรวมแผนก</h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">{department.description}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {["เหมาะกับผู้เรียนที่อยากลงมือทำ", "ได้ทักษะวิชาชีพตามสาขา", "เชื่อมโยงงานจริงและสถานประกอบการ"].map((item) => (
                <div key={item} className="rounded-xl bg-slate-50 p-4">
                  <CheckCircle2 className="h-5 w-5 text-blue-800" />
                  <p className="mt-3 text-base font-bold leading-7 text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {department.facilityCards.slice(0, 3).map((facility) => (
              <div key={facility.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                <Sparkles className="h-5 w-5 text-blue-800" />
                <h3 className="mt-3 text-xl font-black">{facility.title}</h3>
                <p className="mt-2 text-base leading-7 text-slate-700">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="programs" className="scroll-mt-36 bg-white py-12">
        <div className="container mx-auto max-w-[78rem] px-4 sm:px-6">
          <h2 className="text-3xl font-black">หลักสูตรที่เปิดสอน</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {department.programs.map((program) => (
              <article id={`program-${program.slug}`} key={program.slug} className="scroll-mt-36 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-800">{program.level}</span>
                <h3 className="mt-4 text-2xl font-black leading-tight">{program.name}</h3>
                {program.duration ? <p className="mt-2 text-base font-bold text-slate-500">ระยะเวลาเรียน {program.duration}</p> : null}
                <p className="mt-4 text-base leading-7 text-slate-700">{program.description}</p>
                {program.highlights?.length ? (
                  <ul className="mt-4 grid gap-2 text-base text-slate-700">
                    {program.highlights.map((item) => (
                      <li key={item} className="flex gap-2">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-800" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="mt-5 flex flex-wrap gap-2">
                  <a href={`#program-${program.slug}`} className="inline-flex min-h-10 items-center rounded-full bg-blue-800 px-4 text-sm font-bold text-white transition hover:bg-blue-900">
                    ดูรายละเอียด
                  </a>
                  {program.pdfUrl ? (
                    <>
                      <a href={program.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center rounded-full bg-blue-50 px-4 text-sm font-bold text-blue-800">ดู PDF</a>
                      <a href={program.pdfUrl} download aria-label={`ดาวน์โหลด PDF ${program.name} ${department.name}`} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-blue-200 px-4 text-sm font-bold text-blue-800">
                        <Download className="h-4 w-4" />
                        ดาวน์โหลด PDF
                      </a>
                    </>
                  ) : (
                    <MissingDocumentActions label={program.name} />
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="highlights" className="scroll-mt-36 bg-slate-50 py-12">
        <div className="container mx-auto max-w-[78rem] px-4 sm:px-6">
          <h2 className="text-3xl font-black">จุดเด่นของแผนก</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...department.services, ...department.achievements].slice(0, 5).map((item, index) => (
              <div key={item} className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-950/5">
                <span className="text-lg font-black text-blue-800">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-3 text-base font-bold leading-7 text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="careers" className="scroll-mt-36 bg-white py-12">
        <div className="container mx-auto max-w-[78rem] px-4 sm:px-6">
          <div className="mb-6 flex items-center gap-3">
            <BriefcaseBusiness className="h-6 w-6 text-blue-800" />
            <h2 className="text-3xl font-black">เส้นทางอาชีพ</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {department.careers.map((career) => (
              <div key={career.title} className="rounded-full border border-blue-100 bg-blue-50 px-5 py-3 text-base font-bold text-blue-900">
                {career.title}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="facilities" className="scroll-mt-36 bg-blue-50 py-12">
        <div className="container mx-auto max-w-[78rem] px-4 sm:px-6">
          <h2 className="text-3xl font-black">ห้องปฏิบัติการ / Facilities</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {department.facilityCards.map((facility) => (
              <article key={facility.title} className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-950/5">
                {facility.image ? (
                  <div className="relative mb-4 aspect-video overflow-hidden rounded-xl bg-slate-100">
                    <Image src={facility.image} alt={facility.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                  </div>
                ) : null}
                <h3 className="text-xl font-black">{facility.title}</h3>
                <p className="mt-2 text-base leading-7 text-slate-700">{facility.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="staff" className="scroll-mt-36 bg-white py-12">
        <div className="container mx-auto max-w-[78rem] px-4 sm:px-6">
          <h2 className="text-3xl font-black">บุคลากร</h2>
          {department.staff.length ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {department.staff.map((staff) => (
                <article key={staff.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                  <div className="flex items-start gap-4">
                    {staff.image ? (
                      <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-slate-100">
                        <Image src={staff.image} alt={staff.name} fill unoptimized sizes="56px" className="object-cover" />
                      </div>
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-800 text-xl font-black text-white">
                        {staff.name.slice(0, 1)}
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-black">{staff.name}</h3>
                      <p className="mt-1 text-base text-slate-600">{staff.role}</p>
                      {staff.email ? <a href={`mailto:${staff.email}`} className="mt-2 block text-sm font-bold text-blue-800">{staff.email}</a> : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-base font-bold text-slate-600">
              ข้อมูลบุคลากรกำลังปรับปรุง
            </div>
          )}
        </div>
      </section>

      <section id="faq" className="scroll-mt-36 bg-slate-50 py-12">
        <div className="container mx-auto grid max-w-[78rem] gap-8 px-4 sm:px-6 lg:grid-cols-[320px_1fr]">
          <div>
            <HelpCircle className="h-7 w-7 text-blue-800" />
            <h2 className="mt-4 text-3xl font-black">FAQ</h2>
          </div>
          <div className="grid gap-3">
            {department.faqs.map((item) => (
              <details key={item.question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                <summary className="cursor-pointer text-lg font-black text-slate-950">{item.question}</summary>
                <p className="mt-4 text-base leading-7 text-slate-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-36 bg-blue-950 py-12 text-white">
        <div className="container mx-auto grid max-w-[78rem] gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <h2 className="text-3xl font-black">ติดต่อแผนก</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100">
              สอบถามข้อมูลเพิ่มเติมเกี่ยวกับหลักสูตร เอกสารประกอบการสมัคร และการเยี่ยมชมแผนก
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/8 p-5">
            <ul className="grid gap-4 text-base text-blue-50">
              {department.contact.location || department.contact.room ? (
                <li className="flex gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0 text-sky-200" />{department.contact.location ?? department.contact.room}</li>
              ) : null}
              {department.contact.phone ? (
                <li className="flex gap-3"><Phone className="h-5 w-5 text-sky-200" />{department.contact.phone}</li>
              ) : null}
              {department.contact.email ? (
                <li className="flex gap-3"><Mail className="h-5 w-5 text-sky-200" />{department.contact.email}</li>
              ) : null}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href={department.websiteUrl} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/25 px-5 text-base font-bold text-white transition hover:bg-white/10">
                เข้าสู่เว็บไซต์แผนก
                <ExternalLink className="h-4 w-4" />
              </Link>
              <Link href={department.admissionUrl} className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 text-base font-black text-blue-950 transition hover:bg-sky-100">
                สมัครเรียน
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
