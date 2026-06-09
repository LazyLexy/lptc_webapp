-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "DocumentType" ADD VALUE 'FATHER_CITIZEN_ID';
ALTER TYPE "DocumentType" ADD VALUE 'MOTHER_CITIZEN_ID';
ALTER TYPE "DocumentType" ADD VALUE 'GUARDIAN_CITIZEN_ID';

-- AlterTable
ALTER TABLE "AdmissionApplication" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "birthProvince" TEXT,
ADD COLUMN     "bloodType" TEXT,
ADD COLUMN     "branchName" TEXT,
ADD COLUMN     "contactAddressSameAsHouseAddress" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "contactDistrict" TEXT,
ADD COLUMN     "contactHouseNo" TEXT,
ADD COLUMN     "contactPhone" TEXT,
ADD COLUMN     "contactPostalCode" TEXT,
ADD COLUMN     "contactProvince" TEXT,
ADD COLUMN     "contactRoad" TEXT,
ADD COLUMN     "contactSoi" TEXT,
ADD COLUMN     "contactSubDistrict" TEXT,
ADD COLUMN     "contactVillageNo" TEXT,
ADD COLUMN     "disabilityDetail" TEXT,
ADD COLUMN     "disabilityStatus" TEXT,
ADD COLUMN     "ethnicity" TEXT,
ADD COLUMN     "fatherDisabilityStatus" TEXT,
ADD COLUMN     "fatherLivingStatus" TEXT,
ADD COLUMN     "fatherMonthlyIncome" DOUBLE PRECISION,
ADD COLUMN     "graduationYear" TEXT,
ADD COLUMN     "guardianFirstName" TEXT,
ADD COLUMN     "guardianLastName" TEXT,
ADD COLUMN     "guardianMonthlyIncome" DOUBLE PRECISION,
ADD COLUMN     "guardianOccupation" TEXT,
ADD COLUMN     "guardianPrefix" TEXT,
ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "homePhone" TEXT,
ADD COLUMN     "houseCode" TEXT,
ADD COLUMN     "motherDisabilityStatus" TEXT,
ADD COLUMN     "motherLivingStatus" TEXT,
ADD COLUMN     "motherMonthlyIncome" DOUBLE PRECISION,
ADD COLUMN     "nickName" TEXT,
ADD COLUMN     "parentMaritalStatus" TEXT,
ADD COLUMN     "previousClassLevel" TEXT,
ADD COLUMN     "printTokenExpiresAt" TIMESTAMP(3),
ADD COLUMN     "printTokenHash" TEXT,
ADD COLUMN     "specialAbility" TEXT,
ADD COLUMN     "studyingSiblings" INTEGER,
ADD COLUMN     "totalSiblings" INTEGER,
ADD COLUMN     "weight" DOUBLE PRECISION;

-- CreateIndex
CREATE INDEX "AdmissionApplication_printTokenHash_idx" ON "AdmissionApplication"("printTokenHash");
