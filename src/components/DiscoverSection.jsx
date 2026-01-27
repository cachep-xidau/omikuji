import { ChevronRight, Dumbbell, Bot, Gift } from 'lucide-react';

const DiscoverSection = () => {
    const discoverItems = [
        {
            id: 1,
            title: 'Workout Tips',
            description: 'Expert fitness advice',
            icon: Dumbbell,
            color: 'bg-blue-50',
            iconColor: 'text-blue-500',
        },
        {
            id: 2,
            title: 'AI Health Partners',
            description: 'Smart health companions',
            icon: Bot,
            color: 'bg-emerald-50',
            iconColor: 'text-emerald-500',
        },
        {
            id: 3,
            title: 'Gacha Collection',
            description: 'View your rewards',
            icon: Gift,
            color: 'bg-purple-50',
            iconColor: 'text-purple-500',
        },
    ];

    return (
        <section className="px-6 py-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-black">Discover</h3>
                <button className="flex items-center gap-1 text-gray-500 text-sm">
                    <span>See all</span>
                    <ChevronRight size={16} />
                </button>
            </div>

            {/* Discover Grid */}
            <div className="grid grid-cols-3 gap-3">
                {discoverItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.id}
                            className="flex flex-col items-center p-4 rounded-2xl bg-white border border-gray-100 shadow-sm cursor-pointer transition-all hover:shadow-md hover:border-gray-200 active:scale-[0.98]"
                        >
                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-2`}>
                                <Icon size={24} className={item.iconColor} />
                            </div>

                            {/* Text */}
                            <h4 className="text-xs font-semibold text-gray-800 text-center leading-tight">{item.title}</h4>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default DiscoverSection;
