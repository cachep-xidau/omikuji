import { useState, useEffect, useRef } from 'react';
import { generateSpeech } from '../services/elevenLabsService';

export const useVoiceInteraction = () => {
    const [status, setStatus] = useState('IDLE'); // IDLE, LISTENING, PROCESSING, SPEAKING
    const [transcript, setTranscript] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [error, setError] = useState(null);

    const recognition = useRef(null);
    const audioRef = useRef(new Audio());

    useEffect(() => {
        // Initialize Speech Recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognition.current = new SpeechRecognition();
            recognition.current.continuous = true; // Allow pauses without stopping
            recognition.current.interimResults = true;
            recognition.current.lang = 'en-US';

            recognition.current.onstart = () => {
                setStatus('LISTENING');
                setError(null);
            };

            recognition.current.onresult = (event) => {
                // Combine all results for continuous recognition
                const transcriptText = Array.from(event.results)
                    .map(result => result[0].transcript)
                    .join('');
                setTranscript(transcriptText);
            };

            recognition.current.onerror = (event) => {
                console.error("Speech Rec Error:", event.error);
                if (event.error === 'no-speech') {
                    // Ignore no-speech in continuous mode or let it stay idle
                } else {
                    setError(event.error);
                }
            };

            recognition.current.onend = () => {
                // In continuous mode, if it stops, it might be due to user action or error.
                // We typically just stay IDLE until restarted.
            };
        } else {
            setError("Browser doesn't support Speech Recognition");
        }

        return () => {
            if (recognition.current) {
                recognition.current.stop();
            }
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
            }
        };
    }, []);

    const startListening = () => {
        if (recognition.current) {
            try {
                // Stop any playing audio if user interrupts
                if (audioRef.current && !audioRef.current.paused) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                }

                // If it's already started (but status got out of sync), we might get an error
                // asking to start again. Safe to abort first to ensure fresh start?
                // recognition.current.abort(); 
                // actually, let's just try start.

                recognition.current.start();
            } catch (e) {
                console.log("Start Listening Error:", e);
                // If error is "SpeechRecognition is already started", we should sync status
                if (e.name === 'InvalidStateError' || e.message?.includes('already started')) {
                    setStatus('LISTENING');
                }
            }
        }
    };

    const stopListening = () => {
        if (recognition.current) {
            // abort() stops immediately and doesn't fire onresult/onend in some browsers, 
            // but keeps things cleaner than stop() which tries to return final result.
            // For this flow (turn-taking), abort is safer to strictly "cut mic".
            recognition.current.abort();
            setStatus('IDLE');
        }
    };

    const speak = async (text, onEndCallback) => {
        setStatus('PROCESSING'); // Show processing while fetching audio
        setAiResponse(text);

        try {
            const audioUrl = await generateSpeech(text);

            if (audioRef.current) {
                audioRef.current.src = audioUrl;
                audioRef.current.onplay = () => {
                    setStatus('SPEAKING');
                };
                audioRef.current.onended = () => {
                    setStatus('IDLE');
                    if (onEndCallback) onEndCallback();
                };
                audioRef.current.onerror = (e) => {
                    console.error("Audio Playback Error", e);
                    setStatus('IDLE');
                };

                await audioRef.current.play();
            }
        } catch (err) {
            console.error("ElevenLabs TTS Error:", err);
            setError("Voice Gen Error. Check Key.");
            setStatus('IDLE');
        }
    };

    const clearTranscript = () => {
        setTranscript('');
    };

    return {
        status,
        setStatus, // Allow manual override (e.g. for PROCESSING state)
        transcript,
        aiResponse,
        startListening,
        stopListening,
        speak,
        error,
        clearTranscript
    };
};
