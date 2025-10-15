import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDFWgUeCWelqABon-3Mf_CEI_RJNo-LN4M",
    authDomain: "chefspeak-4cc0b.firebaseapp.com",
    projectId: "chefspeak-4cc0b",
    storageBucket: "chefspeak-4cc0b.firebasestorage.app",
    messagingSenderId: "879051069263",
    appId: "1:879051069263:web:4113a174f784f90434973a",
    measurementId: "G-6LD54EJ34N"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
