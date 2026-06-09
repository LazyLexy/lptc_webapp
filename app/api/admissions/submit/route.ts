import { NextResponse } from "next/server";

import {
  admissionSubmitSchema,
  documentStatusFor,
  generateApplicationNo,
  hashCitizenId,
  maskCitizenId,
  maybeEncryptCitizenId,
  parseOptionalDate,
} from "@/lib/admissions";
import { db } from "@/lib/db";
import { getDepartmentBySlug } from "@/lib/public-content";

const requiredDocumentTypes = ["CITIZEN_ID", "TRANSCRIPT", "PHOTO", "HOUSE_REGISTRATION"] as const;

const textOrNull = (value?: string) => value || null;
const numberOrNull = (value?: number) => value ?? null;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = admissionSubmitSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "กรุณาตรวจสอบข้อมูลในฟอร์ม",
        issues: parsed.error.issues.map((issue) => ({ path: issue.path, message: issue.message })),
      },
      { status: 400 },
    );
  }

  const department = await getDepartmentBySlug(parsed.data.departmentSlug);
  const requiredLevel = parsed.data.admissionLevel === "PVOC" ? "ปวช." : "ปวส.";

  if (!department || !department.programLevels.includes(requiredLevel)) {
    return NextResponse.json({ message: "แผนกที่เลือกยังไม่เปิดรับในระดับนี้" }, { status: 400 });
  }

  const uploadedTypes = new Set(parsed.data.documents.filter((document) => document.filePath).map((document) => document.type));
  const missingRequiredDocuments = requiredDocumentTypes.filter((type) => !uploadedTypes.has(type));
  if (missingRequiredDocuments.length) {
    return NextResponse.json({ message: "กรุณาแนบเอกสารที่จำเป็นให้ครบก่อนส่งใบสมัคร" }, { status: 400 });
  }

  const citizenIdHash = hashCitizenId(parsed.data.citizenId);
  const citizenIdEncrypted = maybeEncryptCitizenId(parsed.data.citizenId);
  const existing = await db.admissionApplication.findUnique({
    where: { citizenIdHash },
    select: { id: true, applicationNo: true },
  });

  const applicationData = {
    admissionYear: parsed.data.admissionYear,
    admissionRound: textOrNull(parsed.data.admissionRound),
    admissionType: textOrNull(parsed.data.admissionType),
    prefix: parsed.data.prefix,
    firstName: parsed.data.firstName,
    lastName: parsed.data.lastName,
    nickName: textOrNull(parsed.data.nickName),
    citizenIdEncrypted,
    citizenIdHash,
    citizenIdMasked: maskCitizenId(parsed.data.citizenId),
    birthDate: parseOptionalDate(parsed.data.birthDate),
    birthProvince: textOrNull(parsed.data.birthProvince),
    age: numberOrNull(parsed.data.age),
    bloodType: textOrNull(parsed.data.bloodType),
    weight: numberOrNull(parsed.data.weight),
    height: numberOrNull(parsed.data.height),
    disabilityStatus: textOrNull(parsed.data.disabilityStatus),
    disabilityDetail: textOrNull(parsed.data.disabilityDetail),
    ethnicity: textOrNull(parsed.data.ethnicity),
    nationality: textOrNull(parsed.data.nationality),
    religion: textOrNull(parsed.data.religion),
    homePhone: textOrNull(parsed.data.homePhone),
    phone: parsed.data.phone,
    email: textOrNull(parsed.data.email),
    specialAbility: textOrNull(parsed.data.specialAbility),
    houseCode: textOrNull(parsed.data.houseCode),
    houseNo: textOrNull(parsed.data.houseNo),
    villageNo: textOrNull(parsed.data.villageNo),
    soi: textOrNull(parsed.data.soi),
    road: textOrNull(parsed.data.road),
    province: textOrNull(parsed.data.province),
    district: textOrNull(parsed.data.district),
    subDistrict: textOrNull(parsed.data.subDistrict),
    postalCode: textOrNull(parsed.data.postalCode),
    contactAddressSameAsHouseAddress: parsed.data.contactAddressSameAsHouseAddress,
    contactHouseNo: textOrNull(parsed.data.contactHouseNo),
    contactVillageNo: textOrNull(parsed.data.contactVillageNo),
    contactSoi: textOrNull(parsed.data.contactSoi),
    contactRoad: textOrNull(parsed.data.contactRoad),
    contactProvince: textOrNull(parsed.data.contactProvince),
    contactDistrict: textOrNull(parsed.data.contactDistrict),
    contactSubDistrict: textOrNull(parsed.data.contactSubDistrict),
    contactPostalCode: textOrNull(parsed.data.contactPostalCode),
    contactPhone: textOrNull(parsed.data.contactPhone),
    fatherPrefix: textOrNull(parsed.data.fatherPrefix),
    fatherFirstName: textOrNull(parsed.data.fatherFirstName),
    fatherLastName: textOrNull(parsed.data.fatherLastName),
    fatherDisabilityStatus: textOrNull(parsed.data.fatherDisabilityStatus),
    fatherLivingStatus: textOrNull(parsed.data.fatherLivingStatus),
    fatherOccupation: textOrNull(parsed.data.fatherOccupation),
    fatherMonthlyIncome: numberOrNull(parsed.data.fatherMonthlyIncome),
    fatherPhone: textOrNull(parsed.data.fatherPhone),
    motherPrefix: textOrNull(parsed.data.motherPrefix),
    motherFirstName: textOrNull(parsed.data.motherFirstName),
    motherLastName: textOrNull(parsed.data.motherLastName),
    motherDisabilityStatus: textOrNull(parsed.data.motherDisabilityStatus),
    motherLivingStatus: textOrNull(parsed.data.motherLivingStatus),
    motherOccupation: textOrNull(parsed.data.motherOccupation),
    motherMonthlyIncome: numberOrNull(parsed.data.motherMonthlyIncome),
    motherPhone: textOrNull(parsed.data.motherPhone),
    parentMaritalStatus: textOrNull(parsed.data.parentMaritalStatus),
    totalSiblings: numberOrNull(parsed.data.totalSiblings),
    studyingSiblings: numberOrNull(parsed.data.studyingSiblings),
    guardianPrefix: textOrNull(parsed.data.guardianPrefix),
    guardianFirstName: textOrNull(parsed.data.guardianFirstName),
    guardianLastName: textOrNull(parsed.data.guardianLastName),
    guardianName: textOrNull(parsed.data.guardianName),
    guardianOccupation: textOrNull(parsed.data.guardianOccupation),
    guardianMonthlyIncome: numberOrNull(parsed.data.guardianMonthlyIncome),
    guardianPhone: textOrNull(parsed.data.guardianPhone),
    relationship: textOrNull(parsed.data.guardianRelationship || parsed.data.relationship),
    previousEducationLevel: textOrNull(parsed.data.previousEducationLevel),
    previousSchool: textOrNull(parsed.data.previousSchool),
    previousSchoolProvince: textOrNull(parsed.data.previousSchoolProvince),
    previousClassLevel: textOrNull(parsed.data.previousClassLevel),
    graduationYear: textOrNull(parsed.data.graduationYear),
    previousMajor: textOrNull(parsed.data.previousMajor),
    gpax: numberOrNull(parsed.data.gpax),
    admissionLevel: parsed.data.admissionLevel,
    departmentSlug: parsed.data.departmentSlug,
    programSlug: textOrNull(parsed.data.programSlug),
    majorSlug: textOrNull(parsed.data.majorSlug),
    branchName: textOrNull(parsed.data.branchName),
    consentAccepted: parsed.data.consentAccepted,
    submittedAt: new Date(),
  };

  const documents = parsed.data.documents.map((document) => ({
    type: document.type,
    title: document.title,
    fileName: textOrNull(document.fileName),
    filePath: textOrNull(document.filePath),
    fileSize: document.fileSize ?? null,
    mimeType: textOrNull(document.mimeType),
    status: documentStatusFor(document.filePath),
  }));

  try {
    if (existing) {
      const application = await db.$transaction(async (tx) => {
        await tx.admissionDocument.deleteMany({ where: { applicationId: existing.id } });
        return tx.admissionApplication.update({
          where: { id: existing.id },
          data: {
            ...applicationData,
            documents: { create: documents },
          },
          select: { applicationNo: true },
        });
      });

      return NextResponse.json({ applicationNo: application.applicationNo, updated: true });
    }

    const applicationNo = await generateApplicationNo(parsed.data.admissionYear);
    const application = await db.admissionApplication.create({
      data: {
        applicationNo,
        ...applicationData,
        documents: { create: documents },
      },
      select: { applicationNo: true },
    });

    return NextResponse.json({ applicationNo: application.applicationNo, updated: false });
  } catch {
    return NextResponse.json(
      { message: "ยังไม่สามารถบันทึกใบสมัครได้ กรุณาตรวจสอบข้อมูลแล้วลองอีกครั้ง" },
      { status: 500 },
    );
  }
}
