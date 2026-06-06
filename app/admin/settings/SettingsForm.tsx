"use client";

import { useState, useTransition } from "react";
import { Save } from "lucide-react";

import { saveAdminSettings } from "../actions";

type SettingsFormProps = {
  values: Record<string, string>;
};

export default function SettingsForm({ values }: SettingsFormProps) {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries()) as Record<string, string>;

    startTransition(async () => {
      const nextFormData = new FormData();
      for (const [key, value] of Object.entries(payload)) {
        nextFormData.set(key, value);
      }
      const response = await saveAdminSettings(nextFormData);
      setMessage(response.message);
    });
  }

  const inputClass = "min-h-11 min-w-0 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-blue-800 focus:ring-4 focus:ring-blue-100";

  return (
    <form onSubmit={onSubmit} className="grid max-w-screen-2xl gap-6">
      <section className="soft-panel grid min-w-0 gap-4 p-5">
        <h2 className="text-xl font-black">ข้อมูลวิทยาลัย</h2>
        <input name="college.name" className={inputClass} defaultValue={values["college.name"] ?? "วิทยาลัยเทคนิคลำปาง"} placeholder="ชื่อวิทยาลัย" />
        <input name="college.address" className={inputClass} defaultValue={values["college.address"] ?? ""} placeholder="ที่อยู่" />
        <div className="grid min-w-0 gap-4 sm:grid-cols-2">
          <input name="college.phone" className={inputClass} defaultValue={values["college.phone"] ?? ""} placeholder="โทรศัพท์" />
          <input name="college.email" className={inputClass} defaultValue={values["college.email"] ?? ""} placeholder="อีเมล" />
        </div>
        <div className="grid min-w-0 gap-4 sm:grid-cols-2">
          <input name="college.facebook" className={inputClass} defaultValue={values["college.facebook"] ?? ""} placeholder="Facebook URL" />
          <input name="college.line" className={inputClass} defaultValue={values["college.line"] ?? ""} placeholder="LINE Official URL" />
          <input name="college.youtube" className={inputClass} defaultValue={values["college.youtube"] ?? ""} placeholder="YouTube URL" />
          <input name="college.website" className={inputClass} defaultValue={values["college.website"] ?? ""} placeholder="เว็บไซต์หลัก" />
        </div>
      </section>

      <section className="soft-panel grid min-w-0 gap-4 p-5">
        <h2 className="text-xl font-black">Geofence สำหรับเช็คชื่อ</h2>
        <div className="grid min-w-0 gap-4 sm:grid-cols-3">
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Latitude
            <input name="geofence.lat" type="number" step="0.000001" className={inputClass} defaultValue={values["geofence.lat"] ?? ""} placeholder="18.288..." />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Longitude
            <input name="geofence.lng" type="number" step="0.000001" className={inputClass} defaultValue={values["geofence.lng"] ?? ""} placeholder="99.49..." />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Radius (เมตร)
            <input name="geofence.radius" type="number" min="10" className={inputClass} defaultValue={values["geofence.radius"] ?? "300"} />
          </label>
        </div>
      </section>

      <button disabled={isPending} className="soft-button inline-flex h-11 max-w-max shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-blue-800 px-5 text-sm font-black leading-none text-white disabled:opacity-60">
        <Save className="h-4 w-4" />
        {isPending ? "กำลังบันทึก" : "บันทึกการตั้งค่า"}
      </button>
      {message ? <p className="rounded-2xl bg-blue-50 p-4 text-sm font-bold text-blue-800">{message}</p> : null}
    </form>
  );
}
