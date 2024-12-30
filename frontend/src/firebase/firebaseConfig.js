// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA8Na2Eu294RQ4mtnybyr1m6ZtnGMyISLk",
  authDomain: "laravel-67dcf.firebaseapp.com",
  projectId: "laravel-67dcf",
  storageBucket: "laravel-67dcf.appspot.com",
 // Correct format for storageBucket
  messagingSenderId: "1002691719531",
  appId: "1:1002691719531:web:102819cfe4a4e673571c2e",
  measurementId: "G-2HGKC59VKC"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export the storage instance
export const storage = getStorage(app);
