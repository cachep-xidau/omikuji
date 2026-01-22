import React from 'react';
import { Sparkles, Lock, X, Crown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getImagePath } from '../utils/imagePath';

const AISuggestion = ({ suggestion }) => {
    const { language } = useLanguage();
    // Map global 'ja' to 'jp' for the data structure if needed, or update usage
    const langKey = language === 'ja' ? 'jp' : 'en';

    const [isLocked, setIsLocked] = React.useState(true);
    const [showOffer, setShowOffer] = React.useState(false);

    if (!suggestion) return null;

    const criteria = [
        { key: 'work', labelJP: '仕事', labelEN: 'Work' },
        { key: 'love', labelJP: '恋愛', labelEN: 'Love' },
        { key: 'health', labelJP: '健康', labelEN: 'Health' },
        { key: 'money', labelJP: '金運', labelEN: 'Money' },
        { key: 'study', labelJP: '学業', labelEN: 'Study' }
    ];

    const handleUnlock = (e) => {
        e.stopPropagation();
        setIsLocked(false);
        setShowOffer(false);
    };

    return (
        <div
            className={`bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100 shadow-sm relative overflow-hidden mt-4 transition-all duration-300 ${isLocked ? 'cursor-pointer hover:shadow-md' : ''}`}
            onClick={() => isLocked && setShowOffer(true)}
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    <img
                        src={getImagePath('images/companion_avatar.png')}
                        alt="AI Avatar"
                        className="w-8 h-8 rounded-full bg-indigo-100 object-cover"
                    />
                    <div>
                        <h3 className="text-sm font-bold text-indigo-900">AI 運解析</h3>
                        <p className="text-[10px] text-indigo-600 font-medium">AI Fortune Analysis</p>
                    </div>
                </div>
                {isLocked && !showOffer && (
                    <div className="bg-indigo-100 p-1.5 rounded-full opacity-60">
                        <Lock size={14} className="text-indigo-600" />
                    </div>
                )}
            </div>

            {/* Locked Content Preview (Blurred) or Normal Content */}
            <div className={`space-y-3 relative ${isLocked ? 'h-24 overflow-hidden' : ''}`}>
                {criteria.map((item) => {
                    const text = suggestion[item.key]?.[langKey] || "---";
                    return (
                        <div key={item.key} className="flex gap-3 items-start">
                            <div className="flex-1">
                                <p className="text-sm text-gray-700 font-medium leading-tight">
                                    <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider mr-1">
                                        {language === 'ja' ? item.labelJP : item.labelEN}
                                    </span>
                                    <span className="text-indigo-300 mr-1">-</span>
                                    {text}
                                </p>
                            </div>
                        </div>
                    );
                })}

                {/* Locked Gradient Overlay */}
                {isLocked && (
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white/90 backdrop-blur-[1px] flex items-end justify-center pb-4">
                        <p className="text-xs font-semibold text-indigo-800 flex items-center gap-1.5">
                            <Lock size={12} />
                            {language === 'ja' ? 'タップして詳細を見る' : 'Tap to unlock details'}
                        </p>
                    </div>
                )}
            </div>

            {/* Premium Offer Overlay (Full Screen) */}
            {showOffer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        onClick={(e) => { e.stopPropagation(); setShowOffer(false); }}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl p-8 text-center animate-in zoom-in-95 duration-300">
                        <button
                            onClick={(e) => { e.stopPropagation(); setShowOffer(false); }}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="mx-auto bg-gradient-to-tr from-amber-100 to-yellow-50 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <Crown size={40} className="text-amber-500" />
                        </div>

                        <h4 className="text-2xl font-bold text-gray-900 mb-2">
                            {language === 'ja' ? 'プレミアムプラン' : 'Premium Access'}
                        </h4>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            {language === 'ja'
                                ? 'AIによる詳細な運勢分析をアンロックして、運命を味方につけましょう。'
                                : 'Unlock detailed AI fortune analysis to guide your day. Reveal your full potential.'}
                        </p>

                        <button
                            onClick={handleUnlock}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all active:scale-95 mb-4"
                        >
                            {language === 'ja' ? '￥800 で購入' : 'Unlock Lifetime $4.99'}
                        </button>

                        <p className="text-xs text-gray-400">
                            {language === 'ja' ? '一回払いの買い切りプランです' : 'One-time payment. No subscription.'}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AISuggestion;
