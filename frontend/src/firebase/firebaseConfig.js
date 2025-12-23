import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNigEJM3dT8ZRjGemk94BJ-kfDHFGWKCI",
  authDomain: "binnect-66db0.firebaseapp.com",
  projectId: "binnect-66db0",
  storageBucket: "binnect-66db0.firebasestorage.app",
  messagingSenderId: "1044575773694",
  appId: "1:1044575773694:web:3cb2f24d11a1db97fb96af"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
