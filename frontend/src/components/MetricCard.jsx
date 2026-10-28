import React from 'react';
import AnimatedCounter from './AnimatedCounter';
import './MetricCard.css';

const MetricCard = ({ title, value, subtitle, icon, highlight }) => {
  return (
    <div className={`metric-card ${highlight ? 'metric-highlight' : ''}`}>
      <div className='metric-header'>
        <span className='metric-title'>{title}</span>
        {icon && <div className='metric-icon'>{icon}</div>}
      </div>
      <div className='metric-value'>
        <AnimatedCounter value={value} />
      </div>
      {subtitle && <div className='metric-subtitle'>{subtitle}</div>}
    </div>
  );
};

export default MetricCard;