import { db } from "@/lib/db";

export type DepartmentSummary = {
  id: string;
  name: string;
  englishName: string;
  slug: string;
  description: string;
  icon: string;
  logoPath: string;
  color: string;
  programLevels: string[];
  careerPaths: string;
  category: DepartmentCategory;
  teacherCount: number;
  studentCount: number;
};

export type DepartmentLevel = "ปวช." | "ปวส." | "ป.ตรี";
export type DepartmentCategory = "อุตสาหกรรม" | "พาณิชยกรรม" | "บริการ";
export type DocumentLevel = "ทั่วไป" | DepartmentLevel;
export type DocumentVisibility = "main" | "microsite" | "both";
export type DepartmentDocumentCategory =
  | "หลักสูตร"
  | "แผนการเรียน"
  | "รายวิชา"
  | "สมัครเรียน"
  | "แบบฟอร์ม"
  | "ตารางเรียน"
  | "กิจกรรม"
  | "คู่มือ"
  | "อื่น ๆ";

export type DepartmentDocument = {
  id: string;
  title: string;
  description?: string;
  category: DepartmentDocumentCategory;
  level?: DocumentLevel;
  type: "PDF";
  fileUrl?: string;
  visibility: DocumentVisibility;
  updatedAt?: string;
};

export type DepartmentProgram = {
  slug: string;
  level: string;
  name: string;
  duration?: string;
  description: string;
  highlights?: string[];
  pdfUrl?: string;
  studyPlanPdfUrl?: string;
  courseListPdfUrl?: string;
  pdfDocumentId?: string;
  studyPlanDocumentId?: string;
  href: string;
};

export type DepartmentContact = {
  phone?: string;
  email?: string;
  room?: string;
  location?: string;
  facebookUrl?: string;
  websiteUrl?: string;
};

export type Career = {
  title: string;
  description?: string;
};

export type Facility = {
  title: string;
  description?: string;
  image?: string;
};

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  image?: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type DepartmentDetail = DepartmentSummary & {
  headline: string;
  websiteLabel: string;
  websiteUrl: string;
  admissionUrl: string;
  category: DepartmentCategory;
  heroImage: string;
  documents: DepartmentDocument[];
  programs: DepartmentProgram[];
  careers: Career[];
  facilityCards: Facility[];
  facilities: string[];
  services: string[];
  achievements: string[];
  contact: DepartmentContact;
  staff: StaffMember[];
  faqs: FAQ[];
  teachers: {
    id: string;
    name: string;
    subject: string;
    email: string;
    photo?: string;
  }[];
};

export type CourseLevel = {
  slug: string;
  shortName: string;
  title: string;
  audience: string;
  description: string;
};

export type NewsItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  content?: string;
};

export type EventItem = {
  id: string;
  title: string;
  date: string;
  fullDate?: string;
  endDate?: string;
  location: string;
  type: string;
  description?: string;
  isHighlight?: boolean;
};

export type GalleryImage = {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
};

export type ContactContent = {
  address: string;
  phone: string;
  fax: string;
  email: string;
  officeHours: string;
  mapEmbedUrl: string;
  channels: {
    label: string;
    value: string;
    href?: string;
  }[];
};

export type AboutContent = {
  overview: string[];
  identity: {
    label: string;
    value: string;
  }[];
  timeline: {
    year: string;
    title: string;
    description: string;
  }[];
  administrators: {
    id: string;
    name: string;
    role: string;
    responsibility: string;
    photo?: string;
  }[];
};

type DepartmentCatalogItem = {
  name: string;
  englishName: string;
  slug: string;
  description: string;
  headline: string;
  icon: string;
  logoPath: string;
  color: string;
  courseSlugs: string[];
  careerPaths: string;
  category: DepartmentCategory;
  careers?: Career[];
  heroImage: string;
  teacherCount: number;
  studentCount: number;
  facilities: string[];
  services: string[];
  achievements: string[];
};

export const courseLevels: CourseLevel[] = [
  {
    slug: "vocational-certificate",
    shortName: "ปวช.",
    title: "หลักสูตรประกาศนียบัตรวิชาชีพ",
    audience: "Vocational Certificate / Vocational High School",
    description: "สำหรับผู้เรียนระดับมัธยมต้นที่ต้องการเริ่มสายอาชีพ เรียนพื้นฐานวิชาชีพและฝึกปฏิบัติในแผนกที่เลือก",
  },
  {
    slug: "vocational-diploma",
    shortName: "ปวส.",
    title: "หลักสูตรประกาศนียบัตรวิชาชีพชั้นสูง",
    audience: "Vocational Diploma / Vocational College",
    description: "สำหรับต่อยอดทักษะอาชีวะเชิงลึก เน้นงานจริง โครงงาน และความพร้อมสำหรับสถานประกอบการ",
  },
  {
    slug: "bachelor-technology",
    shortName: "ป.ตรี",
    title: "ปริญญาตรีเทคโนโลยีบัณฑิต (ทล.บ.)",
    audience: "Bachelor's Degree in Technology or Practical Fields",
    description: "สำหรับผู้เรียนที่ต้องการต่อยอดสู่งานเทคโนโลยี งานปฏิบัติการ และการจัดการงานอาชีพในระดับสูงขึ้น",
  },
];

const departmentCatalog: DepartmentCatalogItem[] = [
  {
    name: "แผนกช่างยนต์",
    englishName: "Automotive",
    slug: "automotive",
    description: "เรียนรู้ระบบเครื่องยนต์ ระบบส่งกำลัง ไฟฟ้ายานยนต์ การตรวจซ่อม และงานบริการยานยนต์สมัยใหม่",
    headline: "ฝึกงานยานยนต์จากเครื่องยนต์พื้นฐานสู่ระบบไฟฟ้าและบริการมาตรฐานศูนย์ซ่อม",
    icon: "wrench",
    logoPath: "/logo/a-lptc.png",
    color: "#D97706",
    courseSlugs: ["vocational-certificate", "vocational-diploma", "bachelor-technology"],
    careerPaths: "งานซ่อมบำรุง, งานบริการยานยนต์, งานศูนย์ซ่อม",
    category: "อุตสาหกรรม",
    heroImage: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1800&q=85",
    teacherCount: 6,
    studentCount: 410,
    facilities: ["โรงฝึกงานช่างยนต์", "ชุดฝึกระบบไฟฟ้ายานยนต์", "พื้นที่บริการตรวจสภาพรถ"],
    services: ["ตรวจเช็กรถเบื้องต้น", "อบรมการดูแลรถจักรยานยนต์", "สนับสนุนบริการชุมชนด้านยานยนต์"],
    achievements: ["กิจกรรมบริการตรวจสภาพรถก่อนเทศกาล", "ผลงานโครงงานยานยนต์ประหยัดพลังงาน"],
  },
  {
    name: "แผนกวิชายานยนต์ไฟฟ้า",
    englishName: "Electric Vehicle",
    slug: "electric-vehicle",
    description: "เรียนรู้ระบบยานยนต์ไฟฟ้า แบตเตอรี่ มอเตอร์ไฟฟ้า ระบบควบคุม และความปลอดภัยในงานบริการ EV",
    headline: "ต่อยอดทักษะช่างยนต์สู่ระบบขับเคลื่อนไฟฟ้าและงานบริการยานยนต์สมัยใหม่",
    icon: "battery-charging",
    logoPath: "/logo/ev-lptc.png",
    color: "#0891B2",
    courseSlugs: ["vocational-diploma"],
    careerPaths: "งานบริการ EV, งานระบบแบตเตอรี่, งานวิเคราะห์ระบบควบคุม",
    category: "อุตสาหกรรม",
    heroImage: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1800&q=85",
    teacherCount: 4,
    studentCount: 180,
    facilities: ["ชุดฝึกระบบยานยนต์ไฟฟ้า", "พื้นที่ตรวจสอบแบตเตอรี่และมอเตอร์", "เครื่องมือวิเคราะห์ระบบควบคุม EV"],
    services: ["อบรมความปลอดภัยงาน EV", "ตรวจเช็กระบบไฟฟ้ายานยนต์เบื้องต้น", "ให้คำปรึกษาโครงงานยานยนต์ไฟฟ้า"],
    achievements: ["โครงงานระบบขับเคลื่อนไฟฟ้าจำลอง", "กิจกรรมแนะแนวยานยนต์ไฟฟ้าสำหรับนักเรียน"],
  },
  {
    name: "แผนกช่างกลโรงงาน",
    englishName: "Machine Shop",
    slug: "machine-shop",
    description: "ฝึกงานกลึง งานกัด งานเจาะ การอ่านแบบ การวัดละเอียด และการผลิตชิ้นงานด้วยเครื่องจักร",
    headline: "สร้างช่างผลิตชิ้นงานโลหะที่เข้าใจแบบ เครื่องมือวัด และกระบวนการผลิตในโรงงาน",
    icon: "factory",
    logoPath: "/logo/m-lptc.png",
    color: "#475569",
    courseSlugs: ["vocational-certificate", "vocational-diploma"],
    careerPaths: "งานเครื่องมือกล, งานผลิตชิ้นส่วน, งานควบคุมคุณภาพ",
    category: "อุตสาหกรรม",
    heroImage: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1800&q=85",
    teacherCount: 5,
    studentCount: 330,
    facilities: ["โรงฝึกงานเครื่องมือกล", "เครื่องกลึงและเครื่องกัด", "พื้นที่วัดละเอียดและตรวจสอบชิ้นงาน"],
    services: ["ผลิตชิ้นงานต้นแบบ", "ซ่อมแซมชิ้นส่วนโลหะเบื้องต้น", "อบรมอ่านแบบและเครื่องมือวัด"],
    achievements: ["โครงงานชิ้นส่วนเครื่องกล", "ผลงานฝึกทักษะงานเครื่องมือกล"],
  },
  {
    name: "แผนกช่างเชื่อมโลหะ",
    englishName: "Welding",
    slug: "welding",
    description: "เรียนรู้งานเชื่อมไฟฟ้า เชื่อมแก๊ส เชื่อมอาร์กโลหะ งานโครงสร้าง และความปลอดภัยในงานเชื่อม",
    headline: "พัฒนาทักษะงานเชื่อมและประกอบโลหะสำหรับงานโครงสร้างและอุตสาหกรรม",
    icon: "flame",
    logoPath: "/logo/w-lptc.png",
    color: "#DC2626",
    courseSlugs: ["vocational-certificate", "vocational-diploma"],
    careerPaths: "งานเชื่อมโครงสร้าง, งานโลหะแผ่น, งานซ่อมบำรุงโลหะ",
    category: "อุตสาหกรรม",
    heroImage: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1800&q=85",
    teacherCount: 4,
    studentCount: 260,
    facilities: ["คูหาเชื่อมมาตรฐาน", "ชุดฝึกงานโลหะแผ่น", "พื้นที่ทดสอบแนวเชื่อม"],
    services: ["งานเชื่อมโครงสร้างเบื้องต้น", "อบรมความปลอดภัยงานเชื่อม", "สนับสนุนงานซ่อมบำรุงโลหะ"],
    achievements: ["ผลงานโครงสร้างโลหะจากนักศึกษา", "กิจกรรมบริการซ่อมงานโลหะในวิทยาลัย"],
  },
  {
    name: "แผนกช่างไฟฟ้ากำลัง",
    englishName: "Electric Power",
    slug: "electric-power",
    description: "เรียนรู้งานติดตั้งไฟฟ้า ระบบควบคุม มอเตอร์ โซลาร์เซลล์ และความปลอดภัยทางไฟฟ้า",
    headline: "ผลิตช่างไฟฟ้าที่เข้าใจระบบกำลัง ระบบควบคุม และพลังงานทดแทน",
    icon: "zap",
    logoPath: "/logo/e-lptc.png",
    color: "#CA8A04",
    courseSlugs: ["vocational-certificate", "vocational-diploma", "bachelor-technology"],
    careerPaths: "งานระบบไฟฟ้า, งานควบคุมมอเตอร์, งานพลังงานทดแทน",
    category: "อุตสาหกรรม",
    heroImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1800&q=85",
    teacherCount: 5,
    studentCount: 360,
    facilities: ["ห้องฝึกติดตั้งไฟฟ้า", "ชุดฝึกมอเตอร์และระบบควบคุม", "ชุดฝึกพลังงานแสงอาทิตย์"],
    services: ["ตรวจระบบไฟฟ้าเบื้องต้น", "อบรมความปลอดภัยทางไฟฟ้า", "สนับสนุนงานไฟฟ้ากิจกรรมวิทยาลัย"],
    achievements: ["โครงงานแผงควบคุมมอเตอร์", "กิจกรรมบริการวิชาชีพด้านไฟฟ้าในชุมชน"],
  },
  {
    name: "แผนกวิชาช่างอิเล็กทรอนิกส์",
    englishName: "Electronics",
    slug: "electronics",
    description: "เรียนรู้วงจร ระบบควบคุม ไมโครคอนโทรลเลอร์ หุ่นยนต์ และงานซ่อมบำรุงอุปกรณ์อิเล็กทรอนิกส์",
    headline: "ต่อยอดวงจรควบคุมและหุ่นยนต์สู่การซ่อมบำรุงและระบบอัตโนมัติ",
    icon: "cpu",
    logoPath: "/logo/e-lptc.png",
    color: "#7C3AED",
    courseSlugs: ["vocational-certificate", "vocational-diploma"],
    careerPaths: "งานซ่อมอิเล็กทรอนิกส์, งานระบบควบคุม, งานหุ่นยนต์",
    category: "อุตสาหกรรม",
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=85",
    teacherCount: 5,
    studentCount: 280,
    facilities: ["ห้องวงจรอิเล็กทรอนิกส์", "ชุดฝึกไมโครคอนโทรลเลอร์", "พื้นที่ทดลองหุ่นยนต์และระบบควบคุม"],
    services: ["ซ่อมบำรุงอุปกรณ์อิเล็กทรอนิกส์เบื้องต้น", "อบรม IoT สำหรับนักเรียน", "สนับสนุนงานแข่งขันหุ่นยนต์"],
    achievements: ["ผลงานหุ่นยนต์เดินตามเส้น", "โครงงานระบบตรวจวัดสภาพแวดล้อมด้วย IoT"],
  },
  {
    name: "แผนกวิชาช่างก่อสร้าง",
    englishName: "Construction",
    slug: "construction",
    description: "ฝึกงานก่อสร้าง วัสดุ การประมาณราคา งานเขียนแบบ และการควบคุมคุณภาพงานก่อสร้าง",
    headline: "เรียนรู้งานก่อสร้างจากแบบ วัสดุ และหน้างานจำลองเพื่อพร้อมทำงานจริง",
    icon: "hammer",
    logoPath: "/logo/b-lptc.png",
    color: "#92400E",
    courseSlugs: ["vocational-certificate", "vocational-diploma"],
    careerPaths: "งานก่อสร้าง, งานประมาณราคา, งานควบคุมหน้างาน",
    category: "อุตสาหกรรม",
    heroImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=85",
    teacherCount: 4,
    studentCount: 230,
    facilities: ["พื้นที่ฝึกงานก่อสร้าง", "ห้องเขียนแบบ", "ชุดฝึกวัสดุและทดสอบงานก่อสร้าง"],
    services: ["ให้คำปรึกษางานประมาณราคา", "สนับสนุนงานซ่อมแซมอาคารเบื้องต้น", "อบรมอ่านแบบก่อสร้าง"],
    achievements: ["โครงงานแบบบ้านพักอาศัย", "กิจกรรมบริการซ่อมแซมพื้นที่สาธารณะ"],
  },
  {
    name: "แผนกวิชาช่างโยธา",
    englishName: "Civil",
    slug: "civil",
    description: "เรียนรู้งานสำรวจ งานโครงสร้าง วัสดุโยธา การเขียนแบบ และการควบคุมงานก่อสร้างโยธา",
    headline: "วางรากฐานงานโยธาและงานสำรวจสำหรับโครงสร้างพื้นฐานในชุมชนและอุตสาหกรรม",
    icon: "hard-hat",
    logoPath: "/logo/cv-lptc.png",
    color: "#0F766E",
    courseSlugs: ["vocational-certificate", "vocational-diploma"],
    careerPaths: "งานสำรวจ, งานโครงสร้าง, งานควบคุมงานโยธา",
    category: "อุตสาหกรรม",
    heroImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=85",
    teacherCount: 4,
    studentCount: 220,
    facilities: ["ชุดฝึกงานสำรวจ", "ห้องปฏิบัติการวัสดุโยธา", "ห้องเขียนแบบโครงสร้าง"],
    services: ["สำรวจพื้นที่เบื้องต้น", "อบรมการใช้เครื่องมือสำรวจ", "ให้คำปรึกษางานโครงสร้างพื้นฐาน"],
    achievements: ["โครงงานงานสำรวจพื้นที่", "ผลงานแบบโครงสร้างจากนักศึกษา"],
  },
  {
    name: "แผนกวิชาสถาปัตยกรรม",
    englishName: "Architecture",
    slug: "architecture",
    description: "เรียนรู้งานออกแบบสถาปัตยกรรม เขียนแบบ สร้างแบบจำลอง วัสดุอาคาร และการนำเสนอผลงานออกแบบ",
    headline: "พัฒนาทักษะการออกแบบ เขียนแบบ และสื่อสารงานสถาปัตยกรรมสำหรับงานอาคารจริง",
    icon: "drafting-compass",
    logoPath: "/logo/arc-lptc.png",
    color: "#1E3A5F",
    courseSlugs: ["vocational-certificate", "vocational-diploma"],
    careerPaths: "งานเขียนแบบ, งานออกแบบอาคาร, งานนำเสนอแบบจำลอง",
    category: "บริการ",
    heroImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=85",
    teacherCount: 4,
    studentCount: 210,
    facilities: ["ห้องเขียนแบบสถาปัตยกรรม", "พื้นที่ทำโมเดล", "สื่อดิจิทัลสำหรับนำเสนองานออกแบบ"],
    services: ["ให้คำปรึกษางานเขียนแบบ", "สนับสนุนการทำโมเดลอาคาร", "อบรมพื้นฐานการนำเสนองานออกแบบ"],
    achievements: ["ผลงานแบบบ้านและอาคารจากนักศึกษา", "กิจกรรมประกวดโมเดลสถาปัตยกรรม"],
  },
  {
    name: "แผนกวิชาเมคคาทรอนิกส์",
    englishName: "Mechatronics",
    slug: "mechatronics",
    description: "บูรณาการเครื่องกล ไฟฟ้า อิเล็กทรอนิกส์ ระบบควบคุม หุ่นยนต์ และระบบอัตโนมัติ",
    headline: "สร้างนักเทคนิคที่เชื่อมเครื่องกล ไฟฟ้า และระบบควบคุมเข้ากับหุ่นยนต์อุตสาหกรรม",
    icon: "bot",
    logoPath: "/logo/mn-lptc.png",
    color: "#4338CA",
    courseSlugs: ["vocational-diploma", "bachelor-technology"],
    careerPaths: "งานระบบอัตโนมัติ, งาน PLC, งานหุ่นยนต์อุตสาหกรรม",
    category: "อุตสาหกรรม",
    heroImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1800&q=85",
    teacherCount: 5,
    studentCount: 240,
    facilities: ["ห้องระบบอัตโนมัติ", "ชุดฝึก PLC และเซนเซอร์", "พื้นที่ทดลองหุ่นยนต์อุตสาหกรรม"],
    services: ["อบรมระบบควบคุมเบื้องต้น", "สนับสนุนโครงงานหุ่นยนต์", "ให้คำปรึกษาระบบอัตโนมัติขนาดเล็ก"],
    achievements: ["โครงงานแขนกลจำลอง", "ผลงานระบบลำเลียงอัตโนมัติ"],
  },
  {
    name: "แผนกวิชาเทคโนโลยีสารสนเทศ",
    englishName: "Information Technology",
    slug: "it",
    description: "พัฒนาทักษะซอฟต์แวร์ เครือข่าย ระบบคลาวด์ และการดูแลระบบดิจิทัลสำหรับงานอาชีพ",
    headline: "แผนกที่สร้างนักพัฒนาระบบและผู้ดูแลโครงสร้างพื้นฐานดิจิทัลขององค์กร",
    icon: "monitor",
    logoPath: "/logo/it-lptc.png",
    color: "#1D4ED8",
    courseSlugs: ["vocational-certificate", "vocational-diploma", "bachelor-technology"],
    careerPaths: "งานพัฒนาเว็บ, งานเครือข่าย, งานระบบสารสนเทศ",
    category: "พาณิชยกรรม",
    heroImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1800&q=85",
    teacherCount: 4,
    studentCount: 320,
    facilities: ["ห้องปฏิบัติการเครือข่าย", "ห้องพัฒนาเว็บแอป", "ชุดอุปกรณ์เซิร์ฟเวอร์และคลาวด์จำลอง"],
    services: ["ให้คำปรึกษาโครงงานดิจิทัล", "อบรมพื้นฐานเว็บไซต์", "ดูแลระบบกิจกรรมด้าน IT ของวิทยาลัย"],
    achievements: ["รางวัลทักษะเขียนโปรแกรมระดับอาชีวศึกษาจังหวัด", "โครงงานระบบเช็คชื่อและ dashboard สำหรับงานกิจการนักศึกษา"],
  },
];

export function getCourseLevelBySlug(slug: string) {
  return courseLevels.find((level) => level.slug === slug) ?? null;
}

export function getCatalogDepartmentBySlug(slug: string) {
  return departmentCatalog.find((department) => department.slug === slug) ?? null;
}

export function getCatalogDepartmentsForCourseLevel(levelSlug: string) {
  return departmentCatalog.filter((department) => department.courseSlugs.includes(levelSlug));
}

export const applicantDocuments: DepartmentDocument[] = [
  {
    id: "applicant-admission-rules",
    title: "ระเบียบการรับสมัครนักศึกษา.pdf",
    description: "รายละเอียดรอบรับสมัคร คุณสมบัติ และขั้นตอนการสมัคร",
    category: "สมัครเรียน",
    level: "ทั่วไป",
    type: "PDF",
    visibility: "main",
  },
  {
    id: "applicant-course-guide",
    title: "คู่มือหลักสูตรที่เปิดสอน.pdf",
    description: "ภาพรวมหลักสูตรและแผนกวิชาที่เปิดรับสมัคร",
    category: "หลักสูตร",
    level: "ทั่วไป",
    type: "PDF",
    visibility: "main",
  },
  {
    id: "applicant-documents",
    title: "เอกสารประกอบการสมัคร.pdf",
    description: "รายการเอกสารที่ผู้สมัครควรเตรียมก่อนยื่นสมัคร",
    category: "สมัครเรียน",
    level: "ทั่วไป",
    type: "PDF",
    visibility: "main",
  },
  {
    id: "applicant-calendar",
    title: "ปฏิทินการรับสมัคร.pdf",
    description: "กำหนดการรับสมัคร รายงานตัว และประกาศผล",
    category: "สมัครเรียน",
    level: "ทั่วไป",
    type: "PDF",
    visibility: "main",
  },
  {
    id: "applicant-fees",
    title: "ค่าใช้จ่าย / ค่าธรรมเนียม.pdf",
    description: "ข้อมูลค่าใช้จ่ายเบื้องต้นและรายการชำระเงินที่เกี่ยวข้อง",
    category: "สมัครเรียน",
    level: "ทั่วไป",
    type: "PDF",
    visibility: "main",
  },
];

function buildProgramLevels(courseSlugs: string[]) {
  return courseLevels.filter((course) => courseSlugs.includes(course.slug)).map((course) => course.shortName);
}

function buildPrograms(department: DepartmentCatalogItem): DepartmentProgram[] {
  return courseLevels.filter((course) => department.courseSlugs.includes(course.slug)).map((course) => ({
    slug: course.slug,
    level: course.shortName,
    name: course.title,
    duration: course.shortName === "ปวช." ? "3 ปี" : course.shortName === "ปวส." ? "2 ปี" : "ตามโครงสร้างหลักสูตร",
    description: `${course.title} ของ${department.name} เน้นการเรียนรู้จากงานจริง การฝึกปฏิบัติ และการต่อยอดทักษะสู่สถานประกอบการ`,
    highlights: ["ฝึกปฏิบัติในรายวิชาหลัก", "ทำโครงงานตามสาขา", "เตรียมความพร้อมก่อนฝึกงาน"],
    href: `/courses/${course.slug}`,
  }));
}

function buildDepartmentDocuments(department: DepartmentCatalogItem): DepartmentDocument[] {
  return [
    {
      id: `${department.slug}-intro`,
      title: "เอกสารแนะนำแผนก",
      description: `ภาพรวมการเรียน จุดเด่น และช่องทางติดต่อของ${department.name}`,
      category: "อื่น ๆ",
      level: "ทั่วไป",
      type: "PDF",
      visibility: "both",
    },
    ...buildProgramLevels(department.courseSlugs).map((level) => ({
      id: `${department.slug}-program-${level}`,
      title: `หลักสูตร ${level}`,
      description: `เอกสารหลักสูตรระดับ ${level} ของ${department.name}`,
      category: "หลักสูตร" as const,
      level: level as DepartmentLevel,
      type: "PDF" as const,
      visibility: "main" as const,
    })),
    {
      id: `${department.slug}-study-plan`,
      title: "แผนการเรียน",
      description: "โครงสร้างรายวิชาและลำดับการเรียนในแต่ละระดับ",
      category: "แผนการเรียน",
      level: "ทั่วไป",
      type: "PDF",
      visibility: "main",
    },
    {
      id: `${department.slug}-course-list`,
      title: "รายวิชา",
      description: "รายละเอียดรายวิชาหลักและรายวิชาชีพของแผนก",
      category: "รายวิชา",
      level: "ทั่วไป",
      type: "PDF",
      visibility: "main",
    },
    {
      id: `${department.slug}-leave-form`,
      title: "แบบฟอร์มใบลา",
      description: "แบบฟอร์มสำหรับงานกิจกรรมและงานดูแลผู้เรียนภายในแผนก",
      category: "แบบฟอร์ม",
      level: "ทั่วไป",
      type: "PDF",
      fileUrl: "/docs/เอกสารใบลา.pdf",
      visibility: "microsite",
    },
    {
      id: `${department.slug}-activity-form`,
      title: "แบบฟอร์มกิจกรรม",
      description: "เอกสารภายในสำหรับการเข้าร่วมและเช็คชื่อกิจกรรมของแผนก",
      category: "กิจกรรม",
      level: "ทั่วไป",
      type: "PDF",
      visibility: "microsite",
    },
    {
      id: `${department.slug}-internal-guide`,
      title: "คู่มือระบบภายในแผนก",
      description: "คู่มือการใช้งานระบบและช่องทางบริการภายในแผนก",
      category: "คู่มือ",
      level: "ทั่วไป",
      type: "PDF",
      visibility: "microsite",
    },
  ];
}

function buildCareers(department: DepartmentCatalogItem): Career[] {
  if (department.careers?.length) return department.careers;
  return department.careerPaths.split(",").map((career) => ({ title: career.trim() })).filter((career) => career.title);
}

function buildFacilityCards(department: DepartmentCatalogItem): Facility[] {
  return department.facilities.map((facility) => ({
    title: facility,
    description: `พื้นที่สนับสนุนการฝึกทักษะและการทำโครงงานของ${department.name}`,
  }));
}

function buildFaqs(department: DepartmentCatalogItem): FAQ[] {
  return [
    {
      question: "แผนกนี้เหมาะกับใคร?",
      answer: `เหมาะกับผู้เรียนที่สนใจ${department.description} และต้องการฝึกทักษะสายอาชีพจากงานจริง`,
    },
    {
      question: "เรียนเน้นทฤษฎีหรือปฏิบัติ?",
      answer: "การเรียนมีทั้งพื้นฐานทฤษฎีและการฝึกปฏิบัติในห้องปฏิบัติการ โครงงาน และกิจกรรมตามมาตรฐานอาชีวศึกษา",
    },
    {
      question: "ต้องมีพื้นฐานมาก่อนไหม?",
      answer: "ผู้สมัครไม่จำเป็นต้องมีพื้นฐานเฉพาะทางมาก่อน แต่อยากเรียนรู้ ลงมือทำ และฝึกทักษะอย่างต่อเนื่อง",
    },
    {
      question: "สมัครเรียนต้องใช้เอกสารอะไร?",
      answer: "ให้ตรวจสอบเอกสารล่าสุดจากหน้ารับสมัครออนไลน์ของวิทยาลัย และเตรียมเอกสารประจำตัวตามประกาศรับสมัคร",
    },
    {
      question: "จบแล้วทำงานอะไรได้บ้าง?",
      answer: `สามารถต่อยอดสู่งานที่เกี่ยวข้อง เช่น ${department.careerPaths}`,
    },
  ];
}

function buildFallbackDepartment(department: DepartmentCatalogItem, index: number): DepartmentDetail {
  return {
    id: `dept-${department.slug}`,
    name: department.name,
    englishName: department.englishName,
    slug: department.slug,
    description: department.description,
    headline: department.headline,
    websiteLabel: `เข้าสู่เว็บไซต์${department.name}`,
    websiteUrl: `/departments/${department.slug}/site`,
    admissionUrl: "/admissions",
    category: department.category,
    heroImage: department.heroImage,
    icon: department.icon,
    logoPath: department.logoPath,
    color: department.color,
    programLevels: buildProgramLevels(department.courseSlugs),
    careerPaths: department.careerPaths,
    teacherCount: department.teacherCount,
    studentCount: department.studentCount,
    documents: buildDepartmentDocuments(department),
    programs: buildPrograms(department),
    careers: buildCareers(department),
    facilityCards: buildFacilityCards(department),
    facilities: department.facilities,
    services: department.services,
    achievements: department.achievements,
    contact: {
      phone: `054-222-222 ต่อ ${120 + index * 10}`,
      email: undefined,
      room: department.name,
      location: department.name,
      websiteUrl: `/departments/${department.slug}/site`,
    },
    staff: [],
    faqs: buildFaqs(department),
    teachers: [
      {
        id: `${department.slug}-teacher-1`,
        name: `ครูประจำ${department.name}`,
        subject: `รายวิชาหลักของ${department.name}`,
        email: "",
      },
    ],
  };
}

const fallbackDepartments = departmentCatalog.map(buildFallbackDepartment);

const fallbackNews: NewsItem[] = [
  {
    id: "news-1",
    title: "เปิดรับสมัครนักศึกษาใหม่ ปีการศึกษา 2569",
    slug: "admission-2569",
    excerpt: "สมัครเรียนระดับ ปวช. และ ปวส. ผ่านระบบออนไลน์ พร้อมติดตามประกาศรอบคัดเลือก",
    category: "รับสมัคร",
    date: "1 มิถุนายน 2569",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
    content:
      "วิทยาลัยเทคนิคลำปางเปิดรับสมัครนักศึกษาใหม่ ปีการศึกษา 2569 ในระดับประกาศนียบัตรวิชาชีพและประกาศนียบัตรวิชาชีพชั้นสูง ผู้สนใจสามารถติดตามรายละเอียดรอบรับสมัคร เอกสารที่ต้องเตรียม และประกาศผลผ่านหน้าเว็บรับสมัครของวิทยาลัย\n\nการสมัครเน้นให้ผู้เรียนเลือกแผนกวิชาที่สอดคล้องกับความถนัด พร้อมศึกษาข้อมูลหลักสูตรและช่องทางติดต่อของแต่ละแผนกก่อนยืนยันการสมัคร",
  },
  {
    id: "news-2",
    title: "นักศึกษา LPTC คว้ารางวัลทักษะวิชาชีพระดับภาค",
    slug: "vocational-award",
    excerpt: "ตัวแทนนักศึกษาแสดงศักยภาพด้านเทคโนโลยีและงานช่างในการแข่งขันทักษะวิชาชีพ",
    category: "ผลงานนักศึกษา",
    date: "28 พฤษภาคม 2569",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
    content:
      "ตัวแทนนักศึกษาวิทยาลัยเทคนิคลำปางเข้าร่วมการแข่งขันทักษะวิชาชีพระดับภาค และแสดงความสามารถด้านเทคโนโลยี งานช่าง และการแก้ปัญหาจากสถานการณ์จริง\n\nผลงานครั้งนี้สะท้อนการเรียนรู้แบบลงมือปฏิบัติของนักศึกษา รวมถึงการสนับสนุนจากครูผู้สอน แผนกวิชา และเครือข่ายสถานประกอบการ",
  },
  {
    id: "news-3",
    title: "กำหนดการปฐมนิเทศนักศึกษาใหม่",
    slug: "orientation-2569",
    excerpt: "แจ้งกำหนดการ เอกสารที่ต้องเตรียม และช่องทางติดต่อครูที่ปรึกษาสำหรับนักศึกษาใหม่",
    category: "กิจกรรม",
    date: "25 พฤษภาคม 2569",
    image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=900&q=80",
    content:
      "วิทยาลัยแจ้งกำหนดการปฐมนิเทศนักศึกษาใหม่ เพื่อเตรียมความพร้อมก่อนเปิดภาคเรียน ทั้งด้านระเบียบการเรียน การใช้งานระบบนักศึกษา และการพบครูที่ปรึกษาประจำแผนก\n\nนักศึกษาใหม่ควรเตรียมเอกสารประจำตัว ตรวจสอบรายชื่อและแผนกวิชาของตนเอง และติดตามประกาศเพิ่มเติมจากช่องทางประชาสัมพันธ์ของวิทยาลัย",
  },
];

const fallbackEvents: EventItem[] = [
  {
    id: "event-1",
    title: "ปฐมนิเทศนักศึกษาใหม่",
    date: "5 มิ.ย.",
    fullDate: "5 มิถุนายน 2569",
    location: "หอประชุมวิทยาลัย",
    type: "กิจกรรม",
    description: "แนะนำระบบการเรียน การใช้บริการนักศึกษา และพบครูที่ปรึกษาประจำแผนก",
    isHighlight: true,
  },
  {
    id: "event-2",
    title: "เปิดภาคเรียนที่ 1/2569",
    date: "10 มิ.ย.",
    fullDate: "10 มิถุนายน 2569",
    location: "ทุกแผนกวิชา",
    type: "วิชาการ",
    description: "เริ่มการเรียนการสอนภาคเรียนที่ 1 และตรวจสอบตารางเรียนกับครูที่ปรึกษา",
  },
  {
    id: "event-3",
    title: "ประชุมผู้ปกครอง",
    date: "15 มิ.ย.",
    fullDate: "15 มิถุนายน 2569",
    location: "อาคารอำนวยการ",
    type: "ผู้ปกครอง",
    description: "ชี้แจงแนวทางดูแลนักศึกษา การติดต่อครูที่ปรึกษา และการติดตามข้อมูลผ่านระบบ",
  },
  {
    id: "event-4",
    title: "กิจกรรมบริการวิชาชีพ",
    date: "22 มิ.ย.",
    fullDate: "22 มิถุนายน 2569",
    location: "ลานกิจกรรมวิทยาลัย",
    type: "บริการชุมชน",
    description: "เปิดพื้นที่ให้นักศึกษานำทักษะวิชาชีพให้บริการและเรียนรู้จากงานจริง",
  },
];

const fallbackGallery: GalleryImage[] = [
  {
    id: "gallery-1",
    title: "บรรยากาศวิทยาลัยเทคนิคลำปาง",
    description: "ภาพพื้นที่หลักของวิทยาลัยสำหรับประชาสัมพันธ์และแนะนำสถานศึกษา",
    image: "/banner&other/Untitled-1.jpg",
    date: "1 มิถุนายน 2569",
    category: "วิทยาลัย",
  },
  {
    id: "gallery-2",
    title: "กิจกรรมแนะแนวหลักสูตรอาชีวศึกษา",
    description: "กิจกรรมแนะนำเส้นทางเรียนต่อสำหรับผู้สมัครและผู้ปกครอง",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=85",
    date: "1 มิถุนายน 2569",
    category: "แนะแนว",
  },
  {
    id: "gallery-3",
    title: "การเรียนรู้จากงานจริงในแผนกวิชา",
    description: "ภาพการฝึกปฏิบัติและการทำโครงงานในพื้นที่การเรียนรู้ของแผนก",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=85",
    date: "28 พฤษภาคม 2569",
    category: "ทักษะวิชาชีพ",
  },
  {
    id: "gallery-4",
    title: "กิจกรรมปฐมนิเทศนักศึกษาใหม่",
    description: "กิจกรรมเตรียมความพร้อมก่อนเปิดภาคเรียนและพบครูที่ปรึกษา",
    image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=1400&q=85",
    date: "25 พฤษภาคม 2569",
    category: "กิจกรรมนักศึกษา",
  },
  {
    id: "gallery-5",
    title: "ห้องปฏิบัติการและพื้นที่ฝึกทักษะ",
    description: "พื้นที่เรียนรู้ที่สนับสนุนการฝึกปฏิบัติของผู้เรียนอาชีวศึกษา",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=85",
    date: "22 พฤษภาคม 2569",
    category: "แผนกวิชา",
  },
  {
    id: "gallery-6",
    title: "ผลงานและโครงงานนักศึกษา",
    description: "ผลงานจากการเรียนรู้แบบลงมือทำและการแก้ปัญหาจากสถานการณ์จริง",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=85",
    date: "20 พฤษภาคม 2569",
    category: "ผลงานนักศึกษา",
  },
];

const contactContent: ContactContent = {
  address: "15 ถนนท่าคราวน้อย ต.สบตุ๋ย อ.เมือง จ.ลำปาง 52100",
  phone: "0 5421 7106",
  fax: "0 5422 4426",
  email: "saraban@lampangtc.ac.th",
  officeHours: "วันจันทร์-วันศุกร์ เวลา 08.30-16.30 น.",
  mapEmbedUrl:
    "https://www.google.com/maps?q=%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B9%80%E0%B8%97%E0%B8%84%E0%B8%99%E0%B8%B4%E0%B8%84%E0%B8%A5%E0%B8%B3%E0%B8%9B%E0%B8%B2%E0%B8%87&output=embed",
  channels: [
    { label: "โทรศัพท์", value: "0 5421 7106", href: "tel:054217106" },
    { label: "โทรสาร", value: "0 5422 4426" },
    { label: "อีเมล", value: "saraban@lampangtc.ac.th", href: "mailto:saraban@lampangtc.ac.th" },
  ],
};

const aboutContent: AboutContent = {
  overview: [
    "วิทยาลัยเทคนิคลำปางเป็นสถานศึกษาอาชีวศึกษาที่มุ่งพัฒนาผู้เรียนให้มีทักษะวิชาชีพ คุณธรรม และความพร้อมในการทำงานจริง",
    "เว็บไซต์นี้รวบรวมข้อมูลหลักสูตร แผนกวิชา ข่าว กิจกรรม และช่องทางติดต่อ เพื่อให้ผู้สมัคร นักศึกษา ผู้ปกครอง บุคลากร และสถานประกอบการเข้าถึงข้อมูลสำคัญได้สะดวก",
  ],
  identity: [
    { label: "ชื่อสถานศึกษา", value: "วิทยาลัยเทคนิคลำปาง" },
    { label: "ชื่อภาษาอังกฤษ", value: "Lampang Technical College" },
    { label: "ที่อยู่", value: "15 ถนนท่าคราวน้อย ต.สบตุ๋ย อ.เมือง จ.ลำปาง 52100" },
    { label: "โทรศัพท์", value: "0 5421 7106" },
  ],
  timeline: [
    {
      year: "วันนี้",
      title: "ศูนย์กลางข้อมูลสาธารณะของวิทยาลัย",
      description: "พัฒนาเว็บไซต์ให้เป็นทางเข้าแผนก หลักสูตร ข่าว กิจกรรม และระบบนักศึกษาในที่เดียว",
    },
    {
      year: "ต่อเนื่อง",
      title: "เชื่อมการเรียนกับงานจริง",
      description: "เน้นการฝึกปฏิบัติ โครงงาน และความร่วมมือกับชุมชนและสถานประกอบการ",
    },
    {
      year: "เป้าหมาย",
      title: "ผู้เรียนพร้อมทำงานและเรียนต่อ",
      description: "สนับสนุนผู้เรียนให้มีทักษะวิชาชีพ ดิจิทัล และความรับผิดชอบต่อสังคม",
    },
  ],
  administrators: [
    {
      id: "admin-1",
      name: "ผู้อำนวยการวิทยาลัยเทคนิคลำปาง",
      role: "ผู้อำนวยการ",
      responsibility: "กำกับทิศทางการจัดการศึกษาและการพัฒนาวิทยาลัย",
    },
    {
      id: "admin-2",
      name: "รองผู้อำนวยการฝ่ายวิชาการ",
      role: "ฝ่ายวิชาการ",
      responsibility: "ดูแลหลักสูตร การเรียนการสอน และคุณภาพผู้เรียน",
    },
    {
      id: "admin-3",
      name: "รองผู้อำนวยการฝ่ายพัฒนากิจการนักเรียน นักศึกษา",
      role: "ฝ่ายพัฒนากิจการนักเรียน นักศึกษา",
      responsibility: "ดูแลกิจกรรมนักศึกษา วินัย สวัสดิการ และระบบดูแลช่วยเหลือ",
    },
    {
      id: "admin-4",
      name: "รองผู้อำนวยการฝ่ายบริหารทรัพยากร",
      role: "ฝ่ายบริหารทรัพยากร",
      responsibility: "ดูแลงานบริหารทั่วไป บุคลากร อาคารสถานที่ และทรัพยากรสนับสนุน",
    },
  ],
};

const genericDepartmentDetails = {
  headline: "แผนกวิชาที่พัฒนาทักษะอาชีพด้วยการเรียนรู้จากงานจริง",
  websiteLabel: "เข้าสู่เว็บไซต์แผนก",
  heroImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=85",
  englishName: "Lampang Technical College Department",
  logoPath: "/logo/lptclogo.png",
  facilities: ["ห้องปฏิบัติการประจำแผนก", "พื้นที่ฝึกทักษะวิชาชีพ", "อุปกรณ์ฝึกตามมาตรฐานอาชีวศึกษา"],
  services: ["ให้คำปรึกษาการเรียนต่อ", "สนับสนุนกิจกรรมทักษะวิชาชีพ", "ประสานงานฝึกงานและโครงงาน"],
  achievements: ["ผลงานโครงงานนักศึกษา", "กิจกรรมบริการวิชาชีพในวิทยาลัยและชุมชน"],
  contact: { phone: "054-222-222", email: "info@lampangtc.ac.th", room: "วิทยาลัยเทคนิคลำปาง" },
};

function thaiDate(date?: Date | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function thaiShortDate(date?: Date | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "short",
  }).format(date);
}

function toNewsItem(item: {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: Date | null;
  createdAt: Date;
  category: { name: string };
}): NewsItem {
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt ?? item.content.replace(/<[^>]*>/g, "").slice(0, 150),
    category: item.category.name,
    date: thaiDate(item.publishedAt ?? item.createdAt),
    image:
      item.coverImage ??
      "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=900&q=80",
    content: item.content,
  };
}

function toEventItem(event: {
  id: string;
  title: string;
  description: string | null;
  type: string;
  startDate: Date;
  endDate: Date;
  location: string | null;
  isHighlight: boolean;
}): EventItem {
  return {
    id: event.id,
    title: event.title,
    date: thaiShortDate(event.startDate),
    fullDate: thaiDate(event.startDate),
    endDate: thaiDate(event.endDate),
    location: event.location ?? "วิทยาลัยเทคนิคลำปาง",
    type: event.type,
    description: event.description ?? undefined,
    isHighlight: event.isHighlight,
  };
}

function toGalleryImage(album: {
  id: string;
  title: string;
  description: string | null;
  coverImage: string | null;
  date: Date;
  department: { name: string } | null;
  photos: { id: string; url: string; caption: string | null }[];
}): GalleryImage {
  const firstPhoto = album.photos[0];
  return {
    id: firstPhoto?.id ?? album.id,
    title: firstPhoto?.caption ?? album.title,
    description: album.description ?? "ภาพกิจกรรมของวิทยาลัยเทคนิคลำปาง",
    image: firstPhoto?.url ?? album.coverImage ?? "/banner&other/Untitled-1.jpg",
    date: thaiDate(album.date),
    category: album.department?.name ?? "ภาพกิจกรรม",
  };
}

export function getNewsCategories(news: NewsItem[] = fallbackNews) {
  return ["ทั้งหมด", ...Array.from(new Set(news.map((item) => item.category)))];
}

function getFallbackDepartment(slug: string) {
  return fallbackDepartments.find((department) => department.slug === slug);
}

function toDepartmentSummary(department: {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  _count: { teachers: number; students: number };
}): DepartmentSummary {
  const fallback = getFallbackDepartment(department.slug);
  const catalog = getCatalogDepartmentBySlug(department.slug);
  return {
    id: department.id,
    name: fallback?.name ?? department.name,
    englishName: fallback?.englishName ?? genericDepartmentDetails.englishName,
    slug: department.slug,
    description: department.description ?? fallback?.description ?? "",
    icon: department.icon ?? fallback?.icon ?? "book",
    logoPath: fallback?.logoPath ?? genericDepartmentDetails.logoPath,
    color: department.color ?? fallback?.color ?? "#1D4ED8",
    programLevels: fallback?.programLevels ?? buildProgramLevels(catalog?.courseSlugs ?? courseLevels.map((course) => course.slug)),
    careerPaths: fallback?.careerPaths ?? catalog?.careerPaths ?? "เส้นทางอาชีพตามสาขาที่เลือกและการฝึกปฏิบัติจริง",
    category: fallback?.category ?? catalog?.category ?? "อุตสาหกรรม",
    teacherCount: department._count.teachers || fallback?.teacherCount || 0,
    studentCount: department._count.students || fallback?.studentCount || 0,
  };
}

function mergeDepartments(dbDepartments: DepartmentSummary[]) {
  const slugs = new Set(dbDepartments.map((department) => department.slug));
  return [
    ...fallbackDepartments.filter((department) => !slugs.has(department.slug)),
    ...dbDepartments,
  ];
}

export async function getHomeContent() {
  try {
    const [departments, news, events, students, teachers, publishedNews] = await Promise.all([
      db.department.findMany({
        where: { isActive: true },
        orderBy: [{ order: "asc" }, { name: "asc" }],
        include: { _count: { select: { teachers: true, students: true } } },
        take: 16,
      }),
      db.news.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        include: { category: true },
        take: 3,
      }),
      db.event.findMany({
        orderBy: { startDate: "asc" },
        take: 4,
      }),
      db.student.count(),
      db.teacher.count(),
      db.news.count({ where: { status: "PUBLISHED" } }),
    ]);

    const departmentSummaries = departments.map(toDepartmentSummary);

    return {
      departments: mergeDepartments(departmentSummaries),
      news: news.length
        ? news.map(toNewsItem)
        : fallbackNews,
      events: events.length
        ? events.map(toEventItem)
        : fallbackEvents,
      stats: {
        students: students || 1870,
        departments: Math.max(departments.length, fallbackDepartments.length),
        teachers: teachers || 58,
        news: publishedNews || fallbackNews.length,
      },
    };
  } catch {
    return {
      departments: fallbackDepartments,
      news: fallbackNews,
      events: fallbackEvents,
      stats: {
        students: 1870,
        departments: fallbackDepartments.length,
        teachers: 58,
        news: fallbackNews.length,
      },
    };
  }
}

export async function getDepartments() {
  const content = await getHomeContent();
  return content.departments;
}

export async function getDepartmentsForCourseLevel(levelSlug: string) {
  const departments = await getDepartments();
  const allowedSlugs = new Set(getCatalogDepartmentsForCourseLevel(levelSlug).map((department) => department.slug));
  return departments.filter((department) => allowedSlugs.has(department.slug));
}

export async function getNewsList(category = "ทั้งหมด") {
  try {
    const news = await db.news.findMany({
      where: {
        status: "PUBLISHED",
        ...(category !== "ทั้งหมด" ? { category: { name: category } } : {}),
      },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      include: { category: true },
    });

    if (news.length) {
      return news.map(toNewsItem);
    }
  } catch {
    // Use curated public fallback content when the database is unavailable.
  }

  return category === "ทั้งหมด"
    ? fallbackNews
    : fallbackNews.filter((item) => item.category === category);
}

export async function getNewsBySlug(slug: string) {
  try {
    const news = await db.news.findUnique({
      where: { slug },
      include: { category: true },
    });

    if (news?.status === "PUBLISHED") {
      return toNewsItem(news);
    }
  } catch {
    // Use curated public fallback content when the database is unavailable.
  }

  return fallbackNews.find((item) => item.slug === slug) ?? null;
}

export async function getAllNewsCategories() {
  try {
    const categories = await db.newsCategory.findMany({
      where: { news: { some: { status: "PUBLISHED" } } },
      orderBy: { name: "asc" },
    });

    if (categories.length) {
      return ["ทั้งหมด", ...categories.map((category) => category.name)];
    }
  } catch {
    // Use curated public fallback content when the database is unavailable.
  }

  return getNewsCategories();
}

export async function getEvents() {
  try {
    const events = await db.event.findMany({
      orderBy: [{ startDate: "asc" }, { title: "asc" }],
    });

    if (events.length) {
      return events.map(toEventItem);
    }
  } catch {
    // Use curated public fallback content when the database is unavailable.
  }

  return fallbackEvents;
}

export function getAboutContent() {
  return aboutContent;
}

export async function getGalleryImages() {
  try {
    const albums = await db.album.findMany({
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
      include: {
        department: { select: { name: true } },
        photos: { orderBy: { order: "asc" }, take: 1 },
      },
    });

    if (albums.length) {
      return albums.map(toGalleryImage);
    }
  } catch {
    // Use curated public fallback content when the database is unavailable.
  }

  return fallbackGallery;
}

export function getGalleryCategories(gallery: GalleryImage[] = fallbackGallery) {
  return ["ทั้งหมด", ...Array.from(new Set(gallery.map((item) => item.category)))];
}

export function getContactContent() {
  return contactContent;
}

export async function getDepartmentBySlug(slug: string): Promise<DepartmentDetail | null> {
  try {
    const department = await db.department.findUnique({
      where: { slug },
      include: {
        teachers: { orderBy: { order: "asc" } },
        _count: { select: { teachers: true, students: true } },
      },
    });

    if (!department) {
      return getFallbackDepartment(slug) ?? null;
    }

    const fallback = getFallbackDepartment(slug);
    const catalog = getCatalogDepartmentBySlug(slug);
    const summary = toDepartmentSummary(department);
    const teacherStaff = department.teachers.map((teacher) => ({
      id: teacher.id,
      name: teacher.name,
      role: teacher.subject ?? "ครูผู้สอน",
      email: teacher.email ?? undefined,
      image: teacher.photo ?? undefined,
    }));

    return {
      ...summary,
      headline: fallback?.headline ?? genericDepartmentDetails.headline,
      websiteLabel: fallback?.websiteLabel ?? genericDepartmentDetails.websiteLabel,
      websiteUrl: fallback?.websiteUrl ?? `/departments/${summary.slug}/site`,
      admissionUrl: fallback?.admissionUrl ?? "/admissions",
      category: fallback?.category ?? catalog?.category ?? summary.category,
      heroImage: fallback?.heroImage ?? genericDepartmentDetails.heroImage,
      englishName: fallback?.englishName ?? summary.englishName,
      logoPath: fallback?.logoPath ?? summary.logoPath,
      programs: fallback?.programs ?? courseLevels.map((course) => ({
        slug: course.slug,
        level: course.shortName,
        name: course.title,
        duration: course.shortName === "ปวช." ? "3 ปี" : course.shortName === "ปวส." ? "2 ปี" : "ตามโครงสร้างหลักสูตร",
        description: `${course.title} ของ${summary.name} เน้นการเรียนรู้จากงานจริง การฝึกปฏิบัติ และการต่อยอดทักษะสู่สถานประกอบการ`,
        highlights: ["ฝึกปฏิบัติในรายวิชาหลัก", "ทำโครงงานตามสาขา", "เตรียมความพร้อมก่อนฝึกงาน"],
        href: `/courses/${course.slug}`,
      })),
      documents: fallback?.documents ?? (catalog ? buildDepartmentDocuments(catalog) : []),
      careers: fallback?.careers ?? (catalog ? buildCareers(catalog) : []),
      facilityCards: fallback?.facilityCards ?? (catalog ? buildFacilityCards(catalog) : []),
      facilities: fallback?.facilities ?? genericDepartmentDetails.facilities,
      services: fallback?.services ?? genericDepartmentDetails.services,
      achievements: fallback?.achievements ?? genericDepartmentDetails.achievements,
      contact: fallback?.contact ?? genericDepartmentDetails.contact,
      staff: teacherStaff.length ? teacherStaff : fallback?.staff ?? [],
      faqs: fallback?.faqs ?? (catalog ? buildFaqs(catalog) : []),
      teachers: department.teachers.length
        ? department.teachers.map((teacher) => ({
            id: teacher.id,
            name: teacher.name,
            subject: teacher.subject ?? "ครูประจำแผนก",
            email: teacher.email ?? "",
            photo: teacher.photo ?? undefined,
          }))
        : fallback?.teachers ?? [],
    };
  } catch {
    return getFallbackDepartment(slug) ?? null;
  }
}
