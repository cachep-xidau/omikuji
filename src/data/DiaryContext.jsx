import { createContext, useContext, useState, useEffect } from 'react';
import { FORTUNES, BLOOD_TYPE_WORK_ADVICE } from './fortunes';
import { getCurrentMicroseason } from './microseasons';
import { generateMirrorInsight } from '../utils/mirrorInsightGenerator';
import { useLanguage } from '../contexts/LanguageContext';

const DiaryContext = createContext();

export const useDiary = () => {
    const context = useContext(DiaryContext);
    if (!context) {
        throw new Error('useDiary must be used within a DiaryProvider');
    }
    return context;
};

const MOCK_AI_OBSERVATIONS = [
    {
        id: 'ai-obs-1',
        type: 'observation',
        content: 'You seem to walk more on sunny mornings. ☀️',
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    }
];

export const DiaryProvider = ({ children }) => {
    const { language } = useLanguage();
    const [entries, setEntries] = useState([]);
    // New Feature State
    const [userProfile, setUserProfile] = useState({ bloodType: null });
    const [fortuneHistory, setFortuneHistory] = useState([]);
    const [aiReflections, setAiReflections] = useState([]);
    const [weeklyReviews, setWeeklyReviews] = useState([]);
    const [latestAdvice, setLatestAdvice] = useState(null); // New State for Home Screen Advice

    const [isLoading, setIsLoading] = useState(true);

    // Load from local storage on mount
    useEffect(() => {
        const loadAll = () => {
            try {
                // Entries
                const storedEntries = localStorage.getItem('kokoro_diary_entries');
                if (storedEntries) {
                    setEntries(JSON.parse(storedEntries));
                } else {
                    // Generate Dummy Data for Demo (Past 14 Days) - simplified for brevity, kept existing logic
                    const dummyData = [];
                    const now = new Date();
                    for (let i = 0; i < 14; i++) {
                        const date = new Date(now);
                        date.setDate(now.getDate() - i);
                        if (Math.random() > 0.2) {
                            dummyData.push({
                                id: crypto.randomUUID(),
                                type: 'entry',
                                content: `Reflection for ${date.toLocaleDateString()}: The air feels crisp today. I noticed the small changes in the light.`,
                                timestamp: date.toISOString(),
                                lastModified: date.toISOString(),
                                isEncrypted: true,
                            });
                        }
                    }
                    setEntries(dummyData);
                }

                // Profile
                const storedProfile = localStorage.getItem('kokoro_user_profile');
                if (storedProfile) setUserProfile(JSON.parse(storedProfile));

                // Fortunes
                const storedFortunes = localStorage.getItem('kokoro_fortune_history');
                if (storedFortunes) setFortuneHistory(JSON.parse(storedFortunes));

                // AI Reflections
                const storedReflections = localStorage.getItem('kokoro_ai_reflections');
                if (storedReflections) setAiReflections(JSON.parse(storedReflections));

                // Weekly Reviews
                const storedReviews = localStorage.getItem('kokoro_weekly_reviews');
                if (storedReviews) setWeeklyReviews(JSON.parse(storedReviews));

                // Latest Advice
                const storedAdvice = localStorage.getItem('kokoro_latest_advice');
                if (storedAdvice) setLatestAdvice(JSON.parse(storedAdvice));

            } catch (error) {
                console.error("Failed to load diary data", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadAll();
    }, []);

    // Save Effects
    useEffect(() => {
        if (!isLoading) localStorage.setItem('kokoro_diary_entries', JSON.stringify(entries));
    }, [entries, isLoading]);

    useEffect(() => {
        if (!isLoading) localStorage.setItem('kokoro_user_profile', JSON.stringify(userProfile));
    }, [userProfile, isLoading]);

    useEffect(() => {
        if (!isLoading) localStorage.setItem('kokoro_fortune_history', JSON.stringify(fortuneHistory));
    }, [fortuneHistory, isLoading]);

    useEffect(() => {
        if (!isLoading) localStorage.setItem('kokoro_ai_reflections', JSON.stringify(aiReflections));
    }, [aiReflections, isLoading]);

    useEffect(() => {
        if (!isLoading) localStorage.setItem('kokoro_weekly_reviews', JSON.stringify(weeklyReviews));
    }, [weeklyReviews, isLoading]);

    useEffect(() => {
        if (!isLoading && latestAdvice) localStorage.setItem('kokoro_latest_advice', JSON.stringify(latestAdvice));
    }, [latestAdvice, isLoading]);


    // --- AI Logic (The Mirror) ---
    const analyzeContent = (content) => {
        const lower = content.toLowerCase();
        let topic = 'General';
        let sentiment = 'neutral';
        let suggestion = 'Take a moment to breathe.';

        if (lower.includes('tired') || lower.includes('exhausted') || lower.includes('sleep')) {
            topic = 'Rest';
            sentiment = 'concerned';
            suggestion = 'Rest is not a wasted time. It is a necessary refueling.';
        } else if (lower.includes('happy') || lower.includes('excited') || lower.includes('great')) {
            topic = 'Joy';
            sentiment = 'positive';
            suggestion = 'Hold onto this feeling. It is a light for darker days.';
        } else if (lower.includes('sad') || lower.includes('lonely') || lower.includes('cry')) {
            topic = 'Comfort';
            sentiment = 'empathetic';
            suggestion = 'It is okay not to be okay. The rain must fall for flowers to grow.';
        } else if (lower.includes('work') || lower.includes('busy') || lower.includes('stress')) {
            topic = 'Balance';
            sentiment = 'neutral';
            suggestion = 'Remember, you are a human being, not a human doing.';
        }

        return { topic, sentiment, suggestion };
    };

    const generateWeeklyReview = () => {
        // Mock logic: Aggregate last 7 days
        const review = {
            id: crypto.randomUUID(),
            type: 'weekly_review',
            timestamp: new Date().toISOString(),
            title: 'Weekly Reflection',
            summary: 'This week kept you busy, but you found moments of joy. You focused on connection and rest.',
            keyThemes: ['Balance', 'Growth', 'Rest'],
            stats: {
                entries: entries.length,
                mood: 'Balanced'
            }
        };
        setWeeklyReviews(prev => [review, ...prev]);
        return review;
    };


    const addEntry = (content, type = 'entry', customTimestamp = null) => {
        const newEntry = {
            id: crypto.randomUUID(),
            type,
            content,
            timestamp: customTimestamp || new Date().toISOString(),
            lastModified: new Date().toISOString(),
            isEncrypted: type === 'entry', // Only encrypt user entries
        };
        setEntries(prev => [newEntry, ...prev]);

        // Trigger AI Reflection only for user entries
        // if (type === 'entry') { ... removed ... }
    };

    // Auto-generate AI Entry for today
    const generateAutoAIEntry = () => {
        const todayStr = new Date().toDateString();
        // Check if an AI entry already exists for today
        const hasAIEntry = entries.some(e =>
            e.type === 'ai_entry' &&
            new Date(e.timestamp).toDateString() === todayStr
        );

        if (!hasAIEntry) {
            // Generate insight
            const recentEntries = entries.slice(0, 7);
            const recentWalks = []; // Mock
            // Use translation or hardcoded logic? pass language
            const insight = generateMirrorInsight(recentEntries, recentWalks, language);

            if (insight) {
                // Post as AI Entry
                addEntry(insight.text, 'ai_entry');
            }
        }
    };

    const updateEntry = (id, content) => {
        setEntries(prev => prev.map(entry =>
            entry.id === id
                ? { ...entry, content, lastModified: new Date().toISOString() }
                : entry
        ));
    };

    const deleteEntry = (id) => {
        setEntries(prev => prev.filter(entry => entry.id !== id));
        // Also delete associated reflections? optional
        setAiReflections(prev => prev.filter(ref => ref.entryId !== id));
    };

    // --- Fortune Feature Actions ---

    // Set Blood Type
    const updateUserProfile = (newProfile) => {
        setUserProfile(prev => ({ ...prev, ...newProfile }));
    };

    // Draw Today's Fortune
    const drawFortune = () => {
        // Simple random logic for prototype
        const randomIndex = Math.floor(Math.random() * FORTUNES.length);
        const fortune = FORTUNES[randomIndex];

        // Contextual Data
        const currentMicroseason = getCurrentMicroseason(new Date());
        const bt = userProfile.bloodType || 'A'; // Default to A if not set
        const workAdvice = BLOOD_TYPE_WORK_ADVICE[bt]?.[fortune.id] || fortune.advice.find(a => a.label === 'Work').text;

        const newDraw = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(), // Use simple ISO string for now
            fortuneId: fortune.id,
            ...fortune, // Denormalize for convenience in prototype

            // Snapshotted Context
            microseason: currentMicroseason,
            bloodType: bt,
            bloodTypeWorkAdvice: workAdvice,

            isTied: false
        };

        setFortuneHistory(prev => [newDraw, ...prev]);

        // Automatically generate AI Analysis for this fortune
        // Automatically generate AI Analysis for this fortune
        // Check for undefined values to avoid "undefined" strings
        const pLevel = newDraw.level || '';
        const pProverb = newDraw.proverb_en || '';
        const pAdvice = newDraw.bloodTypeWorkAdvice || '';

        const aiAnalysis = `I sense a ${pLevel} energy surrounding you. As the proverb says: "${pProverb}". ${pAdvice}`;

        // Add minimal delay to ensure it appears above the fortune in history (which is sorted by date desc)
        // Fortune timestamp is 'newDraw.timestamp'
        const aiTimestamp = new Date(new Date(newDraw.timestamp).getTime() + 1000).toISOString();

        addEntry(aiAnalysis, 'ai_entry', aiTimestamp);

        return newDraw;
    };

    // Check if user has drawn fortune today
    const getTodaysFortune = () => {
        const today = new Date().toDateString();
        return fortuneHistory.find(f => new Date(f.timestamp).toDateString() === today);
    };

    // "Tie" a bad fortune (Send to Shrine)
    const tieFortune = (drawId) => {
        setFortuneHistory(prev => prev.map(f =>
            f.id === drawId ? { ...f, isTied: true } : f
        ));
    };

    const getCombinedTimeline = () => {
        // Merge entries, AI observations (static), fortunes, AI reflections (removed), and Weekly Reviews
        const fortunesWithType = fortuneHistory.map(f => ({ ...f, type: 'fortune' }));
        const allItems = [...entries, ...MOCK_AI_OBSERVATIONS, ...fortunesWithType, ...weeklyReviews];
        return allItems.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    };

    return (
        <DiaryContext.Provider value={{
            entries,
            addEntry,
            updateEntry,
            deleteEntry,
            getCombinedTimeline,
            // New Exports
            userProfile,
            updateUserProfile,
            fortuneHistory,
            drawFortune,
            getTodaysFortune,
            tieFortune,
            isLoading,
            aiReflections,
            weeklyReviews,

            generateWeeklyReview,
            generateAutoAIEntry,
            latestAdvice,
            setLatestAdvice
        }}>
            {children}
        </DiaryContext.Provider>
    );
};
