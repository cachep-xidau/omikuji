import { useState } from 'react';
import StatusBar from '../components/StatusBar';
import NavBar from '../components/NavBar';
import { ChevronLeft, ChevronDown, ChevronUp, MapPin, Heart, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Tab Button Component
const TabButton = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium transition-colors relative ${active ? 'text-black' : 'text-gray-400'
            }`}
    >
        {label}
        {active && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
        )}
    </button>
);

// Data Row Component
const DataRow = ({ label, value, showBorder = true }) => (
    <div className={`flex justify-between items-center py-4 ${showBorder ? 'border-b border-gray-100' : ''}`}>
        <span className="text-gray-500">{label}</span>
        <span className="text-gray-900 font-medium">{value}</span>
    </div>
);

// Walk Record Card Component
const WalkRecordCard = ({ record, onViewRoute }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-3 overflow-hidden">
            {/* Header */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full px-4 py-4 flex justify-between items-center"
            >
                <div className="text-left">
                    <p className="text-base font-medium text-gray-900">{record.title}</p>
                    <p className="text-sm text-gray-400">{record.timeRange}</p>
                </div>
                {expanded ? (
                    <ChevronUp size={20} className="text-gray-400" />
                ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                )}
            </button>

            {/* Expanded Content */}
            {expanded && (
                <div className="px-4 pb-4 border-t border-gray-100">
                    <DataRow label="Duration" value={record.duration} />
                    <DataRow label="Steps" value={record.steps} />
                    <DataRow label="Distance" value={record.distance} />
                    <DataRow label="Calories" value={record.calories} />
                    <DataRow label="Average pace" value={record.pace} />
                    <DataRow label="Art" value={record.art} />
                    <DataRow label="Serial number" value={record.serialNumber} />
                    <DataRow label="Rank" value={record.rank} />
                    <DataRow label="Vortex avatar" value={record.vortexAvatar} />

                    {/* Route Section */}
                    <div className="py-4">
                        <span className="text-gray-500">Route</span>
                        <div className="mt-2 flex items-start gap-2">
                            <div className="flex flex-col items-center">
                                <Circle size={12} className="text-gray-400" strokeWidth={2} />
                                <div className="w-0.5 h-6 border-l border-dashed border-gray-300" />
                                <MapPin size={14} className="text-gray-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-900 truncate">{record.route.start}</p>
                                <div className="h-4" />
                                <p className="text-sm text-gray-900 truncate">{record.route.end}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => onViewRoute(record)}
                            className="mt-3 text-sm text-orange-500 font-medium text-right w-full"
                        >
                            View route
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Route Map Modal
const RouteMapModal = ({ record, onClose }) => (
    <div className="absolute inset-0 z-50 bg-white flex flex-col h-full">
        <StatusBar />

        {/* Header */}
        <div className="px-4 py-4 flex items-center gap-3 flex-shrink-0">
            <button onClick={onClose} className="p-1">
                <ChevronLeft size={24} className="text-gray-900" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Walking Route</h1>
        </div>

        {/* Map Area - Takes remaining space minus bottom card */}
        <div className="flex-1 relative bg-gray-100 min-h-0">
            {/* Placeholder Map with route visualization */}
            <div className="absolute inset-0 overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
                    {/* Background map pattern */}
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="#F3F4F6" />
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Roads */}
                    <path d="M 50 80 L 350 80" stroke="#D1D5DB" strokeWidth="20" strokeLinecap="round" />
                    <path d="M 100 30 L 100 370" stroke="#D1D5DB" strokeWidth="15" strokeLinecap="round" />
                    <path d="M 300 30 L 300 280" stroke="#D1D5DB" strokeWidth="15" strokeLinecap="round" />
                    <path d="M 50 200 L 350 200" stroke="#D1D5DB" strokeWidth="12" strokeLinecap="round" />
                    <path d="M 50 320 L 350 320" stroke="#D1D5DB" strokeWidth="15" strokeLinecap="round" />

                    {/* Walking route */}
                    <path
                        d="M 120 100 L 120 160 L 280 160 L 280 260 L 150 260 L 150 300"
                        fill="none"
                        stroke="#F97316"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Start point */}
                    <circle cx="120" cy="100" r="10" fill="white" stroke="#1F2937" strokeWidth="3" />

                    {/* End point */}
                    <circle cx="150" cy="300" r="12" fill="white" stroke="#1F2937" strokeWidth="2" />
                    <circle cx="150" cy="300" r="5" fill="#1F2937" />

                    {/* Location label */}
                    <rect x="180" y="240" width="100" height="28" rx="14" fill="#1F2937" />
                    <text x="230" y="258" textAnchor="middle" fill="white" fontSize="11" fontFamily="system-ui">Aoyama-dori</text>
                </svg>
            </div>

            {/* Favorite button */}
            <button className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                <Heart size={24} className="text-gray-400" />
            </button>
        </div>

        {/* Bottom Info Card */}
        <div className="bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-5 flex-shrink-0">
            <div className="flex items-start gap-3 mb-2">
                <div className="flex flex-col items-center mt-1">
                    <Circle size={12} className="text-gray-400" strokeWidth={2} />
                    <div className="w-0.5 h-4 border-l border-dashed border-gray-300" />
                    <MapPin size={14} className="text-gray-600" />
                </div>
                <div className="flex-1">
                    <p className="text-sm text-gray-900">{record.route.start}</p>
                    <div className="h-1" />
                    <p className="text-sm text-gray-900">{record.route.end}</p>
                </div>
            </div>
            <p className="text-xs text-gray-500">{record.title} • {record.timeRange}</p>
        </div>
    </div>
);

const WalkingRecordScreen = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('total');
    const [selectedRoute, setSelectedRoute] = useState(null);

    // Mock data for total
    const totalData = {
        walkCount: '12 times',
        totalTime: '11m58s',
        totalDistance: '0m',
        treasureBox: '12',
    };

    // Mock data for walking records
    const walkingRecords = [
        {
            id: 1,
            title: 'Walk 2025-11-03',
            timeRange: '06:45 - 07:28',
            duration: '10m12s',
            steps: '00 steps',
            distance: '0 km',
            calories: '0.00 Kcal',
            pace: '0.00 min/h',
            art: 'Akita',
            serialNumber: '#170503',
            rank: '0.01',
            vortexAvatar: '-',
            route: {
                start: 'Sakura-dori, Shibuya-ku...',
                end: 'Aoyama-dori, Minato-ku...',
            },
        },
        {
            id: 2,
            title: 'Walk 2025-11-03',
            timeRange: '06:45 - 07:28',
            duration: '10m12s',
            steps: '00 steps',
            distance: '0 km',
            calories: '0.00 Kcal',
            pace: '0.00 min/h',
            art: 'Akita',
            serialNumber: '#170504',
            rank: '0.01',
            vortexAvatar: '-',
            route: {
                start: 'Sakura-dori, Shibuya-ku...',
                end: 'Aoyama-dori, Minato-ku...',
            },
        },
        {
            id: 3,
            title: 'Walk 2025-11-02',
            timeRange: '06:45 - 07:28',
            duration: '15m30s',
            steps: '1,200 steps',
            distance: '1.2 km',
            calories: '45.50 Kcal',
            pace: '12.50 min/h',
            art: 'Shiba',
            serialNumber: '#170505',
            rank: '0.02',
            vortexAvatar: '-',
            route: {
                start: 'Harajuku Station, Shibuya-ku',
                end: 'Yoyogi Park, Shibuya-ku',
            },
        },
    ];

    const handleViewRoute = (record) => {
        setSelectedRoute(record);
    };

    const handleCloseRoute = () => {
        setSelectedRoute(null);
    };

    // Route Map Modal
    if (selectedRoute) {
        return <RouteMapModal record={selectedRoute} onClose={handleCloseRoute} />;
    }

    return (
        <div className="relative h-full bg-gray-50 flex flex-col">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-24">
                <StatusBar />

                {/* Header */}
                <div className="px-4 py-4 flex items-center gap-3 bg-white">
                    <button onClick={() => navigate('/activity')} className="p-1">
                        <ChevronLeft size={24} className="text-gray-900" />
                    </button>
                    <h1 className="text-xl font-semibold text-gray-900">Walking Record</h1>
                </div>

                {/* Tabs */}
                <div className="bg-white border-b border-gray-100 flex">
                    <TabButton
                        label="Total data"
                        active={activeTab === 'total'}
                        onClick={() => setActiveTab('total')}
                    />
                    <TabButton
                        label="Walking record"
                        active={activeTab === 'record'}
                        onClick={() => setActiveTab('record')}
                    />
                    <TabButton
                        label="My route"
                        active={activeTab === 'route'}
                        onClick={() => setActiveTab('route')}
                    />
                </div>

                {/* Tab Content */}
                <div className="px-4 py-4">
                    {activeTab === 'total' && (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                            <div className="px-4">
                                <DataRow label="Walk count" value={totalData.walkCount} />
                                <DataRow label="Total walking time" value={totalData.totalTime} />
                                <DataRow label="Total distance" value={totalData.totalDistance} />
                                <DataRow label="Treasure box" value={totalData.treasureBox} showBorder={false} />
                            </div>
                        </div>
                    )}

                    {activeTab === 'record' && (
                        <div>
                            {walkingRecords.map((record) => (
                                <WalkRecordCard
                                    key={record.id}
                                    record={record}
                                    onViewRoute={handleViewRoute}
                                />
                            ))}
                        </div>
                    )}

                    {activeTab === 'route' && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No saved routes yet</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Fixed NavBar */}
            <NavBar />
        </div>
    );
};

export default WalkingRecordScreen;
