# 🏫 College Website — Project Setup Guide

> Next.js 15 · TypeScript · Tailwind CSS · PostgreSQL · Prisma ORM

## 2. ติดตั้ง dependencies ทั้งหมด

```bash
# Database & Auth
npm install prisma @prisma/client
npm install next-auth@beta @auth/prisma-adapter

# UI Components
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-select @radix-ui/react-tabs
npm install @radix-ui/react-toast @radix-ui/react-avatar
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react

# Rich Text Editor (สำหรับเขียนข่าว)
npm install @tiptap/react @tiptap/pm @tiptap/starter-kit
npm install @tiptap/extension-image @tiptap/extension-link

# Upload & Media
npm install cloudinary next-cloudinary
npm install @uploadthing/react uploadthing

# Excel Import/Export
npm install xlsx
npm install jspdf jspdf-autotable

# Face Recognition
npm install face-api.js

# Real-time (Dashboard ครู)
npm install pusher pusher-js

# Line Notify
npm install axios

# Form & Validation
npm install react-hook-form @hookform/resolvers zod

# Date & Calendar
npm install date-fns react-day-picker

# Charts (Dashboard)
npm install recharts

# Dev tools
npm install -D @types/node prisma
```

---

## 3. โครงสร้างโฟลเดอร์

```
lptc_webapp/
├── app/
│   ├── (public)/              # เว็บสาธารณะ
│   │   ├── page.tsx           # หน้าแรก
│   │   ├── about/page.tsx
│   │   ├── departments/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── news/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── events/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── admissions/page.tsx
│   │   └── contact/page.tsx
│   │
│   ├── portal/                # Student Portal
│   │   ├── login/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── checkin/page.tsx   # สแกนใบหน้า
│   │   ├── assembly/page.tsx  # ลงชื่อเข้าแถว
│   │   ├── attendance/page.tsx
│   │   ├── schedule/page.tsx
│   │   ├── grades/page.tsx
│   │   ├── leave/page.tsx
│   │   ├── appointments/page.tsx
│   │   └── profile/page.tsx
│   │
│   ├── admin/                 # Admin CMS
│   │   ├── dashboard/page.tsx
│   │   ├── news/
│   │   │   ├── page.tsx
│   │   │   ├── create/page.tsx
│   │   │   └── [id]/edit/page.tsx
│   │   ├── departments/page.tsx
│   │   ├── teachers/page.tsx
│   │   ├── events/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── students/page.tsx  # import Excel
│   │   ├── staff/page.tsx
│   │   ├── attendance/page.tsx
│   │   ├── admissions/page.tsx
│   │   └── settings/page.tsx
│   │
│   └── api/                   # API Routes
│       ├── auth/[...nextauth]/route.ts
│       ├── news/route.ts
│       ├── departments/route.ts
│       ├── teachers/route.ts
│       ├── students/route.ts
│       ├── checkin/route.ts
│       ├── assembly/route.ts
│       ├── attendance/route.ts
│       ├── appointments/route.ts
│       ├── grades/route.ts
│       ├── leave/route.ts
│       ├── notify/line/route.ts
│       └── upload/route.ts
│
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── AdminSidebar.tsx
│   │   └── PortalSidebar.tsx
│   ├── public/
│   │   ├── HeroBanner.tsx
│   │   ├── NewsCard.tsx
│   │   ├── DepartmentCard.tsx
│   │   └── EventCalendar.tsx
│   ├── portal/
│   │   ├── FaceScanner.tsx    # face-api.js
│   │   ├── SelfieCapture.tsx
│   │   ├── AttendanceTable.tsx
│   │   └── GradeTable.tsx
│   └── admin/
│       ├── RichTextEditor.tsx # Tiptap
│       ├── ImageUploader.tsx
│       ├── ExcelImporter.tsx
│       └── StatsCard.tsx
│
├── lib/
│   ├── db.ts                  # Prisma client
│   ├── auth.ts                # NextAuth config
│   ├── cloudinary.ts
│   ├── line.ts                # Line Messaging API
│   ├── pusher.ts              # Real-time
│   ├── geofence.ts            # GPS check
│   └── utils.ts
│
├── types/
│   ├── index.ts
│   ├── auth.ts
│   └── portal.ts
│
└── middleware.ts              # Route protection
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── public/
│   ├── models/                    # face-api.js models
│   │   ├── face_landmark_68_model-weights_manifest.json
│   │   ├── face_recognition_model-weights_manifest.json
│   │   └── ssd_mobilenetv1_model-weights_manifest.json
│   └── images/
│   
└── .env.local
```

---

## 4. ตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` ที่ root:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://username:password@host/dbname?sslmode=require"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary (อัปโหลดรูป)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Line Messaging API (แจ้งเตือน)
LINE_CHANNEL_ACCESS_TOKEN="your-line-token"
LINE_CHANNEL_SECRET="your-line-secret"

# Pusher (Real-time dashboard)
PUSHER_APP_ID="your-app-id"
PUSHER_KEY="your-key"
PUSHER_SECRET="your-secret"
PUSHER_CLUSTER="ap1"
NEXT_PUBLIC_PUSHER_KEY="your-key"
NEXT_PUBLIC_PUSHER_CLUSTER="ap1"

# Google Maps (หน้าติดต่อ)
NEXT_PUBLIC_GOOGLE_MAPS_KEY="your-maps-key"

# วิทยาลัย Geofence (lat/lng ศูนย์กลาง + รัศมีเมตร)
NEXT_PUBLIC_COLLEGE_LAT="18.7883"
NEXT_PUBLIC_COLLEGE_LNG="98.9853"
NEXT_PUBLIC_GEOFENCE_RADIUS="200"
```

---

## 5. ตั้งค่า Prisma + สร้าง Database

```bash
# Init Prisma
npx prisma init

# แก้ไข prisma/schema.prisma (ดูด้านล่าง)
# แล้วสร้างตาราง
npx prisma migrate dev --name init

# Seed ข้อมูลตัวอย่าง
npx prisma db seed
```

### `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ===== WEBSITE =====

model Department {
  id          String    @id @default(uuid())
  name        String
  slug        String    @unique
  description String?
  icon        String?
  color       String?
  order       Int       @default(0)
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())

  teachers    Teacher[]
  albums      Album[]
  admissions  Admission[]
  staff       Staff[]
  students    Student[]
  schedules   Schedule[]
}

model Teacher {
  id           String     @id @default(uuid())
  departmentId String
  name         String
  photo        String?
  bio          String?
  subject      String?
  email        String?
  order        Int        @default(0)
  createdAt    DateTime   @default(now())

  department   Department @relation(fields: [departmentId], references: [id])
}

model NewsCategory {
  id    String @id @default(uuid())
  name  String
  slug  String @unique
  color String @default("#1D9E75")

  news  News[]
}

model News {
  id          String       @id @default(uuid())
  categoryId  String
  title       String
  slug        String       @unique
  content     String
  excerpt     String?
  coverImage  String?
  status      String       @default("DRAFT") // DRAFT | PUBLISHED
  publishedAt DateTime?
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt

  category    NewsCategory @relation(fields: [categoryId], references: [id])
}

model Event {
  id          String   @id @default(uuid())
  title       String
  description String?
  type        String   @default("GENERAL")
  startDate   DateTime
  endDate     DateTime
  location    String?
  isHighlight Boolean  @default(false)
  createdAt   DateTime @default(now())
}

model Album {
  id           String     @id @default(uuid())
  departmentId String?
  title        String
  description  String?
  coverImage   String?
  date         DateTime   @default(now())
  createdAt    DateTime   @default(now())

  department   Department? @relation(fields: [departmentId], references: [id])
  photos       Photo[]
}

model Photo {
  id        String   @id @default(uuid())
  albumId   String
  url       String
  caption   String?
  order     Int      @default(0)
  createdAt DateTime @default(now())

  album     Album    @relation(fields: [albumId], references: [id], onDelete: Cascade)
}

model Admission {
  id           String     @id @default(uuid())
  departmentId String
  fullName     String
  phone        String
  email        String?
  level        String     // CERTIFICATE | DIPLOMA
  status       String     @default("PENDING")
  note         String?
  createdAt    DateTime   @default(now())

  department   Department @relation(fields: [departmentId], references: [id])
}

model Setting {
  key         String @id
  value       String
  description String?
}

// ===== STUDENT PORTAL =====

model Staff {
  id           String     @id @default(uuid())
  departmentId String?
  email        String     @unique
  passwordHash String
  fullName     String
  photo        String?
  role         String     @default("TEACHER") // TEACHER | ADMIN
  lineUserId   String?
  createdAt    DateTime   @default(now())

  department      Department?       @relation(fields: [departmentId], references: [id])
  advisees        Student[]         @relation("Advisor")
  assemblyChecked AssemblyRecord[]  @relation("VerifiedBy")
  attendanceApproved AttendanceRecord[] @relation("ApprovedBy")
  leaveApproved   LeaveRequest[]    @relation("ApprovedBy")
  appointments    Appointment[]
  grades          Grade[]
  schedules       Schedule[]
}

model Student {
  id             String    @id @default(uuid())
  departmentId   String
  advisorId      String?
  studentCode    String    @unique
  fullName       String
  photo          String?
  faceDescriptor Json?
  classRoom      String?
  lineUserId     String?
  createdAt      DateTime  @default(now())

  department      Department        @relation(fields: [departmentId], references: [id])
  advisor         Staff?            @relation("Advisor", fields: [advisorId], references: [id])
  parents         Parent[]
  checkInOuts     CheckInOut[]
  assemblyRecords AssemblyRecord[]
  attendanceRecords AttendanceRecord[]
  leaveRequests   LeaveRequest[]
  appointments    Appointment[]
  grades          Grade[]
}

model Parent {
  id         String   @id @default(uuid())
  studentId  String
  fullName   String
  phone      String
  lineUserId String?
  createdAt  DateTime @default(now())

  student    Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)
}

model CheckInOut {
  id        String   @id @default(uuid())
  studentId String
  type      String   // IN | OUT
  timestamp DateTime @default(now())
  photo     String?
  lat       Float?
  lng       Float?
  verified  Boolean  @default(true)

  student   Student  @relation(fields: [studentId], references: [id])
}

model AssemblyRecord {
  id          String   @id @default(uuid())
  studentId   String
  verifiedBy  String?
  date        DateTime @default(now())
  photo       String?
  lat         Float?
  lng         Float?
  status      String   @default("PRESENT") // PRESENT | ABSENT | LATE
  verifiedAt  DateTime?
  createdAt   DateTime @default(now())

  student     Student  @relation(fields: [studentId], references: [id])
  staff       Staff?   @relation("VerifiedBy", fields: [verifiedBy], references: [id])
}

model AttendanceRecord {
  id         String   @id @default(uuid())
  studentId  String
  approvedBy String?
  date       DateTime
  status     String   // PRESENT | LATE | ABSENT
  reason     String?
  createdAt  DateTime @default(now())

  student    Student  @relation(fields: [studentId], references: [id])
  staff      Staff?   @relation("ApprovedBy", fields: [approvedBy], references: [id])
}

model LeaveRequest {
  id         String   @id @default(uuid())
  studentId  String
  approvedBy String?
  startDate  DateTime
  endDate    DateTime
  reason     String
  docUrl     String?
  status     String   @default("PENDING") // PENDING | APPROVED | REJECTED
  createdAt  DateTime @default(now())

  student    Student  @relation(fields: [studentId], references: [id])
  staff      Staff?   @relation("ApprovedBy", fields: [approvedBy], references: [id])
}

model Appointment {
  id        String   @id @default(uuid())
  staffId   String
  studentId String
  title     String
  date      DateTime
  time      String
  location  String?
  status    String   @default("PENDING") // PENDING | CONFIRMED | CANCELLED
  createdAt DateTime @default(now())

  staff     Staff    @relation(fields: [staffId], references: [id])
  student   Student  @relation(fields: [studentId], references: [id])
}

model Grade {
  id          String   @id @default(uuid())
  studentId   String
  staffId     String
  subjectName String
  subjectCode String?
  score       Float?
  grade       String?
  semester    String
  year        Int
  createdAt   DateTime @default(now())

  student     Student  @relation(fields: [studentId], references: [id])
  staff       Staff    @relation(fields: [staffId], references: [id])
}

model Schedule {
  id          String   @id @default(uuid())
  departmentId String
  staffId     String
  classRoom   String
  subjectName String
  dayOfWeek   Int      // 1=จันทร์ ... 5=ศุกร์
  startTime   String   // "08:00"
  endTime     String   // "09:00"
  createdAt   DateTime @default(now())

  department  Department @relation(fields: [departmentId], references: [id])
  staff       Staff      @relation(fields: [staffId], references: [id])
}

model Notification {
  id        String   @id @default(uuid())
  userId    String
  userType  String   // STUDENT | STAFF | ADMIN
  title     String
  message   String
  type      String   // INFO | WARNING | SUCCESS | CHECKIN | ASSEMBLY
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

---

## 6. ตั้งค่า Prisma Client (`src/lib/db.ts`)

```ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma = db;
```

---

## 7. ตั้งค่า NextAuth (`src/lib/auth.ts`)

```ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "./db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/portal/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password, role } = credentials as {
          email: string;
          password: string;
          role: "staff" | "student";
        };

        if (role === "staff") {
          const staff = await db.staff.findUnique({ where: { email } });
          if (!staff) return null;
          const valid = await bcrypt.compare(password, staff.passwordHash);
          if (!valid) return null;
          return { id: staff.id, name: staff.fullName, email: staff.email, role: staff.role };
        }

        if (role === "student") {
          const student = await db.student.findUnique({
            where: { studentCode: email },
          });
          if (!student) return null;
          // password = วันเดือนปีเกิด หรือรหัสเริ่มต้น
          const valid = await bcrypt.compare(password, student.studentCode);
          if (!valid) return null;
          return { id: student.id, name: student.fullName, role: "STUDENT" };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      (session.user as any).role = token.role;
      return session;
    },
  },
});
```

---

## 8. Middleware กั้น Route (`src/middleware.ts`)

```ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // กั้นหน้า admin
  if (pathname.startsWith("/admin")) {
    if (!session || !["ADMIN"].includes((session.user as any).role)) {
      return NextResponse.redirect(new URL("/portal/login", req.url));
    }
  }

  // กั้นหน้า portal
  if (pathname.startsWith("/portal") && pathname !== "/portal/login") {
    if (!session) {
      return NextResponse.redirect(new URL("/portal/login", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/portal/:path*"],
};
```

---

## 9. ดาวน์โหลด face-api.js Models

```bash
# สร้างโฟลเดอร์
mkdir -p public/models

# ดาวน์โหลด models (จำเป็น 3 ไฟล์)
cd public/models

curl -O https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/ssd_mobilenetv1_model-weights_manifest.json
curl -O https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/ssd_mobilenetv1_model-shard1
curl -O https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_landmark_68_model-weights_manifest.json
curl -O https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_landmark_68_model-shard1
curl -O https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_recognition_model-weights_manifest.json
curl -O https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_recognition_model-shard1
curl -O https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_recognition_model-shard2
```

---

## 10. ตั้งค่า Geofence (`src/lib/geofence.ts`)

```ts
// คำนวณระยะห่าง (เมตร) ระหว่าง 2 จุด GPS
export function getDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371000; // รัศมีโลก (เมตร)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// เช็คว่าอยู่ในรัศมีวิทยาลัยไหม
export function isInsideCollege(lat: number, lng: number): boolean {
  const collegeLat = parseFloat(process.env.NEXT_PUBLIC_COLLEGE_LAT!);
  const collegeLng = parseFloat(process.env.NEXT_PUBLIC_COLLEGE_LNG!);
  const radius = parseFloat(process.env.NEXT_PUBLIC_GEOFENCE_RADIUS!);
  return getDistance(lat, lng, collegeLat, collegeLng) <= radius;
}
```

---

## 11. ตั้งค่า Line Notify (`src/lib/line.ts`)

```ts
import axios from "axios";

const LINE_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN!;

export async function sendLineMessage(userId: string, message: string) {
  await axios.post(
    "https://api.line.me/v2/bot/message/push",
    {
      to: userId,
      messages: [{ type: "text", text: message }],
    },
    {
      headers: {
        Authorization: `Bearer ${LINE_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
}

// แจ้งครูที่ปรึกษาเมื่อนักศึกษาเข้า-ออก
export async function notifyAdvisor(
  advisorLineId: string,
  studentName: string,
  type: "IN" | "OUT",
  time: string
) {
  const emoji = type === "IN" ? "✅" : "🚪";
  const action = type === "IN" ? "เข้าวิทยาลัย" : "ออกวิทยาลัย";
  await sendLineMessage(
    advisorLineId,
    `${emoji} ${studentName}\n${action}แล้ว เวลา ${time}`
  );
}
```

---

## 12. รันโปรเจค

```bash
# รัน development server
npm run dev

# เปิด http://localhost:3000
```

---

## 13. Deploy บน Vercel + Neon

```bash
# 1. สร้าง repo บน GitHub แล้ว push
git init && git add . && git commit -m "initial setup"
git remote add origin https://github.com/yourname/college-website.git
git push -u origin main

# 2. สมัคร Neon (neon.tech) → สร้าง database → copy connection string
# 3. สมัคร Vercel (vercel.com) → import GitHub repo
# 4. ใส่ Environment Variables ใน Vercel dashboard
# 5. Deploy อัตโนมัติ!
```

---

## สรุป Services ที่ต้องสมัคร (ฟรีทั้งหมด)

| Service | ใช้ทำอะไร | Link |
|---|---|---|
| **Neon** | PostgreSQL database | neon.tech |
| **Vercel** | Host Next.js | vercel.com |
| **Cloudinary** | เก็บรูปภาพ | cloudinary.com |
| **Pusher** | Real-time dashboard | pusher.com |
| **Line Developers** | แจ้งเตือน Line | developers.line.biz |
| **Google Cloud** | Google Maps API | console.cloud.google.com |