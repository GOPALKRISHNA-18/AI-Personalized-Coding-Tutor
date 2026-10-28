import React, { useState, useEffect } from 'react';

const ProgressRing = ({
  progress = 0,
  size = 110,
  strokeWidth = 10,
  color = '#6366f1',
  gradientEnd = '#06b6d4',
  trackColor = '#e2e8f0',
  children,
  className = ''
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(Math.min(100, Math.max(0, progress)));
    }, 80);
    return () => clearTimeout(timer);
  }, [progress]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;
  const gradientId = `ring-grad-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div
      className={`progress-ring-container ${className}`}
      style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}>
        <defs>
          <linearGradient id={gradientId} x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor={color} />
            <stop offset='100%' stopColor={gradientEnd || color} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='transparent'
          stroke={trackColor}
          strokeWidth={strokeWidth}
          opacity='0.25'
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='transparent'
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap='round'
          style={{
            transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ProgressRing;