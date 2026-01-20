import React, { useState } from 'react';
import StatusBar from '../components/StatusBar';
import NavBar from '../components/NavBar';
import DonutChart from '../components/DonutChart';
import GachaCard from '../components/GachaCard';

const AchieveScreen = () => {
    const [view, setView] = useState('daily'); // 'daily' | 'weekly'

    const stats = {
        daily: { total: 120, completed: 60 },
        weekly: { total: 120, completed: 102 },
    };

    const currentStats = stats[view];

    return (
        <div className="relative h-full bg-white flex flex-col">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-24">
                <StatusBar />

                {/* Header */}
                <div className="px-6 py-4">
                    <h1 className="text-[24px] font-bold text-gray-900">Achieve</h1>
                </div>

                {/* Overview Section */}
                <section className="px-6 py-4">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Overview</h2>
                            <p className="text-sm text-gray-500 mt-1">Performance of the missions you carried out.</p>
                        </div>

                        {/* Toggle */}
                        <div className="flex bg-gray-100 rounded-full p-1">
                            <button
                                onClick={() => setView('daily')}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${view === 'daily'
                                    ? 'bg-[#181818] text-white shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                Daily
                            </button>
                            <button
                                onClick={() => setView('weekly')}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${view === 'weekly'
                                    ? 'bg-[#181818] text-white shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                Weekly
                            </button>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="flex justify-center py-4">
                        <DonutChart
                            total={currentStats.total}
                            completed={currentStats.completed}
                            label={`${view === 'daily' ? 'Daily' : 'Weekly'} Missions`}
                        />
                    </div>
                </section>

                {/* Gacha Section */}
                <section className="px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Gacha</h2>
                    <p className="text-sm text-gray-500 mb-4">Number of gacha tickets you have right now.</p>

                    <div className="flex gap-3">
                        <GachaCard type="regular" count={0} />
                        <GachaCard type="premium" count={0} />
                    </div>
                </section>
            </div>

            {/* Fixed NavBar */}
            <NavBar />
        </div>
    );
};

export default AchieveScreen;
