import { useNavigate } from 'react-router-dom';
import { ChevronRight, MapPin } from 'lucide-react';
import { getImagePath } from '../utils/imagePath';
import aiPartnerBanner from '../assets/ai_partner_banner.png';

const DiscoverSection = () => {
    const navigate = useNavigate();

    const locations = [
        {
            id: 1,
            title: 'Meiji Jingu Shrine',
            distance: '1.2 km',
            image: getImagePath('locations/shrine.png'),
            tags: ['Peaceful', 'Nature'],
        },
        {
            id: 2,
            title: 'Sumida River Walk',
            distance: '3.5 km',
            image: getImagePath('locations/river.png'),
            tags: ['Scenic', 'Riverside'],
        },
        {
            id: 3,
            title: 'Omotesando Avenue',
            distance: '0.8 km',
            image: getImagePath('locations/urban.png'),
            tags: ['Urban', 'Shopping'],
        },
    ];

    return (
        <section className="px-6 py-4 pb-8">
            {/* Header */}
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-black">Discover</h3>
                <button
                    onClick={() => navigate('/activity/walking-route')}
                    className="flex items-center gap-1 text-gray-500 text-sm"
                >
                    <span>View map</span>
                    <ChevronRight size={16} />
                </button>
            </div>

            {/* Sub-header */}
            <h4 className="text-lg font-semibold text-black mb-3">Explore</h4>

            {/* Horizontal Scroll Locations */}
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide snap-x snap-mandatory">
                {locations.map((location) => (
                    <div
                        key={location.id}
                        onClick={() => navigate('/activity/walking-route')}
                        className="flex-shrink-0 w-[280px] h-[180px] rounded-2xl relative overflow-hidden shadow-md snap-center cursor-pointer group"
                    >
                        {/* Background Image */}
                        <img
                            src={location.image}
                            alt={location.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h4 className="text-white font-bold text-lg mb-1">{location.title}</h4>
                                    <div className="flex items-center gap-1 text-gray-300 text-xs mb-2">
                                        <MapPin size={12} />
                                        <span>{location.distance} away</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex gap-2">
                                {location.tags.map((tag, i) => (
                                    <span key={i} className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-[10px] text-white font-medium border border-white/10">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                ))}
            </div>

            {/* AI Partner Section */}
            <div className="mt-3">
                <h4 className="text-lg font-semibold text-black mb-3">AI Partner</h4>
                <div className="rounded-2xl overflow-hidden shadow-sm relative">
                    <img
                        src={aiPartnerBanner}
                        alt="AI Partner Banner"
                        className="w-full h-[140px] object-cover"
                    />
                    <div className="absolute inset-0 p-4 pl-5 flex flex-col justify-center items-start">
                        <h3 className="text-[20px] font-['Switzer'] font-normal text-black leading-tight">Sakura Aoyama</h3>
                        <p className="text-sm text-black/80 mt-1 mb-3 max-w-[70%] leading-snug">
                            Gentle, graceful, and warmly approachable
                        </p>
                        <button
                            onClick={() => navigate('/video-call')}
                            className="bg-black text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
                        >
                            Create Avatar
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DiscoverSection;
