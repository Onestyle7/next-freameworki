"use client";

import React from "react";
import { useAuth } from "@/app/lib/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl mb-4">Profil Użytkownika</h1>
      {user ? (
        <div>
          <p className="mb-2">Email: {user.email}</p>
        </div>
      ) : (
        <p>Ładowanie danych użytkownika...</p>
      )}
    </div>
  );
}
