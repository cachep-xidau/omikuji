import StatusBar from '../components/StatusBar';
import TodayFocus from '../components/TodayFocus';
import FeatureSection from '../components/FeatureSection';
import DiscoverSection from '../components/DiscoverSection';
import NavBar from '../components/NavBar';
import DynamicIsland from '../components/DynamicIsland';
import { Sun, Feather } from 'lucide-react';
import { Link } from 'react-router-dom';
import { missions } from '../data/mockData';
import { getImagePath } from '../utils/imagePath';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '../contexts/SubscriptionContext';

import { useState, useRef } from 'react';
import { useDiary } from '../data/DiaryContext';
import { useLanguage } from '../contexts/LanguageContext';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { status, hasSkipped } = useSubscription();
  const { getTodaysFortune } = useDiary();
  const { t } = useLanguage();
  const hasFortune = getTodaysFortune();

  const [isFabVisible, setIsFabVisible] = useState(true);
  const lastScrollY = useRef(0);

  const handleScroll = (e) => {
    const currentScrollY = e.target.scrollTop;
    if (currentScrollY > lastScrollY.current && currentScrollY > 20) {
      setIsFabVisible(false); // Hide on scroll down
    } else {
      setIsFabVisible(true); // Show on scroll up
    }
    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    if (status === 'expired' && !hasSkipped) {
      navigate('/paywall');
    }
  }, [status, hasSkipped, navigate]);

  // Show only the first mission
  const todayMission = missions[0];

  return (
    <div className="relative w-full h-full bg-white overflow-hidden">
      {/* Dynamic Island - Fixed at absolute top */}
      <DynamicIsland />

      {/* Fixed Header Elements - Absolute Top */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-white pt-[12px]">
        <StatusBar />
      </div>

      {/* Scrollable Content - Absolute Full Fill with Top Padding */}
      <div
        className="absolute inset-0 overflow-y-auto pt-[60px] pb-24"
        onScroll={handleScroll}
      >
        {/* Header */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                <Sun size={24} className="text-yellow-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-black">
                  {t('home.sunny')}, 28°C <span className="font-normal text-gray-700">({t('home.feelLike')} 30°C)</span>
                </p>
                <p className="text-sm text-gray-700">
                  {t('home.airQuality')} <span className="text-green-600">{t('home.good')}</span> (AQI 45)
                </p>
              </div>
            </div>
            {/* Account Button */}
            <div className="relative z-50">
              <Link to="/account" className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-gray-300 transition-colors block relative z-50 bg-white">
                <img src={getImagePath('/images/user_avatar.jpg')} alt="Account" className="w-full h-full object-cover" />
              </Link>
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="px-6 pb-4">
          <h1 className="text-2xl font-semibold text-black">{t('home.goodMorning')}, Miley!</h1>
        </div>

        {/* Today Mission Section - Single Mission */}
        <section className="px-6 py-4">
          {/* Header moved outside */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-black">{t('home.todayMission')}</h3>
            <div className="flex items-center gap-1.5 text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-sm">{t('common.validFor')} 20:15:01</span>
            </div>
          </div>

          {/* Single Mission Card - Redesigned and moved out of shaded box */}
          {todayMission && (
            <div className="bg-white rounded-xl p-4 border border-[#E6E3E3]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-base font-semibold text-black">{todayMission.title}</span>
                <span className="text-sm font-bold text-brand-gradient">60%</span>
              </div>

              {/* Horizontal Progress Bar */}
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-gradient rounded-full"
                  style={{ width: '60%' }}
                />
              </div>

              <p className="text-[10px] text-gray-400 mt-2 font-medium uppercase tracking-wider">
                900 / 1,500 steps completed
              </p>
            </div>
          )}
        </section>

        {/* Today Focus */}
        <TodayFocus />

        {/* Feature Section */}
        <FeatureSection />

        {/* Discover Section */}
        <DiscoverSection />
      </div>

      {/* Floating Diary Button - Fixed Absolute */}
      <Link
        to="/chat-diary"
        className={`absolute bottom-28 right-6 w-14 h-14 rounded-full bg-[linear-gradient(135deg,#F4AA1C_0%,#EE3424_75%)] flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50 ${isFabVisible ? 'scale-100 translate-y-0' : 'scale-[0.6] translate-y-8 opacity-80'
          } hover:scale-105 active:scale-95`}
      >
        <Feather size={24} className="text-white" />
        {!hasFortune && (
          <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center border border-white translate-x-1 -translate-y-1 animate-pulse">
            <span className="text-[10px] text-white font-bold">1</span>
          </div>
        )}
      </Link>

      {/* Fixed NavBar - Absolute Bottom */}
      <NavBar />
    </div>
  );
};

export default HomeScreen;
