"use client";

import { useEffect, useState } from "react";
import { listProducts } from "@/services/products";
import { listCategories } from "@/services/categories";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    listCategories().then(setCats).catch(console.error);
  }, []);

  useEffect(() => {
    listProducts(categoryId || null).then(setProducts).catch(console.error);
  }, [categoryId]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Trendz Firenze — Products</h1>

      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
        <option value="">All Categories</option>
        {cats.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <div style={{ marginTop: 20 }}>
        {products.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}>
            <b>{p.title}</b>
            <div>₹{p.priceInr}</div>
            <div>Stock: {p.stock}</div>
            <div style={{ opacity: 0.7 }}>{p.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}