import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AISuggestionTooltip = ({ suggestion, onInsert, onRefresh }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { language } = useLanguage();
    const tooltipRef = useRef(null);

    // Close tooltip when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleInsert = () => {
        if (suggestion) {
            const text = language === 'ja' ? suggestion.ja : suggestion.en;
            onInsert(text);
            setIsOpen(false);
        }
    };

    if (!suggestion) return null;

    return (
        <div className="relative" ref={tooltipRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-full transition-all duration-200 ${isOpen
                        ? 'bg-purple-100 text-purple-600'
                        : 'text-purple-400 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                title="AI Suggestion"
            >
                <Sparkles size={20} strokeWidth={2} />
            </button>

            {/* Tooltip */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-14 left-0 w-80 z-50"
                    >
                        <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 rounded-2xl p-4 shadow-xl border border-purple-200/50 backdrop-blur-sm">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">{suggestion.icon}</span>
                                    <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                                        AI Suggestion
                                    </span>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Suggestion Content */}
                            <div className="space-y-2 mb-4">
                                <p className="text-sm text-gray-800 leading-relaxed font-medium">
                                    {language === 'ja' ? suggestion.ja : suggestion.en}
                                </p>
                                {language === 'ja' && (
                                    <p className="text-xs text-gray-500 italic">
                                        {suggestion.en}
                                    </p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <button
                                    onClick={handleInsert}
                                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-sm hover:shadow-md"
                                >
                                    {language === 'ja' ? '使う' : 'Use this'}
                                </button>
                                {onRefresh && (
                                    <button
                                        onClick={() => {
                                            onRefresh();
                                            setIsOpen(false);
                                        }}
                                        className="px-4 py-2 bg-white text-purple-600 text-sm font-medium rounded-lg hover:bg-purple-50 transition-colors border border-purple-200"
                                    >
                                        <Sparkles size={16} />
                                    </button>
                                )}
                            </div>

                            {/* Type Badge */}
                            {suggestion.type && (
                                <div className="mt-3 pt-3 border-t border-purple-200/50">
                                    <span className="inline-block px-2 py-1 bg-white/50 text-xs text-purple-600 rounded-full font-medium">
                                        {suggestion.type === 'weather' && (language === 'ja' ? '天気' : 'Weather')}
                                        {suggestion.type === 'festival' && (language === 'ja' ? '祭り' : 'Festival')}
                                        {suggestion.type === 'season' && (language === 'ja' ? '季節' : 'Season')}
                                        {suggestion.type === 'walking' && (language === 'ja' ? '散歩' : 'Walking')}
                                        {suggestion.type === 'bloodType' && (language === 'ja' ? '血液型' : 'Blood Type')}
                                    </span>
                                    {suggestion.festivalName && (
                                        <span className="ml-2 text-xs text-purple-600 font-medium">
                                            {suggestion.festivalName}
                                        </span>
                                    )}
                                    {suggestion.bloodType && (
                                        <span className="ml-2 text-xs text-purple-600 font-medium">
                                            {suggestion.bloodType}型
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Arrow */}
                        <div className="absolute -bottom-2 left-4 w-4 h-4 bg-gradient-to-br from-purple-50 to-pink-50 border-r border-b border-purple-200/50 transform rotate-45"></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AISuggestionTooltip;
