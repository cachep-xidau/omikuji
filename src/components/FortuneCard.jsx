import React from 'react';
import { Share2, Sparkles } from 'lucide-react';

const FortuneCard = ({ fortune, isTied = false }) => {
    if (!fortune) return null;

    // Use snapshotted microseason if available
    const ms = fortune.microseason;

    // AI Mirror Comment (Mock for now, simulating the "Mirror" request)
    const aiComments = [
        "Your path is clear today.",
        "Reflect on these words.",
        "Nature whispers its secrets to you.",
        "Balance is found in the stillness."
    ];
    const randomComment = aiComments[fortune.id % aiComments.length];

    return (
        <div className={`relative w-full max-w-[320px] mx-auto bg-[#FFFDF5] border-x-4 border-t-4 border-b-4 border-[#E8E4D0] shadow-sm overflow-hidden ${isTied ? 'opacity-50 grayscale' : ''}`}>

            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>

            {/* TIER 1: HEADER (Fortune Grade) */}
            <div className="pt-8 pb-6 text-center border-b-2 border-dashed border-[#dcd9c6] relative">


                {/* Grade */}
                <h2 className="text-5xl font-serif font-black mb-1 text-gray-800 tracking-tighter">
                    {fortune.level}
                </h2>
                <div
                    className="inline-block px-3 py-1 rounded-sm text-[11px] font-bold tracking-[0.2em] uppercase text-white mt-1"
                    style={{ backgroundColor: fortune.color }}
                >
                    {fortune.level_romaji}
                </div>
            </div>

            {/* TIER 2: OVERVIEW (Blood Type Advice) */}
            <div className="p-6 relative border-b-2 border-dashed border-[#dcd9c6]">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FFFDF5] px-2 text-[#dcd9c6] text-xs font-serif italic">
                    運勢 (Fortune)
                </div>

                {/* Proverb */}
                <div className="text-center mb-6">
                    <p className="font-serif text-xl font-bold text-gray-800 leading-relaxed mb-1">
                        "{fortune.proverb_jp}"
                    </p>
                </div>

                {/* Blood Type Specific Advice */}
                {fortune.bloodTypeWorkAdvice ? (
                    <div className="mt-8 mb-4 flex justify-center">
                        <div className="h-24" style={{ writingMode: 'vertical-rl' }}>
                            <span className="text-[10px] font-bold text-gray-400 tracking-widest mb-3 block">今日の仕事運</span>
                            <p className="text-sm text-gray-800 font-serif leading-loose tracking-widest text-justify">
                                {fortune.bloodTypeWorkAdvice}
                            </p>
                        </div>
                    </div>
                ) : (
                    /* Check if normal advice can be shown if no BT advice */
                    <div className="space-y-4">
                        {fortune.advice.map((item, idx) => (
                            <div key={idx} className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#f4f1e1] flex items-center justify-center text-sm shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-0.5">
                                        {item.label}
                                    </h4>
                                    <p className="text-sm text-gray-700 leading-snug">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* TIER 3: BLOOD FORTUNE TELLING (Replaces Mirror) */}
            <div className="p-6 relative border-t-2 border-dashed border-[#dcd9c6]">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">血液型占い</span>
                </div>

                {(() => {
                    const fortunes = {
                        'A': {
                            total: 3,
                            love: '会話と感情の共有に良い日',
                            work: '細部に集中しましょう',
                            money: '衝動買いは避けましょう',
                            color: '青 (Blue)',
                            item: '手帳 (Notebook)'
                        },
                        'B': {
                            total: 4,
                            love: '感情を素直に表現して',
                            work: '独創的なアイデアが到来',
                            money: '投資に良い時期です',
                            color: '黄色 (Yellow)',
                            item: '音楽プレーヤー'
                        },
                        'O': {
                            total: 3,
                            love: '積極的に行動しましょう',
                            work: 'リーダーシップを発揮する好機',
                            money: '安定しています',
                            color: '赤 (Red)',
                            item: 'スニーカー'
                        },
                        'AB': {
                            total: 5,
                            love: '予期せぬ出会いがあるかも',
                            work: '論理と直感のバランスを',
                            money: '予算を見直すべきです',
                            color: '紫 (Purple)',
                            item: '本 (Book)'
                        }
                    };
                    const data = fortunes[fortune.bloodType] || fortunes['A'];

                    return (
                        <div className="text-gray-600">
                            {/* Vertical Text Area (Tategaki) */}
                            <div className="flex flex-row-reverse justify-center gap-5 mb-2 items-start">
                                {/* Total Fortune (Rightmost) - Taller/Unconstrained */}
                                <div className="h-32" style={{ writingMode: 'vertical-rl' }}>
                                    <span className="text-sm text-gray-800 tracking-widest leading-loose">
                                        <span className="font-bold text-gray-900 text-xs mr-2">総合運:</span>
                                        {data.total}/5
                                    </span>
                                </div>

                                {/* Love - Max 6 chars */}
                                <div className="h-32" style={{ writingMode: 'vertical-rl' }}>
                                    <span className="text-xs text-gray-700 font-serif tracking-widest leading-loose">
                                        <span className="font-bold text-gray-900 text-[10px] mr-2">恋愛運</span>
                                        {data.love}
                                    </span>
                                </div>

                                {/* Work - Max 6 chars */}
                                <div className="h-32" style={{ writingMode: 'vertical-rl' }}>
                                    <span className="text-xs text-gray-700 font-serif tracking-widest leading-loose">
                                        <span className="font-bold text-gray-900 text-[10px] mr-2">仕事運</span>
                                        {data.work}
                                    </span>
                                </div>

                                {/* Money - Max 6 chars */}
                                <div className="h-32" style={{ writingMode: 'vertical-rl' }}>
                                    <span className="text-xs text-gray-700 font-serif tracking-widest leading-loose">
                                        <span className="font-bold text-gray-900 text-[10px] mr-2">金運</span>
                                        {data.money}
                                    </span>
                                </div>

                                {/* Lucky Color - Max 6 chars */}
                                <div className="h-32" style={{ writingMode: 'vertical-rl' }}>
                                    <span className="text-xs text-gray-800 font-serif tracking-widest leading-loose">
                                        <span className="font-bold text-gray-500 text-[9px] mr-2">色</span>
                                        {data.color}
                                    </span>
                                </div>

                                {/* Lucky Item (Leftmost) - Max 6 chars */}
                                <div className="h-32" style={{ writingMode: 'vertical-rl' }}>
                                    <span className="text-xs text-gray-800 font-serif tracking-widest leading-loose">
                                        <span className="font-bold text-gray-500 text-[9px] mr-2">物</span>
                                        {data.item}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })()}
            </div>

            {/* Footer Bar */}
            {!isTied && (
                <div className="bg-[#eeece1] px-4 py-2 flex justify-between items-center text-[#9c9a8d]">
                    <span className="text-[9px] uppercase tracking-wider font-bold">
                        信濃國一之宮 (Shrine)
                    </span>
                    <button className="hover:text-gray-600 transition-colors">
                        <Share2 size={12} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default FortuneCard;
