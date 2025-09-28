// src/App.jsx
// Main React app for the weather dashboard
import React from "react";
import WeatherForecast from "./components/WeatherForecast/WeatherForecast";
import "./App.css";
import "./components/WeatherForecast/cursor.css"; // Custom cursor styles
import DualRingCursor from "./components/WeatherForecast/DualRingCursor"; // Custom animated cursor

import SkyBackground from "./components/SkyBackground";
import CursorFX from "./components/CursorFX";

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
  return (
    <>
      {/* Modular sky background (sun and moon) */}
      <SkyBackground />
      {/* Custom animated cursor (dual ring, particles, etc) */}
      <DualRingCursor />
      {/* Modular FX overlay for cursor/mist/ripple particles */}
      <CursorFX />
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
      </div>
    </>
  );
}
