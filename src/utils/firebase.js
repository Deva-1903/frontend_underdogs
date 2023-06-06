import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC6v4oFokqLyb9-iRDCH6cBcvLBzhpZRUs",
  authDomain: "underdogs-fitness-9d740.firebaseapp.com",
  projectId: "underdogs-fitness-9d740",
  storageBucket: "underdogs-fitness-9d740.appspot.com",
  messagingSenderId: "952797632514",
  appId: "1:952797632514:web:1d041cbf5216bbf9752f1b",
  measurementId: "G-X3QNW96P0M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
