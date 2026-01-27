import { ChevronRight, Zap, Sparkles } from 'lucide-react';

const FeatureSection = () => {
    const features = [
        {
            id: 1,
            title: 'Flash Sale Gacha',
            subtitle: '50% OFF - Limited Time!',
            icon: Zap,
            gradient: 'from-orange-100 to-red-100',
            badgeBg: 'bg-orange-200',
            badgeText: 'text-orange-600',
            iconBg: 'bg-orange-200',
            iconColor: 'text-orange-500',
            titleColor: 'text-gray-900',
            subtitleColor: 'text-gray-600',
            badge: 'HOT',
        },
        {
            id: 2,
            title: 'New Year Campaign',
            subtitle: 'Exclusive rewards await',
            icon: Sparkles,
            gradient: 'from-purple-100 to-pink-100',
            badgeBg: 'bg-purple-200',
            badgeText: 'text-purple-600',
            iconBg: 'bg-purple-200',
            iconColor: 'text-purple-500',
            titleColor: 'text-gray-900',
            subtitleColor: 'text-gray-600',
            badge: 'NEW',
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
                    const Icon = feature.icon;
                    return (
                        <div
                            key={feature.id}
                            className={`flex-shrink-0 w-[200px] h-[100px] rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 relative overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]`}
                        >
                            {/* Badge */}
                            <span className={`absolute top-3 right-3 px-2 py-0.5 ${feature.badgeBg} rounded-full text-[10px] font-bold ${feature.badgeText}`}>
                                {feature.badge}
                            </span>

                            {/* Icon */}
                            <div className={`w-8 h-8 rounded-lg ${feature.iconBg} flex items-center justify-center mb-2`}>
                                <Icon size={18} className={feature.iconColor} />
                            </div>

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
