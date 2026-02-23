import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

const resources = {
    es: {
        translation: {
            "app.name": "Be",
            "app.slogan": "We are perceptions",
            "hero.title1": "Descubre tu",
            "hero.title2": "verdadera esencia",
            "hero.description": "La red social de feedback anónimo diseñada para tu crecimiento personal.",
            "button.start": "Empezar Ahora",
            "feature1.title": "Anonimato Total",
            "feature1.desc": "Calificaciones privadas y seguras por defecto.",
            "feature2.title": "Sincronización Web",
            "feature2.desc": "Vincula tu cuenta con la interface de escritorio.",
            "footer": "© 2026 Be Project. Tu identidad, en perspectiva.",
            "lang.es": "Español",
            "lang.en": "English",
            "wizard.back": "Atrás",
            "wizard.next": "Continuar",
            "wizard.skip": "Omitir",
            "wizard.login.title": "Inicia Sesión",
            "wizard.login.desc": "Identifícate para sincronizar tus contactos y descubrir tu esencia.",
            "wizard.ambits.title": "Elige tus Ámbitos",
            "wizard.ambits.desc": "Selecciona en qué áreas quieres saber cómo te perciben.",
            "wizard.workspace.title": "Unirse a Workspace",
            "wizard.workspace.desc": "¿Tu empresa u organización usa Be? Ingresa el código (Opcional).",
            "wizard.networks.title": "Más Conexiones",
            "wizard.networks.desc": "Vincula otras plataformas para encontrar más contactos de tu entorno.",
            "contacts.title": "Tus Contactos",
            "contacts.desc": "Listos para recibir tu feedback. ¡Comienza el juego!",
            "contacts.start": "Comenzar a Calificar",
            "rating.ambit": "ÁMBITO LABORAL",
            "rating.question": "¿Impuntual o Puntual?",
            "rating.very_negative": "Muy Impuntual",
            "rating.negative": "Impuntual",
            "rating.neutral": "Neutral",
            "rating.positive": "Puntual",
            "rating.very_positive": "Muy Puntual",
            "profile.logout": "Cerrar Sesión",
            "profile.theme": "Cambiar Tema"
        }
    },
    en: {
        translation: {
            "app.name": "Be",
            "app.slogan": "We are perceptions",
            "hero.title1": "Discover your",
            "hero.title2": "true essence",
            "hero.description": "The anonymous feedback social network designed for your personal growth.",
            "button.start": "Start Now",
            "feature1.title": "Total Anonymity",
            "feature1.desc": "Private and secure ratings by default.",
            "feature2.title": "Web Sync",
            "feature2.desc": "Link your account with the desktop interface.",
            "footer": "© 2026 Be Project. Your identity, in perspective.",
            "lang.es": "Spanish",
            "lang.en": "English",
            "wizard.back": "Back",
            "wizard.next": "Continue",
            "wizard.skip": "Skip",
            "wizard.login.title": "Log In",
            "wizard.login.desc": "Identify yourself to sync your contacts and discover your essence.",
            "wizard.ambits.title": "Choose your Ambits",
            "wizard.ambits.desc": "Select the areas where you want to know how you are perceived.",
            "wizard.workspace.title": "Join a Workspace",
            "wizard.workspace.desc": "Does your company use Be? Enter the code (Optional).",
            "wizard.networks.title": "More Connections",
            "wizard.networks.desc": "Link other platforms to find more contacts in your environment.",
            "contacts.title": "Your Contacts",
            "contacts.desc": "Ready to receive your feedback. Let the game begin!",
            "contacts.start": "Start Rating",
            "rating.ambit": "WORK AMBIT",
            "rating.question": "Unpunctual or Punctual?",
            "rating.very_negative": "Very Unpunctual",
            "rating.negative": "Unpunctual",
            "rating.neutral": "Neutral",
            "rating.positive": "Punctual",
            "rating.very_positive": "Very Punctual",
            "profile.logout": "Log Out",
            "profile.theme": "Toggle Theme"
        }
    }
};

const STORE_LANGUAGE_KEY = "settings.lang";

// Language detection
const languageDetector: any = {
    type: 'languageDetector',
    async: true,
    detect: async (callback: (lang: string) => void) => {
        try {
            const savedDataJSON = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
            const lng = savedDataJSON ? savedDataJSON : null;
            const selectLanguage = lng || Localization.getLocales()[0]?.languageCode || 'es';
            callback(selectLanguage);
        } catch (error) {
            console.log('Error reading language', error);
            callback('es');
        }
    },
    init: () => { },
    cacheUserLanguage: async (lng: string) => {
        try {
            await AsyncStorage.setItem(STORE_LANGUAGE_KEY, lng);
        } catch (error) {
            console.log('Error saving language', error);
        }
    }
};

i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'es',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
