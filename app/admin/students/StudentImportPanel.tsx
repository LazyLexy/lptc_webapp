"use client";

import { useState, useTransition } from "react";
import * as XLSX from "xlsx";
import { FileSpreadsheet, Upload } from "lucide-react";

import { importStudents } from "./actions";

type ImportRow = {
  studentCode: string;
  fullName: string;
  departmentSlug: string;
  classRoom?: string;
};

export default function StudentImportPanel() {
  const [rows, setRows] = useState<ImportRow[]>([]);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  async function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);
    const nextRows = data.map((row) => ({
      studentCode: String(row.studentCode ?? row["รหัสนักศึกษา"] ?? ""),
      fullName: String(row.fullName ?? row["ชื่อ-นามสกุล"] ?? ""),
      departmentSlug: String(row.departmentSlug ?? row["แผนก"] ?? ""),
      classRoom: String(row.classRoom ?? row["ห้อง"] ?? ""),
    })).filter((row) => row.studentCode && row.fullName && row.departmentSlug);

    setRows(nextRows);
    setMessage(`อ่านไฟล์แล้ว ${nextRows.length} รายการ`);
  }

  function submitImport() {
    startTransition(async () => {
      const response = await importStudents(rows);
      setMessage(response.message);
    });
  }

  return (
    <div className="soft-panel min-w-0 p-5">
      <div className="flex items-center gap-3">
        <FileSpreadsheet className="h-6 w-6 text-blue-800" />
        <h2 className="text-xl font-black">นำเข้านักศึกษาจาก Excel</h2>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        รองรับคอลัมน์ studentCode, fullName, departmentSlug, classRoom หรือหัวคอลัมน์ภาษาไทยที่ตรงกัน
      </p>
      <div className="mt-5 grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={onFileChange}
          className="min-h-11 min-w-0 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm"
        />
        <button
          type="button"
          onClick={submitImport}
          disabled={!rows.length || isPending}
          className="soft-button inline-flex h-11 max-w-max shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-blue-800 px-5 text-sm font-black leading-none text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Upload className="h-4 w-4" />
          {isPending ? "กำลังนำเข้า" : "นำเข้า"}
        </button>
      </div>
      {message ? <p className="mt-4 rounded-2xl bg-blue-50 p-4 text-sm font-bold text-blue-800">{message}</p> : null}
    </div>
  );
}
