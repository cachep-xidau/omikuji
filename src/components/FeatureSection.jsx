import { ChevronRight, Zap, Sparkles } from 'lucide-react';

const FeatureSection = () => {
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

            {/* Grid Layout Cards - No Horizontal Scroll */}
            <div className="grid grid-cols-2 gap-3">
                {features.map((feature) => {
                    return (
                        <div
                            key={feature.id}
                            className={`rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 relative overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] flex flex-col justify-end h-[100px]`}
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
