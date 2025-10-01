import React, { useState } from 'react';
import WeatherIcon from './icons/WeatherIcon';
import WeatherData from './WeatherData/WeatherData';
import './WeatherForecast.css';

const WeatherForecast = ({ day, img, imgAlt, conditions, time, temp, low, high, humidity, wind, uv, snowParticles }) => {
  // State to manage whether the detail view (expanded view) is visible
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const cond = conditions.toLowerCase().trim();
  const mods = [`weather--${cond.replace(/\s+/g, '-')}`]; // Use hyphens for multi-word conditions
  // Add explicit condition-based classes for more granular styling
  if (cond.includes('sunny')) mods.push('weather--sunny');
  if (cond.includes('clear')) mods.push('weather--clear');
  if (cond.includes('storm')) mods.push('weather--stormy');
  if (cond.includes('overcast')) mods.push('weather--overcast');
  if (cond.includes('cloud')) mods.push('weather--cloudy');

  // Add class for expanded state
  if (isExpanded) {
    mods.push('weather--expanded');
  }

  return (
    <div 
      className={`weather transition-all duration-300 ${mods.join(' ')}`}
      style={{ position: 'relative' }}
    >
      {/* Render snow particles if provided (for Tuesday) */}
      {snowParticles && (
        <div className="snow-particles-absolute">{snowParticles}</div>
      )}
      <WeatherData 
        day={day} 
        conditions={conditions} 
        time={time} 
        temp={temp}
        low={low}
        high={high}
        humidity={humidity}
        wind={wind}
        uv={uv}
        isExpanded={isExpanded} // Pass state down to control detail rendering
      />
      {/* Weather Icon is only visible in the collapsed state */}
      {!isExpanded && <WeatherIcon img={img} imgAlt={imgAlt}/>}

      {/* Expand/Collapse Indicator: Chevron arrow that rotates when expanded */}
      <div 
        className={`expand-indicator transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
        onClick={e => { e.stopPropagation(); toggleExpand(); }}
        style={{ cursor: 'pointer' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down text-cyan-300 mx-auto mt-2 drop-shadow-lg">
            <path d="m6 9 6 6 6-6"/>
        </svg>
      </div>
    </div>
  );
}

export default WeatherForecast;
