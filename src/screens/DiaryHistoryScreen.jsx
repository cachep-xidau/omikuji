
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useDiary } from '../data/DiaryContext';
import { getCurrentMicroseason } from '../data/microseasons';
import { motion, AnimatePresence } from 'framer-motion';
import FortuneCard from '../components/FortuneCard';
import { useLanguage } from '../contexts/LanguageContext';
import { getImagePath } from '../utils/imagePath';


const DiaryHistoryScreen = () => {
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const { getCombinedTimeline } = useDiary();

    const allItems = getCombinedTimeline();

    // Group items by Date (YYYY-MM-DD)
    const groupedItems = useMemo(() => {
        const groups = {};
        allItems.forEach(item => {
            const date = new Date(item.timestamp);
            const key = date.toISOString().split('T')[0];
            if (!groups[key]) {
                groups[key] = {
                    date: date,
                    items: [],
                    microseason: getCurrentMicroseason(date)
                };
            }
            groups[key].items.push(item);
        });
        return Object.values(groups).sort((a, b) => b.date - a.date);
    }, [allItems]);

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Header */}
            <div className="px-6 pt-12 pb-4 flex justify-between items-center bg-white z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ChevronLeft size={24} className="text-gray-900" />
                </button>

                <h1 className="text-xl font-bold text-gray-900">{t('history.archive')}</h1>

                {/* Spacer to balance the back button */}
                <div className="w-10"></div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative">
                <VerticalFeedView groups={groupedItems} t={t} />
            </div>
        </div>
    );
};

// --- Sub-Components ---

const VerticalFeedView = ({ groups, t }) => {
    const { formatDate } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full overflow-y-auto px-6 pb-12 space-y-8"
        >
            {groups.map((group) => (
                <div key={group.date.toISOString()}>
                    <div className="sticky top-0 bg-white/95 backdrop-blur-sm py-3 z-10 border-b border-gray-100 mb-4">
                        <div className="flex justify-between items-baseline">
                            <h3 className="text-xl font-bold text-gray-900">
                                {formatDate(group.date, 'full')}
                            </h3>
                            {/* Removed microseason label */}
                        </div>
                    </div>

                    <div className="space-y-4 pl-4 border-l border-gray-100">
                        {group.items.map(item => {
                            if (item.type === 'fortune') {
                                return (
                                    <div key={item.id} className="relative group">
                                        <div className="absolute -left-[21px] top-2 w-2.5 h-2.5 rounded-full bg-yellow-400 border-2 border-white" />
                                        <p className="text-gray-600 text-sm mb-2 font-bold uppercase tracking-widest pl-1">
                                            {t('history.dailyDrawing')}
                                        </p>
                                        <div className="transform origin-left scale-95">
                                            <FortuneCard fortune={item} isTied={item.isTied} />
                                        </div>
                                    </div>
                                );
                            }

                            if (item.type === 'ai_entry') {
                                return (
                                    <div key={item.id} className="relative group">
                                        <div className="absolute -left-[21px] top-2 w-2.5 h-2.5 rounded-full bg-purple-400 border-2 border-white" />

                                        {/* Time Header */}
                                        <p className="text-gray-600 text-base mb-1 font-mono">
                                            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>

                                        {/* Content Box */}
                                        <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border border-purple-100 rounded-xl p-5 shadow-sm relative overflow-hidden">
                                            <div className="flex items-center gap-2 mb-2 text-purple-600">
                                                <div className="w-6 h-6 rounded-full overflow-hidden border border-purple-200 bg-white">
                                                    <img src={getImagePath('/images/companion_avatar.png')}
                                                        alt="Companion" className="w-full h-full object-cover" />
                                                </div>
                                                <span className="text-[10px] font-bold uppercase tracking-wider">The Mirror</span>
                                            </div>
                                            <p className="text-gray-900 text-lg font-medium italic font-serif leading-relaxed mb-1">
                                                "{item.content}"
                                            </p>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div key={item.id} className="relative group">
                                    <div className="absolute -left-[21px] top-2 w-2.5 h-2.5 rounded-full bg-gray-200 border-2 border-white" />
                                    <p className="text-gray-600 text-base mb-1 font-mono">
                                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                    <div className="bg-gray-50 rounded-xl p-4 text-gray-900 text-lg leading-relaxed">
                                        {item.content}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </motion.div>
    );
};

export default DiaryHistoryScreen;
