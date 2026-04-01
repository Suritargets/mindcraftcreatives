import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const metadata: Metadata = {
  title: "Beheer | Mindcraft Creatives",
  description: "CMS Dashboard voor Mindcraft Creatives",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />
      <main className="flex-1 overflow-auto pt-[57px] lg:pt-0">
        {children}
      </main>
    </div>
  );
}
