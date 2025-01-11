"use client";
import "./globals.css";
import { AuthProvider, useAuth } from "@/app/lib/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

// Komponent dla wylogowania
function UserMenu() {
  const { user } = useAuth(); // Pobranie aktualnego użytkownika
  const router = useRouter();

  // Funkcja do wylogowania
  const handleLogout = async () => {
    await signOut(auth); // Wylogowanie użytkownika
    router.push("/user/signin"); // Przekierowanie na stronę logowania
  };

  if (!user) {
    return (
      <div className="flex gap-4">
        <a
          href="/user/register"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Rejestracja
        </a>
        <a
          href="/user/signin"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Logowanie
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-gray-700 font-bold">{user.email}</span>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Wyloguj
      </button>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className="flex h-screen">
        <AuthProvider>
          {/* Sidebar */}
          <aside className="w-64 bg-gray-800 text-white shadow-lg hidden md:block">
            <div className="flex flex-col p-6 space-y-4 h-full">
              <h2 className="text-2xl font-bold mb-4">My App</h2>
              <nav className="flex flex-col space-y-2">
                <a
                  href="/"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-700"
                >
                  Home
                </a>
                <a
                  href="/user/signin"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-700"
                >
                  Sign In
                </a>
                <a
                  href="/user/register"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-700"
                >
                  Register
                </a>
                <a
                  href="/user/dashboard/"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-700"
                >
                  Dashboard
                </a>
                <a
                  href="/user/profile/"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-700"
                >
                  Profile
                </a>
                <a
                  href="/user/articles/"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-700"
                >
                  Articles
                </a>
              </nav>
            </div>
          </aside>

          {/* Główna zawartość */}
          <div className="flex flex-col flex-1 overflow-y-auto">
            {/* Pasek górny */}
            <header className="bg-gray-200 p-4 flex justify-between items-center shadow-md">
              <h1 className="text-lg font-bold">Dashboard</h1>
              <UserMenu /> {/* Menu użytkownika */}
            </header>

            {/* Dynamiczna treść */}
            <main className="flex-1 flex justify-center items-center bg-gray-50 p-6">
              {children}
            </main>

            {/* Stopka */}
            <footer className="bg-gray-800 text-white text-center p-4 mt-auto shadow-inner">
              &copy; {new Date().getFullYear()} Next.js App
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
