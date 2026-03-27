



// export const saveToken = (token) => {
//   if (typeof window === "undefined") return;
//   localStorage.setItem("token", token);
//   document.cookie = `token=${token}; path=/; max-age=86400`;
// };

// export const getToken = () => {
//   if (typeof window === "undefined") return null;
//   return localStorage.getItem("token");
// };

// export const removeToken = () => {
//   if (typeof window === "undefined") return;
//   localStorage.removeItem("token");
//   document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
// };



const TOKEN_KEY = "token";

export function saveToken(token) {
  if (typeof window === "undefined") return;

  localStorage.setItem(TOKEN_KEY, token);

  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=604800; samesite=lax`;
}

export function getToken() {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(TOKEN_KEY);
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; samesite=lax`;
}