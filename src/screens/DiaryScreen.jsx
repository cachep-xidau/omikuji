import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Send, Image as ImageIcon, Wind, Scroll, ChevronLeft } from 'lucide-react';
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
import { generateSuggestion } from '../utils/suggestionGenerator';

const DiaryScreen = () => {
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const {
        addEntry,
        getCombinedTimeline,
        userProfile,
        updateUserProfile,
        getTodaysFortune,
        generateWeeklyReview,
        generateAutoAIEntry,
        isLoading
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
    const [aiSuggestion, setAiSuggestion] = useState(null);


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

    // Auto-generate AI Entry
    useEffect(() => {
        if (!isLoading) {
            generateAutoAIEntry();
        }
    }, [isLoading, generateAutoAIEntry]);

    // Generate AI suggestion when date or profile changes
    useEffect(() => {
        const suggestion = generateSuggestion(
            selectedDate,
            userProfile?.bloodType,
            'sunny', // TODO: Get real weather data
            false // TODO: Check if user walked today
        );
        setAiSuggestion(suggestion);
    }, [selectedDate, userProfile]);

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
        <div className="h-full flex flex-col bg-white overflow-hidden relative">
            {/* Feature Modals - Keep absolute/overlay */}
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

            {/* --- FIXED HEAD SECTION --- */}
            <div className="flex-none bg-white z-10 shadow-sm">
                <StatusBar />

                {/* Navigation Header */}
                <div className="px-6 pt-12 pb-2 flex justify-between items-center">
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

                {/* Calendar - Fixed at top */}
                <div className="px-6 pb-2">
                    <WeeklyCalendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
                </div>
            </div>

            {/* --- SCROLLABLE CONTENT SECTION --- */}
            <div className="flex-1 overflow-y-auto px-6 pb-24 pt-4 space-y-6">

                {/* COMBINED CULTURAL CONTEXT CARD (Fortune) */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border border-amber-100 rounded-2xl px-5 py-3 relative overflow-hidden"
                >
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-100/50 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />

                    {/* Microseason Section */}
                    <div className="relative z-10 pb-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                                    {microseason.name_ja} <span className="text-base font-normal text-gray-800 ml-1">- {microseason.name_romaji}</span>
                                </h2>
                            </div>
                            <div className="text-4xl opacity-80">{microseason.icon || '🌸'}</div>
                        </div>
                        <p className="text-base text-gray-800 leading-relaxed italic mt-3">
                            "{microseason.quote}"
                        </p>
                    </div>

                    {/* Fortune Section */}
                    <motion.button
                        onClick={() => setShowFortuneDraw(true)}
                        className="w-full text-left relative z-10"
                        whileTap={{ scale: 0.98 }}
                    >
                        {todaysFortune ? (
                            <div className="flex items-center justify-between bg-gradient-to-r from-amber-100 to-orange-100 -mx-5 -mb-3 px-5 py-4 rounded-b-2xl border-t border-amber-200/50">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div
                                            className="px-2.5 py-0.5 rounded-full text-sm font-bold shadow-sm"
                                            style={{
                                                backgroundColor: todaysFortune.color,
                                                color: '#FFFFFF',
                                                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                            }}
                                        >
                                            {todaysFortune.level}
                                        </div>
                                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">{todaysFortune.level_romaji}</div>
                                    </div>
                                    <p className="text-lg text-gray-800 font-serif font-medium leading-snug">
                                        {todaysFortune.proverb_jp}
                                    </p>
                                </div>
                                <div className="text-2xl opacity-80 filter drop-shadow-sm grayscale-0">
                                    {todaysFortune.level === '大吉' ? '🌸' : '🎋'}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between bg-gradient-to-r from-amber-500 to-orange-500 -mx-5 -mb-3 px-5 py-5 rounded-b-2xl text-white">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Scroll size={20} className="text-yellow-100" />
                                        <span className="font-bold text-lg">{t('fortune.draw')}</span>
                                    </div>
                                    <p className="text-base opacity-100 font-medium">
                                        {t('fortune.guidance')}
                                    </p>
                                </div>

                            </div>
                        )}
                    </motion.button>
                </motion.div>

                {/* --- INPUT SECTION (Account Style) --- */}
                <div className="relative group">
                    <div className="bg-[#F5F5F5] border border-[#E6E3E3] rounded-[12px] p-4 transition-colors focus-within:bg-white focus-within:border-gray-300">
                        <textarea
                            value={inputContent}
                            onChange={(e) => setInputContent(e.target.value)}
                            placeholder={t('input.placeholder')}
                            className="w-full bg-transparent text-gray-900 text-lg leading-relaxed placeholder:text-gray-500 resize-none focus:outline-none min-h-[120px]"
                        />

                        {/* Action Bar */}
                        <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-200/50">
                            <div className="flex gap-2">

                                <button
                                    onClick={handleMicClick}
                                    disabled={!isSupported}
                                    className={`p-3 rounded-full transition-all duration-200 relative ${isRecording
                                        ? 'bg-red-500 text-white animate-pulse'
                                        : isSupported
                                            ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-200/50'
                                            : 'text-gray-400 cursor-not-allowed'
                                        }`}
                                    title={!isSupported ? 'Speech recognition not supported in this browser' : isRecording ? 'Stop recording' : 'Start recording'}
                                >
                                    <Mic size={22} strokeWidth={2} />
                                    {isRecording && (
                                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full animate-ping" />
                                    )}
                                </button>
                                <button className="p-3 text-gray-700 hover:text-gray-900 hover:bg-gray-200/50 rounded-full transition-colors">
                                    <ImageIcon size={22} strokeWidth={2} />
                                </button>
                            </div>

                            <button
                                onClick={handleSend}
                                disabled={!inputContent.trim()}
                                className={`p-3 rounded-full transition-all duration-200 ${inputContent.trim()
                                    ? 'bg-gray-900 text-white shadow-md hover:bg-black'
                                    : 'bg-gray-200 text-gray-500'
                                    }`}
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Timeline (Context) */}
                <div className="pb-12">
                    <div className="bg-white border-y border-gray-100 py-4 mb-4 flex justify-between items-center">
                        <h3 className="text-base font-bold text-gray-800 uppercase tracking-wide">{t('timeline.previous')}</h3>
                        <button
                            onClick={() => navigate('/diary/history')}
                            className="text-base font-semibold text-blue-700 hover:text-blue-800 transition-colors"
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
        </div>
    );
};

export default DiaryScreen;
