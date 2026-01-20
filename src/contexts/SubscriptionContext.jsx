import React, { createContext, useContext, useState, useEffect } from 'react';

const SubscriptionContext = createContext();

export const useSubscription = () => {
    return useContext(SubscriptionContext);
};

const TRIAL_DURATION_DAYS = 14;

export const SubscriptionProvider = ({ children }) => {
    const [status, setStatus] = useState('loading'); // loading, trial, active, expired
    const [trialStartDate, setTrialStartDate] = useState(null);
    const [subscription, setSubscription] = useState(null); // null, 'monthly', 'yearly'
    const [hasSkipped, setHasSkipped] = useState(false);

    useEffect(() => {
        // Load state from localStorage
        const storedTrialStart = localStorage.getItem('trialStartDate');
        const storedSubscription = localStorage.getItem('subscriptionMode');

        let currentStatus = 'trial';
        let startDate = storedTrialStart;

        // Initialize trial if not set
        if (!startDate) {
            startDate = new Date().toISOString();
            localStorage.setItem('trialStartDate', startDate);
        }

        const now = new Date();
        const start = new Date(startDate);
        const daysPassed = (now - start) / (1000 * 60 * 60 * 24);

        if (storedSubscription) {
            currentStatus = 'active';
        } else if (daysPassed > TRIAL_DURATION_DAYS) {
            currentStatus = 'expired';
        } else {
            currentStatus = 'trial';
        }

        setTrialStartDate(startDate);
        setSubscription(storedSubscription);
        setStatus(currentStatus);
    }, []);

    const subscribe = (plan) => {
        // Mock subscription
        localStorage.setItem('subscriptionMode', plan);
        setSubscription(plan);
        setStatus('active');
        setHasSkipped(false);
    };

    const skipPaywall = () => {
        setHasSkipped(true);
    };

    const resetTrial = () => {
        // For debugging
        const now = new Date().toISOString();
        localStorage.setItem('trialStartDate', now);
        localStorage.removeItem('subscriptionMode');
        setTrialStartDate(now);
        setSubscription(null);
        setStatus('trial');
        setHasSkipped(false);
    };

    const expireTrial = () => {
        // For debugging: Set trial start to 15 days ago
        const past = new Date();
        past.setDate(past.getDate() - 15);
        localStorage.setItem('trialStartDate', past.toISOString());
        localStorage.removeItem('subscriptionMode');
        setTrialStartDate(past.toISOString());
        setSubscription(null);
        setStatus('expired');
    };

    const daysRemaining = trialStartDate
        ? Math.max(0, Math.ceil(TRIAL_DURATION_DAYS - ((new Date() - new Date(trialStartDate)) / (1000 * 60 * 60 * 24))))
        : 14;

    const isPremium = status === 'trial' || status === 'active';

    const checkFeatureAccess = (featureId) => {
        // All features unlocked during trial or if subscribed
        // Specific gating logic can be added here if we have "partial" free features
        if (status === 'trial' || status === 'active') return true;

        // Define specifically free features here if any
        // For now, prompt implies Freemium Trial -> All features. 
        // Then Expired -> Block Premium.

        const PREMIUM_FEATURES = [
            'cultural_ai',
            'cloud_backup',
            'priority_support',
            'seasonal_themes',
            'time_capsule',
            'fortune_history_unlimited'
        ];

        if (PREMIUM_FEATURES.includes(featureId)) {
            return false;
        }

        return true;
    };

    return (
        <SubscriptionContext.Provider value={{
            status,
            isPremium,
            daysRemaining,
            subscribe,
            resetTrial,
            expireTrial,
            checkFeatureAccess,
            skipPaywall,
            hasSkipped,
            plan: subscription
        }}>
            {children}
        </SubscriptionContext.Provider>
    );
};
