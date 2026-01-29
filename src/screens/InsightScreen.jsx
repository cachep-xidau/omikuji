import { useState } from 'react';
import StatusBar from '../components/StatusBar';
import NavBar from '../components/NavBar';
import DynamicIsland from '../components/DynamicIsland';
import { TrendingUp, Award, Calendar, ChevronRight, Activity, Flame } from 'lucide-react'; // Ensure Flame is imported

// Energy & Food Section
const EnergySection = () => {
    const { t } = useLanguage();
    const calories = 850;

    const foodData = [
        { key: 'burger', cal: 300, icon: '🍔', label: 'insight.food.burger' },
        { key: 'banana', cal: 90, icon: '🍌', label: 'insight.food.banana' },
        { key: 'chicken', cal: 200, icon: '🍗', label: 'insight.food.chicken' }
    ];

    return (
        <section className="px-6 mb-6">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-base font-semibold text-gray-900">{t('insight.energyTitle') || 'Calories burned'}</h3>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{calories} <span className="text-sm font-normal text-gray-400">kcal</span></p>
                    </div>

                </div>

                {/* Food Conversion Visuals */}
                <div className="grid grid-cols-3 gap-2">
                    {foodData.map((food) => (
                        <div key={food.key} className="bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center text-center border border-gray-100">
                            <div className="text-2xl mb-1">{food.icon}</div>
                            <p className="text-lg font-bold text-orange-500 leading-tight">
                                {(calories / food.cal).toFixed(1)}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">{t(food.label)}</p>
                        </div>
                    ))}
                </div>

                <p className="text-xs text-center text-gray-400 mt-3">
                    {t('insight.foodEqDesc') || 'You\'ve burnt enough energy to enjoy a guilt-free meal.'}
                </p>
            </div>
        </section>
    );
};

// Elevation Section
const ElevationSection = () => {
    const { t } = useLanguage();
    const floors = 12;
    // Mock Bar Data for Weekly Elevation
    const weeklyFloors = [4, 8, 12, 6, 15, 8, 10]; // S M T W T F S
    const maxFloor = Math.max(...weeklyFloors);

    return (
        <section className="px-6 mb-6">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-2">{t('insight.elevationTitle') || 'Elevation'}</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-gray-900">{floors}</span>
                            <span className="text-sm text-gray-500">{t('insight.floors') || 'floors'}</span>
                        </div>
                        <p className="text-xs text-brand-gradient font-medium mt-1">
                            +{floors * 3}m {t('insight.gained') || 'gained'}
                        </p>
                    </div>

                </div>

                {/* Elevation Chart (Bar style) */}
                <div className="flex items-end justify-between h-24 gap-2">
                    {weeklyFloors.map((val, i) => {
                        const heightPercent = (val / maxFloor) * 100;
                        return (
                            <div key={i} className="flex flex-col items-center gap-1 w-full">
                                <div className="w-full bg-gray-100 rounded-t-md relative group h-full flex items-end">
                                    <div
                                        className="w-full bg-blue-400 rounded-t-md transition-all duration-500 group-hover:bg-blue-500"
                                        style={{ height: `${heightPercent}%` }}
                                    />
                                </div>
                                <span className="text-[10px] text-gray-400">{['S', 'M', 'T', 'W', 'T', 'F', 'S'][i]}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

// Heart Rate Analysis Section
const HeartRateSection = () => {
    const { t } = useLanguage();

    // Scale: 50 - 100 bpm => Y: 0 (100bpm) to 100 (50bpm)
    // Resting (~62bpm) -> 76
    // Active Points
    const restingData = [[0, 80], [20, 76], [40, 84], [60, 80], [80, 82], [100, 78]];
    const activeData = [[0, 60], [20, 30], [40, 10], [60, 30], [80, 0], [100, 50]];

    // Simple smoothing function (Catmull-Rom to Cubic Bezier conversion or similar)
    // For simplicity in this mock, we'll use a basic cubic bezier approach
    const getSmoothPath = (points) => {
        if (points.length === 0) return "";
        // Start
        let d = `M ${points[0][0]},${points[0][1]}`;

        for (let i = 0; i < points.length - 1; i++) {
            const x0 = i > 0 ? points[i - 1][0] : points[i][0];
            const y0 = i > 0 ? points[i - 1][1] : points[i][1];
            const x1 = points[i][0];
            const y1 = points[i][1];
            const x2 = points[i + 1][0];
            const y2 = points[i + 1][1];
            const x3 = i !== points.length - 2 ? points[i + 2][0] : x2;
            const y3 = i !== points.length - 2 ? points[i + 2][1] : y2;

            const cp1x = x1 + (x2 - x0) / 6;
            const cp1y = y1 + (y2 - y0) / 6;
            const cp2x = x2 - (x3 - x1) / 6;
            const cp2y = y2 - (y3 - y1) / 6;

            d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x2},${y2}`;
        }
        return d;
    };

    const activePath = getSmoothPath(activeData);
    const restingPath = getSmoothPath(restingData);

    return (
        <section className="px-6 mb-6">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-2">{t('insight.heartRateTitle') || 'Heart Rate Zone'}</h3>
                        <p className="text-sm text-gray-500">{t('insight.activeHr') || 'Active Avg'}</p>
                        <p className="text-xl font-bold text-red-500">112 <span className="text-xs text-gray-400 font-normal">bpm</span></p>
                    </div>
                    <div className="text-right">
                        <div className="h-6"></div>
                        <p className="text-sm text-gray-500">{t('insight.restingHr') || 'Resting'}</p>
                        <p className="text-xl font-bold text-blue-500">62 <span className="text-xs text-gray-400 font-normal">bpm</span></p>
                    </div>
                </div>

                {/* Chart with Y-Axis */}
                <div className="flex gap-4 h-48">
                    {/* Y Axis Labels */}
                    <div className="flex flex-col justify-between text-xs text-gray-400 font-medium py-0 h-full select-none">
                        <span>100</span>
                        <span>90</span>
                        <span>80</span>
                        <span>70</span>
                        <span>60</span>
                        <span>50</span>
                    </div>

                    {/* SVG Chart */}
                    <div className="flex-1 relative pt-1.5 pb-1.5"> {/* Padding to align lines with text mid-points */}
                        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                            {/* Grid Lines */}
                            {[0, 20, 40, 60, 80, 100].map(y => (
                                <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#f3f4f6" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                            ))}

                            {/* Active Line (Red) - Smooth */}
                            <path
                                d={activePath}
                                fill="none"
                                stroke="#EF4444"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                vectorEffect="non-scaling-stroke"
                            />

                            {/* Resting Line (Blue) - Smooth */}
                            <path
                                d={restingPath}
                                fill="none"
                                stroke="#3B82F6"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeDasharray="4 2"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-4 mt-2">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-[10px] text-gray-500">Active</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-[10px] text-gray-500">Resting</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
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
                    <div>
                        <h3 className="text-base font-semibold text-gray-900">{t('insight.weeklyProgress')}</h3>
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                            You've walked <span className="font-semibold text-gray-900">14.2 km</span> this week.
                            That's <span className="text-brand-gradient font-bold">+15%</span> compared to last week!
                        </p>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
                    {[
                        { label: t('activity.steps'), thisWeek: 24500, lastWeek: 21000, unit: '', color: 'bg-blue-500' },
                        { label: t('activity.calories'), thisWeek: 850, lastWeek: 780, unit: 'kcal', color: 'bg-orange-500' },
                        { label: t('activity.distance'), thisWeek: 14.2, lastWeek: 12.5, unit: 'km', color: 'bg-green-500' }
                    ].map((metric, i) => {
                        const maxVal = Math.max(metric.thisWeek, metric.lastWeek) * 1.1; // Scale
                        return (
                            <div key={i}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-medium text-gray-500">{metric.label}</span>
                                    <span className="text-xs font-bold text-gray-900">
                                        {metric.thisWeek.toLocaleString()} <span className="text-gray-400 font-normal">{metric.unit}</span>
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    {/* This Week Bar */}
                                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${metric.color}`}
                                            style={{ width: `${(metric.thisWeek / maxVal) * 100}%` }}
                                        />
                                    </div>
                                    {/* Last Week Bar (Gray) */}
                                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gray-300 rounded-full"
                                            style={{ width: `${(metric.lastWeek / maxVal) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Tiny Legend */}
                    <div className="flex gap-4 mt-2 justify-end">
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                            <span className="text-[10px] text-gray-400">{t('insight.thisWeek')}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                            <span className="text-[10px] text-gray-400">{t('insight.lastWeek')}</span>
                        </div>
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
                <div className="space-y-2 pb-6">
                    <RecapSection />
                    <EnergySection />
                    <ElevationSection />
                    <HeartRateSection />
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
