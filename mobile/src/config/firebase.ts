import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

// TODO: Reemplazar con tus credenciales reales de la consola de Firebase
// Proyecto -> Configuración del proyecto -> Tus aplicaciones -> Configuración del SDK
const firebaseConfig = {
    apiKey: "AIzaSyBDKJqq2rcD6RLCu8yyJdFQyrKa24VErhY",
    authDomain: "be2026-975de.firebaseapp.com",
    projectId: "be2026-975de",
    storageBucket: "be2026-975de.firebasestorage.app",
    messagingSenderId: "299651206472",
    appId: "1:299651206472:web:9bfecf68574111097a377d",
    measurementId: "G-EZB8VC5DP9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export default app;
