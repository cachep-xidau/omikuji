
// Simple SVG Chart Components with Brand Gradient and Solid Color Support

const BrandGradient = ({ id }) => (
    <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F4AA1C" />
            <stop offset="100%" stopColor="#EE3424" />
        </linearGradient>
    </defs>
);

export const SimpleLineChart = ({ data, solidColor, width = 120, height = 40 }) => {
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - (d / Math.max(...data)) * height;
        return `${x},${y}`;
    }).join(' ');

    const gradientId = "line-gradient";
    const fillStyle = solidColor ? solidColor : `url(#${gradientId})`;

    return (
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
            {!solidColor && <BrandGradient id={gradientId} />}
            <polyline
                points={points}
                fill="none"
                stroke={fillStyle}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <polygon
                points={`${points} ${width},${height} 0,${height}`}
                fill={fillStyle}
                fillOpacity="0.15"
                stroke="none"
            />
        </svg>
    );
};

export const SimpleBarChart = ({ data, solidColor, width = 120, height = 40 }) => {
    const barWidth = (width / data.length) * 0.6;
    const spacing = (width / data.length) * 0.4;
    const maxVal = Math.max(...data);
    const gradientId = "bar-gradient";
    const fillStyle = solidColor ? solidColor : `url(#${gradientId})`;

    return (
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
            {!solidColor && <BrandGradient id={gradientId} />}
            {data.map((d, i) => {
                const barHeight = (d / maxVal) * height;
                const x = i * (barWidth + spacing);
                const y = height - barHeight;
                const opacity = 0.5 + (d / maxVal) * 0.5;
                return (
                    <rect
                        key={i}
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        fill={fillStyle}
                        fillOpacity={opacity}
                        rx="2"
                    />
                );
            })}
        </svg>
    );
};

export const DonutChart = ({ value, total, solidColor, size = 50 }) => {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / total) * circumference;
    const gradientId = "donut-gradient";
    const strokeStyle = solidColor ? solidColor : `url(#${gradientId})`;

    return (
        <svg width={size} height={size} viewBox="0 0 50 50" className="transform -rotate-90">
            {!solidColor && <BrandGradient id={gradientId} />}
            <circle cx="25" cy="25" r={radius} fill="none" stroke="#f3f4f6" strokeWidth="6" />
            <circle
                cx="25"
                cy="25"
                r={radius}
                fill="none"
                stroke={strokeStyle}
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
            />
        </svg>
    );
};

export const CandleChart = ({ data, solidColor, width = 120, height = 40 }) => {
    const boxWidth = (width / data.length) * 0.5;
    const spacing = (width / data.length) * 0.5;
    const maxVal = Math.max(...data.map(d => d.high));
    const minVal = Math.min(...data.map(d => d.low)) * 0.8;
    const gradientId = "candle-gradient";
    const fillStyle = solidColor ? solidColor : `url(#${gradientId})`;

    const getY = (val) => height - ((val - minVal) / (maxVal - minVal)) * height;

    return (
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
            {!solidColor && <BrandGradient id={gradientId} />}
            {data.map((d, i) => {
                const x = i * (boxWidth + spacing) + spacing / 2;
                const yHigh = getY(d.high);
                const yLow = getY(d.low);
                const yOpen = getY(d.open);
                const yClose = getY(d.close);
                const wickX = x + boxWidth / 2;
                const bodyY = Math.min(yOpen, yClose);
                const bodyHeight = Math.abs(yOpen - yClose) || 1;
                const opacity = 0.7 + (i % 2 === 0 ? 0.3 : 0);

                return (
                    <g key={i}>
                        <line x1={wickX} y1={yHigh} x2={wickX} y2={yLow} stroke={fillStyle} strokeWidth="1.5" opacity="0.4" />
                        <rect
                            x={x}
                            y={bodyY}
                            width={boxWidth}
                            height={bodyHeight}
                            fill={fillStyle}
                            fillOpacity={opacity}
                            rx="1"
                        />
                    </g>
                );
            })}
        </svg>
    );
};
