"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Hasła nie są takie same!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.push("/user/signin");
    } catch (err) {
      alert(err.message); // Prosty alert z błędem
    }
  };

  return (
    <section className="flex flex-col justify-center items-center w-full h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md translate-y-[-10%]"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Rejestracja
        </h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email jest wymagany" })}
            className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Hasło
          </label>
          <input
            type="password"
            placeholder="Hasło"
            {...register("password", { required: "Hasło jest wymagane" })}
            className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Potwierdź hasło
          </label>
          <input
            type="password"
            placeholder="Potwierdź hasło"
            {...register("confirmPassword", {
              required: "Potwierdzenie hasła jest wymagane",
            })}
            className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Zarejestruj się
        </button>
      </form>
    </section>
  );
}
