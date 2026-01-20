import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, TrendingUp, Calendar } from 'lucide-react';

const WeeklyReviewCard = ({ data }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 shadow-sm"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-full shadow-sm">
                    <BookOpen size={18} className="text-orange-400" />
                </div>
                <h3 className="font-serif text-lg text-gray-800 font-medium">
                    {data.title || "Weekly Review"}
                </h3>
                <span className="text-xs text-gray-400 ml-auto font-mono">
                    {new Date(data.date).toLocaleDateString()}
                </span>
            </div>

            <p className="text-gray-600 leading-relaxed text-sm mb-6 font-sans">
                {data.summary}
            </p>

            {/* Key Themes */}
            <div className="mb-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Key Themes</h4>
                <div className="flex flex-wrap gap-2">
                    {data.keyThemes?.map((theme, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-white border border-orange-100 text-orange-600 text-xs rounded-full shadow-sm"
                        >
                            #{theme}
                        </span>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/60 p-3 rounded-xl border border-orange-100/50">
                    <div className="flex items-center gap-2 mb-1">
                        <TrendingUp size={14} className="text-gray-400" />
                        <span className="text-[10px] text-gray-500 uppercase tracking-wide">Mood</span>
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                        {data.stats?.averageMood || '-'}
                    </span>
                </div>
                <div className="bg-white/60 p-3 rounded-xl border border-orange-100/50">
                    <div className="flex items-center gap-2 mb-1">
                        <Calendar size={14} className="text-gray-400" />
                        <span className="text-[10px] text-gray-500 uppercase tracking-wide">Entries</span>
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                        {data.stats?.totalEntries || 0} written
                    </span>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-orange-100 flex justify-center">
                <span className="text-xs text-orange-400 italic flex items-center gap-1">
                    <Sparkles size={12} />
                    A fresh start awaits next week.
                </span>
            </div>

        </motion.div>
    );
};

export default WeeklyReviewCard;
