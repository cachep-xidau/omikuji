import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import { getImagePath } from '../utils/imagePath';

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
        <div className="h-full w-full relative bg-white flex flex-col items-center overflow-hidden">
            <StatusBar />

            {/* Main Character Image */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pt-20">
                <img
                    src={getImagePath('/images/sakura_loading.webp')}
                    alt="Loading..."
                    className="h-full w-full object-cover object-top"
                />
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 z-0 bg-[#181818] opacity-50 pointer-events-none" />

            {/* Bottom Loading Indicator */}
            <div className="absolute bottom-12 w-full px-8 z-10 flex flex-col items-center gap-3">
                <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">
                    Loading Diary...
                </span>

                {/* Progress Bar */}
                <div className="w-full max-w-[200px] h-[4px] bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-rose-400 rounded-full transition-all duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <span className="text-xs font-mono text-gray-400">
                    {Math.round(progress)}%
                </span>
            </div>
        </div>
    );
};

export default DiaryLoadingScreen;
