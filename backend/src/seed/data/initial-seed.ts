export const SEED_DATA = {
    ambits: [
        {
            name: 'Laboral',
            description: 'Atributos relacionados con el entorno de trabajo',
            icon: 'Briefcase',
            display_order: 1,
            categories: [
                {
                    name: 'Personalidad',
                    display_order: 1,
                    attributes: [
                        { positive_term: 'Puntual', negative_term: 'Impuntual', icon: 'Clock', display_order: 1 },
                        { positive_term: 'Honesto', negative_term: 'Deshonesto', icon: 'ShieldCheck', display_order: 2 },
                    ],
                },
                {
                    name: 'Competitividad',
                    display_order: 2,
                    attributes: [
                        { positive_term: 'Eficiente', negative_term: 'Ineficiente', icon: 'Zap', display_order: 1 },
                    ],
                },
            ],
        },
        {
            name: 'Social',
            description: 'Atributos relacionados con interacciones sociales',
            icon: 'Users',
            display_order: 2,
            categories: [
                {
                    name: 'Empatía',
                    display_order: 1,
                    attributes: [
                        { positive_term: 'Solidario', negative_term: 'Egoísta', icon: 'Heart', display_order: 1 },
                    ],
                },
            ],
        },
    ],
};
