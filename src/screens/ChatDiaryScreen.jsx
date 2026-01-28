import { useState, useRef, useEffect } from 'react';
import StatusBar from '../components/StatusBar';
import { ChevronLeft, Send, Sparkles, Footprints, Gift, X, Share2, Crown, History, Feather, Volume2, Square, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDiary } from '../data/DiaryContext';
import FortuneCard from '../components/FortuneCard';
import AISuggestion from '../components/AISuggestion';
import VoiceRecordingModal from '../components/VoiceRecordingModal';
import { useLanguage } from '../contexts/LanguageContext';
import { generateFortuneInsight } from '../utils/mirrorInsightGenerator';
import { getImagePath } from '../utils/imagePath';
import { getDailySeasonGreeting } from '../utils/seasonalGreetings';
import { getCurrentMicroseason } from '../data/microseasons';
import { getAIResponse } from '../utils/aiResponseGenerator';
import FortuneDrawModal from '../components/FortuneDrawModal';
import BloodTypeModal from '../components/BloodTypeModal';

// Unified AI Avatar Component
const AIAvatar = ({ size = 8 }) => (
    <div className={`w-${size} h-${size} rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mr-2 flex-shrink-0 overflow-hidden relative border border-purple-100/50 shadow-sm`}>
        <img
            src={getImagePath('images/companion_avatar.png')}
            alt="AI"
            className="w-full h-full object-cover relative z-10"
            onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
            }}
        />
        <Sparkles
            size={Math.round(size * 2)}
            className="text-white hidden absolute"
        />
    </div>
);

// Mirror Insight Bubble Component (Styled as a friend's message)
const MirrorInsightBubble = ({ data, time }) => (
    <div className="flex justify-start mb-3">
        <AIAvatar />
        <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-white border border-gray-100 text-gray-900 rounded-bl-md shadow-sm">
            <p className="text-sm text-gray-800 leading-relaxed font-medium">
                {data.text}
            </p>
            <p className="text-[10px] mt-1 text-gray-400 font-medium tracking-tight">
                {time}
            </p>
        </div>
    </div>
);

// Voice Message Bubble Component
const VoiceMessageBubble = ({ duration, time }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            setTimeout(() => setIsPlaying(false), 3000);
        }
    };

    return (
        <div className="flex justify-end mb-3">
            <div
                onClick={togglePlay}
                className="max-w-[70%] bg-purple-600 rounded-2xl rounded-br-md px-4 py-3 text-white shadow-md flex items-center gap-3 cursor-pointer hover:bg-purple-700 transition-colors"
            >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Volume2 size={18} className={isPlaying ? 'animate-pulse' : ''} />
                </div>
                <div className="flex-1 min-w-[100px]">
                    <div className="flex items-center gap-1 h-3">
                        {[1, 2, 3, 4, 1, 2, 3, 2, 1, 4, 3, 2].map((v, i) => (
                            <motion.div
                                key={i}
                                animate={isPlaying ? { height: [4, v * 4, 4] } : { height: 4 }}
                                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                className="w-1 bg-white/60 rounded-full"
                                style={{ height: '4px' }}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-1">
                        <span className="text-[10px] opacity-80">{isPlaying ? 'Playing...' : 'Voice message'}</span>
                        <span className="text-[10px] opacity-80 font-mono">0:{duration.toString().padStart(2, '0')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};



// Fortune Trigger Button Bubble
const FortuneTriggerBubble = ({ onClick }) => (
    <div className="flex justify-center mb-6 mt-2 animate-in zoom-in-95 duration-500">
        <button
            onClick={onClick}
            className="group relative overflow-hidden rounded-2xl shadow-xl transition-transform active:scale-95 w-[85%] max-w-[320px]"
        >
            {/* Main Gradient Background */}
            <div
                className="absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                style={{ background: 'linear-gradient(135deg, #F4AA1C 0%, #EE3424 75%)' }}
            ></div>

            {/* Content */}
            <div className="relative p-4 flex items-center justify-center text-center">
                <div>
                    <h3 className="text-white font-bold text-lg leading-tight tracking-tight">Daily Fortune</h3>
                    <p className="text-white/90 text-xs font-medium opacity-90">Reveal your destiny</p>
                </div>
            </div>

            {/* Shimmer Overlay */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-20" />
        </button>
    </div>
);

// Message Bubble Component
const MessageBubble = ({ message, isUser, onFortuneClick, onNavigate }) => {
    const { t } = useLanguage();
    if (message.type === 'mirror_insight') {
        return <MirrorInsightBubble data={message.data} time={message.time} />;
    }

    if (message.type === 'voice_msg') {
        return <VoiceMessageBubble duration={message.duration} time={message.time} />;
    }

    // Legacy support or standalone trigger if needed (though we are merging it)
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
                <AIAvatar />
                <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-white border border-gray-100 text-gray-900 rounded-bl-md shadow-sm">
                    <p className="text-sm leading-relaxed font-medium">
                        {message.text}
                    </p>
                    <div className="mt-3">
                        <button
                            onClick={() => onNavigate('/activity/walking-route')}
                            className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-100 transition-colors w-full justify-center border border-green-100"
                        >
                            <Footprints size={14} />
                            {t('chat.viewMap')}
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
            {!isUser && <AIAvatar />}
            <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${isUser
                ? 'bg-gray-900 text-white rounded-br-md'
                : 'bg-white border border-gray-100 text-gray-900 rounded-bl-md shadow-sm'
                }`}>
                <p className="text-sm leading-relaxed font-medium">{message.text}</p>
                {message.suggestion && (
                    <div className="mt-2 p-2 bg-orange-50 rounded-lg border border-orange-100">
                        <div className="flex items-center gap-2 text-orange-600 mb-1">
                            <Footprints size={14} />
                            <span className="text-xs font-medium">Walking Suggestion</span>
                        </div>
                        <p className="text-xs text-gray-700">{message.suggestion}</p>
                    </div>
                )}

                {/* Embedded Draw Fortune Action */}
                {message.action === 'draw_fortune' && (
                    <div className="mt-2 w-full">
                        <button
                            onClick={() => onFortuneClick(message.id)}
                            className="w-full relative overflow-hidden rounded-xl shadow-sm transition-transform active:scale-95 group border border-orange-100"
                        >
                            {/* Gradient Background */}
                            <div
                                className="absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                                style={{ background: 'linear-gradient(135deg, #F4AA1C 0%, #EE3424 75%)' }}
                            ></div>

                            {/* Shimmer Overlay */}
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-20" />

                            <div className="relative p-3 flex items-center justify-center text-center">
                                <div>
                                    <h3 className="text-white font-bold text-sm leading-tight tracking-tight">Daily Fortune</h3>
                                    <p className="text-white/90 text-[10px] font-medium opacity-90">Reveal your destiny</p>
                                </div>
                            </div>
                        </button>
                    </div>
                )}

                <p className={`text-[10px] mt-1 ${isUser ? 'text-gray-400' : 'text-gray-400'} font-medium tracking-tight`}>
                    {message.time}
                </p>
            </div>
        </div>
    );
};



const ChatDiaryScreen = () => {
    // ... hooks ...
    const navigate = useNavigate();
    const { getTodaysFortune, addEntry, bloodType, isLoading, chatMessages, setChatMessages, userProfile, updateUserProfile } = useDiary();
    const { t, language } = useLanguage();
    const [inputText, setInputText] = useState('');
    const [showFortuneModal, setShowFortuneModal] = useState(false);
    const [showBloodTypeModal, setShowBloodTypeModal] = useState(false);
    const [activeTriggerId, setActiveTriggerId] = useState(null);
    const [isRecording, setIsRecording] = useState(false);

    const messagesEndRef = useRef(null);
    const hasInitialized = useRef(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Check for Blood Type on Mount
    useEffect(() => {
        if (!isLoading && !userProfile.bloodType) {
            setShowBloodTypeModal(true);
        }
    }, [isLoading, userProfile]);

    const handleBloodTypeSelect = (type) => {
        updateUserProfile({ bloodType: type });
        setShowBloodTypeModal(false);
        // Could optionally add a system message here acknowledging the update
    };

    // Initialize Chat Content
    useEffect(() => {
        if (isLoading) return;
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        const now = new Date();
        const todayStr = now.toDateString();
        const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

        // Check if we need to add a daily greeting
        const lastMessage = chatMessages.length > 0 ? chatMessages[chatMessages.length - 1] : null;
        const lastMsgDate = lastMessage ? new Date(lastMessage.timestamp || Date.now()).toDateString() : null;
        const isNewDay = lastMsgDate !== todayStr;

        if (chatMessages.length === 0 || isNewDay) {
            const todayFortune = getTodaysFortune();
            let greetingText = getDailySeasonGreeting();
            let initialMessages = [];

            // 1. Determine Greeting
            if (todayFortune) {
                const insight = generateFortuneInsight(todayFortune, bloodType);
                greetingText = insight.text;
            }

            // Create the main greeting message
            const greetingMsg = {
                id: `greeting-${Date.now()}`,
                text: greetingText,
                isUser: false,
                time: timeStr,
                timestamp: now.toISOString()
            };

            // 2. Attach Fortune Action if not drawn
            if (!todayFortune) {
                greetingMsg.action = 'draw_fortune';
            }

            initialMessages.push(greetingMsg);

            // 3. Add Fortune Result if already drawn (optional, maybe just show it in history/timeline instead?)
            if (todayFortune) {
                initialMessages.push({
                    id: `fortune-${Date.now()}`,
                    type: 'fortune_result',
                    data: todayFortune,
                    time: timeStr,
                    timestamp: now.toISOString()
                });
            }

            setChatMessages(prev => [...prev, ...initialMessages]);
        }
    }, [isLoading, getTodaysFortune, bloodType, chatMessages, setChatMessages]);

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    const handleSend = (textOverride = null) => {
        const textToSend = typeof textOverride === 'string' ? textOverride : inputText;
        if (!textToSend.trim()) return;

        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

        // Removed addEntry here because getCombinedTimeline now includes chatMessages directly

        const userMessage = {
            id: `user-${Date.now()}`,
            text: textToSend,
            isUser: true,
            time: timeStr,
            timestamp: now.toISOString()
        };

        setChatMessages(prev => [...prev, userMessage]);
        setInputText('');

        setTimeout(() => {
            const aiResponse = getAIResponse(textToSend, language);

            const aiMessage = {
                id: `ai-${Date.now()}`,
                ...aiResponse,
                isUser: false,
                time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
                timestamp: new Date().toISOString()
            };

            // Check if response has fortune trigger
            if (aiMessage.fortune) {
                const mergedMsg = {
                    ...aiMessage,
                    fortune: undefined, // Remove the raw text property
                    action: 'draw_fortune' // Use the action flag
                };
                setChatMessages(prev => [...prev, mergedMsg]);
            } else {
                setChatMessages(prev => [...prev, aiMessage]);
            }
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleVoiceFinish = () => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

        // 1. Send Audio Message
        const voiceMsg = {
            id: `voice-${Date.now()}`,
            type: 'voice_msg',
            duration: 8, // Simulating 8 second duration
            isUser: true,
            time: timeStr,
            timestamp: now.toISOString()
        };

        // 2. Send Transcript Message
        const transcriptText = language === 'ja'
            ? "今日はとても良い天気ですね。公園を散歩しようと思います。"
            : "It's a beautiful day today. I think I'll go for a walk in the park.";

        const transcriptMsg = {
            id: `user-${Date.now() + 1}`,
            text: transcriptText,
            isUser: true,
            time: timeStr,
            timestamp: now.toISOString()
        };

        setChatMessages(prev => [...prev, voiceMsg, transcriptMsg]);
        setIsRecording(false);

        // 3. Trigger AI Response
        setTimeout(() => {
            const aiResponse = getAIResponse(transcriptText, language);

            const aiMessage = {
                id: `ai-${Date.now()}`,
                ...aiResponse,
                isUser: false,
                time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
                timestamp: new Date().toISOString()
            };

            setChatMessages(prev => [...prev, aiMessage]);
        }, 1200);
    };

    const handleDrawFortune = () => {
        setShowFortuneModal(true);
    };

    const handleFortuneClick = (msgId) => {
        setActiveTriggerId(msgId);
        setShowFortuneModal(true);
    };

    const handleKeepFortune = (fortune) => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

        setChatMessages(prev => {
            // Check if activeTriggerId corresponds to a standalone "fortune_trigger" or a merged message "action"
            const triggerIdx = prev.findIndex(msg => msg.id === activeTriggerId);
            if (triggerIdx === -1) return prev;

            const triggerMsg = prev[triggerIdx];

            if (triggerMsg.type === 'fortune_trigger') {
                // Standalone: Replace with Result
                const newMessages = [...prev];
                newMessages[triggerIdx] = {
                    ...triggerMsg,
                    type: 'fortune_result',
                    data: fortune,
                    time: timeStr,
                    timestamp: now.toISOString()
                };
                return newMessages;
            } else if (triggerMsg.action === 'draw_fortune') {
                // Merged Bubble: Remove action from bubble, append Result message
                const newMessages = [...prev];
                // 1. Remove action
                newMessages[triggerIdx] = {
                    ...triggerMsg,
                    action: undefined // Hide button
                };
                // 2. Append Fortune Card
                newMessages.push({
                    id: `fortune-result-${Date.now()}`,
                    type: 'fortune_result',
                    data: fortune,
                    time: timeStr,
                    timestamp: now.toISOString()
                });
                return newMessages;
            }
            return prev;
        });

        setShowFortuneModal(false);
        setActiveTriggerId(null);
    };

    return (
        <div className="absolute inset-0 z-50 bg-gray-50 flex flex-col h-full">
            {/* Fake Dynamic Island */}
            <div className="absolute top-[12px] left-1/2 -translate-x-1/2 z-[60] pointer-events-none">
                <div className="w-[126px] h-[37px] bg-black rounded-full flex items-center justify-center">
                    <div className="w-[10px] h-[10px] bg-[#1a1a1a] rounded-full mr-2"></div>
                </div>
            </div>

            <div className="bg-white">
                <StatusBar />
            </div>

            {/* Header */}
            <div className="px-4 py-3 flex items-center gap-3 bg-white flex-shrink-0">
                <button onClick={() => navigate(-1)} className="p-1">
                    <ChevronLeft size={24} className="text-gray-900" />
                </button>
                <div className="flex items-center gap-3">
                    <div>
                        <h1 className="text-base font-semibold text-gray-900">{t('chat.title')}</h1>
                        <p className="text-xs text-green-500">● {t('chat.online')}</p>
                    </div>
                </div>
                <div className="ml-auto flex items-center gap-1">
                    <button
                        onClick={() => navigate('/video-call')}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-full transition-all"
                        title="Video Call"
                    >
                        <Video size={22} />
                    </button>
                    <button
                        onClick={() => navigate('/diary/history')}
                        className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
                        title="Chat History"
                    >
                        <History size={22} />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {chatMessages.map((message) => (
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
                {['chat.walkingTips', 'chat.feelingTired'].map((key, i) => (
                    <button
                        key={i}
                        onClick={() => handleSend(t(key))}
                        className="flex-shrink-0 px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                        {t(key)}
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
                        placeholder={t('chat.placeholder')}
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

            {/* Voice Recording Modal */}
            <VoiceRecordingModal
                isOpen={isRecording}
                onClose={() => setIsRecording(false)}
                onFinish={handleVoiceFinish}
            />

            {/* Fortune Draw Modal */}
            <FortuneDrawModal
                isOpen={showFortuneModal}
                onClose={() => setShowFortuneModal(false)}
                onKeep={handleKeepFortune}
            />

            {/* User Onboarding: Blood Type */}
            <BloodTypeModal
                isOpen={showBloodTypeModal}
                onSelect={handleBloodTypeSelect}
            />
        </div>
    );
};

export default ChatDiaryScreen;
