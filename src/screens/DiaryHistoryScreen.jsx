
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Sparkles, Footprints } from 'lucide-react';
import { useDiary } from '../data/DiaryContext';
import { getCurrentMicroseason } from '../data/microseasons';
import { motion, AnimatePresence } from 'framer-motion';
import FortuneCard from '../components/FortuneCard';
import { useLanguage } from '../contexts/LanguageContext';
import { getImagePath } from '../utils/imagePath';
import WeeklyCalendar from '../components/WeeklyCalendar';
import StatusBar from '../components/StatusBar';


const DiaryHistoryScreen = () => {
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const { getCombinedTimeline } = useDiary();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const isInternalScroll = useRef(false);
    const scrollTimeout = useRef(null);

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
                    key: key,
                    items: [],
                    microseason: getCurrentMicroseason(date)
                };
            }
            groups[key].items.push(item);
        });
        return Object.values(groups).sort((a, b) => b.date - a.date);
    }, [allItems]);

    const handleDateSelect = (date) => {
        const key = date.toISOString().split('T')[0];
        const element = document.getElementById(`date-group-${key}`);

        // Update selected date state regardless of element presence
        setSelectedDate(date);

        if (element) {
            isInternalScroll.current = true;
            element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });

            // Clear existing timeout if any
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

            // Release lock after smooth scroll is likely done
            scrollTimeout.current = setTimeout(() => {
                isInternalScroll.current = false;
            }, 800);
        }
    };

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Fixed Header Section */}
            <div className="absolute top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-sm">
                <StatusBar />

                {/* Header */}
                <div className="px-6 py-3 flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ChevronLeft size={24} className="text-gray-900" />
                    </button>

                    <h1 className="text-xl font-bold text-gray-900">{t('history.archive')}</h1>
                </div>

                {/* Sticky Calendar Component */}
                <div className="px-4 pb-2">
                    <WeeklyCalendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative pt-[180px]">
                <VerticalFeedView
                    groups={groupedItems}
                    t={t}
                    onDateVisible={setSelectedDate}
                    isInternalScroll={isInternalScroll}
                />
            </div>
        </div>
    );
};

// --- Sub-Components ---

const VerticalFeedView = ({ groups, t, onDateVisible, isInternalScroll }) => {
    const navigate = useNavigate();
    const { formatDate } = useLanguage();
    const observerRef = useRef(null);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const options = {
            root: scrollContainerRef.current,
            rootMargin: '-10% 0px -70% 0px', // Trigger focus when element hits top 10%
            threshold: 0
        };

        const callback = (entries) => {
            // IF we are currently doing an internal scroll from selecting a date, skip the scroll-sync logic
            if (isInternalScroll.current) return;

            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const dateStr = entry.target.getAttribute('data-date');
                    if (dateStr) {
                        onDateVisible(new Date(dateStr));
                    }
                }
            });
        };

        observerRef.current = new IntersectionObserver(callback, options);

        const timer = setTimeout(() => {
            const targets = document.querySelectorAll('.date-group-section');
            targets.forEach(target => observerRef.current.observe(target));
        }, 300);

        return () => {
            clearTimeout(timer);
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, [groups, onDateVisible, isInternalScroll]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={scrollContainerRef}
            className="h-full overflow-y-auto px-6 pb-24 space-y-8 no-scrollbar scroll-smooth"
        >
            {groups.length === 0 ? (
                <div className="text-center py-20 opacity-40">
                    <p className="text-sm font-medium">No history found</p>
                </div>
            ) : (
                groups.map((group) => (
                    <div
                        key={group.key}
                        id={`date-group-${group.key}`}
                        className="date-group-section"
                        data-date={group.key}
                    >
                        {/* Header for the date group */}
                        <div className="sticky top-0 bg-white/95 backdrop-blur-sm py-3 z-10 border-b border-gray-100 mb-4">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-xl font-bold text-gray-900">
                                    {formatDate(group.date, 'full')}
                                </h3>
                                {group.microseason && (
                                    <div className="flex items-center gap-1.5 bg-stone-50 text-stone-500 rounded-full px-3 py-1">
                                        <span className="text-sm">{group.microseason.icon || '🌸'}</span>
                                        <span className="text-xs font-medium tracking-wide">
                                            {group.microseason.name_en}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4 pl-4 border-l border-gray-100">
                            {group.items.map(item => {
                                // Render different types of content
                                if (item.type === 'fortune' || item.type === 'fortune_result') {
                                    const fortuneData = item.type === 'fortune' ? item : item.data;
                                    return (
                                        <div key={item.id} className="relative group">
                                            <div className="absolute -left-[21px] top-2 w-2.5 h-2.5 rounded-full bg-yellow-400 border-2 border-white" />
                                            <p className="text-gray-400 text-xs mb-2 font-bold uppercase tracking-widest pl-1">
                                                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                <span className="ml-2 bg-yellow-50 text-yellow-600 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">Fortune</span>
                                            </p>
                                            <div className="transform origin-left scale-90 -mt-2">
                                                <FortuneCard fortune={fortuneData} isTied={fortuneData?.isTied} />
                                            </div>
                                        </div>
                                    );
                                }

                                if (item.type === 'chat_user') {
                                    return (
                                        <div key={item.id} className="relative group">
                                            <div className="absolute -left-[21px] top-2 w-2.5 h-2.5 rounded-full bg-blue-400 border-2 border-white" />
                                            <p className="text-gray-400 text-xs mb-1 font-medium tracking-tight flex items-center gap-1">
                                                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">Me</span>
                                            </p>
                                            <div className="bg-gray-900 text-white rounded-xl p-4 text-base leading-relaxed mr-4">
                                                {item.text}
                                            </div>
                                        </div>
                                    );
                                }

                                if (item.type === 'chat_ai' || item.type === 'mirror_insight' || item.type === 'walking_proposal' || item.type === 'ai_entry') {
                                    const isProposal = item.type === 'walking_proposal';
                                    const isInsight = item.type === 'mirror_insight';
                                    const isAIEntry = item.type === 'ai_entry';

                                    return (
                                        <div key={item.id} className="relative group">
                                            <div className="absolute -left-[21px] top-2 w-2.5 h-2.5 rounded-full bg-purple-400 border-2 border-white" />
                                            <p className="text-gray-400 text-xs mb-1 font-medium tracking-tight flex items-center gap-1">
                                                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                <span className="bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">AI</span>
                                            </p>
                                            <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-4 text-base leading-relaxed mr-4">
                                                <div className="flex items-center gap-2 mb-2 text-purple-600">
                                                    <Sparkles size={14} />
                                                    <span className="text-[10px] font-bold uppercase tracking-wider">
                                                        {isInsight ? 'Mirror Insight' : (isAIEntry ? 'The Mirror' : 'AI Companion')}
                                                    </span>
                                                </div>
                                                <p className="text-gray-900 leading-relaxed font-medium">
                                                    {isInsight ? item.data.text : (item.text || item.content)}
                                                </p>
                                                {isProposal && (
                                                    <div className="mt-3">
                                                        <button
                                                            onClick={() => navigate('/activity/walking-route')}
                                                            className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-100 transition-colors w-full justify-center border border-green-100"
                                                        >
                                                            <Footprints size={14} />
                                                            Explore Route
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                }

                                if (item.type === 'fortune_trigger') {
                                    return (
                                        <div key={item.id} className="relative group opacity-50">
                                            <div className="absolute -left-[21px] top-2 w-2.5 h-2.5 rounded-full bg-gray-300 border-2 border-white" />
                                            <p className="text-gray-400 text-xs mb-1 font-medium tracking-tight">
                                                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                            <div className="text-[10px] uppercase font-bold text-gray-400 italic">Fortune Drawn / Skipped</div>
                                        </div>
                                    );
                                }

                                // Default fallback for any other items (Observations or standard entries)
                                return (
                                    <div key={item.id} className="relative group">
                                        <div className="absolute -left-[21px] top-2 w-2.5 h-2.5 rounded-full bg-gray-200 border-2 border-white" />
                                        <p className="text-gray-400 text-xs mb-1 font-medium tracking-tight">
                                            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                        <div className="bg-gray-50 rounded-xl p-4 text-gray-900 text-base leading-relaxed mr-4">
                                            {item.content || item.text}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))
            )}
        </motion.div>
    );
};

export default DiaryHistoryScreen;
