// Modularized conditions info line
function ConditionsInfo({ conditions }) {
  return (
    <p className="weather-data-sub">
      <span>Conditions:</span> {conditions}
    </p>
  );
}

// Modularized time info line
function TimeInfo({ time }) {
  return (
    <p className="weather-data-sub">
      <span>Time:</span> {time}
    </p>
  );
}
import React from 'react';

// Modularized main temperature display
function MainTemperature({ temp }) {
  return (
    <p className="text-6xl font-extrabold text-white my-2 tracking-tighter drop-shadow-xl">
      {temp}°C
    </p>
  );
}

function DayLabel({ day }) {
  return (
    <div className="day-flip-outer">
      <span className="weather-data-main day-flip-text">{day}</span>
    </div>
  );
}

const DetailItem = ({ label, value, unit, color }) => (
    // Uses 'detail-item' class for border/padding and utility classes for layout
    <div className="flex justify-between items-center text-left px-4 detail-item">
        <span className={`detail-label ${color || 'text-cyan-200'}`}>{label}:</span>
        <span className="detail-value drop-shadow-md">{value}{unit}</span>
    </div>
);


const WeatherData = ({ day, conditions, time, temp, low, high, humidity, wind, uv, isExpanded }) => {
  return (
    <div className="w-full text-center">
      {/* Primary Info Block: Day of the week - News ticker style infinite scroll */}
     <DayLabel day={day} />
      
  {/* Main Temperature: Modularized as its own component */}
  <MainTemperature temp={temp} />
      
  {/* Secondary Info - Modularized as their own components */}
  <ConditionsInfo conditions={conditions} />
  <TimeInfo time={time} />
      
      {/* Expanded Details Section - Conditionally rendered based on isExpanded */}
      {isExpanded && (
        // Uses CSS class 'detail-panel' for basic structure, and Tailwind for glass effects
        <div className="w-full bg-black/15 border border-cyan-700/30 rounded-xl shadow-2xl backdrop-blur-md transition-all duration-500 ease-in-out detail-panel">
          {/* Grouped High/Low Temps for better visual context */}
          <DetailItem label="High / Low" value={`${high} / ${low}`} unit="°C" color="text-pink-300" />
          <DetailItem label="Humidity" value={humidity} unit="%" />
          <DetailItem label="Wind Speed" value={wind} unit=" km/h" />
          {/* Apply color coding for UV risk (Moderate UV added) */}
          <DetailItem 
            label="UV Index" 
            value={uv} 
            unit="" 
            color={uv > 7 ? 'text-red-400' : (uv > 3 ? 'text-yellow-300' : 'text-green-300')} 
          />
        </div>
      )}
    </div>
  );
}

export default WeatherData;
