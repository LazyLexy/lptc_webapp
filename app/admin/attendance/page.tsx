import { db } from "@/lib/db";

export default async function AdminReportsPage() {
  const [attendance, assembly, checkins] = await Promise.all([
    db.attendanceRecord.count().catch(() => 0),
    db.assemblyRecord.count().catch(() => 0),
    db.checkInOut.count().catch(() => 0),
  ]);

  return (
    <div className="grid gap-6">
      <div>
        <p className="text-sm font-bold text-blue-800">Reports</p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">รายงานนักศึกษา</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["บันทึกเข้าเรียน", attendance],
          ["กิจกรรมหน้าเสาธง", assembly],
          ["เช็คชื่อเข้า-ออก", checkins],
        ].map(([label, value]) => (
          <div key={label} className="soft-panel p-5">
            <p className="text-4xl font-black">{new Intl.NumberFormat("th-TH").format(Number(value))}</p>
            <p className="mt-2 text-sm font-bold text-slate-500">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
