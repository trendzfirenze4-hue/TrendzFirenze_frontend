"use client";

import { useState } from "react";
import { login } from "@/services/auth";
import { setAuth } from "@/lib/authStorage";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@trendz.local");
  const [password, setPassword] = useState("Admin@123");
  const [err, setErr] = useState("");
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      const auth = await login({ email, password });
      setAuth(auth);
      router.push("/admin");
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
        <br />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" />
        <br />
        <button type="submit">Login</button>
      </form>
      {err && <p style={{ color: "red" }}>{err}</p>}
    </div>
  );
}