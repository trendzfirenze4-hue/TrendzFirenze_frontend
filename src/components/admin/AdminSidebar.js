
"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminSidebar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const closeSidebarOnMobile = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    closeSidebarOnMobile();
    router.push("/login");
  };

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const getLinkStyle = (href) => ({
    color: "#f5f5f5",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    padding: "10px 12px",
    borderRadius: "10px",
    background:
      pathname === href
        ? "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.08))"
        : "rgba(255,255,255,0.04)",
    border:
      pathname === href
        ? "1px solid rgba(255,255,255,0.18)"
        : "1px solid rgba(255,255,255,0.07)",
    transition: "all 0.25s ease",
    display: "block",
    whiteSpace: "nowrap",
  });

  const sidebarBaseStyle = {
    background: "linear-gradient(180deg, #0f0f0f 0%, #191919 100%)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRight: "1px solid rgba(255,255,255,0.06)",
    boxShadow: "4px 0 24px rgba(0,0,0,0.16)",
    zIndex: 1000,
    transition: "all 0.3s ease",
  };

  const desktopStyle = {
    ...sidebarBaseStyle,
    width: "230px",
    minHeight: "100vh",
    padding: "18px 14px",
    position: "relative",
    flexShrink: 0,
  };

  const mobileClosedStyle = {
    ...sidebarBaseStyle,
    width: "0px",
    minHeight: "100vh",
    padding: "18px 0px",
    position: "fixed",
    left: 0,
    top: 0,
    overflow: "hidden",
    boxShadow: "none",
    borderRight: "none",
  };

  const mobileOpenStyle = {
    ...sidebarBaseStyle,
    width: "250px",
    minHeight: "100vh",
    padding: "18px 14px",
    position: "fixed",
    left: 0,
    top: 0,
  };

  const sidebarStyle = !isMobile
    ? desktopStyle
    : isOpen
    ? mobileOpenStyle
    : mobileClosedStyle;

  const contentVisible = !isMobile || isOpen;

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
    top: "12px",
    left: "12px",
    zIndex: 1001,
    background: "#0f0f0f",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    padding: "8px 12px",
    cursor: "pointer",
    fontSize: "20px",
    display: isMobile ? "block" : "none",
    boxShadow: "0 10px 22px rgba(0,0,0,0.18)",
  };

  const sectionStyle = {
    opacity: contentVisible ? 1 : 0,
    pointerEvents: contentVisible ? "auto" : "none",
    transition: "opacity 0.2s ease",
    whiteSpace: "nowrap",
  };

  return (
    <>
      {isMobile && (
        <button onClick={toggleSidebar} style={menuButtonStyle}>
          {isOpen ? "✕" : "☰"}
        </button>
      )}

      {isMobile && isOpen && (
        <div style={overlayStyle} onClick={toggleSidebar} />
      )}

      <aside style={sidebarStyle}>
        <div>
          <div style={{ ...sectionStyle, marginBottom: "20px" }}>
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

          <nav
            style={{
              ...sectionStyle,
              display: "flex",
              flexDirection: "column",
              gap: "9px",
            }}
          >
            <Link href="/" style={getLinkStyle("/")} onClick={closeSidebarOnMobile}>
              Home
            </Link>

            <Link
              href="/admin/dashboard"
              style={getLinkStyle("/admin/dashboard")}
              onClick={closeSidebarOnMobile}
            >
              Dashboard
            </Link>

            <Link
              href="/admin/brand-showcases"
              style={getLinkStyle("/admin/brand-showcases")}
              onClick={closeSidebarOnMobile}
            >
              Brand Show Case
            </Link>

            <Link
              href="/admin/categories/list"
              style={getLinkStyle("/admin/categories/list")}
              onClick={closeSidebarOnMobile}
            >
              Categories
            </Link>

            <Link
              href="/admin/products"
              style={getLinkStyle("/admin/products")}
              onClick={closeSidebarOnMobile}
            >
              Products
            </Link>

            <Link
              href="/admin/gift-boxes/list"
              style={getLinkStyle("/admin/gift-boxes/list")}
              onClick={closeSidebarOnMobile}
            >
              Gift Boxes
            </Link>

            <Link
              href="/admin/bulk-orders"
              style={getLinkStyle("/admin/bulk-orders")}
              onClick={closeSidebarOnMobile}
            >
              Bulk Orders
            </Link>

            <Link
              href="/admin/hero-sections"
              style={getLinkStyle("/admin/hero-sections")}
              onClick={closeSidebarOnMobile}
            >
              Hero Sections
            </Link>

            <Link
              href="/admin/orders"
              style={getLinkStyle("/admin/orders")}
              onClick={closeSidebarOnMobile}
            >
              Orders
            </Link>

            <Link
              href="/admin/users"
              style={getLinkStyle("/admin/users")}
              onClick={closeSidebarOnMobile}
            >
              Users
            </Link>

            <Link
              href="/admin/instagram"
              style={getLinkStyle("/admin/instagram")}
              onClick={closeSidebarOnMobile}
            >
              Meta Token
            </Link>
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
            whiteSpace: "nowrap",
            opacity: contentVisible ? 1 : 0,
            pointerEvents: contentVisible ? "auto" : "none",
            transition: "all 0.25s ease",
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