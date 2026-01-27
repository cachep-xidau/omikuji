import { Star, Activity, Lightbulb, Target, Gift } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { getImagePath } from '../utils/imagePath';

const NavBar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Star, label: 'Today' },
    { path: '/activity', icon: Activity, label: 'Activity' },
    { path: '/insight', icon: Lightbulb, label: 'Insight', isCenter: true },
    { path: '/quest', icon: Target, label: 'Quest' },
    { path: '/reward', icon: Gift, label: 'Reward' },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E8E8E8] shadow-[0_-4px_20px_rgba(0,0,0,0.02)] z-40 pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5 items-end h-[86px] w-full max-w-[430px] mx-auto pb-[20px]">
        {navItems.map(({ path, icon: Icon, iconImg, label, isCenter }) => {
          const isActive = location.pathname === path;

          if (isCenter) {
            return (
              <Link
                key={path}
                to={path}
                className="flex flex-col items-center justify-end h-full w-full pb-1"
              >
                <div className="w-[52px] h-[52px] rounded-full bg-[#181818] flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 mb-0.5 p-[4px]">
                  {Icon ? (
                    <Icon size={28} className="text-white" strokeWidth={1.5} />
                  ) : (
                    <img src={iconImg} alt={label} className="w-[44px] h-[44px] object-contain" />
                  )}
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-end gap-[6px] h-full pb-1 transition-colors ${isActive ? 'text-[#EE3424]' : 'text-[#969696]'
                }`}
            >
              {Icon ? (
                <Icon size={24} className={isActive ? "stroke-[#EE3424]" : "stroke-[#969696]"} strokeWidth={isActive ? 2.5 : 2} />
              ) : (
                <img
                  src={iconImg}
                  alt={label}
                  className={`w-[24px] h-[24px] object-contain ${!isActive && 'opacity-60 grayscale'}`}
                  style={{ filter: !isActive ? 'grayscale(100%) opacity(0.6)' : 'none' }}
                />
              )}
              <span className="text-[10px] font-medium leading-none tracking-tight">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavBar;
