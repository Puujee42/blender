"use client";

interface MarqueeStripProps {
  text: string;
  speed?: number;
  reverse?: boolean;
  className?: string;
  separator?: string;
}

export default function MarqueeStrip({
  text,
  speed = 25,
  reverse = false,
  className = "",
  separator = " • ",
}: MarqueeStripProps) {
  const content = `${text}${separator}`.repeat(10);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className={reverse ? "animate-marquee-reverse" : "animate-marquee"}
        style={{ animationDuration: `${speed}s`, display: "inline-block" }}
      >
        <span className="inline-block">{content}</span>
        <span className="inline-block">{content}</span>
      </div>
    </div>
  );
}
