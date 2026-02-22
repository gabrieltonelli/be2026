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
            "lang.en": "English"
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
            "lang.en": "English"
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
