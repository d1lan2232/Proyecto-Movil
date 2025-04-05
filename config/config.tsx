import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyB-EjQ1tSPs30ijyH83aEjXCtBL0LQf_4A",
  authDomain: "proyecto-movil-e9db9.firebaseapp.com",
  projectId: "proyecto-movil-e9db9",
  storageBucket: "proyecto-movil-e9db9.firebasestorage.app",
  messagingSenderId: "695469663852",
  appId: "1:695469663852:web:82fba1271fe13519c41a49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getDatabase(app);
export const auth= getAuth(app);