import React from "react";
import "../WeatherData/WeatherData.css";

const Flame = () => (
  <div className="flame-svg-wrapper">
    <svg className="flame-svg" width="64" height="80" viewBox="0 0 64 80" fill="none">
      <defs>
        <radialGradient id="flameGlow" cx="32" cy="70" r="92" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fffbe0" stopOpacity="0.7"/>
          <stop offset="30%" stopColor="#ffe066" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#ff9900" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="flameMain" x1="22" y1="44" x2="32" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fffbe0"/>
          <stop offset="0.4" stopColor="#ffe066"/>
          <stop offset="0.7" stopColor="#ff9900"/>
          <stop offset="1" stopColor="#ff3c00"/>
        </linearGradient>
        <linearGradient id="flameTip" x1="32" y1="44" x2="32" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fffbe0"/>
          <stop offset="0.7" stopColor="#ffe066"/>
          <stop offset="1" stopColor="#ff9900"/>
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="70" rx="18" ry="10" fill="url(#flameGlow)" opacity="0.7">
        <animate attributeName="rx" values="16;20;16" dur="1.2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;0.4;0.7" dur="1.2s" repeatCount="indefinite"/>
      </ellipse>
      <path id="mainFlame" d="M32 78c14-10 14-26 7-36-4-7-7-12-7-20 0 8-3 13-7 20-7 10-7 26 7 36z" fill="url(#flameMain)">
        <animate attributeName="d" dur="1.2s" repeatCount="indefinite"
          values="M32 78c14-10 14-26 7-36-4-7-7-12-7-20 0 8-3 13-7 20-7 10-7 26 7 36z;
                  M32 78c16-12 12-28 7-36-4-7-7-12-7-20 0 8-3 13-9 22-9 12-5 26 9 34z;
                  M32 78c14-10 14-26 7-36-4-7-7-12-7-20 0 8-3 13-7 20-7 10-7 26 7 36z" />
      </path>
      <path d="M32 68c8-6 8-14 4-20-2-4-4-7-4-13 0 5-2 9-4 13-4 6-4 14 4 20z" fill="url(#flameTip)" opacity="0.85">
        <animate attributeName="d" dur="1s" repeatCount="indefinite"
          values="M32 68c8-6 8-14 4-20-2-4-4-7-4-13 0 5-2 9-4 13-4 6-4 14 4 20z;
                  M32 68c10-8 6-16 4-20-2-4-4-7-4-13 0 5-2 9-6 15-6 8-2 14 6 18z;
                  M32 68c8-6 8-14 4-20-2-4-4-7-4-13 0 5-2 9-4 13-4 6-4 14 4 20z" />
      </path>
      <path d="M32 60c4-3 4-7 2-10-1-2-2-4-2-7 0 3-1 5-2 7-2 3-2 7 2 10z" fill="#fffbe0" opacity="0.7">
        <animate attributeName="d" dur="0.8s" repeatCount="indefinite"
          values="M32 60c4-3 4-7 2-10-1-2-2-4-2-7 0 3-1 5-2 7-2 3-2 7 2 10z;
                  M32 60c5-4 3-8 2-10-1-2-2-4-2-7 0 3-1 5-3 8-3 4-1 7 3 9z;
                  M32 60c4-3 4-7 2-10-1-2-2-4-2-7 0 3-1 5-2 7-2 3-2 7 2 10z" />
      </path>
    </svg>
  </div>
);

export default Flame;
