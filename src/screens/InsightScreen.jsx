import StatusBar from '../components/StatusBar';
import NavBar from '../components/NavBar';
import { History, Footprints, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Feature Button Component
const FeatureButton = ({ icon: Icon, label, description, to, color }) => (
    <Link
        to={to}
        className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
        <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center`}>
            <Icon size={28} className="text-white" />
        </div>
        <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900">{label}</h3>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
        <ChevronRight size={20} className="text-gray-400" />
    </Link>
);

const InsightScreen = () => {
    return (
        <div className="relative h-full bg-gray-50 flex flex-col">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-24">
                <StatusBar />

                {/* Header */}
                <div className="px-6 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">Insight</h1>
                    <p className="text-sm text-gray-500 mt-1">Personalized health insights</p>
                </div>

                {/* Feature Buttons */}
                <div className="px-6 space-y-3">
                    <FeatureButton
                        icon={History}
                        label="Recap"
                        description="Review your weekly and monthly summary"
                        to="/insight/recap"
                        color="bg-gradient-to-br from-orange-400 to-orange-600"
                    />

                    <FeatureButton
                        icon={Footprints}
                        label="Walk Habit"
                        description="Track your walking patterns and streaks"
                        to="/insight/walk-habit"
                        color="bg-gradient-to-br from-green-400 to-green-600"
                    />

                    <FeatureButton
                        icon={BookOpen}
                        label="Diary"
                        description="Your personal health journal"
                        to="/diary"
                        color="bg-gradient-to-br from-purple-400 to-purple-600"
                    />
                </div>
            </div>

            {/* Fixed NavBar */}
            <NavBar />
        </div>
    );
};

export default InsightScreen;
