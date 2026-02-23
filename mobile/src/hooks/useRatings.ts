import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

export interface Contact {
    id: number;
    name: string;
    avatar_url: string;
    avatarColor?: string; // Compatibility with legacy
    role?: string;
}

export interface Attribute {
    id: number;
    positive_term: string;
    negative_term: string;
    question?: string;
}

export const useRatings = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [ambits, setAmbits] = useState<any[]>([]);
    const [attributes, setAttributes] = useState<Attribute[]>([]);
    const [currentContactIdx, setCurrentContactIdx] = useState(0);
    const [currentAttrIdx, setCurrentAttrIdx] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [fetchedContacts, fetchedAmbits] = await Promise.all([
                apiService.getContacts(),
                apiService.getAmbits()
            ]);

            setContacts(fetchedContacts);
            setAmbits(fetchedAmbits);

            // Default to first ambit's attributes
            if (fetchedAmbits.length > 0 && fetchedAmbits[0].categories.length > 0) {
                const initialAttrs = fetchedAmbits[0].categories.flatMap((cat: any) =>
                    cat.attributes.map((attr: any) => ({
                        ...attr,
                        question: `¿${attr.negative_term} o ${attr.positive_term}?`
                    }))
                );
                setAttributes(initialAttrs);
            }

            setError(null);
        } catch (err) {
            console.error('Error loading ratings data:', err);
            setError('Error al cargar datos del servidor');
        } finally {
            setLoading(false);
        }
    };

    const submitRating = async (score: number) => {
        if (!contacts[currentContactIdx] || !attributes[currentAttrIdx]) return;

        try {
            await apiService.postRating({
                to_contact_id: contacts[currentContactIdx].id,
                attribute_id: attributes[currentAttrIdx].id,
                score
            });
            return true;
        } catch (err) {
            console.error('Error submitting rating:', err);
            return false;
        }
    };

    const nextStep = () => {
        if (currentAttrIdx < attributes.length - 1) {
            setCurrentAttrIdx(prev => prev + 1);
        } else {
            setCurrentAttrIdx(0);
            setCurrentContactIdx(prev => (prev + 1) % contacts.length);
        }
    };

    return {
        contacts,
        attributes,
        currentContactIdx,
        currentAttrIdx,
        loading,
        error,
        nextStep,
        submitRating,
        refresh: loadData
    };
};
