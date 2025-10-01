// src/App.jsx
// Main React app for the weather dashboard
import React from "react";
import WeatherForecast from "./components/WeatherForecast/WeatherForecast";
import "./components/WeatherForecast/WeatherData/WeatherData.css";
import Flame from "./components/WeatherForecast/effects/Flame";
import SnowParticles from "./components/WeatherForecast/effects/SnowParticles";
import "./App.css";
import "./components/WeatherForecast/cursor/cursor.css"; // Custom cursor styles
import DualRingCursor from "./components/WeatherForecast/cursor/DualRingCursor"; // Custom animated cursor

import SkyBackground from "./components/SkyBackground";
import CursorFX from "./components/WeatherForecast/cursor/CursorFX";

// Weather forecast data for each card. Each object represents a day's forecast.
// The `condition` is used for CSS themes, while `label` is shown to users.
// This is an ARRAY of OBJECTS - each object has properties like day, img, condition, etc.
const weatherForecasts = [
  {
    // FIRST OBJECT in the array (index 0)
    day: "Mon",        // When we loop, f.day will be "Mon"
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-components-lab/assets/day.svg",
    imgAlt: "sun icon",
    condition: "sunny",      // token for styling - f.condition will be "sunny"
    label: "Sunny",          // shown to users - f.label will be "Sunny"
    time: "Morning",         // f.time will be "Morning"
    temp: 800,               // f.temp will be 28
    low: 18,                // f.low will be 18
    high: 9000,               // f.high will be 30
    humidity: 0,           // f.humidity will be 45
    wind: 15,               // f.wind will be 15
    uv: 8,                  // f.uv will be 8
  },
  {
    // SECOND OBJECT in the array (index 1)
    day: "Tue",             // When we loop, f.day will be "Tue"
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-components-lab/assets/night.svg",
    imgAlt: "moon icon",
    condition: "clear",     // f.condition will be "clear"
    label: "super duper brick",   // f.label will be "super duper brick"
    time: "Night",          // f.time will be "Night"
    temp: -200,              // f.temp will be -200
    low: 14,
    high: 25,
    humidity: 70,
    wind: 5,
    uv: 0,
  },
  {
    // THIRD OBJECT in the array (index 2)
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
    // FOURTH OBJECT in the array (index 3)
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
    // FIFTH OBJECT in the array (index 4)
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


// Main App component - This is the TOP-LEVEL PARENT component
// Everything else is a CHILD of this component
export default function App() {
  return (
    <>
      {/* React Fragment <> </> - lets us return multiple elements without extra div */}
      
      {/* CHILD COMPONENT 1: Modular sky background (sun and moon) */}
      {/* This component gets NO PROPS - it's independent */}
      <SkyBackground />
      
      {/* CHILD COMPONENT 2: Custom animated cursor (dual ring, particles, etc) */}
      {/* This component gets NO PROPS - it manages its own state */}
      <DualRingCursor />
      
      {/* CHILD COMPONENT 3: Modular FX overlay for cursor/mist/ripple particles */}
      {/* This component gets NO PROPS - it handles mouse events independently */}
      <CursorFX />
      
      {/* Main container div with CSS class for styling */}
      <div className="weather-app-frame">
        
        {/* Glass hero section at the top - this is regular JSX, not a component */}
        <header className="glass-hero-container">
          <h1 className="glass-hero-heading">
            <span className="glass-hero-main">LOCAL WEATHER</span>
            <span className="glass-hero-sub">A Glimpse Into the Skies Above</span>
          </h1>
        </header>

        {/* Main degree marker for today, above all cards, no container */}
        {(() => {
          const todayIdx = new Date().getDay() - 1; // 0=Sun, 1=Mon, ...
          const marker = weatherForecasts[todayIdx >= 0 ? todayIdx : 0];
          if (!marker) return null;
          return (
            <div className="main-degree-marker-container">
              <div className="main-degree-label">Today</div>
              <div style={{ height: '2.5em' }} />
              <span className="main-degree-marker">{marker.day}</span>
              <span className="main-degree-temp">{marker.temp}°C</span>
            </div>
          );
        })()}
        {/* Row of weather forecast cards */}
        <section className="weather-cards-row" style={{ position: 'relative' }}>
          {/* Render flame above Monday card, icicle above Tuesday card */}
          <div className="monday-flame">
            {weatherForecasts[0]?.day === 'Mon' && <Flame />}
          </div>
          <div className="tuesday-icicle">
            {/* No snowflake above Tuesday, snow particles will be rendered inside the card */}
          </div>
          {weatherForecasts.map((f, i) => (
            <WeatherForecast
              key={`${f.day}-${i}`}
              day={f.day}
              img={f.img}
              imgAlt={f.imgAlt}
              conditions={f.label}
              time={f.time}
              temp={f.temp}
              low={f.low}
              high={f.high}
              humidity={f.humidity}
              wind={f.wind}
              uv={f.uv}
              _conditionToken={f.condition}
              snowParticles={f.day === 'Tue' ? <SnowParticles /> : null}
            />
          ))}
        </section>
      </div>
    </>
  );
}