import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSubscription } from '../contexts/SubscriptionContext';
import { X, Check } from 'lucide-react';

const IAPSheet = () => {
    const { isIAPOpen, closeIAP, subscribe } = useSubscription();
    const [processing, setProcessing] = useState(false);
    const [completed, setCompleted] = useState(false);

    // Reset state when opening
    useEffect(() => {
        if (isIAPOpen) {
            setProcessing(false);
            setCompleted(false);
        }
    }, [isIAPOpen]);

    const handleSubscribe = () => {
        setProcessing(true);
        // Mock processing delay
        setTimeout(() => {
            setProcessing(false);
            setCompleted(true);

            // Success delay
            setTimeout(() => {
                subscribe('yearly');
                closeIAP();
            }, 1500);
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isIAPOpen && (
                <>
                    {/* Face ID Verification Overlay - Below Dynamic Island */}
                    <AnimatePresence>
                        {completed && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute top-[60px] left-1/2 -translate-x-1/2 z-[10002] flex flex-col items-center gap-2"
                            >
                                {/* Face ID Success Icon */}
                                <div className="relative">
                                    <svg width="70" height="70" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        {/* Face outline */}
                                        <path d="M15 8C15 8 8 8 8 15" stroke="#34C759" strokeWidth="3" strokeLinecap="round"/>
                                        <path d="M45 8C45 8 52 8 52 15" stroke="#34C759" strokeWidth="3" strokeLinecap="round"/>
                                        <path d="M15 52C15 52 8 52 8 45" stroke="#34C759" strokeWidth="3" strokeLinecap="round"/>
                                        <path d="M45 52C45 52 52 52 52 45" stroke="#34C759" strokeWidth="3" strokeLinecap="round"/>
                                        {/* Eyes */}
                                        <path d="M20 22V28" stroke="#34C759" strokeWidth="2.5" strokeLinecap="round"/>
                                        <path d="M40 22V28" stroke="#34C759" strokeWidth="2.5" strokeLinecap="round"/>
                                        {/* Nose */}
                                        <path d="M30 26V34L27 37" stroke="#34C759" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        {/* Mouth */}
                                        <path d="M22 42C22 42 26 46 30 46C34 46 38 42 38 42" stroke="#34C759" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                    {/* Checkmark badge */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", delay: 0.2 }}
                                        className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#34C759] rounded-full flex items-center justify-center shadow-lg"
                                    >
                                        <Check size={16} strokeWidth={3} className="text-white" />
                                    </motion.div>
                                </div>
                                <span className="text-[14px] font-semibold text-[#34C759]">Face ID Verified</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Backdrop - Inside phone frame */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeIAP}
                        className="absolute inset-0 bg-black/50 backdrop-blur-[1px] z-[10000] flex items-end justify-center rounded-[45px]"
                    >
                        {/* iOS System Sheet */}
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#F2F2F7] w-full rounded-t-[10px] pb-8 overflow-hidden relative"
                            style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.1)' }}
                        >
                            {/* Drag Handle */}
                            <div className="w-full flex justify-center pt-2 pb-1">
                                <div className="w-9 h-1 bg-gray-300 rounded-full" />
                            </div>

                            {/* Header */}
                            <div className="flex justify-between items-center px-4 pb-4 border-b border-gray-200">
                                <button onClick={closeIAP} className="text-blue-500 text-[17px]">Cancel</button>
                                <span className="font-semibold text-black">App Store</span>
                                <button onClick={handleSubscribe} className="text-blue-500 text-[17px] font-semibold" disabled={processing || completed}>
                                    Done
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-4 flex flex-col items-center">
                                {/* App Icon Placeholder */}
                                <div className="w-16 h-16 bg-black rounded-[14px] mb-3 shadow-md" />

                                <h3 className="text-[17px] font-bold text-black mb-1">
                                    A2V Revolution
                                </h3>
                                <p className="text-[13px] text-gray-500 mb-6">
                                    Offers In-App Purchases
                                </p>

                                <div className="w-full bg-white rounded-[10px] overflow-hidden mb-6">
                                    <div className="flex justify-between items-center p-4 border-b border-gray-100">
                                        <div className="flex flex-col">
                                            <span className="text-[17px] font-semibold text-black">A2V Premium (Yearly)</span>
                                            <span className="text-[13px] text-gray-500">Unlock all features</span>
                                        </div>
                                        <div className="text-[17px] font-normal text-black">
                                            $79.99
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-gray-50">
                                        <span className="text-[13px] text-gray-500">Account</span>
                                        <span className="text-[13px] text-gray-500">user@icloud.com</span>
                                    </div>
                                </div>

                                {/* FaceID / Confirm Animation Area */}
                                <div className="h-24 flex items-center justify-center w-full">
                                    {processing ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                            <span className="text-xs text-gray-500">Processing...</span>
                                        </div>
                                    ) : completed ? (
                                        <div className="flex flex-col items-center gap-2 text-green-500">
                                            <Check size={40} strokeWidth={3} />
                                            <span className="text-xs font-bold">Payment Confirmed</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 animate-pulse">
                                            <div className="text-[28px]">☺️</div>
                                            <span className="text-xs text-gray-400">Double Click Side Button</span>
                                        </div>
                                    )}
                                </div>

                                {/* Bottom info */}
                                <p className="text-[11px] text-gray-400 text-center mt-2 px-8 leading-tight">
                                    Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period.
                                </p>
                            </div>

                            {/* Blue Subscribe Button (Bottom Fixed) - mimicking the confirm action */}
                            <div className="absolute bottom-6 left-4 right-4">
                                <button
                                    onClick={handleSubscribe}
                                    disabled={processing || completed}
                                    className={`w-full py-3.5 rounded-[14px] text-white text-[17px] font-bold shadow-sm transition-all ${completed ? 'bg-green-500' : 'bg-[#007AFF] active:bg-[#0062CC]'}`}
                                >
                                    {processing ? '...' : (completed ? 'Done' : 'Subscribe')}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default IAPSheet;
