import { LogOut } from "lucide-react";

import PortalShell from "@/components/layout/PortalShell";
import { auth, signOut } from "@/lib/auth";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <PortalShell
      userName={session?.user.name ?? "เข้าสู่ระบบ"}
      actions={(
        <div className="flex items-center gap-2">
          {session?.user.role === "ADMIN" ? (
              <a href="/admin/dashboard" className="inline-flex min-h-10 items-center rounded-full border border-slate-200 px-4 text-xs font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100">
                Admin
              </a>
          ) : null}
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
      )}
    >
      {children}
    </PortalShell>
  );
}
