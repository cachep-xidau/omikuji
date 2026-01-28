import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, Volume2 } from 'lucide-react';

const VoiceRecordingModal = ({ isOpen, onClose, onFinish }) => {
    const [duration, setDuration] = useState(0);
    const [isStopping, setIsStopping] = useState(false);

    useEffect(() => {
        let interval;
        if (isOpen && !isStopping) {
            interval = setInterval(() => {
                setDuration(prev => prev + 1);
            }, 1000);
        } else {
            setDuration(0);
        }
        return () => clearInterval(interval);
    }, [isOpen, isStopping]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStop = () => {
        setIsStopping(true);
        setTimeout(() => {
            onFinish();
            setIsStopping(false);
            onClose();
        }, 800);
    };

    if (!isOpen && !isStopping) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-white rounded-3xl w-full max-w-[280px] overflow-hidden shadow-2xl p-8 flex flex-col items-center"
                    >
                        <div className="mb-6 relative">
                            {/* Pulse animation */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-purple-100 rounded-full"
                            />
                            <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                <Mic size={40} className="text-white" />
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {isStopping ? 'Processing...' : 'Recording Voice'}
                        </h3>
                        <p className="text-3xl font-mono font-medium text-purple-600 mb-8">
                            {formatTime(duration)}
                        </p>

                        <div className="flex gap-4 w-full">
                            <button
                                onClick={onClose}
                                className="flex-1 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleStop}
                                className="flex-1 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-transform active:scale-95 flex items-center justify-center gap-2"
                            >
                                <Square size={16} fill="currentColor" />
                                Stop
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default VoiceRecordingModal;
