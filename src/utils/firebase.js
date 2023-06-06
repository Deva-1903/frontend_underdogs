import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZnZg5PgUNLYhbBucBkifcy_PYgfj90xs",
  authDomain: "underdogs-fitness.firebaseapp.com",
  projectId: "underdogs-fitness",
  storageBucket: "underdogs-fitness.appspot.com",
  messagingSenderId: "280081822710",
  appId: "1:280081822710:web:2fd560578a8d59697c0dd7",
  measurementId: "G-1HDXWJ00JR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
