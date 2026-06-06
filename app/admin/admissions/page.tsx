import { db } from "@/lib/db";
import AdminSubmitButton from "@/components/admin/AdminSubmitButton";
import { updateAdmissionStatus } from "@/app/admin/actions";

export default async function AdminAdmissionsPage() {
  const admissions = await db.admission.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      id: true,
      fullName: true,
      phone: true,
      email: true,
      level: true,
      status: true,
      note: true,
      createdAt: true,
      department: { select: { name: true } },
    },
  }).catch(() => []);

  return (
    <div className="grid max-w-screen-2xl gap-6">
      <div>
        <p className="text-sm font-bold text-blue-800">Applications</p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">ใบสมัครเรียน</h1>
      </div>
      <section className="soft-panel min-w-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-3">วันที่</th>
                <th className="px-5 py-3">ผู้สมัคร</th>
                <th className="px-5 py-3">ติดต่อ</th>
                <th className="px-5 py-3">ระดับ</th>
                <th className="px-5 py-3">แผนก</th>
                <th className="px-5 py-3">สถานะและหมายเหตุ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {admissions.map((item) => (
                <tr key={item.id} className="align-top hover:bg-blue-50/60">
                  <td className="px-5 py-4">{new Intl.DateTimeFormat("th-TH").format(item.createdAt)}</td>
                  <td className="px-5 py-4">
                    <p className="font-bold">{item.fullName}</p>
                    <p className="mt-1 text-slate-500">{item.note ?? ""}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p>{item.phone}</p>
                    <p className="text-slate-500">{item.email ?? "-"}</p>
                  </td>
                  <td className="px-5 py-4">{item.level}</td>
                  <td className="px-5 py-4">{item.department.name}</td>
                  <td className="px-5 py-4">
                    <form action={updateAdmissionStatus} className="grid min-w-72 gap-2">
                      <input type="hidden" name="id" value={item.id} />
                      <select
                        name="status"
                        defaultValue={item.status}
                        className="min-h-10 min-w-0 w-full rounded-2xl border border-slate-200 px-3 text-xs font-bold outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100"
                      >
                        <option value="PENDING">รอติดต่อ</option>
                        <option value="CONTACTED">ติดต่อแล้ว</option>
                        <option value="APPROVED">รับเข้ากระบวนการ</option>
                        <option value="REJECTED">ไม่ผ่าน/ยกเลิก</option>
                      </select>
                      <textarea
                        name="note"
                        rows={2}
                        defaultValue={item.note ?? ""}
                        className="min-w-0 w-full rounded-2xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100"
                        placeholder="หมายเหตุสำหรับติดตาม"
                      />
                      <AdminSubmitButton label="อัปเดต" pendingLabel="อัปเดต" iconName="save" className="min-h-9 px-3 text-xs" />
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
