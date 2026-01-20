import { Star, Images, Sparkles, Medal, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { getImagePath } from '../utils/imagePath';

const NavBar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Star, label: 'Today' },
    { path: '/discover', iconImg: getImagePath('/images/discover-icon.png'), label: 'Discover' },
    { path: '/start', iconImg: getImagePath('/images/start-icon.png'), label: 'Start', isCenter: true },
    { path: '/achieve', iconImg: getImagePath('/images/achieve-icon.png'), label: 'Achieve' },
    { path: '/account', icon: User, label: 'Account' },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E8E8E8] shadow-[0_-4px_20px_rgba(0,0,0,0.02)] px-4 pt-[12px] pb-[34px] h-[90px] z-40">
      <div className="flex justify-around items-center h-full items-start">
        {navItems.map(({ path, icon: Icon, iconImg, label, isCenter }) => {
          const isActive = location.pathname === path;

          if (isCenter) {
            return (
              <Link
                key={path}
                to={path}
                className="flex flex-col items-center gap-1 -mt-[30px]"
              >
                <div className="w-[60px] h-[60px] rounded-full bg-[#181818] flex items-center justify-center shadow-lg">
                  {Icon ? (
                    <Icon size={24} className="text-white" fill="white" />
                  ) : (
                    <img src={iconImg} alt={label} className="w-[54px] h-[54px] object-contain" />
                  )}
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-[#EE3424]' : 'text-[#969696]'
                }`}
            >
              {Icon ? (
                <Icon size={22} className={isActive ? "stroke-[#EE3424]" : "stroke-[#969696]"} />
              ) : (
                <img
                  src={iconImg}
                  alt={label}
                  className={`w-[22px] h-[22px] object-contain ${!isActive && 'opacity-60 grayscale'}`}
                  style={{ filter: !isActive ? 'grayscale(100%) opacity(0.6)' : 'none' }}
                />
              )}
              <span className="text-[11px] font-medium leading-none">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavBar;

