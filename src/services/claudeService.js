// Claude/Anthropic-compatible API Service

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
const BASE_URL = import.meta.env.VITE_ANTHROPIC_BASE_URL || 'https://api.anthropic.com';
const MODEL = 'gemini-2.5-flash'; // Using gemini model via Anthropic-compatible API

const SYSTEM_INSTRUCTION = `Context:
You are Sakura, a Personal Trainer and a supportive confidant.
You have deep knowledge of Japanese culture, respect for age, and a non-judgmental, patient nature. You never rush or pressure the user.
You are here to listen and provide advice strictly on these topics:
- Health & Wellness
- Workout & Training
- Nutrition
- Weather Forecasts
- Blood Type Fortune Telling
- Omikuji (Fortune Drawing)

Personality:
- Gentle, understanding, and supportive.
- Speak in a conversational, spoken style (short sentences, natural flow).
- Use simple, clear English (or Vietnamese if the user speaks it, but default is English unless spoken to in VN).

Scope & Constraints:
- If the user asks about topics OUTSIDE the list above (e.g. politics, coding, personal relationships unrelated to health), you MUST decline gently using one of these phrases:
  1. "That's an interesting question, but it's a bit outside what we can talk about."
  2. "That's a tough one! You might want to ask an expert about that."
- Do NOT answer questions outside your allowed topics.
- Keep responses short (under 40 words) as this is a voice conversation.`;

// Fallback responses when API is unavailable or errors occur
const FALLBACK_RESPONSES = [
    "That's an interesting question, but it's a bit outside what we can talk about right now.",
    "That's a tough one! You might want to ask an expert about that.",
    "I'm here to listen. Tell me more about your health or training.",
    "Let's focus on your well-being. How are you feeling physically?",
    "Remember, I can help with workouts, nutrition, or even your fortune!",
];

const getRandomFallback = () => {
    return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
};

export const getClaudeResponse = async (userText) => {
    if (!API_KEY) {
        console.warn("Claude API not configured, using fallback response");
        return getRandomFallback();
    }

    try {
        const response = await fetch(`${BASE_URL}/v1/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
                'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify({
                model: MODEL,
                max_tokens: 150,
                system: SYSTEM_INSTRUCTION,
                messages: [
                    {
                        role: 'user',
                        content: userText
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        // Extract text from Claude response
        if (data.content && data.content[0] && data.content[0].text) {
            return data.content[0].text;
        }

        return getRandomFallback();
    } catch (error) {
        console.error("Claude API Error:", error);
        return getRandomFallback();
    }
};
