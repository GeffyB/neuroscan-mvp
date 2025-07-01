// src/lib/firebase.js

// ==========================================
// Inicialização do Firebase para uso no Next.js
// ==========================================

// Importa funções necessárias do SDK do Firebase

import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuração do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCnDaYan_nRTJvCjFDveJvM3zruFkYH7FQ",
  authDomain: "neuroscan-mvp.firebaseapp.com",
  projectId: "neuroscan-mvp",
  storageBucket: "neuroscan-mvp.firebasestorage.app",
  messagingSenderId: "563089533152",
  appId: "1:563089533152:web:851cda842c0f4105588885"
};

// Inicializa Firebase só uma vez (hot reload friendly)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Exporta a instância do Firestore para uso no app
export const db = getFirestore(app);
