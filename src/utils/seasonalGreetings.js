export const getDailySeasonGreeting = () => {
    const now = new Date();
    const month = now.getMonth() + 1; // 1-12
    const day = now.getDate();

    // Simplified 72 Microseasons / Seasonal Logic
    // In a full app, this would be a comprehensive lookup table

    // Spring (Feb - Apr)
    if (month === 2) {
        if (day < 4) return "The cold lingers, but spring currents rise. Warm your spirit.";
        if (day < 19) return "Spring commences. The east wind melts the ice. New beginnings.";
        return "Rain moistens the soil. Life awakens under the soft mist.";
    }
    if (month === 3) {
        if (day < 6) return "Insects awaken from winter sleep. Energy stirs within you.";
        if (day < 21) return "Peach blossoms begin to smile. A season of gentle romance.";
        return "Sparrows build their nests. Build your dreams with care.";
    }
    if (month === 4) {
        if (day < 5) return "Thunder raises its voice. The sky clears for new growth.";
        if (day < 20) return "Wild geese fly north. A time to bid farewell to the old.";
        return "First reeds grow green. Soft breeze, calm heart.";
    }

    // Summer (May - July)
    if (month === 5) {
        if (day < 6) return "Summer begins. Frogs start to sing. Sing your own song.";
        if (day < 21) return "Worms surface. Practical steps lead to progress.";
        return "Bamboo shoots appear. Grow straight and true.";
    }
    if (month === 6) {
        if (day < 6) return "Grain fills the ear. Patience bears sweet fruit.";
        if (day < 21) return "Praying mantises originate. Focus and stillness.";
        return "Plums turn yellow. Rain brings reflection.";
    }
    if (month === 7) {
        if (day < 7) return "Review half the year. Hot winds blow. Keep your cool.";
        if (day < 23) return "Lotus blossoms bloom. Find purity in the mud.";
        return "Young hawks learn to fly. Test your wings today.";
    }

    // Autumn (Aug - Oct)
    if (month === 8) {
        if (day < 8) return "Great heat lingers. Deep breaths cool the mind.";
        if (day < 23) return "Autumn commences. Cool winds blow. Harvest your wisdom.";
        return "Thick fog descends. Mystery surrounds us.";
    }
    if (month === 9) {
        if (day < 8) return "Rice ripens. Gratitude for what sustains us.";
        if (day < 23) return "White dew on grass. Fleetings moments are precious.";
        return "Thunder ceases. Silence brings clarity.";
    }
    if (month === 10) {
        if (day < 8) return "Insects hide underground. Rest and recuperate.";
        if (day < 23) return "Cold dew appears. Protect your warmth.";
        return "Frost descends. Clarity matches the crisp air.";
    }

    // Winter (Nov - Jan)
    if (month === 11) {
        if (day < 7) return "Winter begins. Camellias bloom. Beauty in cold days.";
        if (day < 22) return "Land freezes. Stand firm in your values.";
        return "Rainbows hide. Look inward for color.";
    }
    if (month === 12) {
        if (day < 7) return "North wind blows leaves. Let go of what you don't need.";
        if (day < 22) return "Bears sit in their dens. Embrace solitude.";
        return "Salmon gather to spawn. A time for returning home.";
    }
    if (month === 1) {
        if (day < 6) return "Wheat sprouts under snow. Hope survives broadly.";
        if (day < 20) return "Parsley flourishes. Fresh start to the year.";
        return "Pheasants call. Listen to your inner voice.";
    }

    return "The seasons turn. Embrace today's unique fortune.";
};
