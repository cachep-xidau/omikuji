import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Grid, BookOpen, Lock, Share2, Scroll } from 'lucide-react';
import { useDiary } from '../data/DiaryContext';
import { getCurrentMicroseason } from '../data/microseasons';
import { motion, AnimatePresence } from 'framer-motion';
import FortuneCard from '../components/FortuneCard';
import { useLanguage } from '../contexts/LanguageContext';

const DiaryHistoryScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t, formatDate } = useLanguage();
    const { getCombinedTimeline } = useDiary();
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'book'

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

    // Handle navigation state for view mode and scrolling
    React.useEffect(() => {
        if (location.state?.viewMode) {
            setViewMode(location.state.viewMode);
        }
    }, [location.state]);

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

                <h1 className="text-lg font-bold text-gray-900">{t('history.archive')}</h1>

                <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'
                            }`}
                    >
                        <Grid size={18} />
                    </button>
                    <button
                        onClick={() => setViewMode('book')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'book' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'
                            }`}
                    >
                        <BookOpen size={18} />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative">
                <AnimatePresence mode="wait">
                    {viewMode === 'list' ? (
                        <VerticalFeedView key="list" groups={groupedItems} t={t} />
                    ) : (
                        <HorizontalBookView
                            key="book"
                            groups={groupedItems}
                            initialTargetDate={location.state?.targetDate}
                            t={t}
                        />
                    )}
                </AnimatePresence>
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
                            <h3 className="text-lg font-bold text-gray-900">
                                {formatDate(group.date, 'full')}
                            </h3>
                            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                                {group.microseason?.name_en || 'Season'}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4 pl-4 border-l border-gray-100">
                        {group.items.map(item => {
                            if (item.type === 'fortune') {
                                return (
                                    <div key={item.id} className="relative group">
                                        <div className="absolute -left-[21px] top-2 w-2.5 h-2.5 rounded-full bg-yellow-400 border-2 border-white" />
                                        <p className="text-gray-400 text-xs mb-2 font-bold uppercase tracking-widest pl-1">
                                            {t('history.dailyDrawing')}
                                        </p>
                                        <div className="transform origin-left scale-95">
                                            <FortuneCard fortune={item} isTied={item.isTied} />
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div key={item.id} className="relative group">
                                    <div className="absolute -left-[21px] top-2 w-2.5 h-2.5 rounded-full bg-gray-200 border-2 border-white" />
                                    <p className="text-gray-600 text-sm mb-1 font-mono">
                                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                    <div className="bg-gray-50 rounded-xl p-4 text-gray-800 text-[15px] leading-relaxed">
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

const HorizontalBookView = ({ groups, initialTargetDate, t }) => {
    const { formatDate } = useLanguage();
    const containerRef = React.useRef(null);
    const itemRefs = React.useRef([]);

    React.useEffect(() => {
        if (initialTargetDate && containerRef.current) {
            const targetDateStr = new Date(initialTargetDate).toDateString();
            const index = groups.findIndex(g => g.date.toDateString() === targetDateStr);

            if (index !== -1 && itemRefs.current[index]) {
                itemRefs.current[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });
            }
        }
    }, [initialTargetDate, groups]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={containerRef}
            className="h-full overflow-x-auto snap-x snap-mandatory flex scrollbar-hide"
        >
            {groups.map((group, i) => (
                <div
                    key={group.date.toISOString()}
                    ref={el => itemRefs.current[i] = el}
                    className="snap-center shrink-0 w-full h-full p-6 flex flex-col"
                >
                    <div className="h-full bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden flex flex-col relative">
                        {/* Book Header (Season) */}
                        <div
                            className="h-32 p-6 flex flex-col justify-end relative"
                            style={{ backgroundColor: group.microseason?.color || '#F3F4F6' }}
                        >
                            <div className="absolute top-4 right-4 text-white/80">
                                <Lock size={16} />
                            </div>
                            <h2 className="text-white text-3xl font-serif font-bold mb-1">
                                {group.date.getDate()}
                            </h2>
                            <p className="text-white/90 font-medium uppercase tracking-widest text-xs">
                                {formatDate(group.date, 'full')}
                            </p>
                        </div>

                        {/* Book Content */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-[linear-gradient(to_bottom,transparent_23px,#E5E7EB_24px)] bg-[size:100%_24px]">
                            {/* Season Context */}
                            <div className="text-center py-4 border-b border-gray-100 mb-2">
                                <p className="text-sm font-bold text-gray-900">{group.microseason?.name_ja}</p>
                                <p className="text-xs text-gray-500 italic mt-1">{group.microseason?.quote}</p>
                            </div>

                            {group.items.map(item => {
                                if (item.type === 'fortune') {
                                    return (
                                        <div key={item.id} className="py-2">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Scroll size={14} className="text-yellow-600" />
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                    {t('history.omikuji')}
                                                </span>
                                            </div>
                                            <FortuneCard fortune={item} isTied={item.isTied} />
                                        </div>
                                    );
                                }

                                return (
                                    <div key={item.id} className="">
                                        <p className="text-gray-900 text-[17px] font-serif leading-[24px]">
                                            {item.content}
                                        </p>
                                        <p className="text-right text-xs text-gray-400 mt-2 font-sans">
                                            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Book Footer */}
                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                            <span>{t('history.page')} {groups.length - i} {t('history.of')} {groups.length}</span>
                            <Share2 size={14} />
                        </div>
                    </div>
                </div>
            ))}
        </motion.div>
    );
};

export default DiaryHistoryScreen;
