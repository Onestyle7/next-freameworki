"use client";
import { useAuth } from "@/app/lib/AuthContext";
import { useLayoutEffect } from "react";
import { redirect, usePathname } from "next/navigation";

function ProtectedLayout({ children }) {
  const { user } = useAuth();
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (!user) {
      redirect(`/user/signin?returnUrl=${pathname}`);
    }
  }, [user, pathname]);

  return <>{children}</>;
}

export default ProtectedLayout;
