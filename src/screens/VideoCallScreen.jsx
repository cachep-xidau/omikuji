import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Mic, MicOff, PhoneOff, Video } from 'lucide-react';
import { useVoiceInteraction } from '../hooks/useVoiceInteraction';
import { getClaudeResponse } from '../services/claudeService';
import { getImagePath } from '../utils/imagePath';
import { useDiary } from '../data/DiaryContext';

const VideoCallScreen = () => {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const isProcessingRef = useRef(false); // Prevent double processing
    const { addVideoCallMessages } = useDiary();
    const {
        status,
        setStatus,
        transcript,
        aiResponse,
        startListening,
        stopListening,
        speak,
        error,
        clearTranscript
    } = useVoiceInteraction();

    // Conversation History for UI display
    const [lastUserText, setLastUserText] = useState('');
    const [lastAiText, setLastAiText] = useState('');
    const [isMuted, setIsMuted] = useState(false);

    // Track full conversation for saving to diary
    const [conversationHistory, setConversationHistory] = useState([]);

    // Auto-process logic with debounce
    useEffect(() => {
        // Only process if we're listening, have transcript, and not already processing
        if (status === 'LISTENING' && transcript && !isProcessingRef.current) {
            setLastUserText(transcript);

            // Debounce: If user stops talking for 2s, submit to AI
            const timer = setTimeout(() => {
                if (!isProcessingRef.current && transcript.trim().length > 0) {
                    handleProcessAI(transcript);
                }
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [transcript, status]);

    const handleProcessAI = async (text) => {
        if (isProcessingRef.current) return; // Prevent double calls
        isProcessingRef.current = true;

        // Save user message to conversation history
        setConversationHistory(prev => [...prev, { text, isUser: true }]);

        setStatus('PROCESSING');
        stopListening(); // Stop mic while thinking
        clearTranscript(); // Clear transcript to prevent re-processing

        // Call Claude API
        const responseText = await getClaudeResponse(text);
        setLastAiText(responseText);

        // Save AI response to conversation history
        setConversationHistory(prev => [...prev, { text: responseText, isUser: false }]);

        // Speak & Animate
        speak(responseText, () => {
            // On End: Wait a bit before resuming listening to avoid echo
            isProcessingRef.current = false;
            if (!isMuted) {
                setTimeout(() => {
                    startListening();
                }, 500); // 500ms delay to avoid catching TTS echo
            } else {
                setStatus('IDLE');
            }
        });
    };

    const handleToggleMute = () => {
        if (isMuted) {
            setIsMuted(false);
            startListening();
        } else {
            setIsMuted(true);
            stopListening();
            setStatus('IDLE');
        }
    };

    // Video State Management - Always play for demo purposes
    useEffect(() => {
        if (videoRef.current) {
            // For demo: always play the video in loop
            videoRef.current.play().catch(e => console.log("Autoplay blocked:", e));
            videoRef.current.loop = true;
        }
    }, []);

    // Auto-start listening on mount
    useEffect(() => {
        startListening();

        // Cleanup on unmount
        return () => {
            stopListening();
        };
    }, []);

    // Manual Start
    const handleStartCall = () => {
        startListening();
    };

    const handleEndCall = () => {
        stopListening();
        // Save conversation to diary if there were any messages
        if (conversationHistory.length > 0) {
            addVideoCallMessages(conversationHistory);
        }
        navigate(-1);
    };

    const videoSrc = getImagePath('videos/agent_lipsync.mp4');
    const posterSrc = getImagePath('images/sakura_loading.webp');

    return (
        <div className="relative w-full h-full bg-black overflow-hidden flex flex-col">
            {/* Background Video Layer */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    src={videoSrc}
                    poster={posterSrc}
                    className="w-full h-full object-cover"
                    playsInline
                    muted // Muted because we provide audio via TTS
                    preload="auto"
                    onError={(e) => console.error("Video Error:", e)}
                    onLoadedData={() => {
                        console.log("Video Loaded Successfully");
                        // Seek to first frame when loaded
                        if (videoRef.current) {
                            videoRef.current.currentTime = 0;
                        }
                    }}
                />

                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />
            </div>

            {/* Header */}
            <div className="relative z-10 px-4 py-8 flex justify-between items-center text-white">
                <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-medium">Live Call • 00:00</span>
                </div>
                {/* Status Indicator */}
                <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono border border-white/10">
                    {status}
                </div>
            </div>

            {/* Chat Overlay Area (Middle/Center) */}
            <div className="relative z-10 flex-1 flex flex-col justify-end px-6 pb-24 gap-4">

                {/* AI Bubble */}
                {lastAiText && (
                    <div className={`self-start max-w-[85%] animate-in fade-in slide-in-from-left-4 duration-500 ${status === 'SPEAKING' ? 'opacity-100' : 'opacity-80'}`}>
                        <div className="flex items-end gap-2">
                            <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white/20 overflow-hidden shadow-lg">
                                {/* Optional Avatar Image */}
                                <div className="w-full h-full bg-gradient-to-tr from-purple-400 to-pink-500" />
                            </div>
                            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 text-white shadow-sm">
                                <p className="text-sm font-medium leading-relaxed drop-shadow-sm">{lastAiText}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Processing Indicator */}
                {status === 'PROCESSING' && (
                    <div className="self-center animate-pulse flex gap-1">
                        <div className="w-2 h-2 bg-white rounded-full" />
                        <div className="w-2 h-2 bg-white rounded-full animation-delay-75" />
                        <div className="w-2 h-2 bg-white rounded-full animation-delay-150" />
                    </div>
                )}

                {/* User Bubble */}
                {(transcript || lastUserText) && (
                    <div className="self-end max-w-[85%] animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="bg-blue-600/80 backdrop-blur-sm border border-blue-400/30 rounded-2xl rounded-br-sm px-4 py-3 text-white shadow-sm">
                            <p className="text-sm font-medium leading-relaxed">
                                {transcript || lastUserText}
                                {status === 'LISTENING' && <span className="animate-pulse inline-block ml-1">|</span>}
                            </p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="self-center bg-red-500/80 text-white text-xs px-3 py-1 rounded-full">
                        {error}
                    </div>
                )}
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center items-center gap-6">

                {/* Mute/Unmute */}
                <button
                    onClick={handleToggleMute}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${!isMuted ? 'bg-white text-gray-900' : 'bg-white/20 text-white backdrop-blur-md'}`}
                >
                    {!isMuted ? <Mic size={24} /> : <MicOff size={24} />}
                </button>

                {/* End Call */}
                <button
                    onClick={handleEndCall}
                    className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-500/30 transition-transform active:scale-95"
                >
                    <PhoneOff size={32} />
                </button>

                {/* Camera Toggle (Fake) */}
                <button className="w-14 h-14 rounded-full bg-white/20 text-white backdrop-blur-md flex items-center justify-center">
                    <Video size={24} />
                </button>
            </div>
        </div>
    );
};

export default VideoCallScreen;
