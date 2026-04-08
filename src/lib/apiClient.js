
// import axios from "axios";
// import { getToken, removeToken } from "./tokenStorage";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE,
// });

// api.interceptors.request.use((config) => {
//   const token = getToken();

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (typeof window !== "undefined" && error?.response?.status === 401) {
//       removeToken();

//       const fullPath = window.location.pathname + window.location.search;
//       const path = window.location.pathname;

//       const isPublicPage =
//         path === "/" ||
//         path === "/login" ||
//         path === "/register" ||
//         path === "/cart" ||
//         path === "/products" ||
//         path.startsWith("/products/");

//       if (!isPublicPage) {
//         sessionStorage.setItem("redirectAfterLogin", fullPath);
//         window.location.href = `/login?next=${encodeURIComponent(fullPath)}`;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
























import axios from "axios";
import { getToken, removeToken } from "./tokenStorage";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
});

function isPublicPage(path) {
  return (
    path === "/" ||
    path === "/login" ||
    path === "/register" ||
    path === "/products" ||
    path.startsWith("/products/")
  );
}

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined" && error?.response?.status === 401) {
      removeToken();

      const fullPath = window.location.pathname + window.location.search;
      const path = window.location.pathname;

      if (!isPublicPage(path)) {
        sessionStorage.setItem("redirectAfterLogin", fullPath);
        window.location.href = `/login?next=${encodeURIComponent(fullPath)}`;
      }
    }

    return Promise.reject(error);
  }
);

export default api;