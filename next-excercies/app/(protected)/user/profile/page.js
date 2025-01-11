"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/app/lib/AuthContext";
import { db } from "@/app/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function ProfilePage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true); // Stan do zarządzania ładowaniem danych
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      street: "",
      city: "",
      zipCode: "",
    },
  });

  useEffect(() => {
    const fetchAddress = async () => {
      if (!user?.uid) {
        console.error("User is not logged in");
        setIsLoading(false);
        return;
      }
      if (user?.uid) {
        try {
          const snapshot = await getDoc(doc(db, "users", user.uid));
          if (snapshot.exists()) {
            const address = snapshot.data().address;
            setValue("street", address.street);
            setValue("city", address.city);
            setValue("zipCode", address.zipCode);
          }
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      }
      setIsLoading(false); // Ustawienie ładowania na false po zakończeniu
    };

    fetchAddress();
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      await setDoc(doc(db, "users", user?.uid), {
        address: {
          street: data.street,
          city: data.city,
          zipCode: data.zipCode,
        },
      });
      console.log("Address updated successfully.");
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <div className="text-center mt-20 text-black">
      <h1 className="text-3xl mb-4">Profil Użytkownika</h1>
      {user ? (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div>
            <label htmlFor="street">Ulica:</label>
            <input
              type="text"
              id="street"
              {...register("street")}
              disabled={isLoading}
              className="border rounded px-2 py-1 mb-2"
            />
          </div>
          <div>
            <label htmlFor="city">Miasto:</label>
            <input
              type="text"
              id="city"
              {...register("city")}
              disabled={isLoading}
              className="border rounded px-2 py-1 mb-2"
            />
          </div>
          <div>
            <label htmlFor="zipCode">Kod pocztowy:</label>
            <input
              type="text"
              id="zipCode"
              {...register("zipCode")}
              disabled={isLoading}
              className="border rounded px-2 py-1 mb-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            disabled={isLoading}
          >
            Zapisz adres
          </button>
        </form>
      ) : (
        <p>Ładowanie danych użytkownika...</p>
      )}
    </div>
  );
}
