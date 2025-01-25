import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSV7iv2AKl7-8Y5Xdkm90ezWXPl1b_-2g",
  authDomain: "next-app-f25f9.firebaseapp.com",
  projectId: "next-app-f25f9",
  storageBucket: "next-app-f25f9.firebasestorage.app",
  messagingSenderId: "1027849786535",
  appId: "1:1027849786535:web:c8fc831301f49e2e677782",
  measurementId: "G-7DD5H6RB9S"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
