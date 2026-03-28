


// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter, useSearchParams } from "next/navigation";
// import { login } from "../../../features/auth/authSlice";
// import { mergeGuestCartAfterLogin } from "@/features/cart/cartSlice";

// function getSafeNext(nextValue) {
//   if (!nextValue) return null;
//   if (!nextValue.startsWith("/")) return null;
//   if (nextValue.startsWith("//")) return null;
//   return nextValue;
// }

// export default function LoginPage() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const { error, loading } = useSelector((state) => state.auth);

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [nextPath, setNextPath] = useState(null);

//   useEffect(() => {
//     const nextFromQuery = getSafeNext(searchParams.get("next"));

//     if (nextFromQuery) {
//       setNextPath(nextFromQuery);
//       sessionStorage.setItem("redirectAfterLogin", nextFromQuery);
//       return;
//     }

//     const nextFromWindow =
//       typeof window !== "undefined"
//         ? getSafeNext(new URLSearchParams(window.location.search).get("next"))
//         : null;

//     if (nextFromWindow) {
//       setNextPath(nextFromWindow);
//       sessionStorage.setItem("redirectAfterLogin", nextFromWindow);
//       return;
//     }

//     const nextFromSession =
//       typeof window !== "undefined"
//         ? getSafeNext(sessionStorage.getItem("redirectAfterLogin"))
//         : null;

//     if (nextFromSession) {
//       setNextPath(nextFromSession);
//     }
//   }, [searchParams]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const result = await dispatch(login(form));

//     if (login.fulfilled.match(result)) {
//       await dispatch(mergeGuestCartAfterLogin());

//       const user = result.payload;

//       const nextFromSession =
//         typeof window !== "undefined"
//           ? getSafeNext(sessionStorage.getItem("redirectAfterLogin"))
//           : null;

//       const finalNext = nextPath || nextFromSession;

//       if (typeof window !== "undefined") {
//         sessionStorage.removeItem("redirectAfterLogin");
//       }

//       if (finalNext) {
//         router.replace(finalNext);
//         return;
//       }

//       if (user.role === "ADMIN") {
//         router.replace("/admin/dashboard");
//       } else {
//         router.replace("/");
//       }
//     }
//   };

//   return (
//     <div style={{ maxWidth: 420, margin: "60px auto", padding: 24 }}>
//       <h2 style={{ marginBottom: 20 }}>Login</h2>

//       <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
//         <input
//           placeholder="email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//           style={{
//             padding: "12px 14px",
//             border: "1px solid #ddd",
//             borderRadius: 10,
//           }}
//         />

//         <input
//           placeholder="password"
//           type="password"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//           style={{
//             padding: "12px 14px",
//             border: "1px solid #ddd",
//             borderRadius: 10,
//           }}
//         />

//         <button
//           disabled={loading}
//           type="submit"
//           style={{
//             padding: "12px 16px",
//             background: "#111",
//             color: "#fff",
//             border: "none",
//             borderRadius: 10,
//             cursor: loading ? "not-allowed" : "pointer",
//           }}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>

//       {nextPath && (
//         <p style={{ color: "#666", marginTop: 12, fontSize: 14 }}>
//           You will be redirected to: {nextPath}
//         </p>
//       )}

//       {error && (
//         <p style={{ color: "red", marginTop: 12 }}>
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }












import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading...</div>}>
      <LoginClient />
    </Suspense>
  );
}