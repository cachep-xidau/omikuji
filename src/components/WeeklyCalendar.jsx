import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WeeklyCalendar = ({ selectedDate = new Date(), onDateSelect }) => {
    const { t } = useLanguage();

    // Generate dates for the current week (Sunday to Saturday or Monday to Sunday)
    // Let's assume a sliding window of +/- 3 days or just current week for now.
    // Simpler: Just generate 7 days centered on, or containing, "today".

    const [viewDate, setViewDate] = React.useState(selectedDate);

    // Sync view with selectedDate if it changes
    React.useEffect(() => {
        setViewDate(selectedDate);
    }, [selectedDate]);

    const weekDays = useMemo(() => {
        const days = [];
        const current = new Date(viewDate);

        // Calculate start of week (Monday) correctly handling Sunday (0)
        const day = current.getDay() || 7; // Make Sunday 7
        const startOfWeek = new Date(current);
        startOfWeek.setDate(current.getDate() - day + 1);

        for (let i = 0; i < 7; i++) {
            const d = new Date(startOfWeek);
            d.setDate(startOfWeek.getDate() + i);
            days.push(d);
        }
        return days;
    }, [viewDate]);

    const handlePrevWeek = () => {
        const newDate = new Date(viewDate);
        newDate.setDate(viewDate.getDate() - 7);
        setViewDate(newDate);
    };

    const handleNextWeek = () => {
        const newDate = new Date(viewDate);
        newDate.setDate(viewDate.getDate() + 7);
        setViewDate(newDate);
    };

    const getDayLabel = (date) => {
        const dayMap = {
            'Mon': 'calendar.mon',
            'Tue': 'calendar.tue',
            'Wed': 'calendar.wed',
            'Thu': 'calendar.thu',
            'Fri': 'calendar.fri',
            'Sat': 'calendar.sat',
            'Sun': 'calendar.sun'
        };
        const dayShort = date.toLocaleDateString('en-US', { weekday: 'short' });
        return t(dayMap[dayShort]) || dayShort;
    };

    return (
        <div className="w-full py-2">
            <div className="flex items-center justify-between gap-1">
                <button
                    onClick={handlePrevWeek}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="flex-1 flex justify-between items-center px-1 overflow-x-auto no-scrollbar">
                    {weekDays.map((date, index) => {
                        const isSelected = date.getDate() === selectedDate.getDate() &&
                            date.getMonth() === selectedDate.getMonth() &&
                            date.getFullYear() === selectedDate.getFullYear();
                        const isToday = new Date().toDateString() === date.toDateString();

                        return (
                            <motion.button
                                key={index}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onDateSelect && onDateSelect(date)}
                                className={`flex flex-col items-center justify-center min-w-[44px] w-[13.5%] gap-1 py-3 rounded-2xl transition-all relative ${isSelected
                                    ? 'bg-[#F5F5F5] text-gray-900 border border-[#E6E3E3]'
                                    : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                <span className={`text-[11px] uppercase font-bold tracking-wider ${isSelected ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {getDayLabel(date)}
                                </span>
                                <span className={`text-[19px] font-semibold ${isSelected ? 'text-gray-900' : isToday ? 'text-purple-600' : 'text-gray-400'}`}>
                                    {date.getDate()}
                                </span>

                                {isToday && !isSelected && (
                                    <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-purple-500" />
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                <button
                    onClick={handleNextWeek}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default WeeklyCalendar;
