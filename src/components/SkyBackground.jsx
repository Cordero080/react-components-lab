// src/components/SkyBackground.jsx
import React from "react";
import "../index.css"; // Uses global CSS for .sky-bg, .sky-sun, .sky-moon

export default function SkyBackground() {
  return (
    <div className="sky-bg">
      <div className="sky-sun" />
      <div className="sky-moon" />
    </div>
  );
}
