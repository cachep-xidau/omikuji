import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className="relative w-16 h-8 bg-gray-200 rounded-full p-1 transition-colors hover:bg-gray-300"
            aria-label="Toggle language"
        >
            <motion.div
                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-xs font-bold text-gray-900"
                animate={{
                    left: language === 'en' ? 4 : 36
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
                {language === 'en' ? 'EN' : 'JP'}
            </motion.div>
            <div className="flex justify-between items-center h-full px-2 text-xs font-medium text-gray-500">
                <span className={language === 'en' ? 'opacity-0' : 'opacity-100'}>EN</span>
                <span className={language === 'ja' ? 'opacity-0' : 'opacity-100'}>JP</span>
            </div>
        </button>
    );
};

export default LanguageToggle;
