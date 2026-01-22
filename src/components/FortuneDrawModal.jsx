import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import FortuneCard from './FortuneCard';
import AISuggestion from './AISuggestion';
import { useDiary } from '../data/DiaryContext';
import { useLanguage } from '../contexts/LanguageContext';

const FortuneDrawModal = ({ isOpen, onClose }) => {
    const { drawFortune, tieFortune } = useDiary();
    const { t } = useLanguage();

    // States: 'intro', 'shaking', 'revealing', 'result'
    const [drawState, setDrawState] = useState('intro');
    const [result, setResult] = useState(null);

    // Reset when modal opens
    useEffect(() => {
        if (isOpen) {
            setDrawState('intro');
            setResult(null);
        }
    }, [isOpen]);

    const handleDraw = () => {
        setDrawState('shaking');
        // Simulate animation delay
        setTimeout(() => {
            const fortune = drawFortune();
            setResult(fortune);
            setDrawState('result'); // Simplified: skip 'revealing' specific step for now
        }, 1500); // 1.5s shake/draw time
    };

    const handleTie = () => {
        if (result) {
            tieFortune(result.id);
            // Show toast or feedback? For now just close or update UI
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <AnimatePresence mode="wait">
                {drawState !== 'result' ? (
                    /* --- INTRO / SHAKING STATE --- */
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

                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('fortune.title')}</h2>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            {drawState === 'shaking'
                                ? t('fortune.subtitle.drawing')
                                : t('fortune.subtitle.intro')}
                        </p>

                        {drawState === 'intro' && (
                            <button
                                onClick={handleDraw}
                                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition-transform active:scale-95 flex items-center justify-center gap-2"
                            >
                                <Sparkles size={18} className="text-yellow-400" />
                                {t('fortune.button.draw')}
                            </button>
                        )}
                    </motion.div>
                ) : (
                    /* --- RESULT STATE --- */
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
                                onClick={onClose}
                                className="flex-1 bg-white text-gray-900 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-50"
                            >
                                {t('fortune.button.keep')}
                            </button>

                            {/* Only show "Tie" if Bad Luck (Kyō or Daikyō) */}
                            {(result.level === '凶' || result.level === '大凶') && (
                                <button
                                    onClick={handleTie}
                                    className="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-red-900/20 hover:bg-red-700"
                                >
                                    {t('fortune.button.tie')}
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FortuneDrawModal;
