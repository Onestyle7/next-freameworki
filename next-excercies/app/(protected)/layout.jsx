"use client";
import { useAuth } from "@/app/lib/AuthContext";
import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";

function Protected({ children }) {
  const { user, loading } = useAuth();
  const returnUrl = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      redirect(`/user/signin?returnUrl=${encodeURIComponent(returnUrl)}`);
    }
  }, [user, loading, returnUrl]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}

export default Protected;
