export const MICROSEASONS = [
    {
        id: 65,
        name_ja: "芹乃栄",
        name_romaji: "Seri Sunawachi Sakau",
        name_en: "Parsley Flourishes",
        start_date: "01-05",
        end_date: "01-09",
        description: "Parsley grows near the riverbanks.",
        quote: "Fresh greens invoke the resilience of life.",
        health_tip: "Eat seven-herb rice porridge (Nanakusa-gayu) to rest your stomach.",
        color: "#AED581"
    },
    {
        id: 66,
        name_ja: "水泉動",
        name_romaji: "Shimizu Atataka o Fukumu",
        name_en: "Springs Thaw",
        start_date: "01-10",
        end_date: "01-15",
        description: "Frozen springs begin to move again deep underground.",
        quote: "Warmth moves unseen below the surface.",
        health_tip: "Keep your feet warm to assist circulation.",
        color: "#4FC3F7"
    },
    {
        id: 67, // Approximate ID for mid-Jan
        name_ja: "雉始雊",
        name_romaji: "Kiji Hajimete Naku",
        name_en: "Pheasants Start to Call",
        start_date: "01-16",
        end_date: "01-20",
        description: "Male pheasants begin to call for mates, signaling the deepening of winter.",
        quote: "The voice of the pheasant calls the morning sun.",
        health_tip: "The air is driest now. Keep hydrated and protect your throat with warm ginger tea.",
        color: "#78909C" // Blue-grey for winter
    },
    {
        id: 68,
        name_ja: "款冬華",
        name_romaji: "Fuki no Hana Saku",
        name_en: "Butterbur Sprout",
        start_date: "01-21",
        end_date: "01-24",
        description: "Butterbur buds begin to emerge from the frozen ground.",
        quote: "Life stirs beneath the snow.",
        health_tip: "Root vegetables like daikon and burdock warm the body from within.",
        color: "#8D6E63"
    },
    {
        id: 1,
        name_ja: "東風解凍",
        name_romaji: "Kōchi Kōri Tokuru",
        name_en: "East Wind Melts Ice",
        start_date: "02-04",
        end_date: "02-08",
        description: "The east wind begins to melt the ice, signaling the first signs of spring.",
        quote: "Referenced in classical haiku to evoke hope and renewal.",
        health_tip: "As spring approaches, stretch in the morning to awaken your muscles.",
        color: "#F48FB1"
    }
];

export const getCurrentMicroseason = (date = new Date()) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    // Simple check for demo (ignores year boundary for Winter loop for now)
    return MICROSEASONS.find(m => dateString >= m.start_date && dateString <= m.end_date) || MICROSEASONS[0];
};
