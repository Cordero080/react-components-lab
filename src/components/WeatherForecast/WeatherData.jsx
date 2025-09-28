import React from 'react';
// Removed: import './WeatherData.css'; to fix the "Could not resolve" error.
// The custom CSS selectors are now assumed to be in the main app's CSS file.

// Helper component for expanded details display
// Uses Tailwind CSS classes for structure and styling within the expanded view
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
      {/* Primary Info Block: Day of the week - Uses class from external CSS */}
      <h2 className="weather-data-main">{day}</h2>
      
      {/* Main Temperature: Increased size and impact using a custom Tailwind class for emphasis */}
      <p className="text-6xl font-extrabold text-white my-2 tracking-tighter drop-shadow-xl">{temp}°C</p>
      
      {/* Secondary Info - Uses class from external CSS */}
      <p className="weather-data-sub"><span>Conditions:</span> {conditions}</p>
      <p className="weather-data-sub"><span>Time:</span> {time}</p>
      
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
