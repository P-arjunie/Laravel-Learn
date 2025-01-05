// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";



// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export the storage instance
export const storage = getStorage(app);
