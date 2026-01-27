import { useLanguage } from '../contexts/LanguageContext';
import { BLOOD_TYPE_WORK_ADVICE } from '../data/fortunes';

// Weather patterns for analysis
const weatherPatterns = {
    sunny: {
        ja: '晴れ',
        en: 'sunny'
    },
    rainy: {
        ja: '雨',
        en: 'rainy'
    },
    cloudy: {
        ja: '曇り',
        en: 'cloudy'
    }
};

// Generate AI insight based on recent activity
export function generateMirrorInsight(recentEntries, recentWalks, language = 'ja') {
    const insights = [];

    // Analyze last 3-7 days
    const daysToAnalyze = Math.min(7, Math.max(3, recentEntries.length));
    const recentDays = recentEntries.slice(0, daysToAnalyze);

    // Weather analysis
    const weatherCounts = {
        sunny: 0,
        rainy: 0,
        cloudy: 0
    };

    // Mock weather data (in real app, this would come from actual data)
    // For now, we'll use a simple pattern based on date
    recentDays.forEach(entry => {
        const date = new Date(entry.timestamp);
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            weatherCounts.sunny++;
        } else if (dayOfWeek % 2 === 0) {
            weatherCounts.cloudy++;
        } else {
            weatherCounts.rainy++;
        }
    });

    // Walking analysis
    const walkCount = recentWalks ? recentWalks.length : 0;
    const walkPercentage = daysToAnalyze > 0 ? (walkCount / daysToAnalyze) * 100 : 0;

    // Generate insights based on patterns
    const dominantWeather = Object.keys(weatherCounts).reduce((a, b) =>
        weatherCounts[a] > weatherCounts[b] ? a : b
    );

    // Weather-based insights
    if (dominantWeather === 'sunny' && walkPercentage > 60) {
        insights.push({
            category: 'weather_walk',
            ja: '晴れの日が多く、散歩も順調ですね。素晴らしい習慣です！',
            en: 'Many sunny days and good walking progress. Excellent habit!'
        });
    } else if (dominantWeather === 'rainy' && walkPercentage < 30) {
        insights.push({
            category: 'weather_walk',
            ja: '雨が続いていますが、室内での活動も大切です。',
            en: 'Rainy days continue, but indoor activities are important too.'
        });
    } else if (walkPercentage > 70) {
        insights.push({
            category: 'walk',
            ja: '最近の散歩記録が素晴らしいです！この調子で続けましょう。',
            en: 'Your recent walking records are excellent! Keep it up.'
        });
    } else if (walkPercentage < 30) {
        insights.push({
            category: 'walk',
            ja: '散歩の時間を少し増やしてみませんか？',
            en: 'How about adding a bit more walking time?'
        });
    }

    // Season-based insights
    const currentMonth = new Date().getMonth() + 1;
    if (currentMonth >= 3 && currentMonth <= 5) {
        insights.push({
            category: 'season',
            ja: '春の訪れを感じながら、心も体もリフレッシュしましょう。',
            en: 'Feel the arrival of spring and refresh your mind and body.'
        });
    } else if (currentMonth >= 6 && currentMonth <= 8) {
        insights.push({
            category: 'season',
            ja: '夏の暑さに負けず、水分補給を忘れずに。',
            en: 'Don\'t let the summer heat beat you. Stay hydrated.'
        });
    } else if (currentMonth >= 9 && currentMonth <= 11) {
        insights.push({
            category: 'season',
            ja: '秋の心地よい風を感じながら、深呼吸してみましょう。',
            en: 'Feel the pleasant autumn breeze and take a deep breath.'
        });
    } else {
        insights.push({
            category: 'season',
            ja: '冬の静けさの中で、心に響いたことを振り返りましょう。',
            en: 'Reflect on what resonated with you in the winter stillness.'
        });
    }

    // General wellness insights
    if (recentEntries.length >= 5) {
        insights.push({
            category: 'consistency',
            ja: '日記を続けている姿勢が素晴らしいです。',
            en: 'Your consistency in journaling is wonderful.'
        });
    }

    // Return random insight or prioritized one
    if (insights.length === 0) {
        return {
            category: 'general',
            ja: '今日も一日、お疲れ様でした。',
            en: 'Thank you for your hard work today.'
        };
    }

    // Prioritize weather_walk insights
    const priorityInsight = insights.find(i => i.category === 'weather_walk');
    const selectedInsight = priorityInsight || insights[Math.floor(Math.random() * insights.length)];

    return {
        category: selectedInsight.category,
        text: language === 'ja' ? selectedInsight.ja : selectedInsight.en
    };
}

// Generate multiple insights for variety
export function generateMultipleMirrorInsights(recentEntries, recentWalks, count = 3) {
    const insights = [];

    for (let i = 0; i < count; i++) {
        const insight = generateMirrorInsight(recentEntries, recentWalks);
        insights.push(insight);
    }

    return insights;
}

// Generate Fortune-Specific Insight
export function generateFortuneInsight(fortune, bloodType = 'A') {
    if (!fortune) return null;

    // Get specific advice or fallback
    const bloodTypeData = BLOOD_TYPE_WORK_ADVICE[bloodType] || BLOOD_TYPE_WORK_ADVICE['A'];
    const specificAdvice = bloodTypeData[fortune.id] || fortune.advice?.[0]?.text || "Enjoy your day.";

    return {
        type: 'fortune_insight',
        text: `I sense a ${fortune.level} energy surrounding you. As the proverb says: "${fortune.proverb_en}". ${specificAdvice}`,
        fortuneLevel: fortune.level,
        proverb: fortune.proverb_en,
        advice: specificAdvice
    };
}
