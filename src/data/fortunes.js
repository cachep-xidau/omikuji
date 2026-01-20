export const BLOOD_TYPES = [
    {
        type: 'A',
        icon: '🅰️',
        personality_jp: '几帳面で思いやりがあり、協調性を大切にする',
        personality_en: 'Thoughtful, careful, values harmony and cooperation',
        strengths: 'Organized, reliable, attentive to details',
        tendencies: 'Worry-prone, perfectionist, sensitive to stress'
    },
    {
        type: 'B',
        icon: '🅱️',
        personality_jp: '独創的で情熱的、マイペース',
        personality_en: 'Creative, passionate, free-spirited, individualistic',
        strengths: 'Flexible, optimistic, independent',
        tendencies: 'Can be selfish, impatient, unpredictable'
    },
    {
        type: 'O',
        icon: '🅾️',
        personality_jp: 'おおらかで社交的、リーダーシップがある',
        personality_en: 'Confident, outgoing, natural leader, ambitious',
        strengths: 'Decisive, loyal, social',
        tendencies: 'Insensitive at times, stubborn, self-confident'
    },
    {
        type: 'AB',
        icon: '🆎',
        personality_jp: '合理的で冷静、二面性がある',
        personality_en: 'Rational, composed, mysterious, unique',
        strengths: 'Analytical, adaptable, critical thinker',
        tendencies: 'Aloof, complex, hard to read'
    }
];

// Simplified for Prototype: 1 variation per luck level

export const BLOOD_TYPE_WORK_ADVICE = {
    'A': {
        1: '細部へのこだわりが大きな成果を生みます。自信を持って進めてください。', // Daikichi
        2: '計画通りに進めることで信頼が得られます。焦らず着実に。', // Kichi
        3: '周囲との協力を大切に。一人で抱え込まないようにしましょう。', // Chukichi
        4: '確認作業を怠らないように。慎重さが鍵となります。', // Shokichi
        5: '今日は準備の時期です。大きな決断は避けた方が無難でしょう。', // Suekichi
        6: '予期せぬ変更があるかもしれません。柔軟な対応を心がけて。', // Kyo
        7: '無理は禁物です。基本に立ち返り、足元を固めましょう。' // Daikyo
    },
    'B': {
        1: '独創的なアイデアが光ります。思いついたことはメモしておきましょう。',
        2: '新しいアプローチが功を奏します。好奇心を大切に。',
        3: 'マイペースに進めるのが吉。周りに流されないように。',
        4: '集中力が散漫になりがち。一つ一つのタスクを確実に。',
        5: 'こだわりすぎると時間が足りなくなります。全体を見る意識を。',
        6: '独断専行はトラブルの元。周囲の意見にも耳を傾けて。',
        7: '衝動的な行動は控えめに。冷静な判断が必要です。'
    },
    'O': {
        1: 'リーダーシップを発揮できる日。チームを引っ張っていきましょう。',
        2: '目標に向かって一直線に進めます。熱意が周りを動かします。',
        3: 'おおらかな対応が職場の空気を良くします。笑顔を忘れずに。',
        4: '大雑把なミスに注意。最終チェックは念入りに。',
        5: '自己主張が強くなりすぎないように。協調性を意識して。',
        6: '頑固になりがちです。柔軟な姿勢が状況を好転させます。',
        7: '安請け合いは危険です。できることとできないことを明確に。'
    },
    'AB': {
        1: '冷静な分析力が冴え渡ります。複雑な問題も解決できるでしょう。',
        2: '多角的な視点が評価されます。アイデアを積極的に提案して。',
        3: '合理的な判断が功を奏します。無駄を省いて効率的に。',
        4: '少し距離を置いた方が冷静になれます。一人の時間を大切に。',
        5: '考えすぎて動けなくなるかも。まずは手を動かしてみましょう。',
        6: 'クールさが冷たさと誤解されるかも。言葉選びは慎重に。',
        7: '二面性が裏目に出ることも。一貫性のある行動を心がけて。'
    }
};

export const FORTUNES = [
    {
        id: 1,
        level: '大吉',
        level_romaji: 'Daikichi',
        level_en: 'Great Blessing',
        color: '#FFD700', // Gold/Yellow
        proverb_jp: '一日の計は朝にあり',
        proverb_en: 'The plan for the day begins in the morning.',
        advice: [
            { icon: '💼', label: 'Work', text: 'A good time for new challenges. Have confidence.' },
            { icon: '❤️', label: 'Love', text: 'Kindness bears fruit. Express honest feelings.' },
            { icon: '🏥', label: 'Health', text: 'Health is excellent. Maintain moderate exercise.' }
        ]
    },
    {
        id: 2,
        level: '吉',
        level_romaji: 'Kichi',
        level_en: 'Good Fortune',
        color: '#4CAF50', // Green
        proverb_jp: '継続は力なり',
        proverb_en: 'Continuity is power (Perseverance pays off).',
        advice: [
            { icon: '💼', label: 'Work', text: 'Steady efforts will be rewarded.' },
            { icon: '❤️', label: 'Love', text: 'Good communication deepens bonds.' },
            { icon: '🏥', label: 'Health', text: 'Stable condition. Eat well.' }
        ]
    },
    {
        id: 3,
        level: '中吉',
        level_romaji: 'Chūkichi',
        level_en: 'Moderate Fortune',
        color: '#2196F3', // Blue
        proverb_jp: '笑う門には福来る',
        proverb_en: 'Fortune comes to the gate of those who laugh.',
        advice: [
            { icon: '💼', label: 'Work', text: 'Balance is key. Avoid overworking.' },
            { icon: '❤️', label: 'Love', text: 'Listen more than you speak today.' },
            { icon: '🏥', label: 'Health', text: 'Watch out for minor stress.' }
        ]
    },
    {
        id: 4,
        level: '小吉',
        level_romaji: 'Shōkichi',
        level_en: 'Small Fortune',
        color: '#009688', // Teal
        proverb_jp: '急がば回れ',
        proverb_en: 'Haste makes waste (Go around if in a hurry).',
        advice: [
            { icon: '💼', label: 'Work', text: 'Check details carefully.' },
            { icon: '❤️', label: 'Love', text: 'Small gestures matter most.' },
            { icon: '🏥', label: 'Health', text: 'Take a short walk for refreshment.' }
        ]
    },
    {
        id: 5,
        level: '末吉',
        level_romaji: 'Suekichi',
        level_en: 'Future Fortune',
        color: '#9E9E9E', // Gray
        proverb_jp: '待てば海路の日和あり',
        proverb_en: 'Good things come to those who wait.',
        advice: [
            { icon: '💼', label: 'Work', text: 'Patience now leads to success later.' },
            { icon: '❤️', label: 'Love', text: 'Don\'t rush; let things unfold naturally.' },
            { icon: '🏥', label: 'Health', text: 'Rest is important today.' }
        ]
    },
    {
        id: 6,
        level: '凶',
        level_romaji: 'Kyō',
        level_en: 'Bad Fortune',
        color: '#FF9800', // Orange
        proverb_jp: '七転び八起き',
        proverb_en: 'Fall down seven times, stand up eight.',
        advice: [
            { icon: '💼', label: 'Work', text: 'Avoid risky decisions today.' },
            { icon: '❤️', label: 'Love', text: 'Misunderstandings are likely. Be clear.' },
            { icon: '🏥', label: 'Health', text: 'Get plenty of sleep tonight.' }
        ]
    },
    {
        id: 7,
        level: '大凶',
        level_romaji: 'Daikyō',
        level_en: 'Great Misfortune',
        color: '#F44336', // Red
        proverb_jp: '雨降って地固まる',
        proverb_en: 'Adversity builds character (Ground hardens after rain).',
        advice: [
            { icon: '💼', label: 'Work', text: 'Stay low and observe. Do not act rashly.' },
            { icon: '❤️', label: 'Love', text: 'Protect your heart. Solitude is okay.' },
            { icon: '🏥', label: 'Health', text: 'Prioritize recovery above all else.' }
        ]
    }
];
