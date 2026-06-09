"use client";

import { usePathname } from "next/navigation";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDepartmentWebsite = /^\/departments\/[^/]+\/site(?:\/)?$/.test(pathname);

  if (isDepartmentWebsite) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="print-hidden">
        <Navbar />
      </div>
      <main className="flex-1">{children}</main>
      <div className="print-hidden">
        <Footer />
      </div>
    </div>
  );
}
