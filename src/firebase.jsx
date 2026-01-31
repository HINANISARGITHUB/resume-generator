import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getDatabase } from "firebase/database"; // Firestore ki jagah ye use hoga

const firebaseConfig = {
  apiKey: "AIzaSyAMT1pmsgFBwV8tXkZXQ89hCyfK0QPPUCM",
  authDomain: "hackathon-1ae55.firebaseapp.com",
  projectId: "hackathon-1ae55",
  databaseURL: "https://hackathon-1ae55-default-rtdb.firebaseio.com", // RTDB ke liye ye URL zaroori hai
  storageBucket: "hackathon-1ae55.firebasestorage.app",
  messagingSenderId: "997866375626",
  appId: "1:997866375626:web:ca948824a585b2dcd4a733",
  measurementId: "G-11HSCE7HT2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app); // Ab 'db' Realtime Database ko refer karega



