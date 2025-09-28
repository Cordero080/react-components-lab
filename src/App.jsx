// src/App.jsx
// Main React app for the weather dashboard
import React, { useEffect, useRef } from "react";
import WeatherForecast from "./components/WeatherForecast/WeatherForecast";
import "./App.css";
import "./components/WeatherForecast/cursor.css"; // Custom cursor styles
import DualRingCursor from "./components/WeatherForecast/DualRingCursor"; // Custom animated cursor

// Weather forecast data for each card. Each object represents a day's forecast.
// The `condition` is used for CSS themes, while `label` is shown to users.
const weatherForecasts = [
  {
    day: "Mon",
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-components-lab/assets/day.svg",
    imgAlt: "sun icon",
    condition: "sunny",      // token for styling
    label: "Sunny",          // shown to users
    time: "Morning",
    temp: 28,
    low: 18,
    high: 30,
    humidity: 45,
    wind: 15,
    uv: 8,
  },
  {
    day: "Tue",
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-components-lab/assets/night.svg",
    imgAlt: "moon icon",
    condition: "clear",
    label: "Clear Night",
    time: "Night",
    temp: 16,
    low: 14,
    high: 25,
    humidity: 70,
    wind: 5,
    uv: 0,
  },
  {
    day: "Wed",
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-components-lab/assets/stormy.svg",
    imgAlt: "clouds with lightning icon",
    condition: "stormy",
    label: "Stormy",
    time: "All Day",
    temp: 22,
    low: 19,
    high: 23,
    humidity: 95,
    wind: 35,
    uv: 1,
  },
  {
    day: "Thu",
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-components-lab/assets/cloudy-day.svg",
    imgAlt: "sun overcast by clouds icon",
    condition: "overcast",
    label: "Overcast",
    time: "Evening",
    temp: 20,
    low: 17,
    high: 21,
    humidity: 88,
    wind: 20,
    uv: 3,
  },
  {
    day: "Fri",
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-components-lab/assets/cloudy-night.svg",
    imgAlt: "moon overcast by clouds icon",
    condition: "cloudy",
    label: "Cloudy",
    time: "Night",
    temp: 18,
    low: 15,
    high: 22,
    humidity: 80,
    wind: 10,
    uv: 0,
  },
];


// Main App component
export default function App() {
  // Ref for the FX overlay layer (for cursor/mist/ripple effects)
  const fxRef = useRef(null);

  // Set up event listeners for custom cursor/mist/ripple particle effects
  useEffect(() => {
    const fxLayer = fxRef.current;
    if (!fxLayer) return;

    let last = 0; // Last time a particle was spawned
    const maxParticles = 40; // Max number of particles on screen

    // Spawn a particle of class `cls` at (x, y)
    const spawn = (cls, x, y) => {
      const el = document.createElement("div");
      el.className = cls;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      fxLayer.appendChild(el);
      // Remove particle after animation
      el.addEventListener("animationend", () => el.remove());
      // Limit number of particles
      while (fxLayer.childNodes.length > maxParticles) {
        fxLayer.removeChild(fxLayer.firstChild);
      }
    };

    // On pointer move, spawn a droplet or mist particle at the cursor
    const onMove = (e) => {
      const now = performance.now();
      if (now - last < 60) return; // Throttle particle spawn rate
      last = now;
      spawn(Math.random() < 0.35 ? "fx-drop" : "fx-mist", e.clientX, e.clientY);
    };

    // On pointer down (click), spawn a ripple effect
    const onClick = (e) => {
      spawn("fx-ripple", e.clientX, e.clientY);
    };

    // Register event listeners
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onClick, { passive: true });
    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onClick);
    };
  }, []);

  // Render the app
  return (
    <>
      {/* Sky background overlays behind all content (sun and moon orbiting) */}
      <div className="sky-bg">
        {/* Animated sun and moon, styled and animated in CSS to orbit */}
        <div className="sky-sun" />
        <div className="sky-moon" />
      </div>
      {/* Custom animated cursor (dual ring, particles, etc) */}
      <DualRingCursor />
      <div className="weather-app-frame">
        {/* Glass hero section at the top */}
        <header className="glass-hero-container">
          <h1 className="glass-hero-heading">
            <span className="glass-hero-main">LOCAL WEATHER</span>
            <span className="glass-hero-sub">A Glimpse Into the Skies Above</span>
          </h1>
        </header>

        {/* Row of weather forecast cards */}
        <section className="weather-cards-row">
          {weatherForecasts.map((f, i) => (
            <WeatherForecast
              key={`${f.day}-${i}`}
              day={f.day}
              img={f.img}
              imgAlt={f.imgAlt}
              // Pass the readable label to your component so it prints nicely
              conditions={f.label}
              time={f.time}
              // Pass all weather metrics to the card
              temp={f.temp}
              low={f.low}
              high={f.high}
              humidity={f.humidity}
              wind={f.wind}
              uv={f.uv}
              // Pass the condition token for per-card styling
              _conditionToken={f.condition}
            />
          ))}
        </section>

        {/* FX overlay for cursor/mist/ripple particles (absolutely positioned) */}
        <div className="fx-layer" ref={fxRef} aria-hidden="true" />
      </div>
    </>
  );
}
