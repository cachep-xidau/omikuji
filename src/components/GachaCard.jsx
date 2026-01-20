import React from 'react';
import { ChevronRight } from 'lucide-react';

const GachaCard = ({ type = 'regular', count = 0 }) => {
    const isRegular = type === 'regular';

    return (
        <div className="flex-1 bg-white rounded-[24px] py-6 px-2 border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-1">
            {/* 3D Sphere Icon */}
            {isRegular ? (
                <img
                    src="/images/gacha-regular.png"
                    alt="Regular Ticket"
                    className="w-[52px] h-[52px] object-contain mb-2"
                />
            ) : (
                <img
                    src="/images/gacha-premium.png"
                    alt="Premium Ticket"
                    className="w-[52px] h-[52px] object-contain mb-2"
                />
            )}

            {/* Label */}
            <div className="flex items-center gap-0.5 text-[12px] text-gray-500 font-medium">
                <span>{isRegular ? 'Regular ticket' : 'Premium ticket'}</span>
                <ChevronRight size={14} strokeWidth={2} />
            </div>

            {/* Count */}
            <p className="text-[32px] leading-tight font-bold text-[#181818]">{count}</p>
        </div>
    );
};

export default GachaCard;
