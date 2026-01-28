import { useState } from 'react';
import StatusBar from '../components/StatusBar';
import NavBar from '../components/NavBar';
import DynamicIsland from '../components/DynamicIsland';
import { ChevronRight, ChevronLeft, Gift, Ticket, CheckCircle2, Flame, Calendar, Image, Video, Trophy } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

// Mission Summary Card
const MissionSummaryCard = ({ dailyCompleted, dailyTotal, weeklyCompleted, weeklyTotal }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('quest.summary')}</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-orange-500">{dailyCompleted}/{dailyTotal}</p>
                    <p className="text-sm text-gray-600 mt-1">{t('quest.daily')}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-blue-500">{weeklyCompleted}/{weeklyTotal}</p>
                    <p className="text-sm text-gray-600 mt-1">{t('quest.weekly')}</p>
                </div>
            </div>
        </div>
    );
};

// Claim Reward Card
const ClaimRewardCard = ({ completedMissions, tickets, onClaim }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Gift size={24} className="text-orange-500" />
                    <h3 className="text-lg font-semibold text-gray-900">{t('quest.claim')}</h3>
                </div>
                <div className="flex items-center gap-1 bg-orange-200/50 rounded-full px-3 py-1">
                    <Ticket size={16} className="text-orange-600" />
                    <span className="text-sm font-medium text-orange-600">{tickets} {t('quest.tickets')}</span>
                </div>
            </div>

            <div className="bg-white/60 rounded-xl p-3 mb-3">
                <p className="text-sm text-gray-700">
                    You have <span className="font-bold text-orange-600">{completedMissions}</span> {t('quest.readyToClaim')}
                </p>
            </div>

            <button
                onClick={onClaim}
                disabled={completedMissions === 0}
                className={`w-full py-3 rounded-xl font-semibold transition-all ${completedMissions > 0
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
            >
                {completedMissions > 0 ? `${t('quest.claimBtn')} (${tickets})` : t('quest.noRewards')}
            </button>
        </div>
    );
};

// Mission Recap Button


// Streak Badge Component
const StreakBadge = ({ currentDay, targetDays }) => {
    const { t } = useLanguage();
    const milestones = [7, 14, 30];
    // Calculate progress based on current day relative to 30-day max
    const progressPercent = (currentDay / 30) * 100;

    return (
        <div className="bg-white rounded-3xl shadow-sm p-6" style={{ height: '124px' }}>
            {/* Header */}
            <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
                <h3 className="text-lg font-bold text-gray-900">{targetDays} {t('quest.challenge')}</h3>
                <span className="text-base text-gray-400">Day {currentDay} / {targetDays}</span>
            </div>

            {/* Progress Bar with Calendar Milestones */}
            <div className="relative h-11 flex items-center pr-5">
                {/* Progress Track - runs through the middle of calendars */}
                <div className="absolute left-0 right-5 h-3 top-1/2 transform -translate-y-1/2">
                    {/* Background Track */}
                    <div className="absolute inset-0 bg-gray-100 rounded-full" />

                    {/* Progress Fill */}
                    <div
                        className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500"
                        style={{ width: `${Math.min(progressPercent, 100)}%` }}
                    />
                </div>

                {/* Calendar Milestone Icons */}
                {milestones.map((day, index) => {
                    const isActive = currentDay >= day - 6 && currentDay <= day;
                    const isReached = currentDay >= day;
                    // Position: 7 at ~23%, 14 at ~47%, 30 at calc(100% - 20px)
                    const positions = ['23%', '47%', 'calc(100% - 22px)'];

                    return (
                        <div
                            key={day}
                            className="absolute transform -translate-x-1/2"
                            style={{ left: positions[index] }}
                        >
                            {/* Calendar Icon */}
                            <div className={`w-8 h-8 rounded-lg border-2 flex flex-col items-center justify-center bg-white overflow-hidden ${isActive ? 'border-gray-900' : isReached ? 'border-orange-400' : 'border-gray-200'
                                }`}>
                                <div className={`w-full h-1 ${isActive ? 'bg-gray-900' : isReached ? 'bg-orange-400' : 'bg-gray-200'
                                    }`} />
                                <span className={`text-xs font-bold ${isActive || isReached ? 'text-gray-900' : 'text-gray-400'
                                    }`}>
                                    {day}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Streak Calendar Component
const StreakCalendar = ({ streakDays }) => {
    const { t } = useLanguage();
    const today = new Date();
    const currentMonth = today.toLocaleString('default', { month: 'long', year: 'numeric' });
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{t('quest.streakCalendar')}</h3>
                <div className="flex items-center gap-1">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-500">{currentMonth}</span>
                </div>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                    <div key={i} className="text-center text-xs text-gray-400 py-1">{day}</div>
                ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
                {days.map((day, i) => {
                    const isToday = day === today.getDate();
                    const hasStreak = streakDays.includes(day);

                    return (
                        <div
                            key={i}
                            className={`aspect-square flex items-center justify-center text-sm rounded-full ${day === null
                                ? ''
                                : isToday
                                    ? 'bg-gray-900 text-white font-semibold'
                                    : hasStreak
                                        ? 'bg-orange-100 text-orange-600 font-medium'
                                        : 'text-gray-600'
                                }`}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-100" />
                    <span className="text-xs text-gray-500">{t('quest.streakDay')}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-900" />
                    <span className="text-xs text-gray-500">{t('quest.today')}</span>
                </div>
            </div>
        </div>
    );
};

// Mission Recap Modal
const MissionRecapModal = ({ onClose }) => (
    <div className="absolute inset-0 z-50 bg-gray-50 flex flex-col h-full">
        <StatusBar />

        {/* Header */}
        <div className="px-4 py-4 flex items-center gap-3 bg-white border-b border-gray-100 flex-shrink-0">
            <button onClick={onClose} className="p-1">
                <ChevronLeft size={24} className="text-gray-900" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Mission Recap</h1>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Weekly Summary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">This Week's Achievements</h3>
                <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-2xl font-bold text-gray-900">12</p>
                        <p className="text-xs text-gray-500">Missions</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-2xl font-bold text-green-500">8</p>
                        <p className="text-xs text-gray-500">Completed</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-2xl font-bold text-orange-500">5</p>
                        <p className="text-xs text-gray-500">Tickets</p>
                    </div>
                </div>
            </div>

            {/* AI Image Summary */}
            <button className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                        <Image size={24} className="text-white" />
                    </div>
                    <div className="text-left">
                        <h3 className="text-base font-semibold text-gray-900">AI Image Summary</h3>
                        <p className="text-sm text-gray-500">Visual recap of your week</p>
                    </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
            </button>

            {/* AI Video Summary */}
            <button className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                        <Video size={24} className="text-white" />
                    </div>
                    <div className="text-left">
                        <h3 className="text-base font-semibold text-gray-900">AI Short Video Summary</h3>
                        <p className="text-sm text-gray-500">Animated highlights of your achievements</p>
                    </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
            </button>

            {/* Completed Missions List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Completed Missions</h3>
                <div className="space-y-3">
                    {[
                        { title: 'Walk 1,500 steps', date: 'Today', tickets: 1 },
                        { title: 'Morning exercise 10 min', date: 'Today', tickets: 1 },
                        { title: 'Complete 3 daily missions', date: 'Yesterday', tickets: 2 },
                        { title: 'Walk 5,000 steps', date: 'Jan 25', tickets: 1 },
                    ].map((mission, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 size={20} className="text-green-500" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{mission.title}</p>
                                    <p className="text-xs text-gray-400">{mission.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-orange-500">
                                <Ticket size={14} />
                                <span className="text-sm font-medium">{mission.tickets}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const QuestScreen = () => {
    const [showRecap, setShowRecap] = useState(false);
    const { t } = useLanguage();

    // Mock data
    const missionData = {
        dailyCompleted: 2,
        dailyTotal: 3,
        weeklyCompleted: 5,
        weeklyTotal: 7,
        completedMissions: 3,
        pendingTickets: 5,
    };

    const streakData = {
        currentStreak: 7,
        isActive: true,
        streakDays: [20, 21, 22, 23, 24, 25, 26, 27], // Days of the month with streaks
    };

    const handleClaimRewards = () => {
        alert(`🎉 Claimed ${missionData.pendingTickets} Gacha Tickets!`);
    };

    if (showRecap) {
        return <MissionRecapModal onClose={() => setShowRecap(false)} />;
    }

    return (
        <div className="relative h-full bg-gray-50 flex flex-col">
            {/* Dynamic Island - Fixed at absolute top */}
            <DynamicIsland />

            {/* Fixed Header with StatusBar */}
            <div className="bg-gray-50 pt-[12px]">
                <StatusBar />
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-24">
                {/* Header */}
                <div className="px-6 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">{t('quest.title')}</h1>
                </div>

                {/* Mission Section */}
                <section className="px-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Trophy size={20} className="text-orange-500" />
                        {t('quest.section.mission')}
                    </h2>
                    <div className="space-y-3">
                        <MissionSummaryCard
                            dailyCompleted={missionData.dailyCompleted}
                            dailyTotal={missionData.dailyTotal}
                            weeklyCompleted={missionData.weeklyCompleted}
                            weeklyTotal={missionData.weeklyTotal}
                        />



                    </div>
                </section>

                {/* Streak Section */}
                <section className="px-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Flame size={20} className="text-orange-500" />
                        {t('quest.section.streak')}
                    </h2>
                    <div className="space-y-3">
                        <StreakBadge currentDay={1} targetDays={7} />
                        <StreakCalendar streakDays={streakData.streakDays} />
                    </div>
                </section>
            </div>

            {/* Fixed NavBar */}
            <NavBar />
        </div>
    );
};

export default QuestScreen;
