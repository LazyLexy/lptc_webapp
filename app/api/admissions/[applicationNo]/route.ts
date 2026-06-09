import { NextResponse } from "next/server";

import { hashPrintToken } from "@/lib/admissions";
import { db } from "@/lib/db";
import { getDepartmentBySlug } from "@/lib/public-content";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ applicationNo: string }> },
) {
  const { applicationNo } = await params;
  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? "";

  if (!token) {
    return NextResponse.json({ message: "ต้องมีรหัสยืนยันสำหรับเปิดใบสมัคร" }, { status: 401 });
  }

  const application = await db.admissionApplication.findFirst({
    where: {
      applicationNo,
      printTokenHash: hashPrintToken(token),
      printTokenExpiresAt: { gt: new Date() },
    },
    select: {
      applicationNo: true,
      admissionYear: true,
      admissionRound: true,
      admissionType: true,
      status: true,
      prefix: true,
      firstName: true,
      lastName: true,
      nickName: true,
      citizenIdMasked: true,
      birthDate: true,
      birthProvince: true,
      age: true,
      bloodType: true,
      weight: true,
      height: true,
      disabilityStatus: true,
      disabilityDetail: true,
      ethnicity: true,
      nationality: true,
      religion: true,
      homePhone: true,
      phone: true,
      email: true,
      specialAbility: true,
      houseCode: true,
      houseNo: true,
      villageNo: true,
      soi: true,
      road: true,
      province: true,
      district: true,
      subDistrict: true,
      postalCode: true,
      contactAddressSameAsHouseAddress: true,
      contactHouseNo: true,
      contactVillageNo: true,
      contactSoi: true,
      contactRoad: true,
      contactProvince: true,
      contactDistrict: true,
      contactSubDistrict: true,
      contactPostalCode: true,
      contactPhone: true,
      fatherPrefix: true,
      fatherFirstName: true,
      fatherLastName: true,
      fatherDisabilityStatus: true,
      fatherLivingStatus: true,
      fatherOccupation: true,
      fatherMonthlyIncome: true,
      fatherPhone: true,
      motherPrefix: true,
      motherFirstName: true,
      motherLastName: true,
      motherDisabilityStatus: true,
      motherLivingStatus: true,
      motherOccupation: true,
      motherMonthlyIncome: true,
      motherPhone: true,
      parentMaritalStatus: true,
      totalSiblings: true,
      studyingSiblings: true,
      guardianPrefix: true,
      guardianFirstName: true,
      guardianLastName: true,
      guardianName: true,
      guardianOccupation: true,
      guardianMonthlyIncome: true,
      guardianPhone: true,
      relationship: true,
      previousEducationLevel: true,
      previousSchool: true,
      previousSchoolProvince: true,
      previousClassLevel: true,
      graduationYear: true,
      previousMajor: true,
      gpax: true,
      admissionLevel: true,
      departmentSlug: true,
      programSlug: true,
      majorSlug: true,
      branchName: true,
      submittedAt: true,
      documents: {
        select: {
          id: true,
          type: true,
          title: true,
          fileName: true,
          status: true,
        },
      },
    },
  });

  if (!application) {
    return NextResponse.json({ message: "ไม่พบข้อมูลใบสมัคร หรือรหัสยืนยันหมดอายุแล้ว" }, { status: 404 });
  }

  const department = await getDepartmentBySlug(application.departmentSlug);

  return NextResponse.json({
    ...application,
    departmentName: department?.name ?? application.departmentSlug,
    departmentEnglishName: department?.englishName ?? "",
  });
}
