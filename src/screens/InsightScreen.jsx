import { useState } from 'react';
import StatusBar from '../components/StatusBar';
import NavBar from '../components/NavBar';
import { TrendingUp, Award, Calendar, ChevronRight, Activity } from 'lucide-react';

// Recap Section Component
const RecapSection = () => {
    return (
        <section className="px-6 mb-6">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-gray-900">Recap</h2>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">This Week</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <TrendingUp size={24} className="text-orange-500" />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-gray-900">Weekly Progress</h3>
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                            You've walked <span className="font-semibold text-gray-900">14.2 km</span> this week.
                            That's <span className="text-[oklch(75%_.183_55.934)] font-medium">+15%</span> compared to last week!
                        </p>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2">
                    <div className="text-center">
                        <p className="text-xs text-gray-400">Steps</p>
                        <p className="text-sm font-semibold text-gray-900">24.5k</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-gray-400">Calories</p>
                        <p className="text-sm font-semibold text-gray-900">850</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-gray-400">Duration</p>
                        <p className="text-sm font-semibold text-gray-900">3h 20m</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Walking Highlight Section Component
const WalkingHighlightSection = () => {
    return (
        <section className="px-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Walking Highlight</h2>

            <div className="bg-gradient-to-br from-[#181818] to-[#2d2d2d] rounded-2xl p-5 shadow-lg text-white relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <Award className="text-yellow-400" size={20} />
                        <span className="text-sm font-medium text-gray-300">Best Performance</span>
                    </div>

                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-3xl font-bold mb-1">Morning Walk</p>
                            <p className="text-gray-400 text-sm">Wednesday, Jan 24</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-semibold">5.2 km</p>
                            <p className="text-gray-400 text-xs">Distance</p>
                        </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                        <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-200">Longest Duration</span>
                        <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-200">Most Calories</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Walk Habit Section Component
const WalkHabitSection = () => {
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    // 0: inactive, 1: light, 2: medium, 3: heavy
    const activityLevels = [1, 3, 2, 3, 0, 2, 1];

    return (
        <section className="px-6 mb-6">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-gray-900">Walk Habit</h2>
                <button className="flex items-center gap-1 text-gray-500 text-sm">
                    <span>Details</span>
                    <ChevronRight size={16} />
                </button>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[oklch(75%_.183_55.934)]/10 rounded-lg">
                        <Calendar size={20} className="text-[oklch(75%_.183_55.934)]" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">Consistency Score</p>
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[oklch(75%_.183_55.934)] w-[80%]" />
                            </div>
                            <span className="text-xs text-[oklch(75%_.183_55.934)] font-bold">80%</span>
                        </div>
                    </div>
                </div>

                {/* Activity Bars */}
                <div className="flex justify-between items-end h-24 pt-2">
                    {days.map((day, i) => {
                        const level = activityLevels[i];
                        let height = 'h-1.5';
                        let color = 'bg-gray-100';

                        if (level === 1) { height = 'h-8'; color = 'bg-[oklch(75%_.183_55.934)]/40'; }
                        if (level === 2) { height = 'h-14'; color = 'bg-[oklch(75%_.183_55.934)]/70'; }
                        if (level === 3) { height = 'h-20'; color = 'bg-[oklch(75%_.183_55.934)]'; }

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
    return (
        <div className="relative h-full bg-gray-50 flex flex-col">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-24">
                <StatusBar />

                {/* Header */}
                <div className="px-6 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">Insight</h1>
                    <p className="text-sm text-gray-500 mt-1">Your activity analysis</p>
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
