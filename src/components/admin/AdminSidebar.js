

"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminSidebar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(true);
      }
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const linkStyle = {
    color: "#f5f5f5",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    padding: "10px 12px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    transition: "all 0.25s ease",
    display: "block",
  };

  const sidebarStyles = {
    desktop: {
      width: "230px",
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0f0f0f 0%, #191919 100%)",
      color: "#fff",
      padding: "18px 14px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderRight: "1px solid rgba(255,255,255,0.06)",
      boxShadow: "4px 0 24px rgba(0,0,0,0.16)",
      position: "relative",
      zIndex: 1000,
    },
    mobileClosed: {
      width: "0px",
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0f0f0f 0%, #191919 100%)",
      color: "#fff",
      padding: "18px 0px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderRight: "none",
      boxShadow: "none",
      position: "fixed",
      left: 0,
      top: 0,
      overflow: "hidden",
      transition: "all 0.3s ease",
      zIndex: 1000,
    },
    mobileOpen: {
      width: "250px",
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0f0f0f 0%, #191919 100%)",
      color: "#fff",
      padding: "18px 14px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderRight: "1px solid rgba(255,255,255,0.06)",
      boxShadow: "4px 0 24px rgba(0,0,0,0.16)",
      position: "fixed",
      left: 0,
      top: 0,
      transition: "all 0.3s ease",
      zIndex: 1000,
    },
  };

  const getSidebarStyle = () => {
    if (!isMobile) return sidebarStyles.desktop;
    return isOpen ? sidebarStyles.mobileOpen : sidebarStyles.mobileClosed;
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    zIndex: 999,
    display: isMobile && isOpen ? "block" : "none",
  };

  const menuButtonStyle = {
    position: "fixed",
    top: "10px",
    left: "10px",
    zIndex: 1001,
    background: "#0f0f0f",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "8px",
    padding: "8px 12px",
    cursor: "pointer",
    fontSize: "20px",
    display: isMobile ? "block" : "none",
  };

  return (
    <>
      {isMobile && (
        <button onClick={toggleSidebar} style={menuButtonStyle}>
          {isOpen ? "✕" : "☰"}
        </button>
      )}
      
      {isMobile && isOpen && <div style={overlayStyle} onClick={toggleSidebar} />}
      
      <aside style={getSidebarStyle()}>
        <div>
          <div style={{ 
            marginBottom: "20px",
            opacity: (!isMobile && isMobile) ? 1 : (isMobile && !isOpen ? 0 : 1),
            transition: "opacity 0.2s ease",
            whiteSpace: "nowrap",
          }}>
            <h2
              style={{
                margin: 0,
                fontSize: "19px",
                fontWeight: "700",
                color: "#ffffff",
                letterSpacing: "0.4px",
              }}
            >
              Trendz Firenze
            </h2>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: "12px",
                color: "rgba(255,255,255,0.62)",
              }}
            >
              Admin Panel
            </p>
          </div>

          <nav style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "9px",
            opacity: (!isMobile && isMobile) ? 1 : (isMobile && !isOpen ? 0 : 1),
            transition: "opacity 0.2s ease",
          }}>
            <Link href="/" style={linkStyle}>Home</Link>
            <Link href="/admin/dashboard" style={linkStyle}>Dashboard</Link>
            <Link href="/admin/brand-showcases" style={linkStyle}>Brand Show Case</Link>
            <Link href="/admin/categories/list" style={linkStyle}>Categories</Link>
            <Link href="/admin/products" style={linkStyle}>Products</Link>
            <Link href="/admin/gift-boxes/list" style={linkStyle}>Gift Boxes</Link>
            <Link href="/admin/bulk-orders" style={linkStyle}>Bulk Orders</Link>
            <Link href="/admin/hero-sections" style={linkStyle}>Hero Sections</Link>
            <Link href="/admin/orders" style={linkStyle}>Orders</Link>
            <Link href="/admin/users" style={linkStyle}>Users</Link>
            <Link href="/admin/instagram" style={linkStyle}>Meta Token</Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          style={{
            marginTop: "18px",
            padding: "10px 14px",
            background: "linear-gradient(135deg, #c62828, #e53935)",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow: "0 8px 18px rgba(229,57,53,0.22)",
            transition: "all 0.25s ease",
            opacity: (!isMobile && isMobile) ? 1 : (isMobile && !isOpen ? 0 : 1),
            transition: "all 0.25s ease",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(229,57,53,0.30)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 18px rgba(229,57,53,0.22)";
          }}
        >
          Logout
        </button>
      </aside>
    </>
  );
}