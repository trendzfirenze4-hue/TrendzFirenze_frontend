<<<<<<< HEAD


"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {

  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/dashboard");
  }, [router]);

  return null;
=======
"use client";

import { useEffect, useState } from "react";
import { getAuth, clearAuth } from "@/lib/authStorage";
import { adminCreateCategory, adminCreateProduct } from "@/services/admin";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [auth, setAuthState] = useState(null);
  const [catName, setCatName] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    const a = getAuth();
    if (!a?.accessToken) router.push("/login");
    else setAuthState(a);
  }, [router]);

  async function createCategory() {
    setMsg("");
    await adminCreateCategory(auth.accessToken, catName);
    setMsg("Category created");
    setCatName("");
  }

  async function createProduct() {
    setMsg("");
    await adminCreateProduct(auth.accessToken, {
      title: "New Product",
      description: "Demo product",
      priceInr: 1500,
      stock: 10,
      categoryId: 1, // change to actual category id
      imagesJson: '["/images/demo.jpg"]'
    });
    setMsg("Product created");
  }

  function logout() {
    clearAuth();
    router.push("/login");
  }

  if (!auth) return null;

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Panel</h1>
      <button onClick={logout}>Logout</button>

      <h2>Create Category</h2>
      <input value={catName} onChange={(e) => setCatName(e.target.value)} placeholder="Category name" />
      <button onClick={createCategory}>Create</button>

      <h2>Create Demo Product</h2>
      <button onClick={createProduct}>Create Product</button>

      {msg && <p style={{ color: "green" }}>{msg}</p>}
    </div>
  );
>>>>>>> 8539fadd8eaafc0a6cc6f0e4364be828fa547c64
}