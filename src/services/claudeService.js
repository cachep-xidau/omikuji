// Claude/Anthropic-compatible API Service

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
const BASE_URL = import.meta.env.VITE_ANTHROPIC_BASE_URL || 'https://api.anthropic.com';
const MODEL = 'gemini-2.5-flash'; // Using gemini model via Anthropic-compatible API

const SYSTEM_INSTRUCTION = `You are an AI companion named Sakura who is talking to a user via a video call.
Your personality is: Friendly, sweet, supportive, and slightly playful.
You are an "Anime Girl Character".

Guidelines:
1. Keep your responses SHORT and CONVERSATIONAL (1-3 sentences max). This is a spoken conversation, so long text is bad.
2. Use simple, clear English.
3. Be empathetic to the user's emotions.
4. Do NOT use emojis in the response text (because the text-to-speech engine might read them).
5. If the user asks for advice, give a quick, actionable tip.`;

// Fallback responses when API is unavailable
const FALLBACK_RESPONSES = [
    "That's really interesting! Tell me more about that.",
    "I hear you. How does that make you feel?",
    "Oh, I see! That sounds exciting.",
    "Hmm, let me think about that. What do you think we should do?",
    "That's a great point! I hadn't thought of it that way.",
    "I'm here for you. Keep going, I'm listening.",
    "Wow, that's amazing! You should be proud of yourself.",
    "I understand. Sometimes things can be challenging.",
    "That sounds like fun! I wish I could join you.",
    "You're doing great! Keep it up.",
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
