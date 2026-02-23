import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Reemplazar con tus credenciales reales de la consola de Firebase
// Proyecto -> Configuración del proyecto -> Tus aplicaciones -> Configuración del SDK
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "tu-sender-id",
    appId: "tu-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
