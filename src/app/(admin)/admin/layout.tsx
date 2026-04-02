import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { AdminSidebarProvider } from "@/components/admin/admin-sidebar";
import { LogoutButton } from "@/components/admin/logout-button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Beheer | Mindcraft Creatives",
  description: "CMS Dashboard voor Mindcraft Creatives",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await getSession();

  // If not authenticated, middleware handles the redirect to /admin/login.
  // The login page has its own layout that strips the sidebar.
  // If we somehow reach here unauthenticated (e.g. login page), just render children.
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <AdminSidebarProvider logoutButton={<LogoutButton />}>
      {children}
    </AdminSidebarProvider>
  );
}
