import { Settings, Heart } from 'lucide-react';
import iconAvgPace from '../assets/icon_avg_pace.png';
import iconAdvice from '../assets/icon_advice.png';
import iconSteps from '../assets/icon_steps.png';
import iconDistance from '../assets/icon_distance.png';
import iconCalories from '../assets/icon_calories.png';

// Simple circular display for pace
const PaceGauge = ({ value, unit }) => {
    return (
        <div className="relative w-[120px] h-[120px] mx-auto">
            {/* Background Ring */}
            <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle
                    cx="60"
                    cy="60"
                    r="54"
                    stroke="#E5E7EB"
                    strokeWidth="6"
                    fill="none"
                />
                {/* Progress arc */}
                <circle
                    cx="60"
                    cy="60"
                    r="54"
                    stroke="#EE3424"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray="339"
                    strokeDashoffset="100"
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                />
            </svg>

            {/* Centered Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <img src={iconAvgPace} alt="Speedometer" className="w-5 h-5 object-contain mb-0.5" />
                <span className="text-xs text-gray-500">Avg. pace</span>
                <span className="text-xl font-semibold text-black tracking-tight">{value}</span>
                <span className="text-xs text-gray-400">{unit}</span>
            </div>
        </div>
    );
};


const TodayFocus = () => {
    // Mock data for today
    const todayData = {
        message: 'Your data looks great. Take a walk today to keep the momentum alive!',
        avgPace: '3.4',
        paceUnit: 'Min/Km',
        steps: '32,567',
        distance: '201',
        calories: '12,673',
        avgHeartRate: '80',
    };

    return (
        <section className="px-6 py-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-black">Today Focus</h3>
                <button className="flex items-center gap-1 text-gray-500 text-sm">
                    <span>Setting</span>
                    <Settings size={14} />
                </button>
            </div>

            {/* AI Insight Card */}
            <div className="bg-[#F5F5F5] rounded-xl p-4 mb-5 border border-[#E6E3E3]">
                <div className="flex items-start gap-2">
                    <img src={iconAdvice} alt="Advice" className="w-5 h-5 object-contain mt-0.5" />
                    <p className="text-sm text-[#1F2937] leading-relaxed">
                        {todayData.message}
                    </p>
                </div>
            </div>

            {/* Pace Gauge */}
            <div className="mb-5 flex justify-center">
                <PaceGauge value={todayData.avgPace} unit={todayData.paceUnit} />
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-4 gap-2">
                <div className="text-center">
                    <img src={iconSteps} alt="Steps" className="w-10 h-10 mx-auto mb-1 object-contain" />
                    <p className="text-base font-semibold text-black">{todayData.steps}</p>
                    <p className="text-xs text-gray-500">Steps</p>
                </div>
                <div className="text-center">
                    <img src={iconDistance} alt="Distance" className="w-10 h-10 mx-auto mb-1 object-contain" />
                    <p className="text-base font-semibold text-black">{todayData.distance}</p>
                    <p className="text-xs text-gray-500">Km</p>
                </div>
                <div className="text-center">
                    <img src={iconCalories} alt="Calories" className="w-10 h-10 mx-auto mb-1 object-contain" />
                    <p className="text-base font-semibold text-black">{todayData.calories}</p>
                    <p className="text-xs text-gray-500">Kcal</p>
                </div>
                <div className="text-center">
                    <div className="w-10 h-10 mx-auto mb-1 rounded-full bg-red-50 flex items-center justify-center">
                        <Heart size={20} className="text-red-400" fill="#F87171" />
                    </div>
                    <p className="text-base font-semibold text-black">{todayData.avgHeartRate}</p>
                    <p className="text-xs text-gray-500">BPM</p>
                </div>
            </div>
        </section>
    );
};

export default TodayFocus;
