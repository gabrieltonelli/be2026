import axios from 'axios';
import { auth } from '../config/firebase';

// Wi-Fi IP to allow physical mobile device or BlueStacks to connect to backend
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';
const IS_DEV = process.env.EXPO_PUBLIC_DEV_MODE === 'true';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Mock data as fallback for development
const MOCK_CONTACTS = [
    { id: 1, name: 'Gabriel T.', avatar_url: '', color: '#6366f1', ratings: 12, source: 'GOOGLE' },
    { id: 2, name: 'Ana Lopez', avatar_url: '', color: '#ec4899', ratings: 8, source: 'FACEBOOK' },
    { id: 3, name: 'Carlos Ruiz', avatar_url: '', color: '#f59e0b', ratings: 15, source: 'CONTACTS' }
];

const MOCK_AMBITS = [
    {
        id: '1',
        name: 'Laboral',
        categories: [
            {
                id: '1',
                attributes: [
                    { id: '1', positive_term: 'Puntual', negative_term: 'Impuntual' },
                    { id: '2', positive_term: 'Proactivo', negative_term: 'Pasivo' }
                ]
            }
        ]
    }
];

// Interceptor profesional: Inyecta el JWT de Firebase en cada petición
api.interceptors.request.use(async (config) => {
    try {
        const user = auth.currentUser;
        if (user) {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (error) {
        console.error('Error inyectando token:', error);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const apiService = {
    getContacts: async () => {
        try {
            const response = await api.get('/contacts');
            return response.data;
        } catch (error: any) {
            if (IS_DEV && (error.response?.status === 401 || !error.response)) {
                console.log('--- Dev Mode: Usando MOCK_CONTACTS debido a 401 o Error de Red ---');
                return MOCK_CONTACTS;
            }
            throw error;
        }
    },

    getAmbits: async () => {
        try {
            const response = await api.get('/ambits');
            return response.data;
        } catch (error: any) {
            if (IS_DEV && (error.response?.status === 401 || !error.response)) {
                console.log('--- Dev Mode: Usando MOCK_AMBITS debido a 401 o Error de Red ---');
                return MOCK_AMBITS;
            }
            throw error;
        }
    },

    postRating: async (ratingData: {
        to_contact_id: number,
        attribute_id: number | string,
        score: number
    }) => {
        try {
            const response = await api.post('/ratings', ratingData);
            return response.data;
        } catch (error: any) {
            if (IS_DEV) {
                console.log('--- Dev Mode: Simulando postRating exitoso ---', ratingData);
                return { success: true };
            }
            throw error;
        }
    }
};

export default api;
