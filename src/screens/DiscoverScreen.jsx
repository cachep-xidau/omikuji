import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import StatusBar from '../components/StatusBar';
import NavBar from '../components/NavBar';

const DiscoverScreen = () => {
    const [activeTab, setActiveTab] = useState('vortex');

    const tabs = [
        { id: 'photo', label: 'Photo Art' },
        { id: 'motion', label: 'Motion Art' },
        { id: 'vortex', label: 'Vortex Avatar' },
    ];

    // Photo Art content
    const photoArtContent = {
        collection: '27 Artworks Collection',
        title: 'Amazing Treasures All Around',
        description: 'Wonders of a Fantastical World',
        image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80',
        components: 6,
    };

    // Motion Art content  
    const motionArtContent = {
        collection: '15 Animations',
        title: 'Dynamic Motion Series',
        description: 'Bring your photos to life',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
        components: 8,
    };

    // Vortex Avatar characters
    const avatars = [
        {
            id: 1,
            name: 'Sakura Aoyama',
            description: 'Gentle, refined, slightly shy but warm and easy to connect with.',
            image: '/sakura-avatar.png',
        },
        {
            id: 2,
            name: 'Yuki Tanaka',
            description: 'Energetic, playful, and always ready for adventure.',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
        },
        {
            id: 3,
            name: 'Mika Chen',
            description: 'Mysterious, thoughtful, with a deep artistic soul.',
            image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
        },
    ];

    const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);

    const renderPhotoArtContent = (content) => (
        <div className="relative h-full">
            {/* Hero Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${content.image}')` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative h-full flex flex-col justify-end px-6 pb-32">
                <p className="text-white/80 text-sm mb-2">{content.collection}</p>
                <h2 className="text-white text-3xl font-bold mb-2">{content.title}</h2>
                <p className="text-white/70 text-sm">{content.description}</p>

                {/* Pagination Dots */}
                <div className="flex gap-2 mt-6">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`w-2 h-2 rounded-full transition-all ${currentSlide === i ? 'bg-white w-6' : 'bg-white/40'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Components Section */}
            <div className="absolute bottom-20 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 px-6 py-3">
                <div className="flex items-center justify-between">
                    <span className="text-white text-sm">Components: {content.components}</span>
                    <ChevronRight size={18} className="text-white/60" />
                </div>
            </div>
        </div>
    );

    const renderVortexContent = () => {
        const avatar = avatars[currentAvatarIndex];
        return (
            <div className="relative h-full">
                {/* Avatar Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${avatar.image}')` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative h-full flex flex-col justify-end px-[28px] pb-32 items-center text-center">
                    {/* Avatar Counter & Name */}
                    <div className="mb-6 flex flex-col items-center">
                        <p className="text-[13px] font-medium text-white/60 mb-2">
                            {String(currentAvatarIndex + 1).padStart(2, '0')} / {String(avatars.length).padStart(2, '0')}
                        </p>
                        <h2 className="text-[34px] font-bold text-white leading-tight">
                            {avatar.name}
                        </h2>
                    </div>

                    {/* Description */}
                    <p className="text-[15px] text-white/80 leading-relaxed mb-8 max-w-[85%]">
                        {avatar.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-3 justify-center">
                        <button className="w-[110px] h-[50px] flex items-center justify-center bg-black/40 hover:bg-black/50 text-white rounded-full font-bold text-sm shadow-sm backdrop-blur-sm transition-colors border border-white/10">
                            Profile
                        </button>
                        <button className="w-[120px] h-[50px] flex items-center justify-center bg-[#181818] hover:bg-black text-white rounded-full font-bold text-sm shadow-sm transition-colors">
                            Create Avatar
                        </button>
                    </div>

                    {/* Avatar Dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        {avatars.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentAvatarIndex(i)}
                                className={`w-2 h-2 rounded-full transition-all ${currentAvatarIndex === i ? 'bg-white w-6' : 'bg-white/40'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="relative h-full bg-gray-900 flex flex-col">
            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 z-20">
                <StatusBar light />
            </div>

            {/* Tab Navigation */}
            <div className="absolute top-12 left-0 right-0 z-20 px-4">
                <div className="flex gap-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-2 text-sm font-medium transition-colors ${activeTab === tab.id
                                ? 'text-white border-b-2 border-red-500'
                                : 'text-white/60'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                {activeTab === 'photo' && renderPhotoArtContent(photoArtContent)}
                {activeTab === 'motion' && renderPhotoArtContent(motionArtContent)}
                {activeTab === 'vortex' && renderVortexContent()}
            </div>

            {/* Fixed NavBar */}
            <NavBar />
        </div>
    );
};

export default DiscoverScreen;
