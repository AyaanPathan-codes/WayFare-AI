// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // if you want analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUa1r9Al4Pwf4jTBuQkjqhHln61ed8m8Y",
  authDomain: "ai-trip-planner-58693.firebaseapp.com",
  projectId: "ai-trip-planner-58693",
  storageBucket: "ai-trip-planner-58693.appspot.com", // ✅ fixed here
  messagingSenderId: "88540365513",
  appId: "1:88540365513:web:9f2458e8b7f1843a330318",
  measurementId: "G-Q3YE0QQ4FV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;

// const analytics = getAnalytics(app); // if needed
