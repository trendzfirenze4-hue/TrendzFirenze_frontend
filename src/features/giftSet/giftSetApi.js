import api from "@/lib/apiClient";

const giftSetApi = {
  getGiftSetCart: async () => {
    const res = await api.get("/api/giftset-cart");
    return res.data;
  },

  addGiftSetCartItem: async (payload) => {
    const res = await api.post("/api/giftset-cart/items", payload);
    return res.data;
  },

  removeGiftSetCartItem: async (itemId) => {
    const res = await api.delete(`/api/giftset-cart/items/${itemId}`);
    return res.data;
  },

  clearGiftSetCart: async () => {
    const res = await api.delete("/api/giftset-cart/clear");
    return res.data;
  }
};

export default giftSetApi;