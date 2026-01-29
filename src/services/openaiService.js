const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const generateSpeech = async (text) => {
    if (!API_KEY) {
        throw new Error("OpenAI API Key is missing");
    }

    try {
        const response = await fetch("https://api.openai.com/v1/audio/speech", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "tts-1",
                input: text,
                voice: "nova", // Options: alloy, echo, fable, onyx, nova, shimmer
                response_format: "mp3",
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || "Failed to generate speech");
        }

        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error("OpenAI TTS Error:", error);
        throw error;
    }
};
