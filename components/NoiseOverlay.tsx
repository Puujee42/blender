"use client";

export default function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9998] opacity-[0.035]"
      aria-hidden="true"
    >
      <svg className="w-full h-full animate-grain" xmlns="http://www.w3.org/2000/svg">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="200%" height="200%" filter="url(#noise)" />
      </svg>
    </div>
  );
}
