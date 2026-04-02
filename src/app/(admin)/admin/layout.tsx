import type { Metadata } from "next";
import { AdminSidebarProvider } from "@/components/admin/admin-sidebar";

export const dynamic = "force-dynamic";

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
    <AdminSidebarProvider>
      {children}
    </AdminSidebarProvider>
  );
}
