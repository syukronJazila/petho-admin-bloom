import { ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar />
      
      {/* Main content */}
      <main className="flex-1 md:ml-64">
        <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
