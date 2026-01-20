import React from 'react';
import { Signal, Wifi, Battery } from 'lucide-react';

const StatusBar = ({ light = false }) => {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const textColor = light ? 'text-white' : 'text-black';

  return (
    <div className="flex justify-between items-center px-6 pt-3 pb-2 z-50 relative">
      <span className={`text-sm font-semibold ${textColor} font-sans tracking-wide`}>{currentTime}</span>
      <div className={`flex items-center gap-1.5 ${textColor}`}>
        {/* iOS Signal */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="9" width="3" height="3" rx="1" />
          <rect x="5.5" y="6" width="3" height="6" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="14.5" y="0" width="3" height="12" rx="1" />
        </svg>

        {/* iOS Wifi - 3 Bars (Segmented) */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="ml-0.5">
          {/* Bottom Dot */}
          <path d="M9 11.5C9.6 11.5 10.1 11 10.1 10.4L9 12L7.9 10.4C7.9 11 8.4 11.5 9 11.5Z" />
          <path d="M9 12L11 9.5C10.4 9 9.7 8.8 9 8.8C8.3 8.8 7.6 9 7 9.5L9 12Z" />
          {/* Middle Bar */}
          <path d="M13.5 6.4L12.1 8.1C11.3 7.5 10.2 7.1 9 7.1C7.8 7.1 6.7 7.5 5.9 8.1L4.5 6.4C5.7 5.4 7.3 4.9 9 4.9C10.7 4.9 12.3 5.4 13.5 6.4Z" />
          {/* Top Bar */}
          <path d="M16 3.3L14.6 5C13.1 3.8 11.1 3.1 9 3.1C6.9 3.1 4.9 3.8 3.4 5L2 3.3C3.9 1.8 6.3 0.9 9 0.9C11.7 0.9 14.1 1.8 16 3.3Z" />
        </svg>

        {/* iOS Battery */}
        <div className="relative ml-0.5">
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="currentColor" strokeOpacity="0.4" />
            <rect x="2" y="2" width="17" height="8" rx="1.5" fill="currentColor" />
            <path d="M22 4C22 4 23 4 23 6C23 8 22 8 22 8" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
