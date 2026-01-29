const API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;

export const generateSpeech = async (text) => {
    if (!API_KEY) {
        throw new Error("ElevenLabs API Key is missing");
    }

    const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Voice: Rachel (American, Calm - Free Tier)

    try {
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?optimize_streaming_latency=2`, {
            method: "POST",
            headers: {
                "xi-api-key": API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: text,
                model_id: "eleven_multilingual_v2", // Updated: v1 is deprecated for free tier
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75,
                    style: 0.5,
                }
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail?.message || "Failed to generate speech");
        }

        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error("ElevenLabs TTS Error:", error);
        throw error;
    }
};
