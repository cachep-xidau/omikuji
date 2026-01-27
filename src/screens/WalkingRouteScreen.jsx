import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import { ChevronLeft, Heart, MapPin, Circle } from 'lucide-react';

const WalkingRouteScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Default mock data if none is passed via state
    const defaultRecord = {
        title: 'Morning Walk',
        timeRange: '07:00 - 07:45',
        route: {
            start: 'Sakura-dori, Shibuya-ku',
            end: 'Aoyama-dori, Minato-ku'
        }
    };

    const record = location.state?.record || defaultRecord;

    return (
        <div className="absolute inset-0 z-50 bg-white flex flex-col h-full">
            <StatusBar />

            {/* Header */}
            <div className="px-4 py-4 flex items-center gap-3 flex-shrink-0 bg-white z-10">
                <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft size={24} className="text-gray-900" />
                </button>
                <h1 className="text-xl font-semibold text-gray-900">Walking Route</h1>
            </div>

            {/* Map Area */}
            <div className="flex-1 relative bg-gray-100 min-h-0">
                {/* SVG Map Visualization */}
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

                        {/* Walking route Path */}
                        <path
                            d="M 120 100 L 120 160 L 280 160 L 280 260 L 150 260 L 150 300"
                            fill="none"
                            stroke="#F97316"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="animate-[dash_2s_linear_infinite]"
                            strokeDasharray="10 5"
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
                <button className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform active:scale-95">
                    <Heart size={24} className="text-gray-400 hover:text-red-500 transition-colors" />
                </button>
            </div>

            {/* Bottom Info Card */}
            <div className="bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-6 flex-shrink-0 z-10">
                <div className="flex items-start gap-4 mb-3">
                    <div className="flex flex-col items-center mt-1">
                        <Circle size={12} className="text-gray-400" strokeWidth={2} />
                        <div className="w-0.5 h-6 border-l-2 border-dashed border-gray-300 my-1" />
                        <MapPin size={16} className="text-orange-500" />
                    </div>
                    <div className="flex-1 space-y-4">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Start Point</p>
                            <p className="text-sm font-medium text-gray-900">{record.route.start}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Destination</p>
                            <p className="text-sm font-medium text-gray-900">{record.route.end}</p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between text-xs text-gray-500">
                    <span>{record.title}</span>
                    <span>{record.timeRange}</span>
                </div>
            </div>
        </div>
    );
};

export default WalkingRouteScreen;
