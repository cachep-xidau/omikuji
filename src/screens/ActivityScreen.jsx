import StatusBar from '../components/StatusBar';
import NavBar from '../components/NavBar';
import DynamicIsland from '../components/DynamicIsland';
import { ChevronRight, Footprints, Flame, Moon, Heart, Timer, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DonutChart } from '../components/ActivityCharts';

// Activity Ring Component with Gradient Support
const ActivityRing = ({ progress, gradientId, size = 120, strokeWidth = 12, opacity = 1 }) => {
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
                stroke="currentColor"
                className="text-gray-100"
                strokeWidth={strokeWidth}
                opacity={0.3}
            />
            {/* Progress ring */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                opacity={opacity}
            />
        </svg>
    );
};

// Weekly Bar Chart Component (7 Days)
const WeeklyBarChart = ({ data, color, height = 100 }) => {
    const maxVal = Math.max(...data, 1);
    const bars = 7;
    // Calculate width percentages for even spacing
    const viewWidth = 100;
    const barWidth = 6;
    const gap = (viewWidth - (bars * barWidth)) / (bars - 1);

    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    return (
        <svg width="100%" height={height} viewBox={`0 0 ${viewWidth} ${height}`} className="overflow-visible">
            {data.map((d, i) => {
                const barHeight = (d / maxVal) * (height * 0.75); // Max height 75%
                const x = i * (barWidth + gap);
                const y = height - barHeight - 15;

                return (
                    <g key={i}>
                        {/* Background subtle track */}
                        <rect x={x} y={0} width={barWidth} height={height - 15} fill={color} fillOpacity="0.05" rx="3" />

                        {/* Value bar */}
                        {d > 0 && (
                            <rect
                                x={x}
                                y={y}
                                width={barWidth}
                                height={barHeight}
                                fill={color}
                                fillOpacity="1"
                                rx="3"
                            />
                        )}

                        {/* Day Labels */}
                        <text
                            x={x + barWidth / 2}
                            y={height}
                            fill="#9CA3AF"
                            fontSize="10"
                            textAnchor="middle"
                            fontFamily="Switzer"
                            fontWeight="500"
                        >
                            {days[i]}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

// Apple Style Metric Card (Light Mode)
const AppleMetricCard = ({ title, value, unit, color, data, chart, subtitle = "Last 7 Days", className = "", height = "h-[215px]", chartHeight = "h-[100px]" }) => (
    <div className={`bg-white rounded-2xl p-4 border border-[#E6E3E3] flex flex-col justify-between ${height} ${className}`}>
        <div>
            <div className="flex justify-between items-start mb-1">
                <span className="text-[16px] font-['Switzer'] font-semibold text-gray-900">{title}</span>
                <div className="bg-gray-100 p-1 rounded-full">
                    <ChevronRight size={14} className="text-gray-400" />
                </div>
            </div>

            <div className="mb-4">
                <span className="text-xs font-medium text-gray-500 block mb-1">{subtitle}</span>
                <div className="flex items-baseline gap-1">
                    <span
                        className="text-[20px] font-['Switzer'] font-semibold"
                        style={{ color: color }}
                    >
                        {value}
                    </span>
                    <span className="text-sm font-medium text-gray-500">{unit}</span>
                </div>
            </div>
        </div>

        <div className={`w-full ${chartHeight} flex items-end justify-center`}>
            {chart ? chart : <WeeklyBarChart data={data} color={color} height={80} />}
        </div>
    </div>
);

// Wide Metric Card Component (Avg Time in Bed / Heart Rate)
const WideMetricCard = ({ icon, label, value, unit, chart }) => (
    <div className="bg-white rounded-2xl p-4 border border-[#E6E3E3] flex flex-col justify-between h-[128px] col-span-2">
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
                {icon}
                <span className="text-[16px] font-['Switzer'] font-semibold text-gray-900">{label}</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
        </div>
        <div className="flex items-end justify-between w-full">
            <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-[#EE3424]">{value}</span>
                <span className="text-lg text-gray-400 font-medium">{unit}</span>
            </div>
            <div className="w-[120px] h-[60px] flex items-end justify-end">
                {chart}
            </div>
        </div>
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

    // Mock weekly data (7 days)
    const stepsWeekly = [4500, 6200, 8100, 5400, 9200, 11000, 8432];
    const distWeekly = [3.2, 4.5, 6.1, 4.0, 7.2, 8.5, 6.2];
    const paceWeekly = [8.5, 8.2, 8.0, 7.8, 8.3, 8.1, 8.4];
    const sleepWeekly = [7.0, 6.5, 8.0, 7.2, 7.5, 8.5, 7.7];

    const walkHistory = [
        { title: 'Outdoor Walk', distance: '2.1 km', duration: '28 min', date: 'Today' },
        { title: 'Evening Walk', distance: '1.8 km', duration: '22 min', date: 'Yesterday' },
        { title: 'Morning Walk', distance: '3.2 km', duration: '42 min', date: 'Jan 25' },
        { title: 'Park Walk', distance: '2.5 km', duration: '32 min', date: 'Jan 24' },
    ];

    return (
        <div className="relative w-full h-full bg-gray-50 overflow-hidden">
            {/* Dynamic Island - Fixed at absolute top */}
            <DynamicIsland />

            {/* Fixed Header Elements - Absolute Top */}
            <div className="absolute top-0 left-0 right-0 z-50 bg-gray-50 border-b border-gray-200/50 pt-[12px]">
                <StatusBar />
            </div>

            {/* Scrollable Content - Absolute Full Fill with Top Padding */}
            <div className="absolute inset-0 overflow-y-auto pt-[60px] pb-24">
                {/* Header */}
                <div className="px-6 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">Activity</h1>
                    <p className="text-sm text-gray-500 mt-1">Monday, January 27</p>
                </div>

                {/* Activity Rings Section */}
                <section className="px-6 py-4">
                    <div className="bg-white rounded-2xl p-5 border border-[#E6E3E3] relative overflow-hidden">
                        {/* Define Gradients for the entire section */}
                        <svg className="absolute w-0 h-0">
                            <defs>
                                <linearGradient id="ring-orange" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#F4AA1C" />
                                    <stop offset="100%" stopColor="#EE3424" />
                                </linearGradient>
                                <linearGradient id="ring-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#3B82F6" />
                                    <stop offset="100%" stopColor="#2563EB" />
                                </linearGradient>
                                <linearGradient id="ring-green" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#10B981" />
                                    <stop offset="100%" stopColor="#059669" />
                                </linearGradient>
                            </defs>
                        </svg>

                        <div className="flex items-center justify-between">
                            {/* Rings - Darkest outside, Lightest inside */}
                            <div className="relative w-[120px] h-[120px]">
                                <div className="absolute inset-0">
                                    <ActivityRing progress={75} gradientId="ring-orange" size={120} strokeWidth={10} opacity={1} />
                                </div>
                                <div className="absolute inset-[12px]">
                                    <ActivityRing progress={60} gradientId="ring-blue" size={96} strokeWidth={10} opacity={0.7} />
                                </div>
                                <div className="absolute inset-[24px]">
                                    <ActivityRing progress={85} gradientId="ring-green" size={72} strokeWidth={10} opacity={0.4} />
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex-1 pl-6 space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-brand-gradient" />
                                    <div>
                                        <p className="text-xs text-gray-500">Move</p>
                                        <p className="text-sm font-semibold text-gray-900">324/500 <span className="text-gray-400 font-normal">CAL</span></p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500 opacity-70" />
                                    <div>
                                        <p className="text-xs text-gray-500">Exercise</p>
                                        <p className="text-sm font-semibold text-gray-900">28/30 <span className="text-gray-400 font-normal">MIN</span></p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500 opacity-40" />
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
                        {/* Avg. Pace - Apple Style Card */}
                        <AppleMetricCard
                            title="Avg. Pace"
                            value={activityData.pace.value}
                            unit={activityData.pace.unit}
                            color="#EE3424" // Brand Red
                            data={paceWeekly}
                        />

                        {/* Steps - Apple Style Card */}
                        <AppleMetricCard
                            title="Steps"
                            value={activityData.steps.value}
                            unit=""
                            color="#EE3424" // Brand Red
                            data={stepsWeekly}
                        />

                        {/* Distance - Apple Style Card */}
                        <AppleMetricCard
                            title="Distance"
                            value={activityData.distance.value}
                            unit={activityData.distance.unit}
                            color="#EE3424" // Brand Red
                            data={distWeekly}
                        />

                        {/* Calories - Apple Style Card (Donut) */}
                        <AppleMetricCard
                            title="Calories"
                            value={activityData.calories.value}
                            unit={activityData.calories.unit}
                            color="#EE3424" // Brand Red
                            subtitle="Today"
                            chart={
                                <div className="flex flex-col items-center gap-2 pb-2">
                                    <DonutChart value={324} total={500} size={80} />
                                    <span className="text-[10px] text-red-500 font-medium">+45 kcal</span>
                                </div>
                            }
                        />

                        {/* Avg Time in Bed - Wide Card (Restored with WeeklyBarChart) */}
                        <WideMetricCard
                            label="Avg. Time in Bed"
                            value="7.7"
                            unit="hr"
                            icon={<Moon size={20} className="text-gray-900" />}
                            chart={
                                <div className="w-full pl-2">
                                    <WeeklyBarChart data={sleepWeekly} color="#EE3424" height={80} />
                                </div>
                            }
                        />

                        {/* Avg Heart Rate - Wide Card (Old Style) */}
                        <WideMetricCard
                            label="Avg. Heart Rate"
                            value="80"
                            unit="bpm"
                            icon={<Heart size={20} className="text-gray-900" />}
                            chart={
                                <svg width="100%" height="80" viewBox="0 0 120 80" className="overflow-visible">
                                    <defs>
                                        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#F4AA1C" />
                                            <stop offset="100%" stopColor="#EE3424" />
                                        </linearGradient>
                                    </defs>
                                    <polyline
                                        points="0,60 20,50 40,55 60,40 80,45 100,20"
                                        fill="none"
                                        stroke="url(#line-gradient)"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <circle cx="100" cy="20" r="4" fill="#EE3424" />
                                </svg>
                            }
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

                    <div className="bg-white rounded-2xl px-4 border border-[#E6E3E3]">
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

            {/* Fixed NavBar - Absolute Bottom */}
            <NavBar />
        </div>
    );
};

export default ActivityScreen;
