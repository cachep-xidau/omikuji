import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Star, Shield, Cloud, Clock, Sparkles, X, Scroll } from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';

const PaywallScreen = () => {
    const navigate = useNavigate();
    const { subscribe, status, skipPaywall } = useSubscription();
    const [billingCycle, setBillingCycle] = useState('yearly'); // 'monthly' | 'yearly'

    const features = [
        { icon: Sparkles, text: "Cultural AI (Microseasons, Omikuji, Blood Type)" },
        { icon: Cloud, text: "5GB Cloud Backup" },
        { icon: Shield, text: "Priority Support" },
        { icon: Star, text: "Exclusive Seasonal Themes" },
        { icon: Clock, text: "Live fortune teller connect" },
        { icon: Scroll, text: "Unlimited Fortune History" }
    ];

    const monthlyPrice = 7.99;
    const yearlyPrice = 79.99;
    const yearlyMonthlyEquivalent = (yearlyPrice / 12).toFixed(2);

    const handleSubscribe = () => {
        subscribe(billingCycle);
        navigate(-1); // Go back to where they came from
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col h-full bg-white relative overflow-hidden"
        >
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-purple-50 to-white -z-10" />

            {/* Header */}
            <div className="p-6 pt-12 text-center relative">
                {status === 'trial' && (
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-0 right-6 p-2 bg-gray-100 rounded-full text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                )}

                <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full text-purple-600 mb-4 shadow-sm">
                    <Star size={24} fill="currentColor" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Upgrade to Plus</h1>
                <p className="text-gray-500 text-sm px-8">
                    Unlock the full potential of your daily journey with A2V functionality.
                </p>
            </div>

            {/* Features List */}
            <div className="flex-1 px-8 py-4 overflow-y-auto">
                <div className="space-y-4">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="p-1.5 bg-green-100 text-green-600 rounded-full">
                                <Check size={14} strokeWidth={3} />
                            </div>
                            <span className="text-gray-700 font-medium text-sm">{feature.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pricing Options */}
            <div className="px-6 py-2">
                <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                    <button
                        onClick={() => setBillingCycle('monthly')}
                        className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all ${billingCycle === 'monthly'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Monthly
                        <div className="text-[10px] font-normal mt-0.5">${monthlyPrice}/mo</div>
                    </button>
                    <button
                        onClick={() => setBillingCycle('yearly')}
                        className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all relative ${billingCycle === 'yearly'
                            ? 'bg-white text-purple-600 shadow-sm ring-1 ring-purple-100'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Yearly
                        <div className="text-[10px] font-normal mt-0.5">${yearlyMonthlyEquivalent}/mo</div>
                        {billingCycle === 'yearly' && (
                            <div className="absolute top-[-8px] right-4 bg-green-500 text-white text-[9px] px-2 py-0.5 rounded-full shadow-sm">
                                SAVE 17%
                            </div>
                        )}
                    </button>
                </div>
            </div>

            {/* CTA */}
            <div className="p-6 pt-0 border-t border-gray-50 bg-white">
                <button
                    onClick={handleSubscribe}
                    className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-purple-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mb-3"
                >
                    Subscribe for ${billingCycle === 'monthly' ? monthlyPrice : yearlyPrice}
                    {billingCycle === 'yearly' && <span className="text-sm font-normal opacity-80">/yr</span>}
                </button>

                {status !== 'trial' && (
                    <button
                        onClick={() => {
                            skipPaywall();
                            navigate('/');
                        }}
                        className="w-full py-3 text-gray-400 font-semibold text-sm hover:text-gray-900 transition-colors mb-2"
                    >
                        Maybe Later
                    </button>
                )}

                <p className="text-center text-[11px] text-gray-400 leading-normal">
                    Recurring billing. Cancel anytime.
                    <br />
                    <span className="underline">Restore Purchases</span> • <span className="underline">Terms</span> • <span className="underline">Privacy</span>
                </p>
            </div>
        </motion.div>
    );
};

export default PaywallScreen;
