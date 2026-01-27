import { useState, useRef, useEffect } from 'react';
import StatusBar from '../components/StatusBar';
import { ChevronLeft, Send, Sparkles, Footprints, Gift, X, Share2, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDiary } from '../data/DiaryContext';
import FortuneCard from '../components/FortuneCard';
import AISuggestion from '../components/AISuggestion';
import { useLanguage } from '../contexts/LanguageContext';
import { generateFortuneInsight } from '../utils/mirrorInsightGenerator';
import { getImagePath } from '../utils/imagePath';
import { getDailySeasonGreeting } from '../utils/seasonalGreetings';
import { getCurrentMicroseason } from '../data/microseasons';

// Mirror Insight Bubble Component (Styled as a friend's message)
const MirrorInsightBubble = ({ data, time }) => (
    <div className="flex justify-start mb-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mr-2 flex-shrink-0">
            <Sparkles size={16} className="text-white" />
        </div>
        <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-white border border-gray-100 text-gray-900 rounded-bl-md shadow-sm">
            <p className="text-sm text-gray-800 font-serif leading-relaxed">
                {data.text}
            </p>
            <p className="text-[10px] mt-1 text-gray-400">
                {time}
            </p>
        </div>
    </div>
);

// Fortune Draw Modal
const FortuneDrawModal = ({ isOpen, onClose, onKeep }) => {
    const { drawFortune, tieFortune, getTodaysFortune } = useDiary();
    const { t } = useLanguage();
    const [drawState, setDrawState] = useState('intro');
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (isOpen) {
            // Check if already drawn today
            const todayFortune = getTodaysFortune();
            if (todayFortune) {
                setResult(todayFortune);
                setDrawState('result');
            } else {
                setDrawState('intro');
                setResult(null);
            }
        }
    }, [isOpen, getTodaysFortune]);

    const handleDraw = () => {
        setDrawState('shaking');
        setTimeout(() => {
            const fortune = drawFortune();
            setResult(fortune);
            setDrawState('result');
        }, 1500);
    };

    const handleTie = () => {
        if (result) {
            tieFortune(result.id);
            onClose();
        }
    };

    const handleKeep = () => {
        if (onKeep && result) {
            onKeep(result);
        } else {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <AnimatePresence mode="wait">
                {drawState !== 'result' ? (
                    <motion.div
                        key="box"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white rounded-2xl w-full max-w-sm overflow-hidden text-center p-8 shadow-2xl relative"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-6 flex justify-center">
                            <motion.div
                                animate={drawState === 'shaking' ? {
                                    rotate: [0, -10, 10, -10, 10, 0],
                                    y: [0, -5, 5, -5, 0]
                                } : {}}
                                transition={{ duration: 0.5, repeat: drawState === 'shaking' ? Infinity : 0 }}
                                className="text-6xl filter drop-shadow-md"
                            >
                                ⛩️
                            </motion.div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Fortune Draw</h2>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            {drawState === 'shaking'
                                ? 'Drawing your fortune...'
                                : 'Draw your daily fortune to reveal what the universe has in store for you.'}
                        </p>

                        {drawState === 'intro' && (
                            <button
                                onClick={handleDraw}
                                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition-transform active:scale-95 flex items-center justify-center gap-2"
                            >
                                <Sparkles size={18} className="text-yellow-400" />
                                Draw Fortune
                            </button>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-sm relative max-h-[85vh] overflow-y-auto hide-scrollbar p-1"
                    >
                        {/* Close Button (Floating) */}
                        <button
                            onClick={onClose}
                            className="sticky top-2 ml-auto block z-10 p-2 bg-black/20 text-white backdrop-blur-md rounded-full hover:bg-black/30 mb-2"
                        >
                            <X size={20} />
                        </button>

                        <FortuneCard fortune={result} />

                        {/* AI Suggestion Section (Outside Card) */}
                        {result.ai_advice && (
                            <div className="mt-4">
                                <AISuggestion suggestion={result.ai_advice} />
                            </div>
                        )}

                        {/* Actions */}
                        <div className="mt-4 flex gap-3 pb-4">
                            <button
                                onClick={handleKeep}
                                className="flex-1 bg-white text-gray-900 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-50"
                            >
                                Keep Fortune
                            </button>

                            {(result?.level === '凶' || result?.level === '大凶') && (
                                <button
                                    onClick={handleTie}
                                    className="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-red-900/20 hover:bg-red-700"
                                >
                                    Tie to Shrine
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Fortune Trigger Button Bubble
const FortuneTriggerBubble = ({ onClick }) => (
    <div className="flex justify-center mb-6 mt-2 animate-in zoom-in-95 duration-500">
        <button
            onClick={onClick}
            className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-[1px] shadow-lg transition-transform active:scale-95"
        >
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 flex items-center gap-3 group-hover:bg-white/20 transition-colors">
                <div className="bg-white/20 p-2 rounded-full">
                    <Sparkles size={20} className="text-yellow-300 animate-pulse" />
                </div>
                <div className="text-left">
                    <h3 className="text-white font-bold text-sm leading-tight">Daily Fortune Draw</h3>
                    <p className="text-purple-100 text-[10px] uppercase tracking-wider font-medium">Click to Reveal</p>
                </div>
                <Gift size={18} className="text-white ml-2 opacity-80" />
            </div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
        </button>
    </div>
);

// Message Bubble Component
const MessageBubble = ({ message, isUser, onFortuneClick, onNavigate }) => {
    if (message.type === 'mirror_insight') {
        return <MirrorInsightBubble data={message.data} time={message.time} />;
    }

    if (message.type === 'fortune_trigger') {
        return <FortuneTriggerBubble onClick={() => onFortuneClick(message.id)} />;
    }

    if (message.type === 'fortune_result') {
        return (
            <div className="mb-6 animate-in fade-in expand-height duration-700">
                <FortuneCard fortune={message.data} />
            </div>
        );
    }

    if (message.type === 'walking_proposal') {
        return (
            <div className="flex justify-start mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mr-2 flex-shrink-0">
                    <Sparkles size={16} className="text-white" />
                </div>
                <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-white border border-gray-100 text-gray-900 rounded-bl-md shadow-sm">
                    <p className="text-sm font-serif leading-relaxed">
                        {message.text}
                    </p>
                    <div className="mt-3">
                        <button
                            onClick={() => onNavigate('/activity/walking-route')}
                            className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-100 transition-colors w-full justify-center border border-green-100"
                        >
                            <Footprints size={14} />
                            View on map
                        </button>
                    </div>
                    <p className="text-[10px] mt-2 text-gray-400">
                        {message.time}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
            {!isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mr-2 flex-shrink-0">
                    <Sparkles size={16} className="text-white" />
                </div>
            )}
            <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${isUser
                ? 'bg-gray-900 text-white rounded-br-md'
                : 'bg-white border border-gray-100 text-gray-900 rounded-bl-md shadow-sm'
                }`}>
                <p className="text-sm">{message.text}</p>
                {message.suggestion && (
                    <div className="mt-2 p-2 bg-orange-50 rounded-lg border border-orange-100">
                        <div className="flex items-center gap-2 text-orange-600 mb-1">
                            <Footprints size={14} />
                            <span className="text-xs font-medium">Walking Suggestion</span>
                        </div>
                        <p className="text-xs text-gray-700">{message.suggestion}</p>
                    </div>
                )}
                <p className={`text-[10px] mt-1 ${isUser ? 'text-gray-400' : 'text-gray-400'}`}>
                    {message.time}
                </p>
            </div>
        </div>
    );
};

// Fortune Teller AI responses
const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    const now = new Date();
    const hour = now.getHours();

    let greeting = '';
    if (hour < 12) greeting = 'Good morning! ☀️';
    else if (hour < 18) greeting = 'Good afternoon! 🌤️';
    else greeting = 'Good evening! 🌙';

    // Dynamic Weather/Season Logic for Walking Tips
    if (lowerMessage.includes('walking') || lowerMessage.includes('walk') || lowerMessage.includes('tips') || lowerMessage.includes('đi bộ')) {
        const microseason = getCurrentMicroseason(now);
        const seasonName = microseason ? microseason.name_romaji : "Seasonal Transition";

        // Mock Weather (In a real app, fetch from API)
        const weathers = ['Sunny ☀️', 'Cloudy ☁️', 'Cool 🍃', 'Misty 🌫️'];
        const currentWeather = weathers[Math.floor(Math.random() * weathers.length)];

        // Mock Locations
        const locations = ['the nearby park 🌳', 'a quiet shrine ⛩️', 'the riverbank 🌊', 'a local cafe ☕'];
        const location = locations[Math.floor(Math.random() * locations.length)];

        // Random Steps (5000 - 8000)
        const steps = Math.floor(Math.random() * (8000 - 5000 + 1)) + 5000;

        return {
            type: 'walking_proposal',
            text: `With ${currentWeather} weather, during the "${seasonName}", you should walk about ${steps.toLocaleString()} steps to ${location}.`
        };
    }

    if (lowerMessage.includes('fortune') || lowerMessage.includes('luck') || lowerMessage.includes('vận may')) {
        return {
            text: "✨ The cosmic energies are flowing in your favor today!",
            fortune: "You have 1 Fortune Draw available! Tap here to reveal your daily omikuji fortune and unlock special rewards.",
        };
    }

    if (lowerMessage.includes('tired') || lowerMessage.includes('mệt')) {
        return {
            text: "I understand. Even small steps matter. Remember, consistency beats intensity! 🌟",
            suggestion: "Light activity: Just a 10-min gentle walk around your home or office. Every step counts toward your streak!",
        };
    }

    if (lowerMessage.includes('goal') || lowerMessage.includes('mục tiêu')) {
        return {
            text: "Setting intentions is powerful! Your walking journey is unique to you. 🎯",
            suggestion: "Today's personalized goal: 5,000 steps. Break it into 3 sessions - morning (2000), lunch (1500), evening (1500).",
        };
    }

    const responses = [
        {
            text: `${greeting} How are you feeling today? Share your thoughts and I'll guide your walking journey!`,
            fortune: "🎴 Daily reminder: You have 1 Fortune Draw waiting! Don't miss today's special blessing.",
        },
        {
            text: "I'm here to support your wellness journey! Tell me about your day or ask for walking suggestions. 🚶‍♀️",
            suggestion: "Quick tip: Park farther away or take stairs today. Small choices, big impact!",
        },
        {
            text: "Every step you take is a step toward better health! What's on your mind? 💭",
        },
    ];

    return responses[Math.floor(Math.random() * responses.length)];
};

const ChatDiaryScreen = () => {
    const navigate = useNavigate();
    const { getTodaysFortune, addEntry, bloodType, isLoading } = useDiary();
    const [inputText, setInputText] = useState('');
    const [showFortuneModal, setShowFortuneModal] = useState(false);
    const [activeTriggerId, setActiveTriggerId] = useState(null);

    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const hasInitialized = useRef(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Initialize Chat Content
    useEffect(() => {
        if (isLoading) return;
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        const todayFortune = getTodaysFortune();
        let greetingText = getDailySeasonGreeting();
        let initialMessages = [];

        // 1. Determine Greeting
        if (todayFortune) {
            const insight = generateFortuneInsight(todayFortune, bloodType);
            greetingText = insight.text;
        }

        initialMessages.push({
            id: 1,
            text: greetingText,
            isUser: false,
            time: '9:00 AM',
        });

        // 2. Add Fortune Trigger if not drawn, or Result if drawn
        if (todayFortune) {
            console.log("Fortune found, showing result card", todayFortune);
            initialMessages.push({
                id: 2,
                type: 'fortune_result',
                data: todayFortune,
                time: '9:01 AM'
            });
        } else {
            initialMessages.push({
                id: 2,
                type: 'fortune_trigger',
                time: '9:00 AM',
            });
        }

        setMessages(initialMessages);
    }, [isLoading, getTodaysFortune, bloodType]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (textOverride = null) => {
        const textToSend = typeof textOverride === 'string' ? textOverride : inputText;
        if (!textToSend.trim()) return;

        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

        // Save to Diary Context
        addEntry(textToSend, 'entry');

        const userMessage = {
            id: messages.length + 1,
            text: textToSend,
            isUser: true,
            time: timeStr,
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');

        setTimeout(() => {
            const aiResponse = getAIResponse(textToSend);
            const aiMessage = {
                id: messages.length + 2,
                ...aiResponse,
                isUser: false,
                time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
            };

            // Check if response has fortune trigger
            if (aiMessage.fortune) {
                const introMsg = { ...aiMessage, fortune: undefined };
                setMessages(prev => [...prev, introMsg]);

                setTimeout(() => {
                    setMessages(prev => [...prev, {
                        id: Date.now(),
                        type: 'fortune_trigger',
                        time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
                    }]);
                }, 500);
            } else {
                setMessages(prev => [...prev, aiMessage]);
            }
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleFortuneClick = (msgId) => {
        setActiveTriggerId(msgId);
        setShowFortuneModal(true);
    };

    const handleKeepFortune = (fortune) => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

        // 1. Replace the Trigger Button with the Fortune Card Result
        setMessages(prev => prev.map(msg => {
            if (msg.id === activeTriggerId) {
                return {
                    ...msg,
                    type: 'fortune_result',
                    data: fortune,
                    time: timeStr
                };
            }
            return msg;
        }));

        // No AI follow-ups.

        setShowFortuneModal(false);
        setActiveTriggerId(null);
    };

    return (
        <div className="absolute inset-0 z-50 bg-gray-50 flex flex-col h-full">
            <StatusBar />

            {/* Header */}
            <div className="px-4 py-3 flex items-center gap-3 bg-white border-b border-gray-100 flex-shrink-0">
                <button onClick={() => navigate(-1)} className="p-1">
                    <ChevronLeft size={24} className="text-gray-900" />
                </button>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                        <Sparkles size={20} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-base font-semibold text-gray-900">Fortune Teller</h1>
                        <p className="text-xs text-green-500">● Online</p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {messages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                        isUser={message.isUser}
                        onFortuneClick={handleFortuneClick}
                        onNavigate={navigate}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto">
                {['🚶 Walking tips', '😴 Feeling tired'].map((action, i) => (
                    <button
                        key={i}
                        onClick={() => handleSend(action)}
                        className="flex-shrink-0 px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                        {action}
                    </button>
                ))}
            </div>

            {/* Input Area */}
            <div className="px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Write your diary or ask for guidance..."
                        className="flex-1 px-4 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputText.trim()}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${inputText.trim()
                            ? 'bg-purple-500 text-white hover:bg-purple-600'
                            : 'bg-gray-200 text-gray-400'
                            }`}
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>

            {/* Fortune Draw Modal */}
            <FortuneDrawModal
                isOpen={showFortuneModal}
                onClose={() => setShowFortuneModal(false)}
                onKeep={handleKeepFortune}
            />
        </div>
    );
};

export default ChatDiaryScreen;
