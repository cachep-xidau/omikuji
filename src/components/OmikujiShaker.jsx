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
        // Randomize stick index for visual variety if we had multiple stick designs
        setStickIndex(Math.floor(Math.random() * 3));

        await controls.start({
            x: [0, -5, 5, -5, 5, 0],
            y: [0, -10, 5, -5, 0],
            rotate: [0, -5, 5, -10, 10, 0],
            transition: {
                duration: 0.5,
                repeat: 2, // Shake for about 1.5 seconds total
                ease: "easeInOut"
            }
        });

        onShakeComplete && onShakeComplete();
    };

    const dispenseStick = async () => {
        // Tilt the tube
        await controls.start({
            rotate: 135,
            y: 20,
            transition: { duration: 0.6, ease: "backOut" }
        });

        // Stick slides out (handled by child motion component)
        // Wait a bit for the stick to slide out fully before triggering complete
        setTimeout(() => {
            onDispenseComplete && onDispenseComplete();
        }, 800);
    };

    return (
        <div className="relative w-48 h-64 flex items-center justify-center">
            {/* Stick (Hidden initially, slides out during dispensing) */}
            <motion.div
                className="absolute z-10 w-4 h-32 bg-[#D4A373] border border-[#BC6C25] rounded-full shadow-sm"
                initial={{ y: 0, opacity: 0 }}
                animate={state === 'dispensing' ? {
                    y: 60, // Slides out
                    opacity: 1,
                    transition: { delay: 0.4, duration: 0.5, ease: "easeOut" }
                } : { y: 0, opacity: 0 }}
                style={{ originY: 0 }}
            >
                {/* Stick Markings */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[8px] font-bold text-[#8B4513] writing-vertical-rl">
                    吉
                </div>
            </motion.div>

            {/* The Tube */}
            <motion.div
                animate={controls}
                className="relative z-20 w-32 h-48"
            >
                {/* Tube Body (Hexagonal-ish look via CSS gradients/borders) */}
                <div className="absolute inset-0 bg-[#8B4513] rounded-3xl overflow-hidden border-4 border-[#5D2906] shadow-xl">
                    {/* Wood Texture / Hexagon Facets */}
                    <div className="absolute inset-y-0 left-1/4 right-1/4 bg-[#A0522D] opacity-80"></div>
                    <div className="absolute inset-y-0 left-1/3 right-1/3 bg-[#CD853F] opacity-20 blur-sm"></div>

                    {/* Decorative Rope/Knot at top */}
                    <div className="absolute top-8 left-0 right-0 h-4 bg-red-700 shadow-md"></div>
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-red-700 bg-transparent"></div>

                    {/* Kanji Label */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 px-3 py-6 rounded-lg border border-[#8B4513] shadow-inner">
                        <span className="text-2xl font-bold text-black writing-vertical-rl font-serif tracking-widest">
                            御神籤
                        </span>
                    </div>

                    {/* Bottom Cap */}
                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#5D2906]"></div>
                </div>

                {/* Tube Opening (Top Cap area) */}
                <div className="absolute -top-2 left-0 right-0 h-8 bg-[#65350F] rounded-[50%] border-b-4 border-[#3E1C05]"></div>
            </motion.div>
        </div>
    );
};

export default OmikujiShaker;
