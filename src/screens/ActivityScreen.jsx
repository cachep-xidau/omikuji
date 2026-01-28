import StatusBar from '../components/StatusBar';
import NavBar from '../components/NavBar';
import { ChevronRight, Footprints, Flame, Moon, Heart, Timer, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SimpleLineChart, SimpleBarChart, DonutChart, CandleChart } from '../components/ActivityCharts';

// Activity Ring Component (Apple-style)
const ActivityRing = ({ progress, color, size = 120, strokeWidth = 12 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg width={size} height={size} className="transform -rotate-90">
            {/* Background ring */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={`${color}20`}
                strokeWidth={strokeWidth}
            />
            {/* Progress ring */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
            />
        </svg>
    );
};

// Metric Card Component
// MetricCard Component with Chart Support
const MetricCard = ({ icon: Icon, iconBg, iconColor, label, value, unit, trend, trendColor, chart }) => (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col h-full justify-between min-h-[140px]">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center`}>
                    <Icon size={18} className={iconColor} />
                </div>
                <span className="text-sm text-gray-500">{label}</span>
            </div>
            <div className="flex items-baseline gap-1 mb-2">
                <span className="text-2xl font-bold text-gray-900">{value}</span>
                <span className="text-sm text-gray-400">{unit}</span>
            </div>
        </div>

        {/* Render Chart if available, otherwise trend */}
        {chart ? (
            <div className="mt-2 text-xs w-full">
                {chart}
            </div>
        ) : trend && (
            <div className={`flex items-center gap-1 mt-2 ${trendColor}`}>
                <TrendingUp size={14} />
                <span className="text-xs">{trend}</span>
            </div>
        )}
    </div>
);

// Walk History Item
const WalkHistoryItem = ({ title, distance, duration, date, icon }) => (
    <div className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            {icon || <Footprints size={20} color="#111827" fill="#FFFFFF" />}
        </div>
        <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            <p className="text-xs text-gray-500">{distance} • {duration}</p>
        </div>
        <span className="text-xs text-gray-400">{date}</span>
    </div>
);

const ActivityScreen = () => {
    // Mock data
    const activityData = {
        pace: { value: '8:24', unit: 'min/km', trend: '+12% this week' },
        steps: { value: '8,432', unit: 'steps', trend: '+1,200 vs yesterday' },
        distance: { value: '6.2', unit: 'km', trend: '+0.8 km vs avg' },
        calories: { value: '324', unit: 'kcal', trend: '+45 kcal' },
        sleep: { value: '7.5', unit: 'hrs', trend: 'Good quality' },
        heartRate: { value: '72', unit: 'bpm', trend: 'Resting' },
    };

    const walkHistory = [
        { title: 'Outdoor Walk', distance: '2.1 km', duration: '28 min', date: 'Today' },
        { title: 'Evening Walk', distance: '1.8 km', duration: '22 min', date: 'Yesterday' },
        { title: 'Morning Walk', distance: '3.2 km', duration: '42 min', date: 'Jan 25' },
        { title: 'Park Walk', distance: '2.5 km', duration: '32 min', date: 'Jan 24' },
    ];

    return (
        <div className="relative h-full bg-gray-50 flex flex-col">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-24">
                <StatusBar />

                {/* Header */}
                <div className="px-6 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">Activity</h1>
                    <p className="text-sm text-gray-500 mt-1">Monday, January 27</p>
                </div>

                {/* Activity Rings Section */}
                <section className="px-6 py-4">
                    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            {/* Rings */}
                            <div className="relative w-[120px] h-[120px]">
                                <div className="absolute inset-0">
                                    <ActivityRing progress={75} color="#FF2D55" size={120} strokeWidth={10} />
                                </div>
                                <div className="absolute inset-[12px]">
                                    <ActivityRing progress={60} color="#32D74B" size={96} strokeWidth={10} />
                                </div>
                                <div className="absolute inset-[24px]">
                                    <ActivityRing progress={85} color="#00C7BE" size={72} strokeWidth={10} />
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex-1 pl-6 space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#FF2D55]" />
                                    <div>
                                        <p className="text-xs text-gray-500">Move</p>
                                        <p className="text-sm font-semibold text-gray-900">324/500 <span className="text-gray-400 font-normal">CAL</span></p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#32D74B]" />
                                    <div>
                                        <p className="text-xs text-gray-500">Exercise</p>
                                        <p className="text-sm font-semibold text-gray-900">28/30 <span className="text-gray-400 font-normal">MIN</span></p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#00C7BE]" />
                                    <div>
                                        <p className="text-xs text-gray-500">Stand</p>
                                        <p className="text-sm font-semibold text-gray-900">10/12 <span className="text-gray-400 font-normal">HRS</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Metrics Grid */}
                <section className="px-6 py-2">
                    <div className="grid grid-cols-2 gap-3">
                        {/* Pace - Line Chart */}
                        <MetricCard
                            icon={Timer}
                            iconBg="bg-orange-100"
                            iconColor="text-orange-500"
                            label="Pace"
                            value={activityData.pace.value}
                            unit={activityData.pace.unit}
                            trend={activityData.pace.trend}
                            trendColor="text-green-500"
                            chart={<SimpleLineChart data={[8.5, 8.2, 8.0, 7.8, 8.3, 8.1, 7.9]} color="#f97316" />}
                        />

                        {/* Steps - Bar Chart */}
                        <MetricCard
                            icon={Footprints}
                            iconBg="bg-green-100"
                            iconColor="text-green-500"
                            label="Steps"
                            value={activityData.steps.value}
                            unit=""
                            trend={activityData.steps.trend}
                            trendColor="text-green-500"
                            chart={<SimpleBarChart data={[4000, 6000, 7500, 8432, 5000, 9000, 8200]} color="#10b981" />}
                        />

                        {/* Distance - Big Number (No Chart, Just Text Emphasis) */}
                        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col justify-between">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <TrendingUp size={18} className="text-blue-500" />
                                </div>
                                <span className="text-sm text-gray-500">Distance</span>
                            </div>
                            <div className="flex items-baseline gap-1 my-2">
                                <span className="text-4xl font-extrabold text-blue-600">{activityData.distance.value}</span>
                                <span className="text-base font-medium text-gray-400">{activityData.distance.unit}</span>
                            </div>
                            <div className="flex items-center gap-1 text-blue-500">
                                <TrendingUp size={14} />
                                <span className="text-xs">{activityData.distance.trend}</span>
                            </div>
                        </div>

                        {/* Calories - Donut Chart */}
                        <MetricCard
                            icon={Flame}
                            iconBg="bg-red-100"
                            iconColor="text-red-500"
                            label="Calories"
                            value={activityData.calories.value}
                            unit={activityData.calories.unit}
                            // trend={activityData.calories.trend}
                            trendColor="text-red-500"
                            chart={
                                <div className="flex items-center gap-3">
                                    <DonutChart value={324} total={500} color="#ef4444" size={50} />
                                    <span className="text-xs text-red-500 font-medium">+45 kcal</span>
                                </div>
                            }
                        />

                        {/* Time in Bed - Candle Chart */}
                        <MetricCard
                            icon={Moon}
                            iconBg="bg-purple-100"
                            iconColor="text-purple-500"
                            label="Sleep"
                            value={activityData.sleep.value}
                            unit={activityData.sleep.unit}
                            chart={
                                <div className="mt-1">
                                    <CandleChart
                                        data={[
                                            { open: 7, close: 8, high: 9, low: 6 },
                                            { open: 6.5, close: 7.5, high: 8, low: 6 },
                                            { open: 7.5, close: 7, high: 8.5, low: 6.5 },
                                            { open: 7, close: 8, high: 8.5, low: 6 },
                                            { open: 7.2, close: 7.8, high: 8.2, low: 7 },
                                        ]}
                                        color="#a855f7"
                                    />
                                </div>
                            }
                        />

                        {/* Heart Rate - Line Chart */}
                        <MetricCard
                            icon={Heart}
                            iconBg="bg-pink-100"
                            iconColor="text-pink-500"
                            label="Heart Rate"
                            value={activityData.heartRate.value}
                            unit={activityData.heartRate.unit}
                            chart={<SimpleLineChart data={[65, 68, 72, 70, 75, 72, 68]} color="#ec4899" />}
                        />
                    </div>
                </section>

                {/* Walk History */}
                <section className="px-6 py-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Walk History</h3>
                        <Link to="/activity/walking-record" className="flex items-center gap-1 text-gray-500 text-sm">
                            <span>Show More</span>
                            <ChevronRight size={16} />
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl px-4 border border-gray-100 shadow-sm">
                        {walkHistory.map((walk, index) => (
                            <WalkHistoryItem
                                key={index}
                                title={walk.title}
                                distance={walk.distance}
                                duration={walk.duration}
                                date={walk.date}
                            />
                        ))}
                    </div>
                </section>
            </div>

            {/* Fixed NavBar */}
            <NavBar />
        </div>
    );
};

export default ActivityScreen;
