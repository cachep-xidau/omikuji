import { useState, useEffect, useRef } from 'react';

export const useVoiceInteraction = () => {
    const [status, setStatus] = useState('IDLE'); // IDLE, LISTENING, PROCESSING, SPEAKING
    const [transcript, setTranscript] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [error, setError] = useState(null);

    const recognition = useRef(null);
    const synthesis = useRef(window.speechSynthesis);

    useEffect(() => {
        // Initialize Speech Recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognition.current = new SpeechRecognition();
            recognition.current.continuous = false; // Stop after one sentence for turn-taking
            recognition.current.interimResults = true;
            recognition.current.lang = 'en-US';

            recognition.current.onstart = () => {
                setStatus('LISTENING');
                setError(null);
            };

            recognition.current.onresult = (event) => {
                const current = event.resultIndex;
                const transcriptText = event.results[current][0].transcript;
                setTranscript(transcriptText);
            };

            recognition.current.onerror = (event) => {
                console.error("Speech Rec Error:", event.error);
                if (event.error === 'no-speech') {
                    // Just restart or go to idle
                    setStatus('IDLE');
                } else {
                    setError(event.error);
                    setStatus('IDLE');
                }
            };

            // Don't auto-restart in this simple hook, let the component handle logic
            recognition.current.onend = () => {
                // If we were strictly listening and it stopped without processing (e.g. silence), go to IDLE
                // Component will handle the transition to PROCESSING if transcript exists
            };
        } else {
            setError("Browser doesn't support Speech Recognition");
        }

        return () => {
            if (recognition.current) {
                recognition.current.stop();
            }
            if (synthesis.current) {
                synthesis.current.cancel();
            }
        };
    }, []);

    const startListening = () => {
        if (recognition.current && status !== 'LISTENING') {
            try {
                setTranscript('');
                recognition.current.start();
            } catch (e) {
                console.log("Already started", e);
            }
        }
    };

    const stopListening = () => {
        if (recognition.current) {
            recognition.current.stop();
        }
    };

    const speak = (text, onEndCallback) => {
        if (!synthesis.current) return;

        // Cancel previous speech
        synthesis.current.cancel();

        setStatus('SPEAKING');
        setAiResponse(text);

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        // Attempt to select a female voice if available
        const voices = synthesis.current.getVoices();
        const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google US English'));
        if (femaleVoice) utterance.voice = femaleVoice;

        // Adjust pitch/rate for cute anime effect
        utterance.pitch = 1.2;
        utterance.rate = 1.1;

        utterance.onend = () => {
            setStatus('IDLE');
            if (onEndCallback) onEndCallback();
        };

        utterance.onerror = (e) => {
            console.error("TTS Error", e);
            setStatus('IDLE');
        };

        synthesis.current.speak(utterance);
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
