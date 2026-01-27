import React from 'react';
import { Share2 } from 'lucide-react';

const FortuneCard = ({ fortune, isTied = false }) => {
    if (!fortune) return null;

    return (
        <div className={`relative w-full max-w-[320px] mx-auto bg-[#FFFDF5] border-x-4 border-t-4 border-b-4 border-[#E8E4D0] shadow-sm overflow-hidden ${isTied ? 'opacity-50 grayscale' : ''}`}>

            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>

            {/* COMBINED TIER: Header + Overview */}
            <div className="p-4 relative border-b-2 border-dashed border-[#dcd9c6]">
                {/* Fortune Label Removed */}

                {/* Proverb (Top Center) */}
                <div className="text-center mb-4 mt-2">
                    <p className="font-serif text-lg font-bold text-gray-800 leading-relaxed">
                        "{fortune.proverb_jp}"
                    </p>
                </div>

                {/* Content Row: Level (Left) + Vertical Advice (Right) */}
                <div className="flex justify-center items-center gap-6 mb-2">
                    {/* LEFT: Fortune Level */}
                    <div className="text-center flex-shrink-0">
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

                    {/* RIGHT: Vertical Text */}
                    <div className="h-24" style={{ writingMode: 'vertical-rl' }}>
                        <p className="text-sm text-gray-800 font-serif leading-loose tracking-widest text-justify">
                            <span className="font-bold text-xs mb-2 block">今日の仕事運</span>
                            {fortune.bloodTypeWorkAdvice || fortune.advice?.[0]?.text}
                        </p>
                    </div>
                </div>
            </div>

            {/* TIER 3: DETAILED ADVICE (Vertical) */}
            <div className="p-6 relative border-t-0 border-[#dcd9c6]"> {/* Removed top border as previous section has bottom border */}
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
                    const bt = fortune.bloodType || 'A';
                    const data = fortunes[bt] || fortunes['A'];

                    return (
                        <div className="text-gray-600">
                            {/* Vertical Text Area (Tategaki) */}
                            <div className="flex flex-row-reverse justify-center gap-2 mb-2 items-start">
                                {/* Total Fortune (Rightmost) */}
                                <div className="h-32" style={{ writingMode: 'vertical-rl' }}>
                                    <span className="text-sm text-gray-800 tracking-widest leading-loose">
                                        <span className="font-bold text-gray-900 text-xs mr-2">総合運:</span>
                                        {data.total}/5
                                    </span>
                                </div>

                                {/* Love */}
                                <div className="h-32" style={{ writingMode: 'vertical-rl' }}>
                                    <span className="text-xs text-gray-700 font-serif tracking-widest leading-loose">
                                        <span className="font-bold text-gray-900 text-[10px] mr-2">恋愛運</span>
                                        {data.love}
                                    </span>
                                </div>

                                {/* Work */}
                                <div className="h-32" style={{ writingMode: 'vertical-rl' }}>
                                    <span className="text-xs text-gray-700 font-serif tracking-widest leading-loose">
                                        <span className="font-bold text-gray-900 text-[10px] mr-2">仕事運</span>
                                        {data.work}
                                    </span>
                                </div>

                                {/* Money */}
                                <div className="h-32" style={{ writingMode: 'vertical-rl' }}>
                                    <span className="text-xs text-gray-700 font-serif tracking-widest leading-loose">
                                        <span className="font-bold text-gray-900 text-[10px] mr-2">金運</span>
                                        {data.money}
                                    </span>
                                </div>

                                {/* Lucky Color */}
                                <div className="h-32" style={{ writingMode: 'vertical-rl' }}>
                                    <span className="text-xs text-gray-800 font-serif tracking-widest leading-loose">
                                        <span className="font-bold text-gray-500 text-[9px] mr-2">色</span>
                                        {data.color}
                                    </span>
                                </div>

                                {/* Lucky Item (Leftmost) */}
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
                        信濃國一之宮 (Walk2Earn Shrine)
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
