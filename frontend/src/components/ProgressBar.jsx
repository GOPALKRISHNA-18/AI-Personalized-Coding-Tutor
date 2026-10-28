import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({
  percent = 0,
  height = 8,
  color,
  label,
  showValue = false,
  className = ''
}) => {
  const safePercent = Math.min(100, Math.max(0, percent));
  return (
    <div className={`app-progress-wrap ${className}`}>
      {(label || showValue) && (
        <div className='app-progress-header'>
          {label && <span className='app-progress-label'>{label}</span>}
          {showValue && <span className='app-progress-value'>{safePercent}%</span>}
        </div>
      )}
      <div className='app-progress-track' style={{ height: `${height}px` }}>
        <div
          className='app-progress-fill'
          style={{
            width: `${safePercent}%`,
            background: color || 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;