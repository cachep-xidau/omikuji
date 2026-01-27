import StatusBar from '../components/StatusBar';
import TodayFocus from '../components/TodayFocus';
import FeatureSection from '../components/FeatureSection';
import DiscoverSection from '../components/DiscoverSection';
import NavBar from '../components/NavBar';
import { Sun, Feather } from 'lucide-react';
import { Link } from 'react-router-dom';
import { missions } from '../data/mockData';
import { getImagePath } from '../utils/imagePath';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '../contexts/SubscriptionContext';

import { useState } from 'react';
import { useDiary } from '../data/DiaryContext';
import { X } from 'lucide-react';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { status, hasSkipped } = useSubscription();
  const { getTodaysFortune } = useDiary();
  const hasFortune = getTodaysFortune();
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    if (status === 'expired' && !hasSkipped) {
      navigate('/paywall');
    }
  }, [status, hasSkipped, navigate]);

  // Show only the first mission
  const todayMission = missions[0];

  return (
    <div className="relative h-full bg-white flex flex-col">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <StatusBar />

        {/* Header */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                <Sun size={24} className="text-yellow-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-black">
                  Sunny, 28°C <span className="font-normal text-gray-700">(feel like 30°C)</span>
                </p>
                <p className="text-sm text-gray-700">
                  Air quality: <span className="text-green-600">Good</span> (AQI 45)
                </p>
              </div>
            </div>
            {/* Account Button with Tooltip */}
            <div className="relative z-50">
              <Link to="/account" className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-gray-300 transition-colors block relative z-50 bg-white">
                <img src={getImagePath('/images/user_avatar.jpg')} alt="Account" className="w-full h-full object-cover" />
              </Link>

              {/* Tooltip Overlay */}
              {showTooltip && (
                <div className="absolute top-12 right-0 w-64 bg-[#181818]/90 text-white text-xs p-3 rounded-xl shadow-xl backdrop-blur-sm z-50 animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="relative">
                    <p className="pr-4 leading-relaxed font-light text-gray-200">
                      Bấm vào account, kéo xuống dưới chọn reset daily hoặc kết thúc dùng thử để trải nghiệm freemium và premium
                    </p>
                    <button
                      onClick={() => setShowTooltip(false)}
                      className="absolute -top-1 -right-1 p-1 text-gray-400 hover:text-white transition-colors"
                    >
                      <X size={14} />
                    </button>
                    {/* Arrow */}
                    <div className="absolute -top-[18px] right-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-[#181818]/90"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="px-6 pb-4">
          <h1 className="text-2xl font-semibold text-black">Good morning, Miley!</h1>
        </div>

        {/* Today Mission Section - Single Mission */}
        <section className="px-6 py-4">
          <div className="bg-[#F5F5F5] border border-[#E6E3E3] rounded-2xl p-[19px]">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold text-black">Today Mission</h3>
              <div className="flex items-center gap-1.5 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-sm">Valid for: 20:15:01</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700 mb-4">
              Complete today's mission to unlock exciting rewards.
            </p>

            {/* Single Mission Card */}
            {todayMission && (
              <div className="bg-white rounded-xl p-4 flex items-center justify-between border border-[#E6E3E3]">
                <span className="text-base font-semibold text-black">{todayMission.title}</span>
                <div className="flex gap-1">
                  <img src={getImagePath('/images/difficulty-icon.png')} alt="Difficulty" className="w-[18px] h-[18px] object-contain" />
                  <img src={getImagePath('/images/difficulty-icon.png')} alt="Difficulty" className="w-[18px] h-[18px] object-contain opacity-30" />
                  <img src={getImagePath('/images/difficulty-icon.png')} alt="Difficulty" className="w-[18px] h-[18px] object-contain opacity-30" />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Today Focus */}
        <TodayFocus />

        {/* Feature Section */}
        <FeatureSection />

        {/* Discover Section */}
        <DiscoverSection />
      </div>

      {/* Floating Diary Button */}
      <Link
        to="/chat-diary"
        className="absolute bottom-28 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 z-10"
      >
        <Feather size={24} className="text-white" />
        {!hasFortune && (
          <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center border border-white translate-x-1 -translate-y-1">
            <span className="text-[10px] text-white font-bold">1</span>
          </div>
        )}
      </Link>

      {/* Fixed NavBar */}
      <NavBar />
    </div>
  );
};

export default HomeScreen;
