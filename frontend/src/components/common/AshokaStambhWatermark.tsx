import React from 'react';

interface AshokaStambhWatermarkProps {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  strokeWidth?: number;
}

/**
 * Ashoka-Stambh-Inspired Geometric Architectural Watermark:
 *
 * An original, non-official mathematical illustration inspired by the classical symmetry,
 * fluted monolithic shaft, inverted bell-lotus capital, abacus drum, and crowning finial
 * of ancient Indian stone pillars (Stambhas).
 *
 * IMPORTANT LEGAL NOTICE:
 * This vector artwork is an original architectural interpretation and strictly DOES NOT
 * reproduce the official State Emblem of India, its lion capital, or any protected government seal.
 * Designed exclusively as an original non-official architectural decorative motif for NashaPrahari.
 */
export const AshokaStambhWatermark: React.FC<AshokaStambhWatermarkProps> = ({
  className,
  style,
  color = 'currentColor',
  strokeWidth = 1.6,
}) => {
  const cx = 250;

  return (
    <svg
      viewBox="0 0 500 860"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Subtle radial shading for architectural depth */}
        <linearGradient id="stambh-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.08" />
          <stop offset="50%" stopColor={color} stopOpacity="0.02" />
          <stop offset="100%" stopColor={color} stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* ====================================================================
          1. TOP CREST & FINIAL CHAKRA (y: 30 - 110)
          ==================================================================== */}
      {/* Crowning decorative Dharma Wheel (16 radial spokes, purely geometric) */}
      <circle cx={cx} cy="68" r="34" strokeWidth="2.2" />
      <circle cx={cx} cy="68" r="28" strokeWidth="1" strokeDasharray="2 3" />
      <circle cx={cx} cy="68" r="9" strokeWidth="1.8" fill={color} fillOpacity="0.15" />
      <circle cx={cx} cy="68" r="3.5" fill={color} />

      {/* Radial spokes at 22.5 deg intervals */}
      {Array.from({ length: 16 }, (_, i) => {
        const rad = (i * 22.5 * Math.PI) / 180;
        const x1 = cx + 9 * Math.cos(rad);
        const y1 = 68 + 9 * Math.sin(rad);
        const x2 = cx + 28 * Math.cos(rad);
        const y2 = 68 + 28 * Math.sin(rad);
        return (
          <line
            key={`finial-spoke-${i}`}
            x1={x1.toFixed(1)}
            y1={y1.toFixed(1)}
            x2={x2.toFixed(1)}
            y2={y2.toFixed(1)}
            strokeWidth="1.2"
          />
        );
      })}

      {/* Crest finial support pedestal */}
      <path
        d="M 234 102 C 238 96, 244 94, 250 94 C 256 94, 262 96, 266 102 L 274 112 L 226 112 Z"
        strokeWidth="1.6"
        fill={color}
        fillOpacity="0.05"
      />

      {/* ====================================================================
          2. ABACUS DRUM & FRIEZE (y: 112 - 162)
          ==================================================================== */}
      {/* Upper abacus molding */}
      <rect x="178" y="112" width="144" height="9" rx="3" strokeWidth="1.8" />

      {/* Abacus frieze panel */}
      <rect x="184" y="121" width="132" height="28" rx="2" strokeWidth="1.5" fill="url(#stambh-sheen)" />

      {/* Three geometric decorative rosettes on the abacus */}
      {/* Center rosette */}
      <circle cx={cx} cy="135" r="9" strokeWidth="1.3" />
      <circle cx={cx} cy="135" r="3" fill={color} />
      <line x1={cx - 8} y1="135" x2={cx + 8} y2="135" strokeWidth="0.8" />
      <line x1={cx} y1="127" x2={cx} y2="143" strokeWidth="0.8" />

      {/* Left rosette */}
      <circle cx="206" cy="135" r="7.5" strokeWidth="1.2" />
      <circle cx="206" cy="135" r="2.5" fill={color} />
      <line x1="199" y1="135" x2="213" y2="135" strokeWidth="0.8" />
      <line x1="206" y1="128" x2="206" y2="142" strokeWidth="0.8" />

      {/* Right rosette */}
      <circle cx="294" cy="135" r="7.5" strokeWidth="1.2" />
      <circle cx="294" cy="135" r="2.5" fill={color} />
      <line x1="287" y1="135" x2="301" y2="135" strokeWidth="0.8" />
      <line x1="294" cy="128" x2="294" y2="142" strokeWidth="0.8" />

      {/* Lower bead molding on abacus */}
      <line x1="182" y1="149" x2="318" y2="149" strokeWidth="1.2" />
      <rect x="180" y="152" width="140" height="7" rx="2" strokeWidth="1.4" />

      {/* ====================================================================
          3. INVERTED BELL LOTUS CAPITAL (y: 159 - 238)
          ==================================================================== */}
      {/* Classical bell outline with graceful flaring curves */}
      <path
        d="M 194 159 
           C 188 185, 178 212, 206 238 
           L 294 238 
           C 322 212, 312 185, 306 159 
           Z"
        strokeWidth="2"
        fill="url(#stambh-sheen)"
      />

      {/* Inverted lotus petal fluting ribs */}
      <path d="M 250 159 L 250 238" strokeWidth="1.4" />
      <path d="M 232 161 C 228 184, 222 208, 235 238" strokeWidth="1.2" />
      <path d="M 268 161 C 272 184, 278 208, 265 238" strokeWidth="1.2" />
      <path d="M 215 163 C 210 185, 204 209, 218 238" strokeWidth="1" />
      <path d="M 285 163 C 290 185, 296 209, 282 238" strokeWidth="1" />

      {/* Lower scalloped lotus petal tips */}
      <path
        d="M 206 238 
           Q 213 243, 220 238 
           Q 227 243, 235 238 
           Q 242 243, 250 238 
           Q 258 243, 265 238 
           Q 273 243, 280 238 
           Q 287 243, 294 238"
        strokeWidth="1.5"
      />

      {/* ====================================================================
          4. NECKING & CABLE ASTRAGAL (y: 242 - 262)
          ==================================================================== */}
      <rect x="204" y="244" width="92" height="12" rx="3" strokeWidth="1.6" />
      {/* Cable / rope pattern lines */}
      <line x1="210" y1="244" x2="216" y2="256" strokeWidth="0.9" />
      <line x1="222" y1="244" x2="228" y2="256" strokeWidth="0.9" />
      <line x1="234" y1="244" x2="240" y2="256" strokeWidth="0.9" />
      <line x1="246" y1="244" x2="252" y2="256" strokeWidth="0.9" />
      <line x1="258" y1="244" x2="264" y2="256" strokeWidth="0.9" />
      <line x1="270" y1="244" x2="276" y2="256" strokeWidth="0.9" />
      <line x1="282" y1="244" x2="288" y2="256" strokeWidth="0.9" />

      {/* Transitional collar */}
      <rect x="210" y="258" width="80" height="6" rx="2" strokeWidth="1.3" />

      {/* ====================================================================
          5. MONOLITHIC FLUTED PILLAR SHAFT (y: 264 - 685)
          ==================================================================== */}
      {/* Tapered shaft: Top width 74 (x: 213 to 287), Bottom width 96 (x: 202 to 298) */}
      <path
        d="M 213 264 L 202 685 L 298 685 L 287 264 Z"
        strokeWidth="2.2"
        fill="url(#stambh-sheen)"
      />

      {/* Symmetrical vertical flutes along the height of the shaft */}
      <line x1={cx} y1="264" x2={cx} y2="685" strokeWidth="1.5" />
      <line x1="232" y1="264" x2="226" y2="685" strokeWidth="1.2" />
      <line x1="268" y1="264" x2="274" y2="685" strokeWidth="1.2" />
      <line x1="222" y1="264" x2="214" y2="685" strokeWidth="1" />
      <line x1="278" y1="264" x2="286" y2="685" strokeWidth="1" />

      {/* Intermediate decorative ring bands on the shaft */}
      {/* Upper ring band (y: 395 - 402) */}
      <rect x="209" y="396" width="82" height="7" rx="2" strokeWidth="1.2" />
      {/* Lower ring band (y: 535 - 542) */}
      <rect x="205" y="536" width="90" height="7" rx="2" strokeWidth="1.2" />

      {/* ====================================================================
          6. BASE LOTUS TORUS & MOLDINGS (y: 685 - 745)
          ==================================================================== */}
      {/* Upper base molding */}
      <rect x="194" y="685" width="112" height="12" rx="3" strokeWidth="1.8" />

      {/* Main base torus with stylized lotus petals */}
      <path
        d="M 184 703 
           C 180 697, 185 697, 194 697 
           L 306 697 
           C 315 697, 320 697, 316 703 
           C 324 716, 318 726, 308 726 
           L 192 726 
           C 182 726, 176 716, 184 703 Z"
        strokeWidth="1.8"
        fill="url(#stambh-sheen)"
      />

      {/* Base petal ribs */}
      <path d="M 210 697 Q 216 712, 222 726" strokeWidth="1" />
      <path d="M 235 697 Q 238 712, 240 726" strokeWidth="1" />
      <path d="M 250 697 L 250 726" strokeWidth="1.3" />
      <path d="M 265 697 Q 262 712, 260 726" strokeWidth="1" />
      <path d="M 290 697 Q 284 712, 278 726" strokeWidth="1" />

      {/* Scotia molding under torus */}
      <rect x="176" y="726" width="148" height="10" rx="3" strokeWidth="1.5" />

      {/* ====================================================================
          7. STEPPED PLINTH PLATFORM (y: 736 - 840)
          ==================================================================== */}
      {/* Tier 1 */}
      <rect x="156" y="738" width="188" height="18" rx="3" strokeWidth="1.8" />
      <line x1="162" y1="747" x2="338" y2="747" strokeWidth="0.8" strokeDasharray="3 3" />

      {/* Tier 2 */}
      <rect x="132" y="758" width="236" height="22" rx="4" strokeWidth="2" />
      <line x1="140" y1="769" x2="360" y2="769" strokeWidth="0.8" />

      {/* Bottom broad foundation pedestal */}
      <rect x="104" y="782" width="292" height="28" rx="5" strokeWidth="2.4" />
      {/* Classical stepped foot molding */}
      <line x1="112" y1="796" x2="388" y2="796" strokeWidth="1" />
      <rect x="88" y="812" width="324" height="16" rx="4" strokeWidth="2" />
    </svg>
  );
};
