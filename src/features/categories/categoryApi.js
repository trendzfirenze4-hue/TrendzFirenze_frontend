import api from "@/lib/apiClient";

export const listCategories = async () => {
  const res = await api.get("/api/categories");
  return res.data;
};