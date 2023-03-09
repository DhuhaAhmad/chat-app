// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-app-2a036.firebaseapp.com",
  projectId: "chat-app-2a036",
  storageBucket: "chat-app-2a036.appspot.com",
  messagingSenderId: "320782040317",
  appId: "1:320782040317:web:6be23e8c397fc080c89294"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();