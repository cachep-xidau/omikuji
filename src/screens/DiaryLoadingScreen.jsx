import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';

const DiaryLoadingScreen = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const duration = 5000; // 5 seconds
        const intervalTime = 50; // Update every 50ms
        const steps = duration / intervalTime;
        const increment = 100 / steps;

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => navigate('/diary'), 200);
                    return 100;
                }
                return Math.min(prev + increment, 100);
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="bg-white h-full relative flex flex-col">
            <StatusBar />

            <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6 w-full">
                <h2 className="text-2xl font-bold text-gray-900">Loading Diary</h2>

                {/* Progress Bar Container */}
                <div className="w-full max-w-[240px] h-[6px] bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-black rounded-full transition-all duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <span className="text-sm font-medium text-gray-400">{Math.round(progress)}%</span>
            </div>
        </div>
    );
};

export default DiaryLoadingScreen;
