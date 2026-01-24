import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
    const { language, toggleLanguage } = useLanguage();

    const options = [
        { id: 'en', label: 'EN' },
        { id: 'ja', label: 'JP' }
    ];

    return (
        <div className="relative flex items-center bg-white rounded-full border border-gray-200 p-1 w-28 h-9 shadow-sm">
            {options.map((option) => (
                <button
                    key={option.id}
                    onClick={() => language !== option.id && toggleLanguage()}
                    className={`relative z-10 flex-1 h-full text-xs font-semibold transition-colors duration-200 flex items-center justify-center rounded-full ${language === option.id ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                        }`}
                    aria-label={`Switch to ${option.label}`}
                >
                    {option.label}
                    {language === option.id && (
                        <motion.div
                            layoutId="active-language-pill"
                            className="absolute inset-0 bg-gray-100 rounded-full shadow-inner -z-10"
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    )}
                </button>
            ))}
        </div>
    );
};

export default LanguageToggle;
