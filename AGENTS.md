# AGENTS.md — lptc_webapp

คู่มือย่อสำหรับ AI Agent ในโปรเจกต์เว็บไซต์วิทยาลัยเทคนิคลำปาง (LPTC)  
เป้าหมายของไฟล์นี้คือ “จำกติกาสำคัญ” ไม่ใช่คัดลอกเอกสารทั้งหมด เพื่อลด token ตอนเริ่มงาน

## Project

- Public Website: `/`
- Student Portal: `/portal`
- Admin CMS: `/admin`
- UI หลักใช้ภาษาไทย
- โปรเจกต์ทำโดยนักเรียน ปวช. ปี 3 โค้ดควรอ่านง่ายและตรงไปตรงมา
- ข้อมูลโดเมนดูเพิ่มที่ `CONTEXT.md`
- บริบทแบรนด์และดีไซน์ดูเพิ่มที่ `PRODUCT.md`

## Stack ปัจจุบัน

ให้เช็กเวอร์ชันจริงจาก `package.json` ก่อนตัดสินใจเรื่อง API หรือ dependency

แกนหลัก:
- Next.js 16 App Router, React 19, TypeScript strict
- Prisma 7 + `@prisma/adapter-pg` + PostgreSQL
- NextAuth v5 beta
- Tailwind CSS v4 + DaisyUI v5
- Zod v4, react-hook-form
- Tiptap, face-api.js, Pusher, Cloudinary, Uploadthing
- xlsx, jsPDF, axios, bcryptjs, lucide-react

## Version Gotchas

### Prisma 7

- ใช้ driver adapter เท่านั้น
- import DB จาก `@/lib/db`
- `lib/db.ts` ต้องใช้ `PrismaPg` + `pg.Pool`
- `schema.prisma` ต้องเปิด `previewFeatures = ["driverAdapters"]`
- ห้าม raw SQL เว้นแต่ผู้ใช้อนุญาตชัดเจน

### NextAuth v5

- ใช้ `auth()` จาก `@/lib/auth`
- route auth ใช้ `handlers`
- ห้ามใช้ `getServerSession()`
- env ใช้ `AUTH_SECRET`, ไม่ใช้ `NEXTAUTH_SECRET`

### Tailwind v4

- ห้ามสร้าง `tailwind.config.ts`
- config อยู่ใน `app/globals.css` และ `postcss.config.mjs`
- ใช้ `@import "tailwindcss";`
- custom token ใช้ `@theme`

### Client Components

ใส่ `"use client"` เฉพาะไฟล์ที่ใช้:
- browser API เช่น camera, GPS
- state/effect/event handler
- Tiptap
- Pusher client
- framer-motion หรือ animation logic ฝั่ง client

## Routing และสิทธิ์

- `/admin/*` เฉพาะ `ADMIN`
- `/portal/dashboard` ใช้ได้ทุก role ที่ login แล้ว
- `/portal/checkin`, `/portal/assembly`, `/portal/leave` สำหรับ `STUDENT`
- `/portal/attendance` ครู/admin ดูรวม, นักศึกษาดูของตัวเอง
- `/portal/grades` ครูบันทึก, นักศึกษาดู
- `/portal/appointments` ครูสร้าง
- ตรวจ role หลักใน `middleware.ts`; API route ยังต้องตรวจ session เมื่อเป็น protected action

## Coding Rules

- Server Component เป็น default และ fetch DB ได้โดยตรง
- API `POST/PUT` ต้อง validate ด้วย Zod
- ห้ามใช้ `any` ถ้าไม่จำเป็นจริง
- ห้าม expose `passwordHash`, `faceDescriptor`, `lineUserId`
- ห้าม commit `.env.local`
- ห้าม reset database โดยไม่ได้รับอนุญาต
- ห้ามแก้ `components/ui/*` ตรง ๆ ถ้าเป็น shadcn component ให้ใช้ CLI หรือ compose ภายนอก
- ใช้ `lucide-react` สำหรับ icon
- import order: Next/React, third-party, internal lib, components, types

## Data และ Security

- ใช้ Prisma query ปกติผ่าน `db.*`
- เลือก `select` เพื่อกันข้อมูลลับหลุด
- Geofence ต้องตรวจทั้ง client และ server
- Face descriptor เก็บเป็น JSON ใน DB และห้าม log
- env ที่ขึ้นต้น `NEXT_PUBLIC_` ถือว่า public เสมอ

## Feature Notes

### Face Recognition

- อยู่ฝั่ง client เท่านั้น
- model อยู่ใน `public/models`
- flow: load model, เปิดกล้อง, detect ทุกประมาณ 500ms, compare descriptor, match แล้ว POST checkin

### Geofence

- client ใช้ `navigator.geolocation`
- server ตรวจซ้ำใน `/api/checkin` และ `/api/assembly`
- distance helper อยู่ที่ `lib/geofence.ts`

### Excel Import

- ใช้ SheetJS
- validate ทุก row
- default password = `studentCode` แล้ว hash ด้วย bcryptjs

### PDF ภาษาไทย

- jsPDF ต้องฝัง Sarabun font ก่อน render ภาษาไทย

### Realtime

- server ใช้ Pusher trigger
- client subscribe ด้วย `pusher-js`

## UI Direction

- เว็บควรรู้สึกน่าเชื่อถือ เป็นมิตร และไม่แข็งเหลี่ยมเกินไป
- ใช้มุมโค้ง เงาเบา spacing ที่อ่านง่าย และ motion เท่าที่ช่วยลำดับสายตา
- เคารพ `prefers-reduced-motion`
- อย่าใช้ animation หนักจนรบกวนมือถือ
- ทุกปุ่ม/ลิงก์ต้องมี hover/focus ชัดเจน
- ใช้ภาพ โลโก้ และข้อมูลจริงของวิทยาลัย ไม่เติมข้อมูลปลอมเพื่อให้หน้าดูเต็ม

## Commands

```bash
npm run dev
npm run build
npm run lint
npx tsc --noEmit
npx prisma generate
npx prisma migrate dev --name NAME
npx prisma db seed
npx shadcn@latest add button
```

บน Windows ถ้า PowerShell block `npx.ps1` ให้ใช้ `npx.cmd`

## Before Handoff

- รัน test/check ที่เกี่ยวข้องเท่าที่ทำได้
- ถ้าแก้ schema ให้รัน `npx prisma generate`
- ถ้า `tsc` fail เพราะไฟล์อื่นที่มีอยู่ก่อน ให้บอกให้ชัดว่าไม่เกี่ยวกับงานที่แก้
- รายงานไฟล์ที่แก้และผลตรวจแบบสั้น ๆ
