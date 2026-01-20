import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const useSpeechRecognition = () => {
    const { language } = useLanguage();
    const [transcript, setTranscript] = useState('');
    const [interimTranscript, setInterimTranscript] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [isSupported, setIsSupported] = useState(false);
    const [error, setError] = useState(null);
    const recognitionRef = useRef(null);
    const finalTranscriptRef = useRef('');
    const silenceTimerRef = useRef(null);

    // Check browser support on mount
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            setIsSupported(true);
            recognitionRef.current = new SpeechRecognition();

            // Configure for continuous real-time recognition
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.maxAlternatives = 1;

            // Set up event handlers
            recognitionRef.current.onresult = (event) => {
                let interim = '';
                let final = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcriptPiece = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        final += transcriptPiece + ' ';
                    } else {
                        interim += transcriptPiece;
                    }
                }

                // Update interim results for real-time display
                if (interim) {
                    setInterimTranscript(interim);
                }

                // When we get final results, append to transcript
                if (final) {
                    finalTranscriptRef.current += final;
                    setTranscript(finalTranscriptRef.current);
                    setInterimTranscript(''); // Clear interim when we have final

                    // Reset silence timer when we get speech
                    resetSilenceTimer();
                }
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error);

                // Don't stop on no-speech error, just continue listening
                if (event.error === 'no-speech') {
                    return;
                }

                setIsRecording(false);
                clearSilenceTimer();

                switch (event.error) {
                    case 'not-allowed':
                        setError('Microphone access denied. Please allow microphone permission.');
                        break;
                    case 'network':
                        setError('Network error. Please check your connection.');
                        break;
                    case 'aborted':
                        // Silently handle aborted errors
                        break;
                    default:
                        setError(`Error: ${event.error}`);
                }
            };

            recognitionRef.current.onend = () => {
                // If we're supposed to be recording, restart it
                if (isRecording) {
                    try {
                        recognitionRef.current.start();
                    } catch (err) {
                        console.error('Error restarting recognition:', err);
                        setIsRecording(false);
                        clearSilenceTimer();
                    }
                } else {
                    clearSilenceTimer();
                }
            };
        } else {
            setIsSupported(false);
            setError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
        }

        return () => {
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.stop();
                } catch (err) {
                    // Ignore errors on cleanup
                }
            }
            clearSilenceTimer();
        };
    }, []);

    // Update language when app language changes
    useEffect(() => {
        if (recognitionRef.current) {
            recognitionRef.current.lang = language === 'ja' ? 'ja-JP' : 'en-US';
        }
    }, [language]);

    const clearSilenceTimer = useCallback(() => {
        if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = null;
        }
    }, []);

    const resetSilenceTimer = useCallback(() => {
        clearSilenceTimer();

        // Auto-stop after 5 seconds of silence
        silenceTimerRef.current = setTimeout(() => {
            if (recognitionRef.current && isRecording) {
                stopRecording();
            }
        }, 5000);
    }, [isRecording, clearSilenceTimer]);

    const startRecording = useCallback(() => {
        if (!isSupported) {
            setError('Speech recognition is not supported in this browser.');
            return;
        }

        setError(null);
        finalTranscriptRef.current = '';
        setTranscript('');
        setInterimTranscript('');

        try {
            recognitionRef.current.start();
            setIsRecording(true);
            resetSilenceTimer();
        } catch (err) {
            console.error('Error starting recognition:', err);
            setError('Failed to start recording. Please try again.');
        }
    }, [isSupported, resetSilenceTimer]);

    const stopRecording = useCallback(() => {
        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch (err) {
                // Ignore errors when stopping
            }
        }
        setIsRecording(false);
        setInterimTranscript('');
        clearSilenceTimer();
    }, [clearSilenceTimer]);

    const resetTranscript = useCallback(() => {
        finalTranscriptRef.current = '';
        setTranscript('');
        setInterimTranscript('');
        setError(null);
    }, []);

    return {
        transcript,
        interimTranscript,
        isRecording,
        isSupported,
        error,
        startRecording,
        stopRecording,
        resetTranscript
    };
};
