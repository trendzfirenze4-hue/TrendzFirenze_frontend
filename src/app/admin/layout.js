


"use client";

import AuthGuard from "../../lib/authGuard";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (

    <AuthGuard>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        
        <aside
          style={{
            width: "220px",
            background: "#111",
            color: "#fff",
            padding: "20px"
          }}
        >

          <h2>Trendz Firenze</h2>

          <nav style={{ marginTop: "20px", display:"flex", flexDirection:"column", gap:"10px" }}>

            <Link href="/admin/dashboard">Dashboard</Link>

            <Link href="/admin/categories/list">Categories</Link>

            <Link href="/admin/products">Products</Link>

            <Link href="/admin/orders">Orders</Link>

            <Link href="/admin/users">Users</Link>

            <button
              onClick={handleLogout}
              style={{
                marginTop: "10px",
                padding: "8px",
                background: "red",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              Logout
            </button>

          </nav>

        </aside>

        <main style={{ flex: 1, padding: "30px" }}>
          {children}
        </main>

      </div>

    </AuthGuard>

  );
}