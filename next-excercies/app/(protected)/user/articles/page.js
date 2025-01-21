"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/app/lib/firebase";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { useAuth } from "@/app/lib/AuthContext";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function ArticlesPage() {
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      // Jeśli user nie jest zalogowany, pomijamy
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        // Tworzymy referencję do dokumentu bieżącego użytkownika
        const userRef = doc(db, "users", user.uid);

        // Zapytanie: znajdź w "articles" te dokumenty, gdzie "user" == userRef
        const articlesRef = collection(db, "articles");
        const q = query(articlesRef, where("user", "==", userRef));

        const querySnapshot = await getDocs(q);
        console.log("Znaleziono dokumentów:", querySnapshot.size);

        if (querySnapshot.empty) {
          setArticles([]);
        } else {
          // Konwertujemy wyniki na prostą tablicę JS
          const fetched = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setArticles(fetched);
        }
      } catch (error) {
        console.error("Błąd przy pobieraniu artykułów:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [user]);

  if (loading) {
    return <p>Ładowanie...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-xl font-bold">Twoje artykuły</h2>

      {articles.length === 0 ? (
        <p>Brak artykułów.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {articles.map((article) => {
            // Zakładam, że 'article.date' to Timestamp
            // Jeśli to string w formacie ISO, wystarczy new Date(article.date)
            let displayDate = "Brak daty";
            if (article.date) {
              // Sprawdzamy, czy to Timestamp (posiada .toDate())
              if (typeof article.date.toDate === "function") {
                displayDate = article.date.toDate().toLocaleString();
              } else {
                // Ewentualnie to string w formacie akceptowanym przez new Date()
                const parsed = new Date(article.date);
                if (!isNaN(parsed)) {
                  displayDate = parsed.toLocaleString();
                }
              }
            }

            return (
              <Card key={article.id} className="p-2">
                <CardHeader>
                  <h3 className="font-semibold">{article.title}</h3>
                </CardHeader>
                <CardContent>
                  <p>{article.content}</p>
                </CardContent>
                <CardFooter>
                  <small>{displayDate}</small>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
