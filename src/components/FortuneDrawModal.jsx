import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import FortuneCard from './FortuneCard';
import AISuggestion from './AISuggestion';
import OmikujiShaker from './OmikujiShaker'; // Import new component
import { useDiary } from '../data/DiaryContext';
import { useLanguage } from '../contexts/LanguageContext';

const FortuneDrawModal = ({ isOpen, onClose, onKeep }) => {
    const { drawFortune, tieFortune } = useDiary();
    const { t } = useLanguage();

    // States: 'intro', 'shaking', 'dispensing', 'result'
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
        // Animation flow is now controlled by callbacks from OmikujiShaker
        // 1. Shaking starts
        // 2. onShakeComplete -> set 'dispensing'
        // 3. onDispenseComplete -> Draw fortune and show result
    };

    const handleShakeComplete = () => {
        setDrawState('dispensing');
    };

    const handleDispenseComplete = () => {
        const fortune = drawFortune();
        setResult(fortune);
        setDrawState('result');
    };

    const handleTie = () => {
        if (result) {
            tieFortune(result.id);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <AnimatePresence mode="wait">
                {drawState !== 'result' ? (
                    /* --- INTRO / SHAKING / DISPENSING STATE --- */
                    <motion.div
                        key="box"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white rounded-2xl w-full max-w-sm overflow-hidden text-center p-8 shadow-2xl relative flex flex-col items-center"
                    >
                        {drawState === 'intro' && (
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full z-10"
                            >
                                <X size={20} />
                            </button>
                        )}

                        <div className="mb-6 flex justify-center min-h-[250px] items-center">
                            <OmikujiShaker
                                state={drawState}
                                onShakeComplete={handleShakeComplete}
                                onDispenseComplete={handleDispenseComplete}
                            />
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('fortune.title')}</h2>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            {drawState === 'intro' && t('fortune.subtitle.intro')}
                            {drawState === 'shaking' && t('fortune.subtitle.drawing')}
                            {drawState === 'dispensing' && "Here comes your fortune..."}
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
                                onClick={() => onKeep ? onKeep(result) : onClose()}
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
