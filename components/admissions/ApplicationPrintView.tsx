"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Printer } from "lucide-react";

import { readJsonResponse } from "@/lib/safe-json";

type DocumentItem = {
  id: string;
  type: string;
  title: string;
  fileName: string | null;
  status: string;
};

type ApplicationData = {
  applicationNo: string;
  admissionYear: string;
  admissionRound: string | null;
  admissionType: string | null;
  prefix: string;
  firstName: string;
  lastName: string;
  nickName: string | null;
  citizenIdMasked: string;
  birthDate: string | null;
  birthProvince: string | null;
  age: number | null;
  bloodType: string | null;
  weight: number | null;
  height: number | null;
  disabilityStatus: string | null;
  disabilityDetail: string | null;
  ethnicity: string | null;
  nationality: string | null;
  religion: string | null;
  homePhone: string | null;
  phone: string;
  email: string | null;
  specialAbility: string | null;
  houseCode: string | null;
  houseNo: string | null;
  villageNo: string | null;
  soi: string | null;
  road: string | null;
  province: string | null;
  district: string | null;
  subDistrict: string | null;
  postalCode: string | null;
  contactAddressSameAsHouseAddress: boolean;
  contactHouseNo: string | null;
  contactVillageNo: string | null;
  contactSoi: string | null;
  contactRoad: string | null;
  contactProvince: string | null;
  contactDistrict: string | null;
  contactSubDistrict: string | null;
  contactPostalCode: string | null;
  contactPhone: string | null;
  fatherPrefix: string | null;
  fatherFirstName: string | null;
  fatherLastName: string | null;
  fatherDisabilityStatus: string | null;
  fatherLivingStatus: string | null;
  fatherOccupation: string | null;
  fatherMonthlyIncome: number | null;
  fatherPhone: string | null;
  motherPrefix: string | null;
  motherFirstName: string | null;
  motherLastName: string | null;
  motherDisabilityStatus: string | null;
  motherLivingStatus: string | null;
  motherOccupation: string | null;
  motherMonthlyIncome: number | null;
  motherPhone: string | null;
  parentMaritalStatus: string | null;
  totalSiblings: number | null;
  studyingSiblings: number | null;
  guardianPrefix: string | null;
  guardianFirstName: string | null;
  guardianLastName: string | null;
  guardianName: string | null;
  guardianOccupation: string | null;
  guardianMonthlyIncome: number | null;
  guardianPhone: string | null;
  relationship: string | null;
  previousEducationLevel: string | null;
  previousSchool: string | null;
  previousSchoolProvince: string | null;
  previousClassLevel: string | null;
  graduationYear: string | null;
  previousMajor: string | null;
  gpax: number | null;
  admissionLevel: "PVOC" | "HIGH_VOC";
  departmentName: string;
  departmentEnglishName: string;
  programSlug: string | null;
  majorSlug: string | null;
  branchName: string | null;
  documents: DocumentItem[];
  submittedAt: string | null;
};

const documentChecklist = [
  { type: "TRANSCRIPT", title: "ใบ รบ.1 / ปพ.1 / ใบรับรองผลการเรียน" },
  { type: "CITIZEN_ID", title: "สำเนาบัตรประชาชนผู้สมัคร" },
  { type: "HOUSE_REGISTRATION", title: "สำเนาทะเบียนบ้านผู้สมัคร" },
  { type: "PHOTO", title: "รูปถ่าย" },
  { type: "FATHER_CITIZEN_ID", title: "สำเนาบัตรประชาชนบิดา" },
  { type: "MOTHER_CITIZEN_ID", title: "สำเนาบัตรประชาชนมารดา" },
  { type: "GUARDIAN_CITIZEN_ID", title: "สำเนาบัตรประชาชนผู้ปกครอง" },
  { type: "OTHER", title: "เอกสารอื่น ๆ" },
];

export default function ApplicationPrintView({
  applicationNo,
  token,
}: {
  applicationNo: string;
  token: string;
}) {
  const [application, setApplication] = useState<ApplicationData | null>(null);
  const [message, setMessage] = useState("กำลังโหลดใบสมัคร");

  useEffect(() => {
    async function loadApplication() {
      const response = await fetch(`/api/admissions/${applicationNo}?token=${encodeURIComponent(token)}`);
      const data = await readJsonResponse<Partial<ApplicationData> & { message?: string }>(
        response,
        { message: "ไม่สามารถเปิดใบสมัครได้" },
      );

      if (!response.ok) {
        setMessage(data.message ?? "ไม่สามารถเปิดใบสมัครได้");
        return;
      }

      if (!data.applicationNo || !data.prefix || !data.firstName || !data.lastName || !data.admissionLevel) {
        setMessage("ข้อมูลใบสมัครที่ระบบส่งกลับไม่ครบ กรุณาค้นหาใบสมัครใหม่อีกครั้ง");
        return;
      }

      setApplication(data as ApplicationData);
      setMessage("");
    }

    loadApplication();
  }, [applicationNo, token]);

  const printedAt = useMemo(
    () => new Intl.DateTimeFormat("th-TH", { day: "numeric", month: "long", year: "numeric" }).format(new Date()),
    [],
  );

  if (!application) {
    return (
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <AlertCircle className="mx-auto h-10 w-10 text-blue-800" />
        <p className="mt-4 text-lg font-bold text-slate-700">{message}</p>
        <Link
          href="/admissions/print"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-blue-800 px-6 text-base font-black text-white transition hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          กลับไปค้นหาใบสมัคร
        </Link>
      </div>
    );
  }

  const isPvoc = application.admissionLevel === "PVOC";
  const fullName = `${application.prefix} ${application.firstName} ${application.lastName}`;
  const fatherName = combineName(application.fatherPrefix, application.fatherFirstName, application.fatherLastName);
  const motherName = combineName(application.motherPrefix, application.motherFirstName, application.motherLastName);
  const guardianName =
    combineName(application.guardianPrefix, application.guardianFirstName, application.guardianLastName) ||
    application.guardianName ||
    "";
  const birthDate = formatThaiDate(application.birthDate);
  const uploadedTypes = new Set(application.documents.filter((document) => document.fileName).map((document) => document.type));
  const contactAddress = application.contactAddressSameAsHouseAddress
    ? {
        houseNo: application.houseNo,
        villageNo: application.villageNo,
        soi: application.soi,
        road: application.road,
        subDistrict: application.subDistrict,
        district: application.district,
        province: application.province,
        postalCode: application.postalCode,
        phone: application.phone,
      }
    : {
        houseNo: application.contactHouseNo,
        villageNo: application.contactVillageNo,
        soi: application.contactSoi,
        road: application.contactRoad,
        subDistrict: application.contactSubDistrict,
        district: application.contactDistrict,
        province: application.contactProvince,
        postalCode: application.contactPostalCode,
        phone: application.contactPhone,
      };

  return (
    <div className="mx-auto max-w-[210mm]">
      <div className="print-hidden mb-5 flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Link
          href="/admissions/print"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-base font-black text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          กลับไปค้นหา
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-800 px-6 text-base font-black text-white transition hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          <Printer className="h-4 w-4" />
          พิมพ์ / บันทึกเป็น PDF
        </button>
      </div>

      <article className="print-page print-form-page bg-white p-[8mm] text-[13.5px] leading-[1.36] text-black shadow-sm">
        <header className="grid min-h-[42mm] grid-cols-[42mm_1fr_34mm] gap-2">
          <div className="space-y-2 text-[12px] leading-5">
            <div>
              <span>เลขที่ใบสมัคร</span>
              <div className="border-b border-dotted border-black text-center font-bold">{application.applicationNo}</div>
            </div>
            <div className="flex h-[22mm] w-[22mm] items-center justify-center border border-black text-center text-[10px] leading-4">
              QR ตรวจสอบ<br />ใบสมัคร
            </div>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-[23mm] w-[23mm] items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element -- Print/PDF output embeds public images more reliably with a plain image element. */}
              <img
                src="/logo/lptclogo.png"
                alt="โลโก้วิทยาลัยเทคนิคลำปาง"
                width="88"
                height="88"
                className="h-[23mm] w-[23mm] rounded-full bg-white object-contain"
              />
            </div>
            <h1 className="mt-1 text-[21px] font-bold leading-tight">วิทยาลัยเทคนิคลำปาง</h1>
            <p className="text-[18px] font-bold leading-tight">ใบสมัครเข้าศึกษาต่อออนไลน์</p>
            <p className="text-[16px] font-bold leading-tight">ประจำปีการศึกษา {application.admissionYear}</p>
            <div className="mx-auto mt-2 grid w-[90mm] grid-cols-[26mm_8mm_1fr] items-center gap-x-2 text-left text-[15px] leading-6">
              <span className="font-bold">ระดับ ปวช.</span><CheckBox checked={isPvoc} /><span>จบ ม.3</span>
              <span className="font-bold">ระดับ ปวส.</span><CheckBox checked={!isPvoc} /><span>จบ ปวช. หรือ ม.6</span>
            </div>
          </div>

          <div className="flex h-[38mm] items-center justify-center border-2 border-black text-center text-[15px] font-bold">
            ติดรูปถ่าย
          </div>
        </header>

        <Section title="1. ข้อมูลผู้สมัคร">
          <Line>
            <Dotted label="เลขบัตรประชาชน" value={application.citizenIdMasked} width="45mm" />
            <Dotted label="ชื่อ-นามสกุล" value={fullName} width="66mm" />
            <Dotted label="ชื่อเล่น" value={application.nickName} width="24mm" />
          </Line>
          <Line>
            <Dotted label="วันเกิด" value={birthDate} width="36mm" />
            <Dotted label="จังหวัดที่เกิด" value={application.birthProvince} width="30mm" />
            <Dotted label="อายุ" value={formatNumber(application.age)} width="13mm" />
            <Dotted label="หมู่เลือด" value={application.bloodType} width="16mm" />
            <Dotted label="สูง" value={formatNumber(application.height)} width="13mm" suffix="ซม." />
            <Dotted label="หนัก" value={formatNumber(application.weight)} width="13mm" suffix="กก." />
          </Line>
          <Line>
            <Dotted label="ความพิการ" value={formatDisability(application.disabilityStatus, application.disabilityDetail)} width="45mm" />
            <Dotted label="เชื้อชาติ" value={application.ethnicity} width="25mm" />
            <Dotted label="สัญชาติ" value={application.nationality} width="25mm" />
            <Dotted label="ศาสนา" value={application.religion} width="28mm" />
          </Line>
          <Line>
            <Dotted label="โทรศัพท์บ้าน" value={application.homePhone} width="32mm" />
            <Dotted label="โทรศัพท์มือถือ" value={application.phone} width="34mm" />
            <Dotted label="E-mail" value={application.email} width="64mm" />
          </Line>
        </Section>

        <Section title="2. ข้อมูลการศึกษาเดิม">
          <Line>
            <Dotted label="สถานศึกษาที่จบ" value={application.previousSchool} width="66mm" />
            <Dotted label="ระดับชั้น" value={application.previousClassLevel || application.previousEducationLevel} width="28mm" />
            <Dotted label="GPAX" value={application.gpax === null ? "" : application.gpax.toFixed(2)} width="18mm" />
            <Dotted label="ปีที่จบ" value={application.graduationYear} width="20mm" />
          </Line>
          <Line>
            <Dotted label="จังหวัดโรงเรียน" value={application.previousSchoolProvince} width="42mm" />
            <Dotted label="สาขาวิชาเดิม" value={application.previousMajor} width="72mm" />
          </Line>
        </Section>

        <Section title="3. ที่อยู่">
          <Line>
            <Dotted label="รหัสบ้าน" value={application.houseCode} width="30mm" />
            <Dotted label="บ้านเลขที่" value={application.houseNo} width="25mm" />
            <Dotted label="หมู่" value={application.villageNo} width="14mm" />
            <Dotted label="ถนน/ซอย" value={[application.road, application.soi].filter(Boolean).join(" / ")} width="43mm" />
          </Line>
          <Line>
            <Dotted label="ตำบล" value={application.subDistrict} width="30mm" />
            <Dotted label="อำเภอ" value={application.district} width="30mm" />
            <Dotted label="จังหวัด" value={application.province} width="30mm" />
            <Dotted label="รหัสไปรษณีย์" value={application.postalCode} width="24mm" />
          </Line>
          <Line>
            <Dotted label="ที่อยู่ติดต่อ บ้านเลขที่" value={contactAddress.houseNo} width="25mm" />
            <Dotted label="หมู่" value={contactAddress.villageNo} width="12mm" />
            <Dotted label="ถนน/ซอย" value={[contactAddress.road, contactAddress.soi].filter(Boolean).join(" / ")} width="38mm" />
            <Dotted label="โทรศัพท์" value={contactAddress.phone} width="34mm" />
          </Line>
        </Section>

        <Section title="4. ข้อมูลบิดา/มารดา/ผู้ปกครอง">
          <Line>
            <Dotted label="ชื่อบิดา" value={fatherName} width="48mm" />
            <Dotted label="ความพิการ" value={application.fatherDisabilityStatus} width="23mm" />
            <Dotted label="สถานะ" value={application.fatherLivingStatus} width="20mm" />
            <Dotted label="อาชีพ" value={application.fatherOccupation} width="28mm" />
            <Dotted label="รายได้" value={formatMoney(application.fatherMonthlyIncome)} width="20mm" />
          </Line>
          <Line>
            <Dotted label="เบอร์โทรบิดา" value={application.fatherPhone} width="32mm" />
            <Dotted label="ชื่อมารดา" value={motherName} width="48mm" />
            <Dotted label="ความพิการ" value={application.motherDisabilityStatus} width="23mm" />
            <Dotted label="สถานะ" value={application.motherLivingStatus} width="20mm" />
          </Line>
          <Line>
            <Dotted label="อาชีพมารดา" value={application.motherOccupation} width="30mm" />
            <Dotted label="รายได้" value={formatMoney(application.motherMonthlyIncome)} width="20mm" />
            <Dotted label="เบอร์โทรมารดา" value={application.motherPhone} width="32mm" />
            <Dotted label="สถานภาพบิดามารดา" value={application.parentMaritalStatus} width="31mm" />
          </Line>
          <Line>
            <Dotted label="จำนวนพี่น้อง" value={formatNumber(application.totalSiblings)} width="13mm" />
            <Dotted label="กำลังศึกษา" value={formatNumber(application.studyingSiblings)} width="13mm" />
            <Dotted label="ชื่อผู้ปกครอง" value={guardianName} width="45mm" />
            <Dotted label="อาชีพ" value={application.guardianOccupation} width="24mm" />
            <Dotted label="รายได้" value={formatMoney(application.guardianMonthlyIncome)} width="20mm" />
            <Dotted label="โทร" value={application.guardianPhone} width="26mm" />
          </Line>
        </Section>

        <Section title="5. หลักสูตรและสาขาที่สมัคร">
          <Line>
            <Dotted label="ระดับที่สมัคร" value={isPvoc ? "ปวช." : "ปวส."} width="18mm" />
            <Dotted label="สาขาวิชา" value={application.departmentName} width="62mm" />
            <Dotted label="สาขางาน" value={application.branchName || application.programSlug || application.majorSlug} width="45mm" />
            <Dotted label="เลขที่ใบสมัคร" value={application.applicationNo} width="36mm" />
          </Line>
          <Line>
            <Dotted label="ความสามารถพิเศษ" value={application.specialAbility} width="145mm" />
          </Line>
        </Section>

        <Section title="6. หลักฐานประกอบการสมัคร">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[12.5px] leading-5">
            {documentChecklist.map((document) => (
              <div key={document.type} className="flex items-center gap-1.5">
                <CheckBox checked={uploadedTypes.has(document.type)} />
                <span>{document.title}</span>
              </div>
            ))}
          </div>
        </Section>

        <section className="mt-[2mm] grid grid-cols-2 gap-5 text-[12.5px] leading-6">
          <div>
            <p className="indent-6">
              ข้าพเจ้าขอรับรองว่าข้อมูลและหลักฐานในการสมัครเป็นความจริงทุกประการ หากตรวจพบว่าไม่ถูกต้อง ข้าพเจ้ายินยอมให้วิทยาลัยพิจารณาตามระเบียบการรับสมัคร
            </p>
            <Signature label="ผู้สมัคร" />
          </div>
          <div>
            <p className="font-bold">สำหรับเจ้าหน้าที่</p>
            <Dotted label="ลงชื่อเจ้าหน้าที่ตรวจหลักฐาน" width="50mm" />
            <Dotted label="ลงชื่อเจ้าหน้าที่การเงิน" width="54mm" />
            <Dotted label="เลขที่ใบเสร็จ" width="34mm" />
            <Dotted label="หมายเหตุ" width="60mm" />
          </div>
        </section>

        <footer className="mt-[2mm] flex justify-between border-t border-black pt-1 text-[10px] text-black">
          <span>พิมพ์วันที่ {printedAt}</span>
          <span>เอกสารนี้พิมพ์จากระบบสมัครเรียนออนไลน์ วิทยาลัยเทคนิคลำปาง</span>
        </footer>
      </article>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="print-section mt-[2mm]">
      <h2 className="mb-1 inline-block border-b-2 border-black text-[14px] font-bold leading-tight">{title}</h2>
      {children}
    </section>
  );
}

function Line({ children }: { children: ReactNode }) {
  return <div className="flex min-h-[5.8mm] flex-wrap items-end gap-x-1.5 leading-6">{children}</div>;
}

function Dotted({
  label,
  value,
  width,
  suffix,
}: {
  label: string;
  value?: string | null;
  width: string;
  suffix?: string;
}) {
  return (
    <span className="inline-flex items-end gap-1 whitespace-nowrap">
      <span>{label}</span>
      <span
        className="inline-block min-h-[5mm] border-b border-dotted border-black px-1 text-center font-medium leading-5"
        style={{ width }}
      >
        {value || ""}
      </span>
      {suffix ? <span>{suffix}</span> : null}
    </span>
  );
}

function CheckBox({ checked }: { checked: boolean }) {
  return (
    <span className="inline-flex h-[5mm] w-[5mm] shrink-0 items-center justify-center border border-black text-[12px] font-bold leading-none">
      {checked ? "/" : ""}
    </span>
  );
}

function Signature({ label }: { label: string }) {
  return (
    <div className="mt-[3mm] ml-auto w-[66mm] text-center leading-6">
      <Dotted label="ลงชื่อ" width="42mm" />
      <span>{label}</span>
      <div><Dotted label="(" width="50mm" />)</div>
      <div>
        <Dotted label="วันที่" width="13mm" />
        <Dotted label="เดือน" width="18mm" />
        <Dotted label="พ.ศ." width="16mm" />
      </div>
    </div>
  );
}

function combineName(prefix: string | null, firstName: string | null, lastName: string | null) {
  return [prefix, firstName, lastName].filter(Boolean).join(" ");
}

function formatThaiDate(value: string | null) {
  if (!value) return "";
  return new Intl.DateTimeFormat("th-TH", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
}

function formatNumber(value: number | null) {
  return value === null ? "" : String(value);
}

function formatMoney(value: number | null) {
  return value === null ? "" : new Intl.NumberFormat("th-TH", { maximumFractionDigits: 0 }).format(value);
}

function formatDisability(status: string | null, detail: string | null) {
  if (!status) return "";
  return detail ? `${status} (${detail})` : status;
}
