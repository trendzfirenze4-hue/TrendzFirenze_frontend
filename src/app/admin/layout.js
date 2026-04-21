"use client";

import AuthGuard from "../../lib/authGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <AuthGuard>
      <div style={{ display: "flex", minHeight: "100vh" }}>

        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main style={{ flex: 1, padding: "30px", background: "#f5f5f5" }}>
          {children}
        </main>

      </div>
    </AuthGuard>
  );
}