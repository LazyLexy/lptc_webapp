"use client";

import { useState, useTransition } from "react";
import { GraduationCap } from "lucide-react";

import { createStudentAccount } from "./actions";

type DepartmentOption = {
  id: string;
  name: string;
};

export default function StudentAccountForm({ departments }: { departments: DepartmentOption[] }) {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    startTransition(async () => {
      const response = await createStudentAccount(values);
      setMessage(response.message);
      if (response.success) form.reset();
    });
  }

  const inputClass = "min-h-11 min-w-0 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-blue-800 focus:ring-4 focus:ring-blue-100";

  return (
    <form onSubmit={onSubmit} className="soft-panel grid min-w-0 gap-4 p-5">
      <div className="flex items-center gap-3">
        <GraduationCap className="h-6 w-6 text-blue-800" />
        <h2 className="text-xl font-black">เพิ่มบัญชีนักศึกษา</h2>
      </div>
      <div className="grid min-w-0 gap-3 sm:grid-cols-2">
        <input name="studentCode" className={inputClass} placeholder="รหัสนักศึกษา" required />
        <input name="classRoom" className={inputClass} placeholder="ห้องเรียน" />
      </div>
      <input name="fullName" className={inputClass} placeholder="ชื่อ-นามสกุล" required />
      <select name="departmentId" className={inputClass} defaultValue="" required>
        <option value="">เลือกแผนก</option>
        {departments.map((department) => (
          <option key={department.id} value={department.id}>{department.name}</option>
        ))}
      </select>
      <input name="password" type="password" className={inputClass} placeholder="รหัสผ่านเริ่มต้น (เว้นว่าง = รหัสนักศึกษา)" minLength={6} />
      <button disabled={isPending} className="soft-button inline-flex h-11 max-w-max shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-blue-800 px-5 text-sm font-black leading-none text-white disabled:opacity-60">
        <GraduationCap className="h-4 w-4" />
        {isPending ? "กำลังบันทึก" : "เพิ่มบัญชีนักศึกษา"}
      </button>
      {message ? <p className="rounded-2xl bg-blue-50 p-4 text-sm font-bold text-blue-800">{message}</p> : null}
    </form>
  );
}
