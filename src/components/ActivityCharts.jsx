
// Simple SVG Chart Components

export const SimpleLineChart = ({ data, color = "#3b82f6", width = 120, height = 40 }) => {
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - (d / Math.max(...data)) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Area fill (optional opacity) */}
            <polygon
                points={`${points} ${width},${height} 0,${height}`}
                fill={color}
                fillOpacity="0.1"
                stroke="none"
            />
        </svg>
    );
};

export const SimpleBarChart = ({ data, color = "#10b981", width = 120, height = 40 }) => {
    const barWidth = (width / data.length) * 0.6;
    const spacing = (width / data.length) * 0.4;
    const maxVal = Math.max(...data);

    return (
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
            {data.map((d, i) => {
                const barHeight = (d / maxVal) * height;
                const x = i * (barWidth + spacing);
                const y = height - barHeight;
                return (
                    <rect
                        key={i}
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        fill={color}
                        rx="2"
                    />
                );
            })}
        </svg>
    );
};

export const DonutChart = ({ value, total, color = "#ef4444", size = 50 }) => {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / total) * circumference;

    return (
        <svg width={size} height={size} viewBox="0 0 50 50" className="transform -rotate-90">
            <circle cx="25" cy="25" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="6" />
            <circle
                cx="25"
                cy="25"
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
            />
        </svg>
    );
};

export const CandleChart = ({ data, width = 120, height = 40, color = "#a855f7" }) => {
    const boxWidth = (width / data.length) * 0.5;
    const spacing = (width / data.length) * 0.5;
    const maxVal = Math.max(...data.map(d => d.high));
    const minVal = Math.min(...data.map(d => d.low)) * 0.8; // some padding

    // Normalize y
    const getY = (val) => height - ((val - minVal) / (maxVal - minVal)) * height;

    return (
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
            {data.map((d, i) => {
                const x = i * (boxWidth + spacing) + spacing / 2;
                const yHigh = getY(d.high);
                const yLow = getY(d.low);
                const yOpen = getY(d.open);
                const yClose = getY(d.close);

                // Wick
                const wickX = x + boxWidth / 2;

                // Body
                const bodyY = Math.min(yOpen, yClose);
                const bodyHeight = Math.abs(yOpen - yClose) || 1; // min 1px

                return (
                    <g key={i}>
                        {/* Wick */}
                        <line x1={wickX} y1={yHigh} x2={wickX} y2={yLow} stroke={color} strokeWidth="1" opacity="0.5" />
                        {/* Body */}
                        <rect
                            x={x}
                            y={bodyY}
                            width={boxWidth}
                            height={bodyHeight}
                            fill={color}
                            rx="1"
                        />
                    </g>
                );
            })}
        </svg>
    );
};
