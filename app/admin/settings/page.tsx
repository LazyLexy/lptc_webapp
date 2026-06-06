import { db } from "@/lib/db";
import SettingsForm from "./SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await db.setting.findMany().catch(() => []);
  const values = Object.fromEntries(settings.map((setting) => [setting.key, setting.value]));

  return (
    <div className="grid gap-6">
      <div>
        <p className="text-sm font-bold text-blue-800">Settings</p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">ตั้งค่าระบบ</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          ตั้งค่าข้อมูลวิทยาลัยและพิกัด Geofence สำหรับตรวจสอบการเช็คชื่อฝั่ง server
        </p>
      </div>
      <SettingsForm values={values} />
    </div>
  );
}
