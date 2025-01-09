"use client";
import { useAuth } from "@/app/lib/AuthContext";
import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const { user } = useAuth();
  const returnUrl = usePathname();

  useLayoutEffect(() => {
    if (!user) {
      redirect(`/user/signin?returnUrl=${returnUrl}`);
    }
  }, [user, returnUrl]);

  return <>{children}</>;
}
