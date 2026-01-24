import StatusBar from '../components/StatusBar';
import WeeklySnapshot from '../components/WeeklySnapshot';
import MissionCard from '../components/MissionCard';
import NavBar from '../components/NavBar';
import { Sun, Plus } from 'lucide-react';
import { missions, suggestedActivities } from '../data/mockData';
import { getImagePath } from '../utils/imagePath';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '../contexts/SubscriptionContext';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { status, hasSkipped } = useSubscription();

  useEffect(() => {
    if (status === 'expired' && !hasSkipped) {
      navigate('/paywall');
    }
  }, [status, hasSkipped, navigate]);

  return (
    <div className="relative h-full bg-white flex flex-col">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <StatusBar />

        {/* Header */}
        <div className="px-6 py-4">
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
        </div>

        {/* Welcome Text */}
        <div className="px-6 pb-4">
          <h1 className="text-2xl font-semibold text-black">Good morning, Miley!</h1>
        </div>

        {/* Today Mission Section */}
        <section className="px-6 py-4">
          <div className="bg-[#F5F5F5] border border-[#E6E3E3] rounded-2xl p-[19px]">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold text-black">Today</h3>
              <div className="flex items-center gap-1.5 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-sm">Valid for: 20:15:01</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700 mb-5">
              Daily missions are auto-generated everyday. Finish one to unlock exciting rewards.
            </p>

            {/* Mission List */}
            <div className="space-y-3">
              {missions.map((mission) => (
                <div
                  key={mission.id}
                  className="bg-[#FFFFFF] rounded-xl p-4 flex items-center justify-between border border-[#E6E3E3]"
                >
                  <span className="text-base font-semibold text-black">{mission.title}</span>
                  <div className="flex gap-1">
                    <img src={getImagePath('/images/difficulty-icon.png')} alt="Difficulty" className="w-[18px] h-[18px] object-contain" />
                    <img src={getImagePath('/images/difficulty-icon.png')} alt="Difficulty" className="w-[18px] h-[18px] object-contain opacity-30" />
                    <img src={getImagePath('/images/difficulty-icon.png')} alt="Difficulty" className="w-[18px] h-[18px] object-contain opacity-30" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Weekly Snapshot */}
        <WeeklySnapshot />

        {/* Suggested Section */}
        <section className="px-6 py-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-black">Suggested for you</h3>
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <Plus size={18} className="text-gray-600" />
            </button>
          </div>
          <div className="space-y-3">
            {suggestedActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-black">{activity.title}</p>
                  <p className="text-sm text-gray-700">{activity.category}</p>
                </div>
                <span className="text-sm text-gray-600">{activity.duration}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Fixed NavBar */}
      <NavBar />
    </div>
  );
};

export default HomeScreen;
