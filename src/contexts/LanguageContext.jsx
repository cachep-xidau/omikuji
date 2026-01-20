import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        // Load from localStorage or default to 'ja'
        return localStorage.getItem('appLanguage') || 'ja';
    });

    useEffect(() => {
        localStorage.setItem('appLanguage', language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'ja' ? 'en' : 'ja');
    };

    const translations = {
        // Navigation
        'nav.diary': {
            ja: '日記',
            en: 'Diary'
        },

        // Calendar
        'calendar.mon': {
            ja: '月',
            en: 'MON'
        },
        'calendar.tue': {
            ja: '火',
            en: 'TUE'
        },
        'calendar.wed': {
            ja: '水',
            en: 'WED'
        },
        'calendar.thu': {
            ja: '木',
            en: 'THU'
        },
        'calendar.fri': {
            ja: '金',
            en: 'FRI'
        },
        'calendar.sat': {
            ja: '土',
            en: 'SAT'
        },
        'calendar.sun': {
            ja: '日',
            en: 'SUN'
        },

        // Weekdays (Full names)
        'weekday.monday': {
            ja: '月曜日',
            en: 'Monday'
        },
        'weekday.tuesday': {
            ja: '火曜日',
            en: 'Tuesday'
        },
        'weekday.wednesday': {
            ja: '水曜日',
            en: 'Wednesday'
        },
        'weekday.thursday': {
            ja: '木曜日',
            en: 'Thursday'
        },
        'weekday.friday': {
            ja: '金曜日',
            en: 'Friday'
        },
        'weekday.saturday': {
            ja: '土曜日',
            en: 'Saturday'
        },
        'weekday.sunday': {
            ja: '日曜日',
            en: 'Sunday'
        },

        // Months
        'month.jan': {
            ja: '1月',
            en: 'Jan'
        },
        'month.feb': {
            ja: '2月',
            en: 'Feb'
        },
        'month.mar': {
            ja: '3月',
            en: 'Mar'
        },
        'month.apr': {
            ja: '4月',
            en: 'Apr'
        },
        'month.may': {
            ja: '5月',
            en: 'May'
        },
        'month.jun': {
            ja: '6月',
            en: 'Jun'
        },
        'month.jul': {
            ja: '7月',
            en: 'Jul'
        },
        'month.aug': {
            ja: '8月',
            en: 'Aug'
        },
        'month.sep': {
            ja: '9月',
            en: 'Sep'
        },
        'month.oct': {
            ja: '10月',
            en: 'Oct'
        },
        'month.nov': {
            ja: '11月',
            en: 'Nov'
        },
        'month.dec': {
            ja: '12月',
            en: 'Dec'
        },

        // Months (Full names)
        'month.january': {
            ja: '1月',
            en: 'January'
        },
        'month.february': {
            ja: '2月',
            en: 'February'
        },
        'month.march': {
            ja: '3月',
            en: 'March'
        },
        'month.april': {
            ja: '4月',
            en: 'April'
        },
        'month.may.full': {
            ja: '5月',
            en: 'May'
        },
        'month.june': {
            ja: '6月',
            en: 'June'
        },
        'month.july': {
            ja: '7月',
            en: 'July'
        },
        'month.august': {
            ja: '8月',
            en: 'August'
        },
        'month.september': {
            ja: '9月',
            en: 'September'
        },
        'month.october': {
            ja: '10月',
            en: 'October'
        },
        'month.november': {
            ja: '11月',
            en: 'November'
        },
        'month.december': {
            ja: '12月',
            en: 'December'
        },

        // Fortune Widget
        'fortune.today': {
            ja: '今日の運勢 (Today)',
            en: 'Daily Fortune'
        },
        'fortune.tied': {
            ja: '🎋 結び済み',
            en: '🎋 Tied'
        },
        'fortune.daily': {
            ja: '毎日の日課 (Daily)',
            en: 'Daily Ritual'
        },
        'fortune.draw': {
            ja: 'おみくじを引く',
            en: 'Draw Fortune'
        },
        'fortune.guidance': {
            ja: '今日の導きを受け取りましょう。',
            en: 'Receive today\'s guidance.'
        },

        // Input Section
        'input.placeholder': {
            ja: '今日の気持ちは？',
            en: 'How are you feeling?'
        },

        // Timeline Section
        'timeline.previous': {
            ja: '過去の記録',
            en: 'Previous Entries'
        },
        'timeline.viewAll': {
            ja: 'すべて見る',
            en: 'View All'
        },
        'timeline.noActivity': {
            ja: 'まだ記録がありません。',
            en: 'No activity yet.'
        },

        // Diary History Screen
        'history.archive': {
            ja: 'アーカイブ',
            en: 'Archive'
        },
        'history.dailyDrawing': {
            ja: '今日の運勢',
            en: 'Daily Drawing'
        },
        'history.omikuji': {
            ja: 'おみくじ',
            en: 'Omikuji'
        },
        'history.page': {
            ja: 'ページ',
            en: 'Page'
        },
        'history.of': {
            ja: '/',
            en: 'of'
        },

        // Fortune Draw Modal
        'fortune.title': {
            ja: '今日の運勢',
            en: 'Daily Fortune'
        },
        'fortune.subtitle.intro': {
            ja: '自然の精霊からのメッセージを受け取りましょう。',
            en: 'Receive a message from the spirits of nature.'
        },
        'fortune.subtitle.drawing': {
            ja: 'おみくじを引いています...',
            en: 'Drawing your fortune...'
        },
        'fortune.button.draw': {
            ja: 'おみくじを引く',
            en: 'Draw Fortune'
        },
        'fortune.button.keep': {
            ja: '手元に残す',
            en: 'Keep'
        },
        'fortune.button.tie': {
            ja: '神社に結ぶ',
            en: 'Tie at Shrine'
        }
    };

    const t = (key) => {
        return translations[key]?.[language] || key;
    };

    // Helper function to format dates according to language
    const formatDate = (date, format = 'full') => {
        const d = new Date(date);
        const weekdayMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const monthMap = ['january', 'february', 'march', 'april', 'may.full', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        const monthShortMap = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

        const weekday = translations[`weekday.${weekdayMap[d.getDay()]}`]?.[language];
        const month = format === 'short'
            ? translations[`month.${monthShortMap[d.getMonth()]}`]?.[language]
            : translations[`month.${monthMap[d.getMonth()]}`]?.[language];
        const day = d.getDate();

        if (language === 'ja') {
            // Japanese format: 1月20日 (月曜日)
            return format === 'short' ? `${month}${day}日` : `${month}${day}日 (${weekday})`;
        } else {
            // English format: Monday, Jan 20 or Jan 20
            return format === 'short' ? `${month} ${day}` : `${weekday}, ${month} ${day}`;
        }
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t, formatDate }}>
            {children}
        </LanguageContext.Provider>
    );
};
