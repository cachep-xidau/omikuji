export const getAIResponse = (text, language = 'en') => {
    const lowerText = text.toLowerCase();

    // 1. Walking Tips / Suggestion
    if (lowerText.includes('walking') || lowerText.includes('ウォーキング') || lowerText.includes('walk') || lowerText.includes('散歩')) {
        return {
            text: language === 'ja'
                ? "ウォーキングは心と体のリフレッシュに最適です。近くの公園を少し歩いてみませんか？自然の音に耳を傾けると、よりリラックスできますよ。"
                : "Walking is great for refreshing your mind and body. How about a short walk in a nearby park? Listening to nature sounds can help you relax even more.",
            suggestion: language === 'ja'
                ? "おすすめ: 20分の早歩き"
                : "Suggestion: 20 minutes brisk walking",
            type: 'walking_proposal'
        };
    }

    // 2. Feeling Tired
    if (lowerText.includes('tired') || lowerText.includes('疲れた') || lowerText.includes('fatigue') || lowerText.includes('眠い')) {
        return {
            text: language === 'ja'
                ? "お疲れのようですね。無理をせず、今日はゆっくり休みましょう。温かい飲み物を飲んで、リラックスしてください。"
                : "You seem tired. Don't push yourself; take a good rest today. Have a hot drink and relax.",
            suggestion: language === 'ja'
                ? "おすすめ: ハーブティーと瞑想"
                : "Suggestion: Herbal tea and meditation"
        };
    }

    // 3. Fortune / Omikuji Trigger (Text based)
    if (lowerText.includes('fortune') || lowerText.includes('omikuji') || lowerText.includes('運勢') || lowerText.includes('おみくじ')) {
        return {
            text: language === 'ja'
                ? "今日の運勢を占ってみますか？心の準備ができたら、下のボタンを押してください。"
                : "Would you like to draw your daily fortune? Press the button below when you are ready.",
            fortune: true // Trigger the fortune action
        };
    }

    // 4. Greetings
    if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('こんにちは')) {
        return {
            text: language === 'ja'
                ? "こんにちは！今日の気分はいかがですか？"
                : "Hello! How are you feeling today?"
        };
    }

    // Default responses
    const defaults = language === 'ja'
        ? [
            "その気持ち、よくわかります。",
            "詳しく教えていただけますか？",
            "あなたのペースで大丈夫ですよ。",
            "いつでもここでお話を聞きますよ。"
        ]
        : [
            "I understand how you feel.",
            "Can you tell me more about that?",
            "It's okay to go at your own pace.",
            "I'm here to listen whenever you need."
        ];

    return {
        text: defaults[Math.floor(Math.random() * defaults.length)]
    };
};
