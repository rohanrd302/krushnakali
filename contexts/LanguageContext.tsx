
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { translations, TranslationKey } from '../utils/translations';

interface Language {
    name: string;
    displayName: string;
}

interface AvailableLanguages {
    [key: string]: Language;
}

interface LanguageContextType {
    language: string;
    setLanguage: (language: string) => void;
    t: (key: TranslationKey) => string;
    availableLanguages: AvailableLanguages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const availableLanguages: AvailableLanguages = {
    en: { name: 'English', displayName: 'English (US)' },
    hi: { name: 'Hindi', displayName: 'हिंदी (Hindi)' },
    mr: { name: 'Marathi', displayName: 'मराठी (Marathi)' },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState('en');

    const t = (key: TranslationKey): string => {
        return translations[language][key] || translations['en'][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
