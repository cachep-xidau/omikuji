import { Settings, Moon, Heart, Footprints, MapPin, Flame } from 'lucide-react';

// Mini bar chart component for weekly data
const MiniBarChart = ({ data, highlightIndices = [] }) => {
    const maxVal = Math.max(...data);
    return (
        <div className="relative">
            {/* Dashed baseline */}
            <div className="absolute bottom-3 left-0 right-0 border-t border-dashed border-gray-200"></div>

            {/* Bars */}
            <div className="flex items-end justify-between gap-2 h-16 relative">
                {data.map((value, index) => (
                    <div
                        key={index}
                        className={`w-1.5 rounded-full transition-all ${highlightIndices.includes(index) ? 'bg-orange-400' : 'bg-gray-200'
                            }`}
                        style={{ height: `${(value / maxVal) * 100}%`, minHeight: '8px' }}
                    />
                ))}
            </div>
        </div>
    );
};

// Simple circular display for pace (no progress, just ring + value)
const PaceGauge = ({ value, unit }) => {
    return (
        <div className="relative w-32 h-32 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Simple ring */}
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                    fill="none"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-black">{value}</span>
                <span className="text-sm text-gray-700">{unit}</span>
            </div>
        </div>
    );
};


const WeeklySnapshot = () => {
    // Mock data
    const weeklyData = {
        dateRange: 'Oct 1 - 7, 2025',
        message: 'Your data looks great this week! Keep up the good work.',
        avgPace: '3.4',
        paceUnit: 'Min/Km',
        steps: '32,567',
        distance: '201',
        calories: '12,673',
        avgSleep: '7.7',
        avgHeartRate: '80',
        sleepData: [6, 7, 8, 7.5, 6.5, 8, 7],
        heartRateData: [75, 82, 78, 80, 85, 79, 81],
    };

    return (
        <section className="px-[19px] py-4">
            {/* Header */}
            <div className="flex justify-between items-start mb-[30px]">
                <h3 className="text-xl font-bold text-black">Your Weekly Snapshot</h3>
                <button className="flex items-center gap-1 text-gray-700 text-sm">
                    <span>Setting</span>
                    <Settings size={16} />
                </button>
            </div>

            {/* Date Range */}
            <p className="text-sm text-gray-700 mb-[30px]">{weeklyData.dateRange}</p>

            {/* User Tip / Alert */}
            <div className="bg-[#F5F5F5] rounded-xl p-[19px] mb-[30px] flex items-start gap-3 border border-[#E5E7EB]">
                <span className="text-xl">👟</span>
                <p className="text-base text-black flex-1">Your data looks great.<br />Take a walk today to keep the momentum alive!</p>
            </div>

            {/* Pace Gauge */}
            <div className="mb-[30px]">
                <p className="text-sm text-gray-700 text-center mb-2">Avg. pace</p>
                <PaceGauge value={weeklyData.avgPace} unit={weeklyData.paceUnit} />
            </div>

            {/* Secondary Metrics Row */}
            <div className="grid grid-cols-3 gap-3 mb-[30px]">
                <div className="p-3 text-center">
                    <Footprints size={18} className="mx-auto text-gray-700 mb-1" />
                    <p className="text-lg font-semibold text-black">{weeklyData.steps}</p>
                    <p className="text-sm text-gray-700">Steps</p>
                </div>
                <div className="p-3 text-center">
                    <MapPin size={18} className="mx-auto text-gray-700 mb-1" />
                    <p className="text-lg font-semibold text-black">{weeklyData.distance}</p>
                    <p className="text-sm text-gray-700">Km</p>
                </div>
                <div className="p-3 text-center">
                    <Flame size={18} className="mx-auto text-gray-700 mb-1" />
                    <p className="text-lg font-semibold text-black">{weeklyData.calories}</p>
                    <p className="text-sm text-gray-700">Kcal</p>
                </div>
            </div>

            {/* Detailed Health Grid */}
            <div className="grid grid-cols-2 gap-[19px]">
                {/* Sleep Card */}
                <div className="bg-white rounded-xl px-3 py-4 border border-[#E5E7EB]">
                    <div className="flex items-center gap-2 mb-4">
                        <Moon size={16} className="text-gray-700" />
                        <span className="text-sm text-gray-700">Avg. Time in Bed</span>
                    </div>
                    <MiniBarChart data={weeklyData.sleepData} highlightIndices={[2, 5]} />
                    <p className="text-xl font-semibold text-black mt-4">{weeklyData.avgSleep} <span className="text-sm font-normal text-gray-700">hr</span></p>
                </div>

                {/* Heart Rate Card */}
                <div className="bg-white rounded-xl px-3 py-4 border border-[#E5E7EB]">
                    <div className="flex items-center gap-2 mb-4">
                        <Heart size={16} className="text-gray-700" />
                        <span className="text-sm text-gray-700">Avg. Heart Rate</span>
                    </div>
                    <MiniBarChart data={weeklyData.heartRateData} highlightIndices={[1, 4]} />
                    <p className="text-xl font-semibold text-black mt-4">{weeklyData.avgHeartRate} <span className="text-sm font-normal text-gray-700">bpm</span></p>
                </div>
            </div>
        </section>
    );
};

export default WeeklySnapshot;

