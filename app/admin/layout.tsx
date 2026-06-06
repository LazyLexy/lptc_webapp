import { LogOut } from "lucide-react";

import AdminSidebar from "@/components/layout/AdminSidebar";
import { auth, signOut } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-slate-100 text-slate-950">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div>
            <h2 className="text-lg font-black text-slate-950">Admin CMS</h2>
            <p className="text-xs font-semibold text-slate-500">{session?.user.name ?? "ผู้ดูแลระบบ"}</p>
          </div>
          <div className="flex items-center gap-2">
            <a href="/portal/dashboard" className="inline-flex min-h-10 items-center rounded-full border border-slate-200 px-4 text-xs font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100">
              Portal
            </a>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/portal/login" });
              }}
            >
              <button className="inline-flex min-h-10 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-slate-950 px-4 text-xs font-black text-white transition hover:bg-rose-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-100">
                <LogOut className="h-4 w-4" />
                ออก
              </button>
            </form>
          </div>
        </header>
        <main className="min-w-0 flex-1 overflow-x-hidden p-4 pb-28 sm:p-6 sm:pb-28 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
