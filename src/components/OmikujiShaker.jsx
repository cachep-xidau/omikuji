import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const OmikujiShaker = ({ state, onShakeComplete, onDispenseComplete }) => {
    // state: 'idle' | 'shaking' | 'dispensing' | 'result'
    const controls = useAnimation();
    const [stickIndex, setStickIndex] = useState(0);

    useEffect(() => {
        if (state === 'shaking') {
            startShaking();
        } else if (state === 'dispensing') {
            dispenseStick();
        } else if (state === 'idle') {
            controls.set({ rotate: 0, y: 0, x: 0 });
        }
    }, [state]);

    const startShaking = async () => {
        // Randomize stick index for visual variety
        setStickIndex(Math.floor(Math.random() * 3));

        // More aggressive, high-frequency shake
        await controls.start({
            x: [0, -8, 8, -6, 6, -4, 4, 0],
            y: [0, -15, 5, -10, 5, -5, 5, 0],
            rotate: [0, -8, 8, -12, 12, -5, 5, 0],
            transition: {
                duration: 0.4, // Faster shake
                repeat: 3,     // More repetitions
                ease: "easeInOut"
            }
        });

        onShakeComplete && onShakeComplete();
    };

    const dispenseStick = async () => {
        // Tilt the tube significantly
        await controls.start({
            rotate: 145,
            y: 30,
            x: 10,
            transition: { duration: 0.5, ease: "backOut" }
        });

        // Stick slides out logic handled by the stick motion component below
        // Wait for stick to slide out fully
        setTimeout(() => {
            onDispenseComplete && onDispenseComplete();
        }, 800);
    };

    return (
        <div className="relative w-64 h-80 flex items-center justify-center">
            {/* Stick (Hidden initially, slides out during dispensing) */}
            <motion.div
                className="absolute z-0 w-3 h-40 origin-bottom"
                initial={{ y: 0, x: 0, opacity: 0, rotate: 0 }}
                animate={state === 'dispensing' ? {
                    y: 80, // Slides out
                    x: 60, // Follows the tilt
                    rotate: 145, // Matches tube rotation
                    opacity: 1,
                    transition: { delay: 0.2, duration: 0.6, ease: "easeOut" }
                } : { y: 0, opacity: 0 }}
            >
                {/* Bamboo Stick Visual */}
                <svg width="12" height="160" viewBox="0 0 12 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="12" height="160" rx="2" fill="#E6C288" />
                    <rect x="2" width="1" height="160" fill="#D4A373" />
                    <rect x="9" width="1" height="160" fill="#C89765" />
                    {/* Kanji Markings */}
                    <text x="6" y="20" fontSize="8" fontWeight="bold" fill="#8B4513" textAnchor="middle">大</text>
                    <text x="6" y="30" fontSize="8" fontWeight="bold" fill="#8B4513" textAnchor="middle">吉</text>
                    <rect y="150" width="12" height="10" fill="#CD5C5C" />
                </svg>
            </motion.div>

            {/* The Tube (SVG) */}
            <motion.div
                animate={controls}
                className="relative z-20 drop-shadow-2xl filter"
            >
                <svg width="140" height="220" viewBox="0 0 140 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Hexagonal Prism Main Body */}
                    <path d="M20 30 L120 30 L120 190 L20 190 Z" fill="#8B4513" />

                    {/* Facets for 3D effect */}
                    <rect x="20" y="30" width="33" height="160" fill="#65350F" />
                    <rect x="53" y="30" width="34" height="160" fill="#8B4513" />
                    <rect x="87" y="30" width="33" height="160" fill="#5D2906" />

                    {/* Gradient Overlay for Roundness */}
                    <rect x="20" y="30" width="100" height="160" fill="url(#wood-gradient)" style={{ mixBlendMode: 'overlay' }} opacity="0.4" />

                    {/* Top Metal Cap */}
                    <rect x="15" y="20" width="110" height="15" fx="2" fill="url(#metal-gradient)" stroke="#B8860B" strokeWidth="1" />

                    {/* Bottom Metal Cap */}
                    <rect x="15" y="190" width="110" height="15" fx="2" fill="url(#metal-gradient)" stroke="#B8860B" strokeWidth="1" />

                    {/* Shimenawa Rope Details (Top) */}
                    <path d="M15 50 C 15 50, 70 70, 125 50" stroke="#CD5C5C" strokeWidth="4" fill="none" />
                    <path d="M15 55 C 15 55, 70 75, 125 55" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 2" fill="none" />

                    {/* Center Label Area */}
                    <rect x="45" y="70" width="50" height="100" rx="4" fill="#FDF5E6" stroke="#D2691E" strokeWidth="2" />

                    {/* Vertical Kanji Text */}
                    <text x="70" y="100" fontSize="24" fontWeight="bold" fontFamily="serif" fill="#000000" textAnchor="middle">御</text>
                    <text x="70" y="130" fontSize="24" fontWeight="bold" fontFamily="serif" fill="#000000" textAnchor="middle">神</text>
                    <text x="70" y="160" fontSize="24" fontWeight="bold" fontFamily="serif" fill="#000000" textAnchor="middle">籤</text>

                    {/* Definitions */}
                    <defs>
                        <linearGradient id="wood-gradient" x1="20" y1="30" x2="120" y2="30" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#3E1C05" />
                            <stop offset="0.5" stopColor="#A0522D" stopOpacity="0.1" />
                            <stop offset="1" stopColor="#3E1C05" />
                        </linearGradient>
                        <linearGradient id="metal-gradient" x1="15" y1="0" x2="125" y2="0" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#B8860B" />
                            <stop offset="0.3" stopColor="#FFD700" />
                            <stop offset="0.5" stopColor="#F0E68C" />
                            <stop offset="0.8" stopColor="#B8860B" />
                            <stop offset="1" stopColor="#8B4513" />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div>
        </div>
    );
};

export default OmikujiShaker;
