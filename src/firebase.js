import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs } from "@firebase/firestore"; // Perbarui ini


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARKPFroJ7B5Os5xjNxVMFxfDPiLGm1kb0",
  authDomain: "afganportofolio.firebaseapp.com",
  projectId: "afganportofolio",
  storageBucket: "afganportofolio.firebasestorage.app",
  messagingSenderId: "16682803252",
  appId: "1:16682803252:web:3a1c631a563ff8f4246a61",
  measurementId: "G-147KE2H8CR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };