import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyARKPFroJ7B5Os5xjNxVMFxfDPiLGm1kb0",
    authDomain: "afganportofolio.firebaseapp.com",
    projectId: "afganportofolio",
    storageBucket: "afganportofolio.firebasestorage.app",
    messagingSenderId: "16682803252",
    appId: "1:16682803252:web:3a1c631a563ff8f4246a61",
    measurementId: "G-147KE2H8CR"
  };

// Initialize with a unique name
const app = initializeApp(firebaseConfig, 'comments-app');
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };