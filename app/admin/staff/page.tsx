import { db } from "@/lib/db";
import StaffForm from "./StaffForm";

export default async function AdminStaffPage() {
  const [departments, staff] = await Promise.all([
    db.department.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }).catch(() => []),
    db.staff.findMany({
      orderBy: { createdAt: "desc" },
      take: 30,
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        department: { select: { name: true } },
      },
    }).catch(() => []),
  ]);

  return (
    <div className="grid max-w-screen-2xl gap-6 lg:grid-cols-[minmax(320px,420px)_1fr] lg:items-start">
      <div className="min-w-0">
        <p className="text-sm font-bold text-blue-800">User Accounts</p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">บัญชีผู้ใช้</h1>
        <div className="mt-6">
          <StaffForm departments={departments} />
        </div>
      </div>

      <section className="soft-panel min-w-0 overflow-hidden">
        <div className="border-b border-slate-200 p-5">
          <h2 className="text-xl font-black">บัญชีสำหรับเข้าสู่ระบบ</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-3">ชื่อ</th>
                <th className="px-5 py-3">อีเมล</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">แผนก</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {staff.map((person) => (
                <tr key={person.id} className="hover:bg-blue-50/60">
                  <td className="px-5 py-4 font-bold">{person.fullName}</td>
                  <td className="px-5 py-4">{person.email}</td>
                  <td className="px-5 py-4">{person.role}</td>
                  <td className="px-5 py-4">{person.department?.name ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
