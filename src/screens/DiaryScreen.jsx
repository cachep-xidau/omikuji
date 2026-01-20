import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Send, Image as ImageIcon, Sparkles, Wind, Scroll, ChevronLeft } from 'lucide-react';
import { useDiary } from '../data/DiaryContext';
import WeeklyCalendar from '../components/WeeklyCalendar';
import DiaryEntryItem from '../components/DiaryEntryItem';
import { getCurrentMicroseason } from '../data/microseasons';
import BloodTypeSelection from '../components/BloodTypeSelection';
import FortuneDrawModal from '../components/FortuneDrawModal';
import StatusBar from '../components/StatusBar';
import LanguageToggle from '../components/LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

const DiaryScreen = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const {
        addEntry,
        getCombinedTimeline,
        userProfile,
        updateUserProfile,
        getTodaysFortune,
        generateWeeklyReview
    } = useDiary();

    // Speech Recognition
    const {
        transcript,
        interimTranscript,
        isRecording,
        isSupported,
        error: speechError,
        startRecording,
        stopRecording,
        resetTranscript
    } = useSpeechRecognition();

    // Feature Modals
    const [showBloodType, setShowBloodType] = useState(false);
    const [showFortuneDraw, setShowFortuneDraw] = useState(false);
    const [showError, setShowError] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [inputContent, setInputContent] = useState('');

    // Check for missing profile on mount
    useEffect(() => {
        // Only prompt if not set and data is loaded
        if (userProfile && userProfile.bloodType === undefined) {
            // wait a bit for effect
        } else if (userProfile && !userProfile.bloodType) {
            const timer = setTimeout(() => setShowBloodType(true), 1000);
            return () => clearTimeout(timer);
        }
    }, [userProfile]);

    const microseason = getCurrentMicroseason(selectedDate);
    const timelineItems = getCombinedTimeline();
    const todaysFortune = getTodaysFortune();

    const filteredItems = timelineItems.filter(item => {
        const itemDate = new Date(item.timestamp);
        return itemDate.toDateString() === selectedDate.toDateString();
    });

    // Handle transcript updates - update live during recording
    useEffect(() => {
        if (transcript) {
            setInputContent(transcript + (interimTranscript ? ' ' + interimTranscript : ''));
        }
    }, [transcript, interimTranscript]);

    // Clear transcript when recording stops
    useEffect(() => {
        if (!isRecording && transcript) {
            // Keep the final transcript in the input
            setInputContent(transcript);
            // Don't reset transcript here, let user decide
        }
    }, [isRecording, transcript]);

    // Handle speech errors
    useEffect(() => {
        if (speechError) {
            setShowError(true);
            const timer = setTimeout(() => setShowError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [speechError]);

    const handleMicClick = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const handleSend = () => {
        if (!inputContent.trim()) return;
        addEntry(inputContent);
        setInputContent('');
    };

    return (
        <div className="h-full flex flex-col relative bg-white overflow-hidden">
            <div className="absolute top-0 w-full z-50">
                <StatusBar />
            </div>

            {/* Navigation Header */}
            <div className="absolute top-12 left-0 w-full px-6 z-40 flex justify-between items-center">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center text-black hover:opacity-70 transition-opacity gap-1"
                >
                    <ChevronLeft size={32} strokeWidth={2.5} className="-ml-2" />
                    <span className="text-2xl font-bold tracking-tight">{t('nav.diary')}</span>
                </button>

                {/* Language Toggle */}
                <LanguageToggle />
            </div>

            {/* Feature Modals */}
            <AnimatePresence>
                {showBloodType && (
                    <BloodTypeSelection
                        onSelect={(type) => {
                            updateUserProfile({ bloodType: type });
                            setShowBloodType(false);
                        }}
                        onClose={() => setShowBloodType(false)}
                    />
                )}
                {showFortuneDraw && (
                    <FortuneDrawModal
                        isOpen={showFortuneDraw}
                        onClose={() => setShowFortuneDraw(false)}
                    />
                )}
                {/* Error Toast */}
                {showError && speechError && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm max-w-[90%]"
                    >
                        {speechError}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex-1 flex flex-col pt-[100px] pb-24 px-6 relative z-10">
                {/* --- HEADER SECTION --- */}
                <div className="mb-6 space-y-3">
                    {/* Calendar */}
                    <div className="border-b border-gray-100 pb-2">
                        <WeeklyCalendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
                    </div>

                    {/* TWO COLUMN WIDGETS */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* 1. Microseason Card (Compact) */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white border border-gray-100 rounded-xl p-4 relative overflow-hidden h-full flex flex-col justify-between"
                        >
                            <div className="relative z-10">
                                <h2 className="text-[17px] font-bold text-gray-900 leading-tight">{microseason.name_ja}</h2>
                                <p className="text-sm text-gray-500 font-medium">{microseason.name_romaji}</p>
                            </div>
                            <div className="relative z-10 mt-2">
                                <p className="text-xs text-gray-600 leading-snug italic line-clamp-2">
                                    "{microseason.quote}"
                                </p>
                            </div>
                        </motion.div>

                        {/* 2. Fortune Widget (Interactable) */}
                        <motion.button
                            onClick={() => setShowFortuneDraw(true)}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className={`rounded-xl p-4 relative overflow-hidden h-full flex flex-col justify-between text-left transition-all ${todaysFortune
                                ? 'bg-[#FFFDF5] border border-[#E8E4D0]'
                                : 'bg-gray-900 border border-gray-900 text-white shadow-lg shadow-gray-200'
                                }`}
                        >
                            {todaysFortune ? (
                                <>
                                    <div className="flex justify-between items-start">
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                                            {t('fortune.today')}
                                        </span>
                                        {todaysFortune.isTied && <span className="text-[10px]">{t('fortune.tied')}</span>}
                                    </div>
                                    <div>
                                        <div
                                            className="inline-block px-2 py-0.5 rounded text-[10px] items-center gap-1 font-bold mb-1"
                                            style={{ backgroundColor: todaysFortune.color + '20', color: todaysFortune.color === '#FFD700' ? '#B8860B' : todaysFortune.color }}
                                        >
                                            {todaysFortune.level}
                                        </div>
                                        <p className="text-xs text-gray-600 line-clamp-1 font-serif italic">
                                            {todaysFortune.proverb_jp}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="absolute top-0 right-0 p-3 opacity-10 text-white">
                                        <Sparkles size={40} />
                                    </div>
                                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-70">
                                        {t('fortune.daily')}
                                    </span>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Scroll size={16} className="text-yellow-400" />
                                            <span className="font-bold text-sm">{t('fortune.draw')}</span>
                                        </div>
                                        <p className="text-[10px] opacity-70 leading-tight">
                                            {t('fortune.guidance')}
                                        </p>
                                    </div>
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* --- INPUT SECTION (Account Style) --- */}
                <div className="mb-6 relative group">
                    <div className="bg-[#F5F5F5] border border-[#E6E3E3] rounded-[12px] p-4 transition-colors focus-within:bg-white focus-within:border-gray-300">
                        <textarea
                            value={inputContent}
                            onChange={(e) => setInputContent(e.target.value)}
                            placeholder={t('input.placeholder')}
                            className="w-full bg-transparent text-gray-900 text-[16px] leading-relaxed placeholder:text-gray-400 resize-none focus:outline-none min-h-[100px]"
                        />

                        {/* Action Bar */}
                        <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-200/50">
                            <div className="flex gap-2">
                                <button
                                    onClick={handleMicClick}
                                    disabled={!isSupported}
                                    className={`p-2 rounded-full transition-all duration-200 relative ${isRecording
                                        ? 'bg-red-500 text-white animate-pulse'
                                        : isSupported
                                            ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-200/50'
                                            : 'text-gray-300 cursor-not-allowed'
                                        }`}
                                    title={!isSupported ? 'Speech recognition not supported in this browser' : isRecording ? 'Stop recording' : 'Start recording'}
                                >
                                    <Mic size={20} strokeWidth={2} />
                                    {isRecording && (
                                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full animate-ping" />
                                    )}
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200/50 rounded-full transition-colors">
                                    <ImageIcon size={20} strokeWidth={2} />
                                </button>
                            </div>

                            <button
                                onClick={handleSend}
                                disabled={!inputContent.trim()}
                                className={`p-2 rounded-full transition-all duration-200 ${inputContent.trim()
                                    ? 'bg-gray-900 text-white shadow-md hover:bg-black'
                                    : 'bg-gray-200 text-gray-400'
                                    }`}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Timeline (Context) */}
                <div className="h-[320px] overflow-y-auto scrollbar-hide -mx-6 px-6 pb-12">
                    <div className="bg-white border-y border-gray-100 py-3 mb-4 flex justify-between items-center">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase">{t('timeline.previous')}</h3>
                        <button
                            onClick={() => navigate('/diary/history')}
                            className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            {t('timeline.viewAll')}
                        </button>
                    </div>

                    <div className="space-y-4">
                        {filteredItems.length === 0 ? (
                            <div className="text-center py-10 opacity-40">
                                <p className="text-sm text-gray-400 font-medium">{t('timeline.noActivity')}</p>
                            </div>
                        ) : (
                            filteredItems.map(item => (
                                <DiaryEntryItem
                                    key={item.id}
                                    item={item}
                                    onSelect={() => {
                                        if (item.type === 'entry') {
                                            navigate('/diary/history', {
                                                state: {
                                                    targetDate: item.timestamp,
                                                    viewMode: 'book'
                                                }
                                            });
                                        }
                                    }}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DiaryScreen;
