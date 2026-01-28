import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const BLOOD_TYPES = ['A', 'B', 'O', 'AB', 'Unknown'];

const TRAITS = {
    en: {
        'A': "Earnest, neat, and responsible. You value peace and are a reliable planner.",
        'B': "Passionate, creative, and independent. You follow your own path with curiosity.",
        'O': "Social, confident, and optimistic. You are a natural leader who values harmony.",
        'AB': "Cool, rational, and unique. A blend of sensitivity and logic makes you adaptable.",
        'Unknown': "Discover your unique traits as we journey together."
    },
    ja: {
        'A': "几帳面で真面目、責任感が強いタイプ。平和を愛し、計画的に物事を進めます。",
        'B': "情熱的で独創的、マイペースなタイプ。好奇心旺盛で、独自の道を切り開きます。",
        'O': "社交的で自信に満ち、楽観的なタイプ。調和を大切にする天性のリーダーです。",
        'AB': "冷静で合理的、ユニークなタイプ。感受性と論理性を併せ持ち、適応力があります。",
        'Unknown': "これからの旅を通じて、あなたの隠された才能を見つけましょう。"
    }
};

const UI_TEXT = {
    en: {
        title: "Blood Type",
        subtitle: "To provide personalized wellness advice, please select your blood type.",
        confirm: "Confirm Selection",
        footer: "This creates your unique profile for better AI insights.",
        typePrefix: "Type "
    },
    ja: {
        title: "血液型",
        subtitle: "よりパーソナライズされたアドバイスを提供するため、血液型を教えてください。",
        confirm: "選択を確定",
        footer: "AIによる分析の精度を高めるために使用されます。",
        typePrefix: "血液型: "
    }
};

const BloodTypeModal = ({ isOpen, onSelect }) => {
    const { t, language } = useLanguage();
    const [selectedType, setSelectedType] = useState(null);

    // Initial check to ensure language is valid, fallback to 'en'
    const currentLang = (language === 'ja' || language === 'en') ? language : 'en';

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (selectedType) {
            onSelect(selectedType);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative"
                >
                    {/* Header with decorative background */}
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 text-center border-b border-orange-100 transition-colors duration-300">
                        <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center shadow-sm mb-4">
                            <Droplet size={32} className="text-orange-500 fill-current" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">
                            {selectedType
                                ? `${UI_TEXT[currentLang].typePrefix}${selectedType}`
                                : UI_TEXT[currentLang].title}
                        </h2>
                        <p className="text-gray-600 text-sm animate-in fade-in duration-300 min-h-[40px] flex items-center justify-center">
                            {selectedType
                                ? TRAITS[currentLang][selectedType]
                                : UI_TEXT[currentLang].subtitle
                            }
                        </p>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            {BLOOD_TYPES.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setSelectedType(type)}
                                    className={`
                                        relative py-3 px-2 rounded-xl border-2 transition-all duration-200
                                        flex flex-col items-center justify-center gap-1
                                        ${selectedType === type
                                            ? 'border-red-500 bg-red-50 text-red-700'
                                            : 'border-gray-100 bg-white text-gray-600 hover:border-red-200 hover:bg-red-50/50'
                                        }
                                    `}
                                >
                                    <span className={`font-bold ${type === 'Unknown' ? 'text-sm' : 'text-xl'}`}>
                                        {type}
                                    </span>
                                    {selectedType === type && (
                                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                            <Check size={12} className="text-white" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleConfirm}
                            disabled={!selectedType}
                            className={`
                                w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg
                                flex items-center justify-center gap-2
                                ${selectedType
                                    ? 'text-white hover:shadow-orange-500/25 active:scale-95'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }
                            `}
                            style={selectedType ? { background: 'linear-gradient(135deg, #F4AA1C 0%, #EE3424 50%)' } : {}}
                        >
                            {UI_TEXT[currentLang].confirm}
                        </button>

                        <p className="text-center text-xs text-gray-400 mt-4">
                            {UI_TEXT[currentLang].footer}
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default BloodTypeModal;
