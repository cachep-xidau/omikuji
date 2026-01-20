import React from 'react';

const IPhoneFrame = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-8">
            {/* iPhone 15 Pro Max Frame */}
            <div className="relative">
                {/* Device Frame */}
                <div
                    className="relative bg-[#1a1a1a] rounded-[55px] p-[12px] shadow-2xl"
                    style={{
                        boxShadow: '0 50px 100px -20px rgba(0,0,0,0.7), 0 30px 60px -30px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.1)'
                    }}
                >
                    {/* Titanium Edge */}
                    <div className="absolute inset-0 rounded-[55px] bg-gradient-to-b from-[#4a4a4a] via-[#2a2a2a] to-[#3a3a3a] p-[2px]">
                        <div className="w-full h-full rounded-[53px] bg-[#1a1a1a]"></div>
                    </div>

                    {/* Side Buttons - Left */}
                    <div className="absolute -left-[3px] top-[120px] w-[3px] h-[30px] bg-[#2a2a2a] rounded-l-sm"></div>
                    <div className="absolute -left-[3px] top-[170px] w-[3px] h-[60px] bg-[#2a2a2a] rounded-l-sm"></div>
                    <div className="absolute -left-[3px] top-[245px] w-[3px] h-[60px] bg-[#2a2a2a] rounded-l-sm"></div>

                    {/* Side Button - Right */}
                    <div className="absolute -right-[3px] top-[180px] w-[3px] h-[80px] bg-[#2a2a2a] rounded-r-sm"></div>

                    {/* Screen Container */}
                    <div className="relative z-10 w-[430px] h-[932px] bg-black rounded-[45px] overflow-hidden">
                        {/* Dynamic Island */}
                        <div className="absolute top-[12px] left-1/2 -translate-x-1/2 z-50">
                            <div className="w-[126px] h-[37px] bg-black rounded-full flex items-center justify-center">
                                <div className="w-[10px] h-[10px] bg-[#1a1a1a] rounded-full mr-2"></div>
                            </div>
                        </div>

                        {/* Screen Content */}
                        <div className="w-full h-full overflow-hidden">
                            {children}
                        </div>

                        {/* Home Indicator */}
                        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white/30 rounded-full z-50"></div>
                    </div>
                </div>

                {/* Device Label */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white/40 text-sm font-light tracking-wide">
                    iPhone 15 Pro Max
                </div>
            </div>
        </div>
    );
};

export default IPhoneFrame;
