"use client";

import { usePathname } from "next/navigation";

import PortalSidebar from "@/components/layout/PortalSidebar";

type PortalShellProps = {
  children: React.ReactNode;
  userName: string;
  actions: React.ReactNode;
};

export default function PortalShell({ children, userName, actions }: PortalShellProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/portal/login";

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-950">
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-950">
      <PortalSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div>
            <h2 className="text-lg font-black text-slate-950">Student Portal</h2>
            <p className="text-xs font-semibold text-slate-500">{userName}</p>
          </div>
          {actions}
        </header>
        <main className="flex-1 p-4 pb-28 sm:p-6 sm:pb-28 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
