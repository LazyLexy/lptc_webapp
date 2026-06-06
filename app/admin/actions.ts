"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

type ActionResult = {
  success: boolean;
  message: string;
};

const emptyToNull = z.preprocess((value) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}, z.string().nullable());

const optionalText = z.preprocess((value) => {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
}, z.string().optional());

const hexColor = z.string().trim().regex(/^#[0-9a-fA-F]{6}$/);

async function requireAdmin() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    throw new Error("ไม่มีสิทธิ์ใช้งานส่วนผู้ดูแลระบบ");
  }
}

function formValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function slugify(value: string) {
  const fallback = `item-${Date.now()}`;
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9\u0E00-\u0E7F]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || fallback;
}

async function uniqueSlug(model: "news" | "department" | "newsCategory", base: string, currentId?: string) {
  let candidate = slugify(base);
  let index = 2;

  while (true) {
    const existing =
      model === "news"
        ? await db.news.findUnique({ where: { slug: candidate }, select: { id: true } })
        : model === "department"
          ? await db.department.findUnique({ where: { slug: candidate }, select: { id: true } })
          : await db.newsCategory.findUnique({ where: { slug: candidate }, select: { id: true } });

    if (!existing || existing.id === currentId) return candidate;
    candidate = `${slugify(base)}-${index}`;
    index += 1;
  }
}

function result(message: string, success = true): ActionResult {
  return { success, message };
}

const categorySchema = z.object({
  name: z.string().trim().min(2),
  slug: optionalText,
  color: hexColor.default("#1D9E75"),
});

export async function createNewsCategory(formData: FormData) {
  await requireAdmin();
  const parsed = categorySchema.safeParse({
    name: formValue(formData, "name"),
    slug: formValue(formData, "slug"),
    color: formValue(formData, "color") || "#1D9E75",
  });

  if (!parsed.success) throw new Error("กรุณากรอกชื่อหมวดหมู่และสีให้ถูกต้อง");

  await db.newsCategory.create({
    data: {
      name: parsed.data.name,
      slug: await uniqueSlug("newsCategory", parsed.data.slug ?? parsed.data.name),
      color: parsed.data.color,
    },
  });
  revalidatePath("/admin/news");
  revalidatePath("/news");
}

export async function deleteNewsCategory(formData: FormData) {
  await requireAdmin();
  const id = formValue(formData, "id");
  const used = await db.news.count({ where: { categoryId: id } });
  if (used > 0) throw new Error("ลบหมวดหมู่ไม่ได้ เพราะยังมีข่าวใช้งานอยู่");

  await db.newsCategory.delete({ where: { id } });
  revalidatePath("/admin/news");
  revalidatePath("/news");
}

const newsSchema = z.object({
  id: optionalText,
  categoryId: z.string().trim().min(1),
  title: z.string().trim().min(3),
  slug: optionalText,
  excerpt: emptyToNull,
  content: z.string().trim().min(8),
  coverImage: emptyToNull,
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export async function saveNews(formData: FormData) {
  await requireAdmin();
  const parsed = newsSchema.safeParse({
    id: formValue(formData, "id"),
    categoryId: formValue(formData, "categoryId"),
    title: formValue(formData, "title"),
    slug: formValue(formData, "slug"),
    excerpt: formValue(formData, "excerpt"),
    content: formValue(formData, "content"),
    coverImage: formValue(formData, "coverImage"),
    status: formValue(formData, "status") || "DRAFT",
  });

  if (!parsed.success) throw new Error("กรุณากรอกข้อมูลข่าวให้ครบถ้วน");

  const id = parsed.data.id;
  const slug = await uniqueSlug("news", parsed.data.slug ?? parsed.data.title, id);
  const publishedAt = parsed.data.status === "PUBLISHED" ? new Date() : null;
  const data = {
    categoryId: parsed.data.categoryId,
    title: parsed.data.title,
    slug,
    excerpt: parsed.data.excerpt,
    content: parsed.data.content,
    coverImage: parsed.data.coverImage,
    status: parsed.data.status,
    publishedAt,
  };

  if (id) {
    await db.news.update({ where: { id }, data });
  } else {
    await db.news.create({ data });
  }

  revalidatePath("/admin/news");
  revalidatePath("/news");
  if (parsed.data.status === "PUBLISHED") revalidatePath(`/news/${slug}`);
  redirect("/admin/news");
}

export async function deleteNews(formData: FormData) {
  await requireAdmin();
  await db.news.delete({ where: { id: formValue(formData, "id") } });
  revalidatePath("/admin/news");
  revalidatePath("/news");
}

const departmentSchema = z.object({
  id: optionalText,
  name: z.string().trim().min(2),
  slug: optionalText,
  description: emptyToNull,
  icon: emptyToNull,
  color: hexColor.default("#1D4ED8"),
  order: z.coerce.number().int().default(0),
  isActive: z.boolean().default(false),
});

export async function saveDepartment(formData: FormData) {
  await requireAdmin();
  const parsed = departmentSchema.safeParse({
    id: formValue(formData, "id"),
    name: formValue(formData, "name"),
    slug: formValue(formData, "slug"),
    description: formValue(formData, "description"),
    icon: formValue(formData, "icon"),
    color: formValue(formData, "color") || "#1D4ED8",
    order: formValue(formData, "order") || "0",
    isActive: formData.get("isActive") === "on",
  });

  if (!parsed.success) throw new Error("กรุณากรอกข้อมูลแผนกให้ถูกต้อง");

  const id = parsed.data.id;
  const data = {
    name: parsed.data.name,
    slug: await uniqueSlug("department", parsed.data.slug ?? parsed.data.name, id),
    description: parsed.data.description,
    icon: parsed.data.icon,
    color: parsed.data.color,
    order: parsed.data.order,
    isActive: parsed.data.isActive,
  };

  if (id) await db.department.update({ where: { id }, data });
  else await db.department.create({ data });

  revalidatePath("/admin/departments");
  revalidatePath("/departments");
}

export async function deleteDepartment(formData: FormData) {
  await requireAdmin();
  const id = formValue(formData, "id");
  const related = await Promise.all([
    db.teacher.count({ where: { departmentId: id } }),
    db.student.count({ where: { departmentId: id } }),
    db.admission.count({ where: { departmentId: id } }),
  ]);

  if (related.some((count) => count > 0)) {
    throw new Error("ลบแผนกไม่ได้ เพราะยังมีครู นักศึกษา หรือใบสมัครที่เกี่ยวข้อง");
  }

  await db.department.delete({ where: { id } });
  revalidatePath("/admin/departments");
  revalidatePath("/departments");
}

const teacherSchema = z.object({
  id: optionalText,
  departmentId: z.string().trim().min(1),
  name: z.string().trim().min(2),
  photo: emptyToNull,
  bio: emptyToNull,
  subject: emptyToNull,
  email: emptyToNull,
  order: z.coerce.number().int().default(0),
});

export async function saveTeacher(formData: FormData) {
  await requireAdmin();
  const parsed = teacherSchema.safeParse({
    id: formValue(formData, "id"),
    departmentId: formValue(formData, "departmentId"),
    name: formValue(formData, "name"),
    photo: formValue(formData, "photo"),
    bio: formValue(formData, "bio"),
    subject: formValue(formData, "subject"),
    email: formValue(formData, "email"),
    order: formValue(formData, "order") || "0",
  });

  if (!parsed.success) throw new Error("กรุณากรอกข้อมูลครูผู้สอนให้ครบถ้วน");

  const id = parsed.data.id;
  const data = {
    departmentId: parsed.data.departmentId,
    name: parsed.data.name,
    photo: parsed.data.photo,
    bio: parsed.data.bio,
    subject: parsed.data.subject,
    email: parsed.data.email,
    order: parsed.data.order,
  };

  if (id) await db.teacher.update({ where: { id }, data });
  else await db.teacher.create({ data });

  revalidatePath("/admin/teachers");
  revalidatePath("/admin/staff");
  revalidatePath("/departments");
}

export async function deleteTeacher(formData: FormData) {
  await requireAdmin();
  await db.teacher.delete({ where: { id: formValue(formData, "id") } });
  revalidatePath("/admin/teachers");
  revalidatePath("/admin/staff");
  revalidatePath("/departments");
}

const eventSchema = z.object({
  id: optionalText,
  title: z.string().trim().min(2),
  description: emptyToNull,
  type: z.string().trim().min(1).default("GENERAL"),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  location: emptyToNull,
  isHighlight: z.boolean().default(false),
});

export async function saveEvent(formData: FormData) {
  await requireAdmin();
  const parsed = eventSchema.safeParse({
    id: formValue(formData, "id"),
    title: formValue(formData, "title"),
    description: formValue(formData, "description"),
    type: formValue(formData, "type") || "GENERAL",
    startDate: formValue(formData, "startDate"),
    endDate: formValue(formData, "endDate") || formValue(formData, "startDate"),
    location: formValue(formData, "location"),
    isHighlight: formData.get("isHighlight") === "on",
  });

  if (!parsed.success) throw new Error("กรุณากรอกข้อมูลกิจกรรมและวันที่ให้ถูกต้อง");

  const id = parsed.data.id;
  const data = {
    title: parsed.data.title,
    description: parsed.data.description,
    type: parsed.data.type,
    startDate: parsed.data.startDate,
    endDate: parsed.data.endDate,
    location: parsed.data.location,
    isHighlight: parsed.data.isHighlight,
  };

  if (id) await db.event.update({ where: { id }, data });
  else await db.event.create({ data });

  revalidatePath("/admin/events");
  revalidatePath("/events");
}

export async function deleteEvent(formData: FormData) {
  await requireAdmin();
  await db.event.delete({ where: { id: formValue(formData, "id") } });
  revalidatePath("/admin/events");
  revalidatePath("/events");
}

const albumSchema = z.object({
  id: optionalText,
  departmentId: emptyToNull,
  title: z.string().trim().min(2),
  description: emptyToNull,
  coverImage: emptyToNull,
  date: z.coerce.date(),
});

export async function saveAlbum(formData: FormData) {
  await requireAdmin();
  const parsed = albumSchema.safeParse({
    id: formValue(formData, "id"),
    departmentId: formValue(formData, "departmentId"),
    title: formValue(formData, "title"),
    description: formValue(formData, "description"),
    coverImage: formValue(formData, "coverImage"),
    date: formValue(formData, "date") || new Date().toISOString().slice(0, 10),
  });

  if (!parsed.success) throw new Error("กรุณากรอกข้อมูลอัลบั้มให้ถูกต้อง");

  const id = parsed.data.id;
  const data = {
    departmentId: parsed.data.departmentId,
    title: parsed.data.title,
    description: parsed.data.description,
    coverImage: parsed.data.coverImage,
    date: parsed.data.date,
  };

  if (id) await db.album.update({ where: { id }, data });
  else await db.album.create({ data });

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function deleteAlbum(formData: FormData) {
  await requireAdmin();
  await db.album.delete({ where: { id: formValue(formData, "id") } });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

const photoSchema = z.object({
  albumId: z.string().trim().min(1),
  url: z.string().trim().url(),
  caption: emptyToNull,
  order: z.coerce.number().int().default(0),
});

export async function addPhoto(formData: FormData) {
  await requireAdmin();
  const parsed = photoSchema.safeParse({
    albumId: formValue(formData, "albumId"),
    url: formValue(formData, "url"),
    caption: formValue(formData, "caption"),
    order: formValue(formData, "order") || "0",
  });

  if (!parsed.success) throw new Error("กรุณาอัปโหลดรูปหรือใส่ URL รูปให้ถูกต้อง");

  await db.photo.create({ data: parsed.data });
  await db.album.update({
    where: { id: parsed.data.albumId },
    data: { coverImage: parsed.data.url },
  });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function deletePhoto(formData: FormData) {
  await requireAdmin();
  await db.photo.delete({ where: { id: formValue(formData, "id") } });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

const admissionStatusSchema = z.object({
  id: z.string().trim().min(1),
  status: z.enum(["PENDING", "CONTACTED", "APPROVED", "REJECTED"]),
  note: emptyToNull,
});

export async function updateAdmissionStatus(formData: FormData) {
  await requireAdmin();
  const parsed = admissionStatusSchema.safeParse({
    id: formValue(formData, "id"),
    status: formValue(formData, "status"),
    note: formValue(formData, "note"),
  });

  if (!parsed.success) throw new Error("กรุณาเลือกสถานะใบสมัครให้ถูกต้อง");

  await db.admission.update({
    where: { id: parsed.data.id },
    data: { status: parsed.data.status, note: parsed.data.note },
  });
  revalidatePath("/admin/admissions");
}

const settingKeys = [
  "college.name",
  "college.address",
  "college.phone",
  "college.email",
  "college.facebook",
  "college.line",
  "college.youtube",
  "college.website",
  "geofence.lat",
  "geofence.lng",
  "geofence.radius",
];

export async function saveAdminSettings(formData: FormData) {
  await requireAdmin();
  for (const key of settingKeys) {
    await db.setting.upsert({
      where: { key },
      update: { value: formValue(formData, key) },
      create: { key, value: formValue(formData, key) },
    });
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/contact");
  return result("บันทึกการตั้งค่าเรียบร้อยแล้ว");
}
