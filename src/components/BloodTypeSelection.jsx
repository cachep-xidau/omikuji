import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { BLOOD_TYPES } from '../data/fortunes';

const BloodTypeSelection = ({ onSelect, onClose }) => {
    const [selectedType, setSelectedType] = useState(null);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">Select Blood Type</h2>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                            Ketsueki-gata (血液型)
                        </p>
                    </div>
                    {onClose && (
                        <button onClick={onClose} className="p-1 rounded-full hover:bg-white/50 transition-colors">
                            <X size={20} className="text-gray-400" />
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="p-6">
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                        In Japanese culture, blood type is believed to reflect personality traits.
                        This helps the AI understand you better. (Data stays on your device).
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                        {BLOOD_TYPES.map((bt) => (
                            <button
                                key={bt.type}
                                onClick={() => setSelectedType(bt)}
                                className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 group ${selectedType?.type === bt.type
                                        ? 'border-red-400 bg-red-50'
                                        : 'border-gray-100 hover:border-red-200 hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-2xl">{bt.icon}</span>
                                    {selectedType?.type === bt.type && (
                                        <div className="bg-red-400 rounded-full p-0.5">
                                            <Check size={12} className="text-white" strokeWidth={3} />
                                        </div>
                                    )}
                                </div>
                                <p className={`font-bold ${selectedType?.type === bt.type ? 'text-red-900' : 'text-gray-900'}`}>
                                    Type {bt.type}
                                </p>
                                <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">
                                    {bt.strengths}
                                </p>
                            </button>
                        ))}
                    </div>

                    {/* Selected Details */}
                    <AnimatePresence mode="wait">
                        {selectedType && (
                            <motion.div
                                key={selectedType.type}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100"
                            >
                                <h4 className="text-sm font-bold text-gray-900 mb-1">
                                    {selectedType.personality_en}
                                </h4>
                                <p className="text-xs text-gray-500 mb-3">{selectedType.personality_jp}</p>

                                <div className="space-y-2">
                                    <div className="flex gap-2 text-xs">
                                        <span className="font-semibold text-gray-700 w-16 shrink-0">Strengths:</span>
                                        <span className="text-gray-600">{selectedType.strengths}</span>
                                    </div>
                                    <div className="flex gap-2 text-xs">
                                        <span className="font-semibold text-gray-700 w-16 shrink-0">Tendencies:</span>
                                        <span className="text-gray-600">{selectedType.tendencies}</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Action */}
                    <button
                        onClick={() => selectedType && onSelect(selectedType.type)}
                        disabled={!selectedType}
                        className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${selectedType
                                ? 'bg-red-500 text-white shadow-lg shadow-red-200 hover:bg-red-600 hover:scale-[1.02]'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Save Profile
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default BloodTypeSelection;
