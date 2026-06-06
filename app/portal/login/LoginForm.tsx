"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState<"student" | "staff">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    startTransition(async () => {
      const response = await signIn("credentials", {
        email,
        password,
        role,
        redirect: false,
      });

      if (response?.error) {
        setError("รหัสผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        return;
      }

      router.push(searchParams.get("callbackUrl") ?? "/portal/dashboard");
      router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className="soft-panel grid gap-5 p-6 sm:p-8">
      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
        {[
          { value: "student", label: "นักศึกษา" },
          { value: "staff", label: "ครู/บุคลากร" },
        ].map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setRole(item.value as "student" | "staff")}
            className={`min-h-11 cursor-pointer rounded-xl text-sm font-black transition ${
              role === item.value ? "bg-blue-800 text-white shadow" : "text-slate-600 hover:bg-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-bold text-slate-700">{role === "student" ? "รหัสนักศึกษา" : "อีเมล"}</span>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="min-h-12 rounded-2xl border border-slate-200 px-4 text-base outline-none transition focus:border-blue-800 focus:ring-4 focus:ring-blue-100"
          placeholder={role === "student" ? "กรอกรหัสนักศึกษา" : "name@lampangtc.ac.th"}
          required
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-bold text-slate-700">รหัสผ่าน</span>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          className="min-h-12 rounded-2xl border border-slate-200 px-4 text-base outline-none transition focus:border-blue-800 focus:ring-4 focus:ring-blue-100"
          placeholder="กรอกรหัสผ่าน"
          required
        />
      </label>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700" role="alert">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="soft-button inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-blue-800 px-6 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <LogIn className="h-4 w-4" />
        {isPending ? "กำลังเข้าสู่ระบบ" : "เข้าสู่ระบบ"}
      </button>
    </form>
  );
}
