import { db } from "@/lib/db";
import AdminSubmitButton from "@/components/admin/AdminSubmitButton";
import { resetStudentPassword } from "./actions";
import StudentAccountForm from "./StudentAccountForm";
import StudentImportPanel from "./StudentImportPanel";

export default async function AdminStudentsPage() {
  const [departments, students] = await Promise.all([
    db.department.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }).catch(() => []),
    db.student.findMany({
      orderBy: { createdAt: "desc" },
      take: 30,
      select: {
        id: true,
        studentCode: true,
        fullName: true,
        classRoom: true,
        department: { select: { name: true } },
      },
    }).catch(() => []),
  ]);

  return (
    <div className="grid max-w-screen-2xl gap-6">
      <div>
        <p className="text-sm font-bold text-blue-800">Students</p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">บัญชีนักศึกษา</h1>
      </div>
      <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(320px,420px)_1fr] xl:items-start">
        <StudentAccountForm departments={departments} />
        <StudentImportPanel />
      </section>
      <section className="soft-panel min-w-0 overflow-hidden">
        <div className="border-b border-slate-200 p-5">
          <h2 className="text-xl font-black">บัญชีเข้า Student Portal</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-3 whitespace-nowrap">รหัส</th>
                <th className="px-5 py-3">ชื่อ-นามสกุล</th>
                <th className="px-5 py-3">แผนก</th>
                <th className="px-5 py-3 whitespace-nowrap">ห้อง</th>
                <th className="px-5 py-3 text-right whitespace-nowrap">รหัสผ่าน</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-blue-50/60">
                  <td className="px-5 py-4 font-bold whitespace-nowrap">{student.studentCode}</td>
                  <td className="px-5 py-4">{student.fullName}</td>
                  <td className="px-5 py-4">{student.department.name}</td>
                  <td className="px-5 py-4 whitespace-nowrap">{student.classRoom ?? "-"}</td>
                  <td className="px-5 py-4">
                    <form action={resetStudentPassword} className="flex justify-end">
                      <input type="hidden" name="id" value={student.id} />
                      <AdminSubmitButton label="รีเซ็ตเป็นรหัสนักศึกษา" pendingLabel="กำลังรีเซ็ต" iconName="save" variant="secondary" className="min-h-10 px-4 text-xs" />
                    </form>
                  </td>
                </tr>
              ))}
              {!students.length ? (
                <tr>
                  <td className="px-5 py-10 text-center text-sm font-bold text-slate-500" colSpan={5}>
                    ยังไม่มีบัญชีนักศึกษา
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
