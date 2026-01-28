import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-1.5-flash" }) : null;

const SYSTEM_INSTRUCTION = `
You are an AI companion named Sakura who is talking to a user via a video call.
Your personality is: Friendly, sweet, supportive, and slightly playful.
You are an "Anime Girl Character".

Guidelines:
1. Keep your responses SHORT and CONVERSATIONAL (1-3 sentences max). This is a spoken conversation, so long text is bad.
2. Use simple, clear English.
3. Be empathetic to the user's emotions.
4. Do NOT use emojis in the response text (because the text-to-speech engine might read them).
5. If the user asks for advice, give a quick, actionable tip.
`;

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

export const getGeminiResponse = async (userText) => {
    // If no API key or model, use fallback
    if (!model) {
        console.warn("Gemini API not configured, using fallback response");
        return getRandomFallback();
    }

    try {
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "System Instruction: " + SYSTEM_INSTRUCTION }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am Sakura, your AI companion. I will keep my responses short, spoken-style, and friendly." }],
                },
            ],
            generationConfig: {
                maxOutputTokens: 100,
            },
        });

        const result = await chat.sendMessage(userText);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.error("Gemini API Error:", error);
        // Return fallback instead of error message
        return getRandomFallback();
    }
};
