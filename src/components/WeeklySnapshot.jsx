import { Settings, ChevronRight, Moon, Heart } from 'lucide-react';
import iconAvgPace from '../assets/icon_avg_pace.png';
import iconAdvice from '../assets/icon_advice.png';
import iconSleepMoon from '../assets/icon_sleep_moon.png';
import iconSteps from '../assets/icon_steps.png';
import iconDistance from '../assets/icon_distance.png';
import iconCalories from '../assets/icon_calories.png';

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
// Simple circular display for pace
const PaceGauge = ({ value, unit }) => {
    return (
        <div className="relative w-[150px] h-[150px] mx-auto">
            {/* Background Ring */}
            <svg className="w-full h-full" viewBox="0 0 150 150">
                <circle
                    cx="75"
                    cy="75"
                    r="68"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                    fill="none"
                />
            </svg>

            {/* Centered Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <img src={iconAvgPace} alt="Speedometer" className="w-6 h-6 object-contain mb-1" />
                <span className="text-sm text-gray-500 mb-1">Avg. pace</span>
                <span class="text-2xl font-medium text-black tracking-tight">{value}</span>
                <span className="text-sm text-gray-400">{unit}</span>
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
            {/* Header */}
            <div className="flex justify-between items-start mb-[30px]">
                <div>
                    <h3 className="text-xl font-semibold text-black">Your Weekly Snapshot</h3>
                    <p className="text-sm text-gray-700 mt-1">{weeklyData.dateRange}</p>
                </div>
                <button className="flex items-center gap-1 text-gray-700 text-sm">
                    <span>Setting</span>
                    <Settings size={16} />
                </button>
            </div>

            {/* User Tip / Alert */}
            {/* User Tip / Alert */}
            <div className="bg-[#F5F5F5] rounded-xl p-4 mb-[30px] border border-[#E6E3E3]">
                <div className="flex items-center gap-2 mb-2">
                    <img src={iconAdvice} alt="Advice" className="w-5 h-5 object-contain" />
                    <h4 className="text-sm font-semibold text-[#1F2937]">Overall Advice</h4>
                </div>
                <p className="text-base text-[#1F2937] leading-relaxed">
                    Remember to balance activity with rest. Stay hydrated, take short breaks when needed, and aim for consistency rather than intensity.
                </p>
            </div>

            {/* Pace Gauge */}
            <div className="mb-[30px] flex justify-center">
                <PaceGauge value={weeklyData.avgPace} unit={weeklyData.paceUnit} />
            </div>

            {/* Secondary Metrics Row */}
            <div className="grid grid-cols-3 gap-3 mb-[30px]">
                <div className="p-3 text-center">
                    <img src={iconSteps} alt="Steps" className="w-[52px] h-[52px] mx-auto mb-1 object-contain" />
                    <p className="text-lg font-semibold text-black">{weeklyData.steps}</p>
                    <p className="text-sm text-gray-700">Steps</p>
                </div>
                <div className="p-3 text-center">
                    <img src={iconDistance} alt="Distance" className="w-[52px] h-[52px] mx-auto mb-1 object-contain" />
                    <p className="text-lg font-semibold text-black">{weeklyData.distance}</p>
                    <p className="text-sm text-gray-700">Km</p>
                </div>
                <div className="p-3 text-center">
                    <img src={iconCalories} alt="Calories" className="w-[52px] h-[52px] mx-auto mb-1 object-contain" />
                    <p className="text-lg font-semibold text-black">{weeklyData.calories}</p>
                    <p className="text-sm text-gray-700">Kcal</p>
                </div>
            </div>

            {/* Detailed Health Grid */}
            <div className="grid grid-cols-2 gap-[19px]">
                {/* Sleep Card */}
                <div className="bg-white rounded-xl px-3 py-4 border border-[#E5E7EB]">
                    <div className="flex items-center gap-2 mb-4">
                        <img src={iconSleepMoon} alt="Sleep" className="w-4 h-4 object-contain" />
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

