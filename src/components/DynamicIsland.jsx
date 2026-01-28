import React from 'react';

const DynamicIsland = () => {
    return (
        <div className="absolute top-[12px] left-1/2 -translate-x-1/2 z-[60] pointer-events-none">
            <div className="w-[126px] h-[37px] bg-black rounded-full flex items-center justify-center">
                <div className="w-[10px] h-[10px] bg-[#1a1a1a] rounded-full mr-2"></div>
            </div>
        </div>
    );
};

export default DynamicIsland;
