import { useState } from 'react';
import StatusBar from '../components/StatusBar';
import NavBar from '../components/NavBar';
import { ChevronLeft, ChevronRight, Heart, Lock, Filter, Ticket } from 'lucide-react';

// Ticket Card Component
const TicketCard = ({ type, count, icon }) => (
    <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-4 text-center">
        <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
            {icon}
        </div>
        <p className="text-sm text-gray-600">{type} <ChevronRight size={12} className="inline" /></p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{count}</p>
    </div>
);

// Collection Card Component
const CollectionCard = ({ image, avatar, progress, total, name, isLocked, isFavorite }) => (
    <div className="relative">
        <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-200 relative">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
            />

            {/* Avatar */}
            <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-gray-300 overflow-hidden border-2 border-white">
                {avatar && <img src={avatar} alt="" className="w-full h-full object-cover" />}
            </div>

            {/* Favorite Button */}
            <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
                <Heart size={16} className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"} />
            </button>

            {/* Lock Icon (if locked) */}
            {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                        <Lock size={20} className="text-gray-500" />
                    </div>
                </div>
            )}

            {/* Video Icon */}
            <div className="absolute bottom-3 left-3 w-8 h-8 rounded-lg bg-white/80 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
                </svg>
            </div>
        </div>

        {/* Card Info */}
        <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-1 text-gray-500">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                </svg>
                <span className="text-xs">{progress}/{total}</span>
            </div>
            {!isLocked && <div className="w-2 h-2 rounded-full bg-red-500" />}
        </div>
        <p className="text-sm text-gray-900 mt-1">{name}</p>
    </div>
);

// Collection Modal with Rarity Sections
const CollectionModal = ({ onClose, cards }) => {
    const [activeTab, setActiveTab] = useState('discover');

    const rarities = ['Common', 'Rare', 'Epic', 'Legendary', 'Mythical'];

    return (
        <div className="absolute inset-0 z-50 bg-white flex flex-col h-full">
            <StatusBar />

            {/* Header */}
            <div className="px-4 py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={onClose} className="p-1">
                        <ChevronLeft size={24} className="text-gray-900" />
                    </button>
                    <h1 className="text-xl font-semibold text-gray-900">Collection</h1>
                </div>
                <button className="p-2">
                    <Filter size={20} className="text-gray-600" />
                </button>
            </div>

            {/* Tabs */}
            <div className="px-4 flex-shrink-0">
                <div className="bg-white rounded-full p-1 flex shadow-sm border border-gray-100">
                    <button
                        onClick={() => setActiveTab('discover')}
                        className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === 'discover'
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-500'
                            }`}
                    >
                        Discover
                    </button>
                    <button
                        onClick={() => setActiveTab('myAssets')}
                        className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === 'myAssets'
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-500'
                            }`}
                    >
                        My Assets
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
                {rarities.map((rarity) => (
                    <div key={rarity} className="mb-6">
                        <h3 className="text-base font-semibold text-gray-900 mb-3">{rarity}</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {cards
                                .filter(card => card.rarity === rarity.toLowerCase())
                                .map((card, i) => (
                                    <CollectionCard key={i} {...card} />
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const RewardScreen = () => {
    const [showCollection, setShowCollection] = useState(false);

    // Mock collection data with images
    const collectionCards = [
        { image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', avatar: '', progress: 3, total: 9, name: 'Autumn breeze', rarity: 'common', isLocked: false, isFavorite: true },
        { image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', avatar: '', progress: 0, total: 36, name: 'Video name', rarity: 'common', isLocked: true, isFavorite: false },
        { image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400', avatar: '', progress: 0, total: 9, name: 'Video name', rarity: 'rare', isLocked: true, isFavorite: false },
        { image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400', avatar: '', progress: 2, total: 10, name: 'Video name', rarity: 'rare', isLocked: true, isFavorite: false },
        { image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400', avatar: '', progress: 7, total: 9, name: 'Video name', rarity: 'epic', isLocked: false, isFavorite: false },
        { image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', avatar: '', progress: 2, total: 10, name: 'Video name', rarity: 'epic', isLocked: true, isFavorite: false },
        { image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400', avatar: '', progress: 7, total: 9, name: 'Video name', rarity: 'legendary', isLocked: false, isFavorite: true },
        { image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', avatar: '', progress: 3, total: 9, name: 'Video name', rarity: 'mythical', isLocked: true, isFavorite: false },
    ];

    const featuredCards = [
        { image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', avatar: '', progress: 2, total: 3, name: 'Video name', isLocked: false, isFavorite: true },
        { image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400', avatar: '', progress: 2, total: 3, name: 'Video name', isLocked: true, isFavorite: false },
    ];

    if (showCollection) {
        return <CollectionModal onClose={() => setShowCollection(false)} cards={collectionCards} />;
    }

    return (
        <div className="relative h-full bg-white flex flex-col">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-24">
                <StatusBar />

                {/* Header */}
                <div className="px-6 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">Gacha</h1>
                </div>

                {/* Ticket Cards */}
                <div className="px-4 flex gap-3">
                    <TicketCard
                        type="Regular ticket"
                        count={0}
                        icon={<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"><Ticket size={16} className="text-blue-500" /></div>}
                    />
                    <TicketCard
                        type="Premium ticket"
                        count={0}
                        icon={<div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center"><Ticket size={16} className="text-red-500" /></div>}
                    />
                </div>

                {/* Open Gacha Tickets Button */}
                <div className="px-4 mt-4">
                    <button className="w-full py-4 bg-orange-50 rounded-2xl flex items-center justify-between px-4 hover:bg-orange-100 transition-colors">
                        <span className="text-base font-medium text-gray-900">Open Gacha Tickets</span>
                        <ChevronRight size={20} className="text-gray-400" />
                    </button>
                </div>

                {/* My Cards */}
                <div className="px-4 mt-3">
                    <button
                        onClick={() => setShowCollection(true)}
                        className="w-full py-4 bg-gray-50 rounded-2xl flex items-center justify-between px-4 hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
                                <rect x="3" y="3" width="7" height="7" rx="1" />
                                <rect x="14" y="3" width="7" height="7" rx="1" />
                                <rect x="3" y="14" width="7" height="7" rx="1" />
                                <rect x="14" y="14" width="7" height="7" rx="1" />
                            </svg>
                            <span className="text-base font-medium text-gray-900">My cards</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500">23</span>
                            <ChevronRight size={20} className="text-gray-400" />
                        </div>
                    </button>
                </div>

                {/* Collection Section */}
                <div className="px-4 mt-6">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-semibold text-gray-900">Collection</h2>
                        <button onClick={() => setShowCollection(true)}>
                            <ChevronRight size={20} className="text-gray-400" />
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Collect 3 cards to unlock a Video</p>

                    {/* Featured Cards Carousel */}
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {featuredCards.map((card, i) => (
                            <div key={i} className="flex-shrink-0 w-[45%]">
                                <CollectionCard {...card} />
                            </div>
                        ))}
                    </div>

                    {/* Carousel Dots */}
                    <div className="flex justify-center gap-2 mt-4">
                        <div className="w-2 h-2 rounded-full bg-gray-900" />
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                    </div>
                </div>
            </div>

            {/* Fixed NavBar */}
            <NavBar />
        </div>
    );
};

export default RewardScreen;
