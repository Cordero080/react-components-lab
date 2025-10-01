import React from "react";

const SnowParticles = () => (
  <div className="snow-particles">
    {/* Existing snowflakes (leave as is) */}
    {[...Array(64)].map((_, i) => (
      <span key={i} className={`snowflake-particle snowflake-particle-${i}`} />
    ))}
    {/* New smaller, slower, background snowflakes */}
    {[...Array(240)].map((_, i) => (
      <span key={i} className={`snowflake-particle-tiny snowflake-particle-tiny-${i}`} />
    ))}
  </div>
);

export default SnowParticles;
