import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, X, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '../contexts/SubscriptionContext';

const PremiumModal = () => {
    const navigate = useNavigate();
    const { isPaywallOpen, closePaywall, openIAP } = useSubscription();

    const handleUnlock = () => {
        closePaywall();
        openIAP();
    };

    return (
        <AnimatePresence>
            {isPaywallOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closePaywall}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-6"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white w-full max-w-[320px] rounded-[32px] p-6 text-center relative shadow-2xl"
                        >
                            <button
                                onClick={closePaywall}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Crown Icon */}
                            <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Crown size={40} className="text-yellow-500" strokeWidth={1.5} />
                            </div>

                            <h2 className="text-xl font-bold text-gray-900 mb-2">
                                Premium Plan
                            </h2>

                            <p className="text-sm text-gray-500 leading-relaxed mb-6 font-medium">
                                Unlock unlimited AI analysis and<br />
                                exclusive video calls with Sakura.
                            </p>

                            <button
                                onClick={handleUnlock}
                                className="w-full bg-[#7C3AED] text-white font-bold py-3.5 rounded-full shadow-lg shadow-purple-500/30 hover:bg-[#6D28D9] transition-all active:scale-[0.98]"
                            >
                                Unlock All Features
                            </button>

                            <p className="text-[10px] text-gray-400 mt-4">
                                Subscription Plan
                            </p>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default PremiumModal;
