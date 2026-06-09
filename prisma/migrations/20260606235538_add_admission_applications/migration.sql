-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'REVIEWING', 'NEED_MORE_DOCUMENTS', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "AdmissionLevel" AS ENUM ('PVOC', 'HIGH_VOC');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('CITIZEN_ID', 'TRANSCRIPT', 'PHOTO', 'HOUSE_REGISTRATION', 'OTHER');

-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('PENDING', 'UPLOADED', 'INVALID', 'VERIFIED');

-- CreateTable
CREATE TABLE "AdmissionApplication" (
    "id" TEXT NOT NULL,
    "applicationNo" TEXT NOT NULL,
    "admissionYear" TEXT NOT NULL,
    "admissionRound" TEXT,
    "admissionType" TEXT,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'SUBMITTED',
    "prefix" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "citizenIdEncrypted" TEXT,
    "citizenIdHash" TEXT NOT NULL,
    "citizenIdMasked" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "nationality" TEXT,
    "religion" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "houseNo" TEXT,
    "villageNo" TEXT,
    "soi" TEXT,
    "road" TEXT,
    "province" TEXT,
    "district" TEXT,
    "subDistrict" TEXT,
    "postalCode" TEXT,
    "fatherPrefix" TEXT,
    "fatherFirstName" TEXT,
    "fatherLastName" TEXT,
    "fatherOccupation" TEXT,
    "fatherPhone" TEXT,
    "motherPrefix" TEXT,
    "motherFirstName" TEXT,
    "motherLastName" TEXT,
    "motherOccupation" TEXT,
    "motherPhone" TEXT,
    "guardianName" TEXT,
    "guardianPhone" TEXT,
    "relationship" TEXT,
    "previousEducationLevel" TEXT,
    "previousSchool" TEXT,
    "previousSchoolProvince" TEXT,
    "previousMajor" TEXT,
    "gpax" DOUBLE PRECISION,
    "admissionLevel" "AdmissionLevel" NOT NULL,
    "departmentSlug" TEXT NOT NULL,
    "programSlug" TEXT,
    "majorSlug" TEXT,
    "consentAccepted" BOOLEAN NOT NULL DEFAULT false,
    "submittedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdmissionApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdmissionDocument" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL,
    "title" TEXT NOT NULL,
    "fileName" TEXT,
    "filePath" TEXT,
    "fileSize" INTEGER,
    "mimeType" TEXT,
    "status" "DocumentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdmissionDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdmissionApplication_applicationNo_key" ON "AdmissionApplication"("applicationNo");

-- CreateIndex
CREATE UNIQUE INDEX "AdmissionApplication_citizenIdHash_key" ON "AdmissionApplication"("citizenIdHash");

-- CreateIndex
CREATE INDEX "AdmissionApplication_applicationNo_idx" ON "AdmissionApplication"("applicationNo");

-- CreateIndex
CREATE INDEX "AdmissionApplication_citizenIdHash_idx" ON "AdmissionApplication"("citizenIdHash");

-- CreateIndex
CREATE INDEX "AdmissionApplication_phone_idx" ON "AdmissionApplication"("phone");

-- CreateIndex
CREATE INDEX "AdmissionApplication_departmentSlug_idx" ON "AdmissionApplication"("departmentSlug");

-- CreateIndex
CREATE INDEX "AdmissionApplication_status_idx" ON "AdmissionApplication"("status");

-- CreateIndex
CREATE INDEX "AdmissionDocument_applicationId_idx" ON "AdmissionDocument"("applicationId");

-- CreateIndex
CREATE INDEX "AdmissionDocument_type_idx" ON "AdmissionDocument"("type");

-- AddForeignKey
ALTER TABLE "AdmissionDocument" ADD CONSTRAINT "AdmissionDocument_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "AdmissionApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
