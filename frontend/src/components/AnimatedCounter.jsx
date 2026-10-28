import React, { useState, useEffect } from 'react';

const AnimatedCounter = ({ value, duration = 800, className = '' }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(value);
      return;
    }
    const str = String(value ?? '');
    const match = str.match(/^([^0-9]*)([0-9]+(?:,[0-9]+)*(?:\.[0-9]+)?)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }
    const prefix = match[1] || '';
    const rawNumStr = match[2].replace(/,/g, '');
    const suffix = match[3] || '';
    const target = parseFloat(rawNumStr);
    if (isNaN(target)) {
      setDisplayValue(value);
      return;
    }
    const isInt = !rawNumStr.includes('.');
    const hasComma = match[2].includes(',');
    let startTimestamp = null;
    let animationFrame;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = target * easeProgress;
      const formattedCurrent = isInt ? Math.round(current) : current.toFixed(1);
      const withCommas = hasComma ? formattedCurrent.toLocaleString() : formattedCurrent;
      setDisplayValue(`${prefix}${withCommas}${suffix}`);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setDisplayValue(str);
      }
    };
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span className={className}>{displayValue}</span>;
};

export default AnimatedCounter;