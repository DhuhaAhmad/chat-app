// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1uVt2woNzxK5weT5ICZGdgf1gULlpppA",
  authDomain: "chat-app-969f5.firebaseapp.com",
  projectId: "chat-app-969f5",
  storageBucket: "chat-app-969f5.appspot.com",
  messagingSenderId: "1004317364190",
  appId: "1:1004317364190:web:08252a3cafbd043ef9174f",
  measurementId: "G-01BFWKJEZH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();



// const analytics = getAnalytics(app);