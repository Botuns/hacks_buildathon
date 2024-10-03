"use client";

import { useState, useEffect } from "react";

export default function GradientTitle() {
  const [gradientOffset, setGradientOffset] = useState(0);

  useEffect(() => {
    const animateGradient = () => {
      setGradientOffset((prevOffset) => (prevOffset + 1) % 360);
    };

    const intervalId = setInterval(animateGradient, 50);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <h1 className="text-sm font-bold text-center max-sm:text-base">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 50"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={`hsl(${gradientOffset}, 100%, 50%)`} />
            <stop
              offset="50%"
              stopColor={`hsl(${(gradientOffset + 60) % 360}, 100%, 50%)`}
            />
            <stop
              offset="100%"
              stopColor={`hsl(${(gradientOffset + 120) % 360}, 100%, 50%)`}
            />
          </linearGradient>
        </defs>
        <text
          x="50%"
          y="50%"
          dy=".35em"
          textAnchor="middle"
          fill="url(#gradient)"
        >
          Where knowledge begins
        </text>
      </svg>
    </h1>
  );
}
