

"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { loadCurrentUser } from "../features/auth/authSlice";

export default function AuthGuard({ children }) {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    dispatch(loadCurrentUser()).finally(() => {
      setInitialized(true);
    });
  }, [dispatch]);

  useEffect(() => {
    if (initialized && !loading && !user) {
      const query = searchParams?.toString();
      const fullPath = query ? `${pathname}?${query}` : pathname;
      router.replace(`/login?next=${encodeURIComponent(fullPath)}`);
    }
  }, [initialized, loading, user, router, pathname, searchParams]);

  if (!initialized || loading) {
    return null;
  }

  if (!user) {
    return null;
  }

  return children;
}