

"use client";

import { useEffect, useState } from "react";

export default function InstagramAdminPage() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenInfo, setTokenInfo] = useState(null);
  const [infoLoading, setInfoLoading] = useState(true);
  const [infoError, setInfoError] = useState("");

  const generateToken = () => {
    window.open("https://developers.facebook.com/tools/explorer/", "_blank");
  };

  const loadTokenStatus = async () => {
    try {
      setInfoLoading(true);
      setInfoError("");

      const res = await fetch("/api/admin/instagram/status", {
        method: "GET",
        cache: "no-store",
      });

      const contentType = res.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await res.json()
        : { error: await res.text() };

      if (!res.ok) {
        setTokenInfo(null);
        setInfoError(data.error || data.message || "Failed to load token status");
        return;
      }

      setTokenInfo(data);
    } catch (e) {
      console.error(e);
      setTokenInfo(null);
      setInfoError("Failed to load token status");
    } finally {
      setInfoLoading(false);
    }
  };

  useEffect(() => {
    loadTokenStatus();
  }, []);

  const updateToken = async () => {
    if (!token.trim()) {
      setStatus("❌ Please paste a token first");
      return;
    }

    try {
      setLoading(true);
      setStatus("Updating token...");

      const res = await fetch("/api/admin/instagram/update-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken: token.trim() }),
      });

      const contentType = res.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await res.json()
        : { error: await res.text() };

      if (res.ok) {
        setStatus("✅ Token updated successfully");
        setToken("");
        await loadTokenStatus();
      } else {
        setStatus("❌ " + (data.error || data.message || "Update failed"));
      }
    } catch (e) {
      console.error(e);
      setStatus("❌ Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[760px] px-4 py-20">
      <h1 className="mb-3 text-2xl font-semibold">
        Instagram Token Management
      </h1>

      <p className="mb-5 text-sm text-gray-600">
        Open Graph API Explorer, generate a new long-lived token, paste it below,
        and update the token stored in your database.
      </p>

      <div className="mb-6 rounded-lg border p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-medium">Current Token Status</h2>
          <button
            type="button"
            onClick={loadTokenStatus}
            className="rounded-md border px-3 py-1 text-sm"
          >
            Refresh Status
          </button>
        </div>

        {infoLoading ? (
          <p className="text-sm text-gray-600">Loading token info...</p>
        ) : infoError ? (
          <p className="text-sm text-red-600">❌ {infoError}</p>
        ) : tokenInfo?.configured === false ? (
          <div className="space-y-2 text-sm">
            <p className="text-amber-700">No Instagram token saved in database yet.</p>
            <p className="text-gray-600">
              Generate a new token and update it to create the first record.
            </p>
          </div>
        ) : tokenInfo?.configured ? (
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Instagram User ID:</span>{" "}
              {tokenInfo.instagramUserId || "-"}
            </p>
            <p>
              <span className="font-medium">Expires At:</span>{" "}
              {tokenInfo.expiresAt
                ? new Date(tokenInfo.expiresAt).toLocaleString()
                : "-"}
            </p>
            <p>
              <span className="font-medium">Refreshed At:</span>{" "}
              {tokenInfo.refreshedAt
                ? new Date(tokenInfo.refreshedAt).toLocaleString()
                : "-"}
            </p>
            <p>
              <span className="font-medium">Active:</span>{" "}
              {tokenInfo.active ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-medium">Expired:</span>{" "}
              {tokenInfo.expired ? "Yes" : "No"}
            </p>
          </div>
        ) : (
          <p className="text-sm text-red-600">No token info found.</p>
        )}
      </div>

      <button
        onClick={generateToken}
        type="button"
        className="mb-4 rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
      >
        Generate New Token
      </button>

      <textarea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Paste new long-lived token here..."
        className="mb-4 h-[140px] w-full rounded-md border p-3 text-sm"
      />

      <button
        onClick={updateToken}
        disabled={loading}
        className="rounded-md bg-black px-6 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Token"}
      </button>

      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  );
}