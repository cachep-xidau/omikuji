import { useState } from 'react';
import StatusBar from '../components/StatusBar';
import NavBar from '../components/NavBar';
import { ChevronLeft, ChevronRight, Heart, Lock, Filter, Ticket } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

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

// Collection Card Component (Video Frame)
const CollectionCard = ({ image, avatar, progress, total, name, isLocked, isFavorite }) => (
    <div className="w-[190px] h-[340px] rounded-2xl border border-[#E6E3E3] overflow-hidden relative bg-gray-100 flex-shrink-0">
        {/* Background Image */}
        <div className="absolute inset-0">
            <img
                src={getImagePath('/src/assets/video_bg.png')}
                alt="Video Thumbnail"
                className="w-full h-full object-cover"
            />
        </div>

        {/* Overlay Gradient (Optional for visibility) */}
        <div className="absolute inset-0 bg-black/10" />

        {/* User Logo (Top Left) */}
        <div className="absolute top-3 left-3 w-8 h-8 rounded-full overflow-hidden border border-white/20">
            <img src={getImagePath('/src/assets/user_avatar_video.png')} alt="User" className="w-full h-full object-cover" />
        </div>

        {/* Heart Icon (Top Right) */}
        <div className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center">
            <img src={getImagePath('/src/assets/icon_heart_video.png')} alt="Like" className="w-6 h-6 object-contain" />
        </div>

        {/* Play Button (Center) */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 flex items-center justify-center">
                <img src={getImagePath('/src/assets/icon_play_video.png')} alt="Play" className="w-full h-full object-contain" />
            </div>
        </div>
    </div>
);

// ... existing code ...



// Collection Modal with Rarity Sections
// Puzzle Card Component
const PuzzleCard = ({ image, avatar, progress, total, name, rarity }) => {
    // Determine overlay color based on rarity
    const getOverlayColor = (rarity) => {
        switch (rarity) {
            case 'common': return 'bg-gray-200/90';
            case 'rare': return 'bg-yellow-200/90';
            case 'epic': return 'bg-blue-300/90';
            case 'legendary': return 'bg-purple-300/90';
            case 'mythical': return 'bg-red-300/90';
            default: return 'bg-gray-200/90';
        }
    };

    // Generate 6 puzzle pieces (2x3 grid)
    const pieces = Array.from({ length: 6 });
    // Calculate how many pieces are unlocked based on progress (ratio of 6)
    // Example: 3/9 progress -> 2 pieces unlocked (3/9 * 6 = 2)
    const unlockedCount = Math.floor((progress / total) * 6);

    return (
        <div className="flex flex-col gap-2">
            {/* Image Frame with Puzzle Overlay */}
            <div className="w-[190px] h-[340px] rounded-2xl overflow-hidden relative bg-gray-100 flex-shrink-0 grid grid-cols-2 grid-rows-3">
                {/* Background Image (Full) */}
                <div className="absolute inset-0">
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                </div>

                {/* Puzzle Pieces Overlay */}
                {pieces.map((_, index) => {
                    const isLocked = index >= unlockedCount;
                    if (!isLocked) return <div key={index} className="transparent" />; // Unlocked piece (shows image)

                    // Locked Piece
                    return (
                        <div key={index} className={`relative border border-white/20 backdrop-blur-sm flex items-center justify-center ${getOverlayColor(rarity)}`}>
                            {/* Jigsaw Shape Simulation (optional, for now just blocks/borders as requested "mảnh ghép chưa mở") */}
                            <img src={getImagePath('/src/assets/icon_lock_puzzle.png')} alt="Locked" className="w-[27px] h-[27px] object-contain opacity-60" />
                        </div>
                    );
                })}
            </div>

            {/* Info */}
            <div className="w-[190px]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <img src={getImagePath('/src/assets/icon_puzzle.png')} alt="Puzzle" className="w-[20px] h-[20px] object-contain" />
                        <span className="text-sm font-medium text-gray-900">{progress}/{total}</span>
                    </div>
                    {avatar && (
                        <div className="w-6 h-6 rounded-full overflow-hidden">
                            <img src={getImagePath('/src/assets/user_avatar_video.png')} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>
                <p className="text-sm text-gray-900 font-medium mt-1 truncate">{name}</p>
            </div>
        </div>
    );
};

// Collection Modal (My Pictures)
const CollectionModal = ({ onClose, cards }) => {
    const { t } = useLanguage();

    return (
        <div className="absolute inset-0 z-50 bg-white flex flex-col h-full">
            <StatusBar />

            {/* Header */}
            <div className="px-4 py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={onClose} className="p-1">
                        <ChevronLeft size={24} className="text-gray-900" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">{t('reward.myPictures')}</h1>
                </div>
                <button className="p-2">
                    <img src={getImagePath('/src/assets/icon_filter.png')} alt="Filter" className="w-[24px] h-[24px] object-contain" />
                </button>
            </div>

            {/* Description */}
            <div className="px-4 mb-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                    {t('reward.myPicturesDesc')}
                </p>
            </div>

            {/* Content Grid */}
            <div className="flex-1 overflow-y-auto px-4 pb-8">
                <div className="grid grid-cols-2 gap-x-3 gap-y-6 justify-between">
                    {cards.map((card, i) => (
                        <div key={i} className="flex justify-center">
                            <PuzzleCard {...card} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

import { getImagePath } from '../utils/imagePath';

// ... existing code ...

const RewardScreen = () => {
    const [showCollection, setShowCollection] = useState(false);
    const { t } = useLanguage();

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
                    <h1 className="text-2xl font-bold text-gray-900">{t('reward.title')}</h1>
                </div>

                {/* My SGT Section */}
                <div className="px-4 mb-6">
                    {/* <h2 className="text-lg font-semibold text-gray-900 mb-2 px-2">{t('reward.mySGT')}</h2> User didn't ask for section header removal, but the card says "SGT Balance" inside. I'll keep the section header hidden or removed if the card is self-contained. The provided image shows stand-alone card. I will remove the outer h2 for cleaner look if it duplicates functionality, or keep it consistent. Let's remove the h2 since the card header says "SGT Balance". Actually, previous design had section header. I'll comment it out to match the clean look of the reference image which acts as a section itself. */}

                    <div className="bg-[#F9F9F9] border border-[#E6E3E3] rounded-lg p-5 font-['Switzer'] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                        {/* Card Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full overflow-hidden">
                                    <img src={getImagePath('/src/assets/sgt_logo.png')} alt="SGT" className="w-full h-full object-contain" />
                                </div>
                                <span className="text-base font-semibold text-gray-900">{t('reward.sgtBalance')}</span>
                            </div>
                            <ChevronRight size={20} className="text-gray-400" />
                        </div>

                        {/* Balance */}
                        <div className="flex items-center gap-3">
                            <span className="text-[32px] font-bold text-gray-900 leading-none">3,460.25 SGT</span>
                            <button className="opacity-60 hover:opacity-100 transition-opacity">
                                <img src={getImagePath('/src/assets/icon_eye.png')} alt="View" className="w-5 h-5" />
                            </button>
                        </div>

                        {/* USD Equivalent */}
                        <p className="text-base text-gray-500 font-medium mt-1">= 434.6 USD</p>
                    </div>
                </div>

                {/* Gacha Section */}
                <div className="px-4 mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3 px-2">{t('reward.gachaSection')}</h2>

                    {/* Ticket Cards */}
                    <div className="flex gap-3 mb-4">
                        <TicketCard
                            type={t('reward.regularTicket')}
                            count={3}
                            icon={<img src={getImagePath('/src/assets/gacha_regular.png')} alt="Regular" className="w-full h-full object-contain" />}
                        />
                        <TicketCard
                            type={t('reward.premiumTicket')}
                            count={1}
                            icon={<img src={getImagePath('/src/assets/gacha_premium.png')} alt="Premium" className="w-full h-full object-contain" />}
                        />
                    </div>

                    {/* Open Gacha Tickets Button */}
                    <button className="w-full py-4 bg-orange-50 rounded-2xl flex items-center justify-between px-4 hover:bg-orange-100 transition-colors">
                        <span className="text-base font-medium text-gray-900">{t('reward.openGacha')}</span>
                        <ChevronRight size={20} className="text-gray-400" />
                    </button>
                </div>

                {/* My Pictures */}
                <div className="px-4 mt-6">
                    <button
                        onClick={() => setShowCollection(true)}
                        className="w-full h-[56px] rounded-2xl flex items-center justify-between px-4 hover:opacity-90 transition-opacity border border-[#E6E3E3] bg-white"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 flex-shrink-0">
                                <img src={getImagePath('/src/assets/icon_my_pictures.png')} alt="Icon" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-base font-medium text-gray-900">{t('reward.myPictures')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-lg">23</span>
                            <ChevronRight size={20} className="text-gray-400" />
                        </div>
                    </button>
                </div>

                {/* Collection Section */}
                <div className="px-4 mt-6">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-semibold text-gray-900">{t('reward.collection')}</h2>
                        <button onClick={() => setShowCollection(true)}>
                            <ChevronRight size={20} className="text-gray-400" />
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{t('reward.collectHint')}</p>

                    {/* Featured Cards Carousel */}
                    <div className="flex justify-between pb-2">
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
