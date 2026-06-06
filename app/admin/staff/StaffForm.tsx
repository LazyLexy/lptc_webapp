"use client";

import { useState, useTransition } from "react";
import { UserPlus } from "lucide-react";

import { createStaff } from "../students/actions";

type DepartmentOption = {
  id: string;
  name: string;
};

export default function StaffForm({ departments }: { departments: DepartmentOption[] }) {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());

    startTransition(async () => {
      const response = await createStaff(values);
      setMessage(response.message);
      if (response.success) event.currentTarget.reset();
    });
  }

  const inputClass = "min-h-11 min-w-0 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-blue-800 focus:ring-4 focus:ring-blue-100";

  return (
    <form onSubmit={onSubmit} className="soft-panel grid min-w-0 gap-4 p-5">
      <h2 className="text-xl font-black">เพิ่มบัญชีผู้ใช้</h2>
      <input name="fullName" className={inputClass} placeholder="ชื่อ-นามสกุล" required />
      <input name="email" type="email" className={inputClass} placeholder="อีเมล" required />
      <input name="password" type="password" className={inputClass} placeholder="รหัสผ่านเริ่มต้น" minLength={6} required />
      <div className="grid min-w-0 gap-3 sm:grid-cols-2">
        <select name="role" className={inputClass} defaultValue="TEACHER">
          <option value="TEACHER">TEACHER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <select name="departmentId" className={inputClass} defaultValue="">
          <option value="">ไม่ระบุแผนก</option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>{department.name}</option>
          ))}
        </select>
      </div>
      <button disabled={isPending} className="soft-button inline-flex h-11 max-w-max shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-blue-800 px-5 text-sm font-black leading-none text-white disabled:opacity-60">
        <UserPlus className="h-4 w-4" />
        {isPending ? "กำลังบันทึก" : "เพิ่มบัญชี"}
      </button>
      {message ? <p className="rounded-2xl bg-blue-50 p-4 text-sm font-bold text-blue-800">{message}</p> : null}
    </form>
  );
}
