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
        'nav.today': { ja: '今日', en: 'Today' },
        'nav.activity': { ja: 'アクティビティ', en: 'Activity' },
        'nav.insight': { ja: 'インサイト', en: 'Insight' },
        'nav.quest': { ja: 'クエスト', en: 'Quest' },
        'nav.reward': { ja: 'リワード', en: 'Reward' },
        'nav.diary': { ja: '日記', en: 'Diary' },

        // Common
        'common.validFor': { ja: '残り時間:', en: 'Valid for:' },
        'common.loading': { ja: '読み込み中...', en: 'Loading...' },

        // Home Screen
        'home.goodMorning': { ja: 'おはようございます', en: 'Good morning' },
        'home.todayMission': { ja: '今日のミッション', en: 'Today Mission' },
        'home.missionDesc': { ja: '今日のミッションを完了して報酬を獲得しましょう。', en: "Complete today's mission to unlock exciting rewards." },
        'home.todayFocus': { ja: '今日のフォーカス', en: 'Today Focus' },
        'home.airQuality': { ja: '空気質:', en: 'Air quality:' },
        'home.good': { ja: '良い', en: 'Good' },
        'home.sunny': { ja: '晴れ', en: 'Sunny' },
        'home.feelLike': { ja: '体感', en: 'feel like' },

        // Tooltip
        'home.tooltip': {
            ja: 'アカウントをタップし、下にスクロールして「Reset daily」または「試用期間を終了」を選択して、フリーミアムとプレミアムを体験してください。',
            en: 'Tap account, scroll down to select "Reset daily" or end trial to experience freemium and premium.'
        },

        // Account Screen
        'account.title': { ja: 'アカウント', en: 'Account' },
        'account.myActivity': { ja: 'アクティビティ', en: 'My activity' },
        'account.myLibrary': { ja: 'ライブラリ', en: 'My library' },
        'account.section.account': { ja: 'アカウント', en: 'Account' },
        'account.myAccount': { ja: 'マイアカウント', en: 'My account' },
        'account.healthConnect': { ja: 'ヘルスケア連携', en: 'Health connect' },
        'account.verification': { ja: '認証方法', en: 'Verification method' },
        'account.password': { ja: 'パスワード', en: 'Password' },
        'account.faceId': { ja: 'Face ID', en: 'Face ID' },
        'account.language': { ja: '言語', en: 'Language' },
        'account.notifications': { ja: '通知', en: 'Notifications' },
        'account.section.help': { ja: 'ヘルプ', en: 'Help' },
        'account.virtualAssistant': { ja: 'バーチャルアシスタント', en: 'Virtual assistant' },
        'account.helpCenter': { ja: 'ヘルプセンター', en: 'Help center' },
        'account.reportIssue': { ja: '問題を報告', en: 'Report an issue' },
        'account.shareLog': { ja: 'ログを共有', en: 'Share log file' },
        'account.section.legal': { ja: '法的事項', en: 'Legal' },
        'account.privacyPolicy': { ja: 'プライバシーポリシー', en: 'Privacy policy' },
        'account.signOut': { ja: 'サインアウト', en: 'Sign out' },
        'account.developer': { ja: '開発者 / プロトタイプ', en: 'Developer / Prototype' },
        'account.expireTrial': { ja: 'トライアル終了', en: 'Force Expire Trial' },
        'account.resetTrial': { ja: 'トライアルリセット', en: 'Reset Trial' },
        'account.resetDaily': { ja: 'デイリーリセット', en: 'Reset daily' },

        // Quest Screen
        'quest.title': { ja: 'クエスト', en: 'Quest' },
        'quest.section.mission': { ja: 'ミッション', en: 'Mission' },
        'quest.summary': { ja: 'ミッションサマリー', en: 'Mission Summary' },
        'quest.daily': { ja: 'デイリーミッション', en: 'Daily Mission' },
        'quest.weekly': { ja: 'ウィークリーミッション', en: 'Weekly Mission' },
        'quest.claim': { ja: '報酬を受け取る', en: 'Claim Rewards' },
        'quest.tickets': { ja: 'チケット', en: 'tickets' },
        'quest.readyToClaim': { ja: '完了したミッションがあります！', en: 'completed missions ready to claim!' },
        'quest.claimBtn': { ja: 'ガチャチケットを受け取る', en: 'Claim Gacha Tickets' },
        'quest.noRewards': { ja: '報酬はありません', en: 'No Rewards Available' },
        'quest.section.streak': { ja: 'ストリーク', en: 'Streak' },
        'quest.streakCalendar': { ja: 'ストリークカレンダー', en: 'Streak Calendar' },
        'quest.streakDay': { ja: 'ストリーク日', en: 'Streak day' },
        'quest.today': { ja: '今日', en: 'Today' },
        'quest.challenge': { ja: '日間チャレンジ', en: 'day challenge' },

        // Calendar
        'calendar.mon': { ja: '月', en: 'MON' },
        'calendar.tue': { ja: '火', en: 'TUE' },
        'calendar.wed': { ja: '水', en: 'WED' },
        'calendar.thu': { ja: '木', en: 'THU' },
        'calendar.fri': { ja: '金', en: 'FRI' },
        'calendar.sat': { ja: '土', en: 'SAT' },
        'calendar.sun': { ja: '日', en: 'SUN' },

        // Weekdays (Full names)
        'weekday.monday': { ja: '月曜日', en: 'Monday' },
        'weekday.tuesday': { ja: '火曜日', en: 'Tuesday' },
        'weekday.wednesday': { ja: '水曜日', en: 'Wednesday' },
        'weekday.thursday': { ja: '木曜日', en: 'Thursday' },
        'weekday.friday': { ja: '金曜日', en: 'Friday' },
        'weekday.saturday': { ja: '土曜日', en: 'Saturday' },
        'weekday.sunday': { ja: '日曜日', en: 'Sunday' },

        // Months
        'month.jan': { ja: '1月', en: 'Jan' },
        'month.feb': { ja: '2月', en: 'Feb' },
        'month.mar': { ja: '3月', en: 'Mar' },
        'month.apr': { ja: '4月', en: 'Apr' },
        'month.may': { ja: '5月', en: 'May' },
        'month.jun': { ja: '6月', en: 'Jun' },
        'month.jul': { ja: '7月', en: 'Jul' },
        'month.aug': { ja: '8月', en: 'Aug' },
        'month.sep': { ja: '9月', en: 'Sep' },
        'month.oct': { ja: '10月', en: 'Oct' },
        'month.nov': { ja: '11月', en: 'Nov' },
        'month.dec': { ja: '12月', en: 'Dec' },

        // Months (Full names)
        'month.january': { ja: '1月', en: 'January' },
        'month.february': { ja: '2月', en: 'February' },
        'month.march': { ja: '3月', en: 'March' },
        'month.april': { ja: '4月', en: 'April' },
        'month.may.full': { ja: '5月', en: 'May' },
        'month.june': { ja: '6月', en: 'June' },
        'month.july': { ja: '7月', en: 'July' },
        'month.august': { ja: '8月', en: 'August' },
        'month.september': { ja: '9月', en: 'September' },
        'month.october': { ja: '10月', en: 'October' },
        'month.november': { ja: '11月', en: 'November' },
        'month.december': { ja: '12月', en: 'December' },

        // Fortune Widget
        'fortune.today': { ja: '今日の運勢 (Today)', en: 'Daily Fortune' },
        'fortune.tied': { ja: '🎋 結び済み', en: '🎋 Tied' },
        'fortune.daily': { ja: '毎日の日課 (Daily)', en: 'Daily Ritual' },
        'fortune.draw': { ja: 'おみくじを引く', en: 'Draw Fortune' },
        'fortune.guidance': { ja: '今日の導きを受け取りましょう。', en: "Receive today's guidance." },

        // Input Section
        'input.placeholder': { ja: '今日の気持ちは？', en: 'How are you feeling?' },

        // Timeline Section
        'timeline.previous': { ja: '過去の記録', en: 'Previous Entries' },
        'timeline.viewAll': { ja: 'すべて見る', en: 'View All' },
        'timeline.noActivity': { ja: 'まだ記録がありません。', en: 'No activity yet.' },

        // Diary History Screen
        'history.archive': { ja: '履歴', en: 'History' },
        'history.dailyDrawing': { ja: '今日の運勢', en: 'Daily Drawing' },
        'history.omikuji': { ja: 'おみくじ', en: 'Omikuji' },
        'history.page': { ja: 'ページ', en: 'Page' },
        'history.of': { ja: '/', en: 'of' },

        // Fortune Draw Modal
        'fortune.title': { ja: '今日の運勢', en: 'Daily Fortune' },
        'fortune.subtitle.intro': { ja: '自然の精霊からのメッセージを受け取りましょう。', en: 'Receive a message from the spirits of nature.' },
        'fortune.subtitle.drawing': { ja: 'おみくじを引いています...', en: 'Drawing your fortune...' },
        'fortune.button.draw': { ja: 'おみくじを引く', en: 'Draw Fortune' },
        'fortune.button.keep': { ja: '手元に残す', en: 'Keep' },
        'fortune.button.tie': { ja: '神社に結ぶ', en: 'Tie at Shrine' },

        // Chat Screen
        'chat.title': { ja: 'チャット日記', en: 'Chat Diary' },
        'chat.online': { ja: 'オンライン', en: 'Online' },
        'chat.placeholder': { ja: '日記を書く、または、導きを求める...', en: 'Write your diary or ask for guidance...' },
        'chat.walkingTips': { ja: '🚶 ウォーキングのヒント', en: '🚶 Walking tips' },
        'chat.feelingTired': { ja: '😴 疲れた', en: '😴 Feeling tired' },
        'chat.viewMap': { ja: '地図を見る', en: 'View on map' },

        // Quest Screen Extra
        'quest.day': { ja: '日目', en: 'Day' },
        'quest.recapTitle': { ja: 'ミッションまとめ', en: 'Mission Recap' },
        'quest.weekAchieve': { ja: '今週の成果', en: "This Week's Achievements" },
        'quest.missions': { ja: 'ミッション', en: 'Missions' },
        'quest.completed': { ja: '完了', en: 'Completed' },
        'quest.ticketsLabel': { ja: 'チケット', en: 'Tickets' },
        'quest.aiImageSum': { ja: 'AI画像サマリー', en: 'AI Image Summary' },
        'quest.aiImageDesc': { ja: '今週のビジュアルまとめ', en: 'Visual recap of your week' },
        'quest.aiVideoSum': { ja: 'AIショート動画サマリー', en: 'AI Short Video Summary' },
        'quest.aiVideoDesc': { ja: '成果のアニメーションハイライト', en: 'Animated highlights of your achievements' },
        'quest.completedList': { ja: '完了したミッション', en: 'Completed Missions' },

        // Activity Screen
        'activity.title': { ja: 'アクティビティ', en: 'Activity' },
        'activity.move': { ja: 'ムーブ', en: 'Move' },
        'activity.exercise': { ja: 'エクササイズ', en: 'Exercise' },
        'activity.stand': { ja: 'スタンド', en: 'Stand' },
        'activity.avgPace': { ja: '平均ペース', en: 'Avg. Pace' },
        'activity.steps': { ja: '歩数', en: 'Steps' },
        'activity.distance': { ja: '距離', en: 'Distance' },
        'activity.calories': { ja: 'カロリー', en: 'Calories' },
        'activity.last7Days': { ja: '過去7日間', en: 'Last 7 Days' },
        'activity.today': { ja: '今日', en: 'Today' },
        'activity.avgTimeInBed': { ja: '平均就寝時間', en: 'Avg. Time in Bed' },
        'activity.avgHeartRate': { ja: '平均心拍数', en: 'Avg. Heart Rate' },
        'activity.walkHistory': { ja: 'ウォーキング履歴', en: 'Walk History' },
        'activity.showMore': { ja: 'もっと見る', en: 'Show More' },

        // Insight Screen
        'insight.title': { ja: 'インサイト', en: 'Insight' },
        'insight.analysis': { ja: 'アクティビティ分析', en: 'Your activity analysis' },
        'insight.recap': { ja: 'まとめ', en: 'Recap' },
        'insight.thisWeek': { ja: '今週', en: 'This Week' },
        'insight.lastWeek': { ja: '先週', en: 'Last Week' },
        'insight.weeklyProgress': { ja: '週間進捗', en: 'Weekly Progress' },
        'insight.walkingHighlight': { ja: 'ウォーキングハイライト', en: 'Walking Highlight' },
        'insight.walkHabit': { ja: 'ウォーキング習慣', en: 'Walk Habit' },
        'insight.consistencyScore': { ja: '継続スコア', en: 'Consistency Score' },
        'insight.details': { ja: '詳細', en: 'Details' },
        'insight.energyTitle': { ja: 'エネルギー & 燃料', en: 'Energy & Fuel' },
        'insight.foodEq': { ja: 'これは約', en: "That's about" },
        'insight.foodEqDesc': { ja: '罪悪感なく食事を楽しめるだけのエネルギーを消費しました！', en: "You've burnt enough energy to enjoy a guilt-free meal." },
        'insight.food.burger': { ja: 'バーガー', en: 'Burgers' },
        'insight.food.banana': { ja: 'バナナ', en: 'Bananas' },
        'insight.food.chicken': { ja: 'チキン', en: 'Chicken' },
        'insight.elevationTitle': { ja: '高度', en: 'Elevation' },
        'insight.floors': { ja: '階', en: 'floors' },
        'insight.gained': { ja: '上昇', en: 'gained' },
        'insight.heartRateTitle': { ja: '心拍数ゾーン', en: 'Heart Rate Zone' },
        'insight.activeHr': { ja: '活動時平均', en: 'Active Avg' },
        'insight.restingHr': { ja: '安静時', en: 'Resting' },
        // Simple replacements for dynamic parts
        'insight.steps': { ja: '歩数', en: 'Steps' }, // Reuse activity.steps if preferred but fine to have specific
        'insight.duration': { ja: '時間', en: 'Duration' },

        // Reward Screen (Gacha)
        'reward.title': { ja: 'リワード', en: 'Rewards' },
        'reward.mySGT': { ja: 'マイSGT', en: 'My SGT' },
        'reward.sgtBalance': { ja: 'SGT残高', en: 'SGT Balance' },
        'reward.myPictures': { ja: 'マイピクチャー', en: 'My Pictures' },
        'reward.myPicturesDesc': { ja: 'パズルのピースをすべて集めて絵を完成させましょう。完成した絵は自動的にコレクション内の動画をアンロックします。', en: 'Complete a picture by collecting all its puzzle pieces. Every completed picture automatically unlocks a video in your collection.' },
        'reward.gachaSection': { ja: 'ガチャ', en: 'Gacha' },
        'reward.regularTicket': { ja: '通常チケット', en: 'Regular ticket' },
        'reward.premiumTicket': { ja: 'プレミアムチケット', en: 'Premium ticket' },
        'reward.openGacha': { ja: 'ガチャを回す', en: 'Open Gacha Tickets' },
        'reward.myCards': { ja: 'マイカード', en: 'My cards' },
        'reward.collection': { ja: 'コレクション', en: 'Collection' },
        'reward.collectHint': { ja: 'カードを3枚集めて動画をアンロック', en: 'Collect 3 cards to unlock a Video' },
        'reward.discover': { ja: '見つける', en: 'Discover' },
        'reward.myAssets': { ja: 'マイアセット', en: 'My Assets' },
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
