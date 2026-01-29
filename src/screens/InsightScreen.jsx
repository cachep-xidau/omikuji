import { useState } from 'react';
import StatusBar from '../components/StatusBar';
import NavBar from '../components/NavBar';
import DynamicIsland from '../components/DynamicIsland';
import { TrendingUp, Award, Calendar, ChevronRight, Activity } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Recap Section Component
const RecapSection = () => {
    const { t } = useLanguage();
    return (
        <section className="px-6 mb-6">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-gray-900">{t('insight.recap')}</h2>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{t('insight.thisWeek')}</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F4AA1C]/10 to-[#EE3424]/10 flex items-center justify-center flex-shrink-0">
                        <TrendingUp size={24} className="text-[#F4AA1C]" />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-gray-900">{t('insight.weeklyProgress')}</h3>
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                            You've walked <span className="font-semibold text-gray-900">14.2 km</span> this week.
                            That's <span className="text-brand-gradient font-bold">+15%</span> compared to last week!
                        </p>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2">
                    <div className="text-center">
                        <p className="text-xs text-gray-400">{t('insight.steps')}</p>
                        <p className="text-sm font-semibold text-gray-900">24.5k</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-gray-400">{t('activity.calories')}</p>
                        <p className="text-sm font-semibold text-gray-900">850</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-gray-400">{t('insight.duration')}</p>
                        <p className="text-sm font-semibold text-gray-900">3h 20m</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Walking Highlight Section Component
const WalkingHighlightSection = () => {
    const { t } = useLanguage();
    return (
        <section className="px-6 mb-6">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F4AA1C]/10 to-[#EE3424]/10 flex items-center justify-center flex-shrink-0">
                        <Award className="text-[#F4AA1C]" size={24} />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-gray-900">{t('insight.walkingHighlight')}</h3>
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                            Your <span className="font-semibold text-gray-900">Morning Walk</span> on Jan 24 was outstanding.
                            You achieved a personal best distance of <span className="text-brand-gradient font-bold">5.2 km</span>!
                        </p>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2">
                    <div className="text-center">
                        <p className="text-xs text-gray-400">{t('activity.distance')}</p>
                        <p className="text-sm font-semibold text-gray-900">5.2 km</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-gray-400">{t('activity.calories')}</p>
                        <p className="text-sm font-semibold text-gray-900">420</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-gray-400">{t('insight.duration')}</p>
                        <p className="text-sm font-semibold text-gray-900">55 min</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Walk Habit Section Component
const WalkHabitSection = () => {
    const { t } = useLanguage();
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    // 0: inactive, 1: light, 2: medium, 3: heavy
    const activityLevels = [1, 3, 2, 3, 0, 2, 1];

    return (
        <section className="px-6 mb-6">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-gray-900">{t('insight.walkHabit')}</h2>
                <button className="flex items-center gap-1 text-gray-500 text-sm">
                    <span>{t('insight.details')}</span>
                    <ChevronRight size={16} />
                </button>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-[#F4AA1C]/10 to-[#EE3424]/10 rounded-lg">
                        <Activity size={20} className="text-[#F4AA1C]" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{t('insight.consistencyScore')}</p>
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-gradient w-[80%]" />
                            </div>
                            <span className="text-xs text-brand-gradient font-bold">80%</span>
                        </div>
                    </div>
                </div>

                {/* Activity Bars */}
                <div className="flex justify-between items-end h-24 pt-2">
                    {days.map((day, i) => {
                        const level = activityLevels[i];
                        let height = 'h-1.5';
                        let color = 'bg-gray-100';

                        if (level === 1) { height = 'h-8'; color = 'bg-brand-gradient opacity-40'; }
                        if (level === 2) { height = 'h-14'; color = 'bg-brand-gradient opacity-70'; }
                        if (level === 3) { height = 'h-20'; color = 'bg-brand-gradient'; }

                        return (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <div className={`w-8 rounded-t-sm rounded-b-lg ${height} ${color} transition-all duration-300`}></div>
                                <span className="text-xs text-gray-400">{day}</span>
                            </div>
                        );
                    })}
                </div>

                <p className="text-xs text-gray-400 text-center mt-3 pt-3 border-t border-gray-50">
                    You're most active on <span className="text-gray-900 font-medium">Tuesdays</span> and <span className="text-gray-900 font-medium">Thursdays</span>.
                </p>
            </div>
        </section>
    );
};

const InsightScreen = () => {
    const { t } = useLanguage();
    return (
        <div className="relative h-full bg-gray-50 flex flex-col">
            {/* Dynamic Island - Fixed at absolute top of screen */}
            <DynamicIsland />

            {/* Fixed Header with StatusBar */}
            <div className="bg-gray-50 pt-[12px]">
                <StatusBar />
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-24">
                {/* Header */}
                <div className="px-6 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">{t('insight.title')}</h1>
                    <p className="text-sm text-gray-500 mt-1">{t('insight.analysis')}</p>
                </div>

                {/* Sections */}
                <div className="space-y-2">
                    <RecapSection />
                    <WalkingHighlightSection />
                    <WalkHabitSection />
                </div>
            </div>

            {/* Fixed NavBar */}
            <NavBar />
        </div>
    );
};

export default InsightScreen;
