"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/lib/AuthContext";
import { db } from "@/app/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function ArticlesPage() {
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!user?.uid) {
        console.error("User is not logged in.");
        setIsLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "articles"),
          where("user", "==", `/users/${user.uid}`)
        );
        const querySnapshot = await getDocs(q);
        const fetchedArticles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }

      setIsLoading(false);
    };

    fetchArticles();
  }, [user]);

  if (isLoading) {
    return <p>Ładowanie artykułów...</p>;
  }

  if (!articles.length) {
    return <p className="text-black">Brak artykułów do wyświetlenia.</p>;
  }

  return (
    <div className="p-6 text-black">
      <h1 className="text-3xl mb-6">Twoje Artykuły</h1>
      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="border rounded p-4 shadow">
            <h2 className="text-xl font-bold mb-2">{article.title}</h2>
            <p>{article.content}</p>
            <small className="text-gray-500">
              Data utworzenia:{" "}
              {new Date(article.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
