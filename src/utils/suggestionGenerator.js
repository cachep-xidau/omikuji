// Japanese Festival Calendar
export const japaneseFestivals = {
    '01-01': { name: '元日', name_en: 'New Year\'s Day', type: 'national' },
    '01-07': { name: '七草', name_en: 'Nanakusa', type: 'seasonal' },
    '02-03': { name: '節分', name_en: 'Setsubun', type: 'seasonal' },
    '03-03': { name: 'ひな祭り', name_en: 'Hinamatsuri', type: 'cultural' },
    '03-20': { name: '春分の日', name_en: 'Vernal Equinox', type: 'national' },
    '04-08': { name: '花祭り', name_en: 'Hanamatsuri', type: 'cultural' },
    '05-05': { name: 'こどもの日', name_en: 'Children\'s Day', type: 'national' },
    '07-07': { name: '七夕', name_en: 'Tanabata', type: 'cultural' },
    '08-15': { name: 'お盆', name_en: 'Obon', type: 'cultural' },
    '09-23': { name: '秋分の日', name_en: 'Autumnal Equinox', type: 'national' },
    '11-15': { name: '七五三', name_en: 'Shichi-Go-San', type: 'cultural' },
    '12-31': { name: '大晦日', name_en: 'New Year\'s Eve', type: 'cultural' }
};

// Weather-based suggestions
const weatherSuggestions = {
    sunny: {
        ja: '今日の青空を見て、どんな気持ちになりましたか？',
        en: 'How did today\'s blue sky make you feel?'
    },
    rainy: {
        ja: '雨の音を聞きながら、心に浮かんだことは？',
        en: 'What came to mind while listening to the rain?'
    },
    cloudy: {
        ja: '曇り空の下で、今日の一日を振り返ってみましょう',
        en: 'Reflect on your day under the cloudy sky'
    },
    snowy: {
        ja: '雪景色を眺めながら、冬の思い出を綴りませんか？',
        en: 'Write about winter memories while watching the snow'
    }
};

// Festival-based suggestions
const festivalSuggestions = {
    '元日': {
        ja: '新年の抱負について書いてみませんか？',
        en: 'Would you like to write about your New Year\'s resolutions?'
    },
    '節分': {
        ja: '今年追い払いたい「鬼」は何ですか？',
        en: 'What "demons" do you want to drive away this year?'
    },
    'ひな祭り': {
        ja: '春の訪れを感じる瞬間はありましたか？',
        en: 'Did you feel the arrival of spring today?'
    },
    '七夕': {
        ja: '七夕の願い事は何ですか？',
        en: 'What is your Tanabata wish?'
    },
    'お盆': {
        ja: 'ご先祖様への感謝の気持ちを綴りましょう',
        en: 'Write about your gratitude to your ancestors'
    },
    '七五三': {
        ja: '子供の頃の思い出を振り返ってみませんか？',
        en: 'Would you like to reflect on childhood memories?'
    }
};

// Walking activity suggestions
const walkingSuggestions = [
    {
        ja: '今日の散歩で見つけた小さな発見は？',
        en: 'What small discoveries did you find on today\'s walk?'
    },
    {
        ja: '歩きながら考えたことを記録しましょう',
        en: 'Record what you thought about while walking'
    },
    {
        ja: '散歩中に出会った季節の変化を書いてみませんか？',
        en: 'Write about the seasonal changes you noticed during your walk'
    }
];

// Blood type personality suggestions (ketsueki-gata)
const bloodTypeSuggestions = {
    A: {
        ja: '几帳面なあなたが今日達成したことは？',
        en: 'What did meticulous you accomplish today?'
    },
    B: {
        ja: '自由な発想で今日の出来事を表現してみましょう',
        en: 'Express today\'s events with your free-spirited creativity'
    },
    O: {
        ja: 'リーダーシップを発揮した瞬間はありましたか？',
        en: 'Was there a moment when you showed leadership?'
    },
    AB: {
        ja: '独創的な視点で今日を振り返ってみましょう',
        en: 'Reflect on today from your unique perspective'
    }
};

// Season-based suggestions
const seasonSuggestions = {
    spring: {
        ja: '春の訪れを感じる瞬間はありましたか？',
        en: 'Did you feel the arrival of spring?'
    },
    summer: {
        ja: '夏の暑さの中で、心地よかった瞬間は？',
        en: 'What was a pleasant moment in the summer heat?'
    },
    autumn: {
        ja: '秋の風を感じながら、何を思いましたか？',
        en: 'What did you think while feeling the autumn breeze?'
    },
    winter: {
        ja: '冬の静けさの中で、心に響いたことは？',
        en: 'What resonated with you in the winter stillness?'
    }
};

// Helper: Get current season
function getSeason(date) {
    const month = date.getMonth() + 1;
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
}

// Helper: Get festival for date
function getFestivalForDate(date) {
    const key = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return japaneseFestivals[key];
}

// Main suggestion generator
export function generateSuggestion(date, bloodType, weather = 'sunny', hasWalked = false) {
    const suggestions = [];

    // Add weather suggestion
    if (weatherSuggestions[weather]) {
        suggestions.push({
            type: 'weather',
            icon: '🌤️',
            ...weatherSuggestions[weather]
        });
    }

    // Add festival suggestion if applicable
    const festival = getFestivalForDate(date);
    if (festival && festivalSuggestions[festival.name]) {
        suggestions.push({
            type: 'festival',
            icon: '🎌',
            festivalName: festival.name,
            ...festivalSuggestions[festival.name]
        });
    }

    // Add season suggestion
    const season = getSeason(date);
    if (seasonSuggestions[season]) {
        suggestions.push({
            type: 'season',
            icon: '🌸',
            ...seasonSuggestions[season]
        });
    }

    // Add walking suggestion if user walked today
    if (hasWalked) {
        const walkSuggestion = walkingSuggestions[Math.floor(Math.random() * walkingSuggestions.length)];
        suggestions.push({
            type: 'walking',
            icon: '🚶',
            ...walkSuggestion
        });
    }

    // Add blood type suggestion
    if (bloodType && bloodTypeSuggestions[bloodType]) {
        suggestions.push({
            type: 'bloodType',
            icon: '🩸',
            bloodType,
            ...bloodTypeSuggestions[bloodType]
        });
    }

    // Return random suggestion from available ones
    if (suggestions.length === 0) {
        return {
            type: 'default',
            icon: '✨',
            ja: '今日の出来事を自由に書いてみましょう',
            en: 'Write freely about today\'s events'
        };
    }

    return suggestions[Math.floor(Math.random() * suggestions.length)];
}

// Generate multiple suggestions
export function generateMultipleSuggestions(date, bloodType, weather = 'sunny', hasWalked = false, count = 3) {
    const allSuggestions = [];

    // Collect all applicable suggestions
    if (weatherSuggestions[weather]) {
        allSuggestions.push({
            type: 'weather',
            icon: '🌤️',
            ...weatherSuggestions[weather]
        });
    }

    const festival = getFestivalForDate(date);
    if (festival && festivalSuggestions[festival.name]) {
        allSuggestions.push({
            type: 'festival',
            icon: '🎌',
            festivalName: festival.name,
            ...festivalSuggestions[festival.name]
        });
    }

    const season = getSeason(date);
    if (seasonSuggestions[season]) {
        allSuggestions.push({
            type: 'season',
            icon: '🌸',
            ...seasonSuggestions[season]
        });
    }

    if (hasWalked) {
        walkingSuggestions.forEach(suggestion => {
            allSuggestions.push({
                type: 'walking',
                icon: '🚶',
                ...suggestion
            });
        });
    }

    if (bloodType && bloodTypeSuggestions[bloodType]) {
        allSuggestions.push({
            type: 'bloodType',
            icon: '🩸',
            bloodType,
            ...bloodTypeSuggestions[bloodType]
        });
    }

    // Shuffle and return requested count
    const shuffled = allSuggestions.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}
