export default function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl mb-4">404 - Brak strony</h1>
      <p className="mb-8">Nie znaleziono żądanej ścieżki</p>
      <a href="/" className="text-blue-500 underline">
        Wróć do strony głównej
      </a>
    </div>
  );
}
