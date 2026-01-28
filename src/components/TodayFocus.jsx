import { Settings, Heart, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import iconAdvice from '../assets/icon_advice.png';
import iconSteps from '../assets/icon_steps.png';
import iconDistance from '../assets/icon_distance.png';
import iconCalories from '../assets/icon_calories.png';




const TodayFocus = () => {
    const navigate = useNavigate();
    // Mock data for today
    const todayData = {
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
                <button
                    onClick={() => navigate('/activity')}
                    className="flex items-center gap-1 text-gray-500 text-sm hover:text-gray-900 transition-colors"
                >
                    <span>View Activity</span>
                    <ChevronRight size={16} />
                </button>
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
