import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Sparkles, Trash2, Scroll } from 'lucide-react';
import FortuneCard from './FortuneCard';
import AISuggestion from './AISuggestion';
import WeeklyReviewCard from './WeeklyReviewCard';
import { getImagePath } from '../utils/imagePath';

const DiaryEntryItem = ({ item, onDelete, onSelect }) => {
    const isAI = item.type === 'observation';
    const isFortune = item.type === 'fortune';
    const isReflection = item.type === 'ai_reflection';
    const isReview = item.type === 'weekly_review';
    const isAIEntry = item.type === 'ai_entry';

    const formattedTime = new Date(item.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    if (isReview) {
        return (
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8 px-2"
            >
                <WeeklyReviewCard data={item} />
            </motion.div>
        );
    }



    if (isFortune) {
        return (
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8 relative px-2"
            >
                <div className="flex items-center gap-2 mb-3">
                    <Scroll size={14} className="text-yellow-600" />
                    <span className="text-[13px] font-bold text-gray-700 uppercase tracking-widest">
                        Daily Fortune • {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
                <div className="w-full">
                    <FortuneCard fortune={item} isTied={item.isTied} />
                </div>
                {item.ai_advice && (
                    <div className="mt-4">
                        <AISuggestion suggestion={item.ai_advice} />
                    </div>
                )}
            </motion.div>
        );
    }

    if (isAIEntry) {
        return (
            <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 px-2"
            >
                {/* Time Header (Outside) */}
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                        <span className="text-[14px] font-medium text-gray-700">
                            {formattedTime}
                        </span>
                        {/* Only show lock if encrypted (AI entries likely not, but good to have logic) */}
                        {item.isEncrypted && <Lock size={12} className="text-gray-300" />}
                    </div>
                </div>

                {/* Content Box */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border border-purple-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-100/40 to-transparent rounded-full blur-2xl -z-10" />

                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full shadow-sm overflow-hidden border border-purple-200">
                            <img
                                src={getImagePath('/images/companion_avatar.png')}
                                alt="Companion"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">
                            The Mirror • AI Journaling
                        </span>
                    </div>
                    <p className="text-gray-800 font-medium leading-relaxed font-serif italic mb-1">
                        "{item.content}"
                    </p>
                </div>
            </motion.div>
        );
    }

    if (isAI) {
        return (
            <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 pl-4 border-l-2 border-purple-200"
            >
                <p className="text-gray-700 italic text-sm leading-relaxed font-serif">
                    "{item.content}"
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onSelect && onSelect(item.id)}
            className="mb-0 border-b border-gray-100 py-4 group relative px-2 hover:bg-gray-50 transition-colors"
        >
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-gray-500">
                        {formattedTime}
                    </span>
                    {item.isEncrypted && <Lock size={12} className="text-gray-300" />}
                </div>
            </div>

            <p className="text-gray-900 text-[16px] leading-relaxed">
                {item.content}
            </p>
            {/* Delete Action (only visible on group hover) */}
            {onDelete && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (confirm("Burn this entry?")) {
                            onDelete(item.id);
                        }
                    }}
                    className="absolute -right-2 top-0 p-2 text-gray-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <Trash2 size={14} />
                </button>
            )}
        </motion.div>
    );
};

export default DiaryEntryItem;
