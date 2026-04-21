// "use client";

// import AuthGuard from "../../lib/authGuard";
// import AdminSidebar from "@/components/admin/AdminSidebar";

// export default function AdminLayout({ children }) {
//   return (
//     <AuthGuard>
//       <div style={{ display: "flex", minHeight: "100vh" }}>

//         {/* Sidebar */}
//         <AdminSidebar />

//         {/* Main Content */}
//         <main style={{ flex: 1, padding: "30px", background: "#f5f5f5" }}>
//           {children}
//         </main>

//       </div>
//     </AuthGuard>
//   );
// }




















"use client";

import AuthGuard from "../../lib/authGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <AuthGuard>
      <>
        <style jsx global>{`
          html,
          body {
            margin: 0;
            padding: 0;
            width: 100%;
            min-height: 100%;
            overflow: hidden;
            background: #f4f6f8;
            font-family: Arial, sans-serif;
          }

          * {
            box-sizing: border-box;
          }

          #__next {
            height: 100%;
          }

          @keyframes adminFadeIn {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes adminSoftFloat {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-2px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          .admin-main-scroll {
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
          }

          .admin-main-scroll::-webkit-scrollbar {
            width: 10px;
            height: 10px;
          }

          .admin-main-scroll::-webkit-scrollbar-track {
            background: transparent;
          }

          .admin-main-scroll::-webkit-scrollbar-thumb {
            background: rgba(15, 23, 42, 0.18);
            border-radius: 999px;
          }

          .admin-main-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(15, 23, 42, 0.3);
          }

          .admin-shell {
            display: flex;
            width: 100%;
            height: 100vh;
            overflow: hidden;
            position: relative;
            background:
              radial-gradient(circle at top left, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.92) 28%, transparent 55%),
              linear-gradient(180deg, #f8fafc 0%, #f4f6f8 50%, #eef2f6 100%);
          }

          .admin-sidebar {
            width: 280px;
            min-width: 280px;
            max-width: 280px;
            height: 100vh;
            position: relative;
            z-index: 20;
            flex-shrink: 0;
            border-right: 1px solid rgba(15, 23, 42, 0.07);
            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.92) 0%,
              rgba(248, 250, 252, 0.96) 100%
            );
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
            box-shadow: 10px 0 30px rgba(15, 23, 42, 0.05);
            overflow: hidden;
          }

          .admin-sidebar-inner {
            height: 100%;
            overflow-y: auto;
            overflow-x: hidden;
          }

          .admin-sidebar-inner::-webkit-scrollbar {
            width: 6px;
          }

          .admin-sidebar-inner::-webkit-scrollbar-thumb {
            background: rgba(15, 23, 42, 0.12);
            border-radius: 999px;
          }

          .admin-content-area {
            flex: 1;
            min-width: 0;
            height: 100vh;
            overflow: hidden;
            position: relative;
          }

          .admin-main {
            height: 100vh;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 28px;
            position: relative;
          }

          .admin-main::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.35) 0%,
              rgba(255, 255, 255, 0) 18%
            );
          }

          .admin-main-inner {
            min-height: calc(100vh - 56px);
            width: 100%;
            max-width: 100%;
            position: relative;
            z-index: 1;
            animation: adminFadeIn 0.4s ease;
          }

          @media (max-width: 1199px) {
            .admin-sidebar {
              width: 250px;
              min-width: 250px;
              max-width: 250px;
            }

            .admin-main {
              padding: 22px;
            }

            .admin-main-inner {
              min-height: calc(100vh - 44px);
            }
          }

          @media (max-width: 991px) {
            html,
            body {
              overflow: hidden;
            }

            .admin-shell {
              flex-direction: column;
            }

            .admin-sidebar {
              width: 100%;
              min-width: 100%;
              max-width: 100%;
              height: auto;
              min-height: 72px;
              max-height: 88px;
              border-right: none;
              border-bottom: 1px solid rgba(15, 23, 42, 0.07);
              box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
            }

            .admin-sidebar-inner {
              height: 100%;
              overflow: visible;
            }

            .admin-content-area {
              height: calc(100vh - 72px);
            }

            .admin-main {
              height: calc(100vh - 72px);
              padding: 18px;
            }

            .admin-main-inner {
              min-height: calc(100vh - 108px);
            }
          }

          @media (max-width: 767px) {
            .admin-sidebar {
              min-height: 64px;
              max-height: 84px;
            }

            .admin-content-area {
              height: calc(100vh - 64px);
            }

            .admin-main {
              height: calc(100vh - 64px);
              padding: 14px;
            }

            .admin-main-inner {
              min-height: calc(100vh - 92px);
            }
          }

          @media (max-width: 480px) {
            .admin-main {
              padding: 12px;
            }
          }
        `}</style>

        <div className="admin-shell">
          <aside className="admin-sidebar">
            <div className="admin-sidebar-inner">
              <AdminSidebar />
            </div>
          </aside>

          <div className="admin-content-area">
            <main className="admin-main admin-main-scroll">
              <div className="admin-main-inner">{children}</div>
            </main>
          </div>
        </div>
      </>
    </AuthGuard>
  );
}