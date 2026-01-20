import React from 'react';

const DonutChart = ({ total = 120, completed = 60, label = 'Total missions' }) => {
    const uncompleted = total - completed;
    const completedPercent = Math.round((completed / total) * 100);
    const uncompletedPercent = 100 - completedPercent;

    // SVG circle calculations
    const size = 160;
    const strokeWidth = 16;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const completedOffset = circumference - (completedPercent / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            {/* Chart */}
            <div className="relative">
                <svg width={size} height={size} className="-rotate-90">
                    {/* Background circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="#f3f4f6"
                        strokeWidth={strokeWidth}
                    />
                    {/* Uncompleted segment (red) */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="#F12E11"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - (uncompletedPercent / 100) * circumference}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                    />
                    {/* Completed segment (green) */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="#9BDDA5"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={completedOffset}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                        style={{ transform: `rotate(${uncompletedPercent * 3.6}deg)`, transformOrigin: 'center' }}
                    />
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xs text-[#969696]">{label}</span>
                    <span className="text-3xl font-bold text-[#181818]">{total}</span>
                </div>
            </div>

            {/* Legend */}
            <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#9BDDA5]"></span>
                    <div className="text-sm">
                        <span className="text-[#969696]">Completed</span>
                        <span className="ml-1 font-medium text-[#969696]">({completed})</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#F12E11]"></span>
                    <div className="text-sm">
                        <span className="text-[#969696]">Uncompleted</span>
                        <span className="ml-1 font-medium text-[#969696]">({uncompleted})</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonutChart;
