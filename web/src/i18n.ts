import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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
            "footer": "© 2026 Be Project. Tu esencia, en perspectiva.",
            "lang.es": "Español",
            "lang.en": "English",
            "nav.about": "Acerca de",
            "nav.features": "Características",
            "nav.contact": "Contacto",
            "nav.login": "Iniciar Sesión"
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
            "footer": "© 2026 Be Project. Your essense, in perspective.",
            "lang.es": "Spanish",
            "lang.en": "English",
            "nav.about": "About",
            "nav.features": "Features",
            "nav.contact": "Contact",
            "nav.login": "Log In"
        }
    }
};

const STORE_LANGUAGE_KEY = "settings.lang";

const languageDetector: any = {
    type: 'languageDetector',
    async: false,
    detect: () => {
        try {
            const savedLng = localStorage.getItem(STORE_LANGUAGE_KEY);
            if (savedLng) return savedLng;
        } catch (error) { }
        return navigator.language.split('-')[0] || 'es';
    },
    init: () => { },
    cacheUserLanguage: (lng: string) => {
        try {
            localStorage.setItem(STORE_LANGUAGE_KEY, lng);
        } catch (error) { }
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
