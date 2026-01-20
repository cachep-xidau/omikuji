import { useNavigate } from 'react-router-dom';
import { Smile, PersonStanding, AudioWaveform, X, ChevronRight } from 'lucide-react';
import StatusBar from '../components/StatusBar';
import { getImagePath } from '../utils/imagePath';

const StartScreen = ({ userState = 'have-avatar' }) => {
    const navigate = useNavigate();

    const actions = [
        { id: 'avatar', label: 'Create Avatar', icon: Smile, primary: userState === 'no-avatar' },
        { id: 'walk', label: 'Walk', icon: PersonStanding, primary: userState === 'have-avatar' },
        { id: 'record', label: 'Diary', icon: AudioWaveform, primary: userState === 'affiliates' },
    ];

    return (
        <div className="relative h-full w-full overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('${getImagePath('/start-bg.png')}')`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            {/* Status Bar */}
            <div className="relative z-10">
                <StatusBar light />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end pl-2 pr-6 pb-24">
                {/* Title */}
                <h1 className="text-white text-4xl font-semibold leading-tight mb-8 translate-y-[-48px] pl-6">
                    Start with what<br />inspires you ✨
                </h1>

                {/* Action Cards */}
                <div className="flex flex-col items-start gap-0 translate-y-[-48px]">
                    {actions.map((action) => {
                        const Icon = action.icon;

                        if (action.id === 'avatar') {
                            return (
                                <button
                                    key={action.id}
                                    className="transition-transform hover:scale-105"
                                >
                                    <img src={getImagePath('/images/create-avatar-button.png')} alt="Create Avatar" className="w-[214px] h-[64px] object-contain" />
                                </button>
                            );
                        }

                        if (action.id === 'walk') {
                            return (
                                <button
                                    key={action.id}
                                    className="transition-transform hover:scale-105"
                                >
                                    <img src={getImagePath('/images/walk-button.png')} alt="Walk" className="w-[195px] h-[64px] object-contain" />
                                </button>
                            );
                        }

                        if (action.id === 'record') {
                            return (
                                <button
                                    key={action.id}
                                    onClick={() => navigate('/diary-loading')}
                                    className="transition-transform hover:scale-105"
                                >
                                    <img src={getImagePath('/images/diary-button.png')} alt="Diary" className="w-[163px] h-[64px] object-contain" />
                                </button>
                            );
                        }

                        return (
                            <button
                                key={action.id}
                                className={`rounded-2xl px-5 py-3 flex items-center gap-3 transition-all ${action.primary
                                    ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF4444] text-white shadow-lg shadow-red-500/30 min-w-[280px] justify-between'
                                    : 'bg-white/90 backdrop-blur-sm text-gray-800 border border-white/50'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={22} strokeWidth={1.5} />
                                    <span className="font-medium text-base">{action.label}</span>
                                </div>
                                {action.primary && <ChevronRight size={22} />}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Close Button */}
            <button
                onClick={() => navigate(-1)}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center z-20"
            >
                <X size={24} className="text-white" />
            </button>
        </div>
    );
};

export default StartScreen;
