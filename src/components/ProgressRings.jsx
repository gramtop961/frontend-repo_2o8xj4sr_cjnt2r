import { useMemo } from "react";

// Simple progress rings and mini charts without external chart libs
export function Ring({ size = 120, stroke = 10, value = 0, color = "#6366f1", bg = "#e5e7eb", label = "" }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, value));
  const dash = (clamped / 100) * c;
  return (
    <svg width={size} height={size} className="overflow-visible">
      <circle cx={size / 2} cy={size / 2} r={r} stroke={bg} strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={`${dash} ${c - dash}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      {label && (
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="fill-gray-900 dark:fill-gray-100 text-sm">
          {label}
        </text>
      )}
    </svg>
  );
}

export function Sparkline({ data = [], width = 160, height = 60, color = "#22d3ee" }) {
  const path = useMemo(() => {
    if (!data.length) return "";
    const max = Math.max(...data);
    const min = Math.min(...data);
    const norm = (v) => (height - 4) - ((v - min) / (max - min || 1)) * (height - 8);
    const step = (width - 8) / (data.length - 1);
    return data.map((v, i) => `${i === 0 ? "M" : "L"}${4 + i * step},${norm(v)}`).join(" ");
  }, [data, width, height]);

  return (
    <svg width={width} height={height} className="overflow-visible">
      <path d={path} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}
