import { ChevronRight, Zap, Sparkles } from 'lucide-react';

const features = [
    {
        id: 1,
        title: 'Flash Sale Gacha',
        subtitle: '50% OFF - Limited Time!',
        gradient: 'from-purple-100 to-pink-100', // Purple pastel
        titleColor: 'text-gray-900',
        subtitleColor: 'text-gray-600',
    },
    {
        id: 2,
        title: 'New Year Campaign',
        subtitle: 'Exclusive rewards await',
        gradient: 'from-orange-100 to-red-100', // Orange pastel
        titleColor: 'text-gray-900',
        subtitleColor: 'text-gray-600',
    },
];

return (
    <section className="px-6 py-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-black">Feature</h3>
            <button className="flex items-center gap-1 text-gray-500 text-sm">
                <span>See all</span>
                <ChevronRight size={16} />
            </button>
        </div>

        {/* Horizontal Scroll Cards */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
            {features.map((feature) => {
                return (
                    <div
                        key={feature.id}
                        className={`flex-shrink-0 w-[200px] h-[100px] rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 relative overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] flex flex-col justify-end`}
                    >
                        {/* Text */}
                        <h4 className={`text-sm font-semibold ${feature.titleColor}`}>{feature.title}</h4>
                        <p className={`text-xs ${feature.subtitleColor}`}>{feature.subtitle}</p>
                    </div>
                );
            })}
        </div>
    </section>
);
};

export default FeatureSection;
