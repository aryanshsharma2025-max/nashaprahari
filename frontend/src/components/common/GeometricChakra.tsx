import React from 'react';

interface GeometricChakraProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
}

/**
 * Geometric Chakra / Radial Motif:
 * An original, non-official geometric 24-spoke radial design inspired by classical
 * Indian architectural jaali and solar motifs.
 *
 * IMPORTANT: This is NOT the official State Emblem of India, police insignia, or
 * any protected government seal. It is a purely mathematical geometric vector.
 */
export const GeometricChakra: React.FC<GeometricChakraProps> = ({
  className,
  style,
  size = 320,
  color = 'currentColor',
}) => {
  const cx = 160;
  const cy = 160;

  // 24 geometric spokes at 15-degree increments
  const spokes = Array.from({ length: 24 }, (_, i) => {
    const angle = (i * 15 * Math.PI) / 180;
    const x1 = cx + 32 * Math.cos(angle);
    const y1 = cy + 32 * Math.sin(angle);
    const x2 = cx + 124 * Math.cos(angle);
    const y2 = cy + 124 * Math.sin(angle);
    return (
      <line
        key={`spoke-${i}`}
        x1={x1.toFixed(2)}
        y1={y1.toFixed(2)}
        x2={x2.toFixed(2)}
        y2={y2.toFixed(2)}
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    );
  });

  // 24 perimeter beads between concentric rings
  const beads = Array.from({ length: 24 }, (_, i) => {
    const angle = ((i * 15 + 7.5) * Math.PI) / 180;
    const bx = cx + 142 * Math.cos(angle);
    const by = cy + 142 * Math.sin(angle);
    return (
      <circle
        key={`bead-${i}`}
        cx={bx.toFixed(2)}
        cy={by.toFixed(2)}
        r="2.4"
        fill={color}
      />
    );
  });

  return (
    <svg
      viewBox="0 0 320 320"
      width={size}
      height={size}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* Outer rim */}
      <circle cx={cx} cy={cy} r="150" stroke={color} strokeWidth="2.5" fill="none" />
      {/* Intermediate track */}
      <circle cx={cx} cy={cy} r="135" stroke={color} strokeWidth="1.2" fill="none" />
      {/* Inner spoke boundary */}
      <circle cx={cx} cy={cy} r="124" stroke={color} strokeWidth="1" fill="none" strokeDasharray="3 3" />

      {/* Radial spokes */}
      {spokes}

      {/* Decorative perimeter beads */}
      {beads}

      {/* Center hub */}
      <circle cx={cx} cy={cy} r="32" stroke={color} strokeWidth="2" fill="none" />
      <circle cx={cx} cy={cy} r="22" stroke={color} strokeWidth="1" fill="none" />
      <circle cx={cx} cy={cy} r="10" fill={color} />
    </svg>
  );
};
