import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local", override: true });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in .env.local");
}

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // 1. Departments
  const it = await prisma.department.upsert({
    where: { slug: "it" },
    update: {},
    create: {
      name: "เทคโนโลยีสารสนเทศ",
      slug: "it",
      description: "สาขาที่มุ่งเน้นการพัฒนาซอฟต์แวร์ เครือข่าย และเทคโนโลยีสมัยใหม่",
      icon: "monitor",
      color: "#1d4ed8",
    },
  });

  await prisma.department.upsert({
    where: { slug: "electronics" },
    update: {},
    create: {
      name: "อิเล็กทรอนิกส์",
      slug: "electronics",
      description: "สาขาที่เชี่ยวชาญด้านอุปกรณ์อิเล็กทรอนิกส์และระบบควบคุม",
      icon: "cpu",
      color: "#b91c1c",
    },
  });

  // 2. News Categories
  const generalNews = await prisma.newsCategory.upsert({
    where: { slug: "general" },
    update: {},
    create: {
      name: "ข่าวทั่วไป",
      slug: "general",
      color: "#1D9E75",
    },
  });

  // 3. News
  await prisma.news.upsert({
    where: { slug: "welcome-to-lptc" },
    update: {},
    create: {
      title: "ยินดีต้อนรับสู่เว็บไซต์วิทยาลัย LPTC",
      slug: "welcome-to-lptc",
      content: "<p>ยินดีต้อนรับนักศึกษาและบุคคลทั่วไปเข้าสู่เว็บไซต์อย่างเป็นทางการของวิทยาลัย...</p>",
      excerpt: "ยินดีต้อนรับสู่เว็บไซต์โฉมใหม่ของเรา",
      categoryId: generalNews.id,
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  // 4. Staff (Admin & Teacher)
  const hashedAdminPassword = await bcrypt.hash("admin123", 10);
  await prisma.staff.upsert({
    where: { email: "admin@lptc.ac.th" },
    update: {},
    create: {
      email: "admin@lptc.ac.th",
      fullName: "ผู้ดูแลระบบ",
      passwordHash: hashedAdminPassword,
      role: "ADMIN",
    },
  });

  const hashedTeacherPassword = await bcrypt.hash("teacher123", 10);
  await prisma.staff.upsert({
    where: { email: "teacher@lptc.ac.th" },
    update: {},
    create: {
      email: "teacher@lptc.ac.th",
      fullName: "ครูสมชาย ใจดี",
      passwordHash: hashedTeacherPassword,
      role: "TEACHER",
      departmentId: it.id,
    },
  });

  // 5. Student
  const hashedStudentPassword = await bcrypt.hash("67319010001", 10);
  await prisma.student.upsert({
    where: { studentCode: "67319010001" },
    update: {},
    create: {
      studentCode: "67319010001",
      fullName: "นายทดสอบ นักเรียน",
      departmentId: it.id,
      classRoom: "ทส. 1/1",
      passwordHash: hashedStudentPassword,
    },
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
