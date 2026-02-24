import axios from 'axios';
import { auth } from '../config/firebase';

// Wi-Fi IP to allow physical mobile device to connect to backend
const BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor profesional: Inyecta el JWT de Firebase en cada petición
api.interceptors.request.use(async (config) => {
    try {
        const user = auth.currentUser;
        if (user) {
            // Obtiene un token fresco automáticamente
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
        const response = await api.get('/contacts');
        return response.data;
    },

    getAmbits: async () => {
        const response = await api.get('/ambits');
        return response.data;
    },

    postRating: async (ratingData: {
        to_contact_id: number,
        attribute_id: number,
        score: number
    }) => {
        const response = await api.post('/ratings', ratingData);
        return response.data;
    }
};

export default api;
