import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const MirrorInsightCard = ({ insight }) => {
    const { language } = useLanguage();

    if (!insight) return null;

    // Category display names
    const categoryNames = {
        weather_walk: {
            ja: '天気と散歩',
            en: 'Weather & Walk'
        },
        walk: {
            ja: '散歩',
            en: 'Walking'
        },
        season: {
            ja: '季節',
            en: 'Season'
        },
        consistency: {
            ja: '継続',
            en: 'Consistency'
        },
        general: {
            ja: '一般',
            en: 'General'
        }
    };

    const categoryName = categoryNames[insight.category] || categoryNames.general;

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-purple-100 rounded-xl p-4 shadow-sm relative overflow-hidden my-2">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-white rounded-full shadow-sm text-purple-600">
                    <Sparkles size={14} fill="currentColor" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                    The Mirror • {language === 'ja' ? categoryName.ja : categoryName.en}
                </span>
            </div>

            {/* Insight Text */}
            <p className="text-gray-700 text-sm font-medium leading-relaxed font-serif italic">
                "{insight.text}"
            </p>

            {/* Decorative gradient overlay */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-100/30 to-transparent rounded-full blur-2xl -z-10" />
        </div>
    );
};

export default MirrorInsightCard;
