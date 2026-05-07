const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8080";

async function parseResponse(res) {
  const text = await res.text();

  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const message =
      data?.message ||
      data?.error ||
      data ||
      "Something went wrong";

    throw new Error(message);
  }

  return data;
}

export async function requestPasswordResetApi(email) {
  const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

  return parseResponse(res);
}

export async function resetPasswordApi({
  token,
  newPassword,
  repeatPassword,
}) {
  const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
      newPassword,
      repeatPassword,
    }),
  });

  return parseResponse(res);
}