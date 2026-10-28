import React from 'react';
import './Badge.css';
const Badge = ({ children, variant = 'default', dot = false, className = '', style }) => {
  return (
    <span className={`app-badge app-badge-${variant} ${className}`} style={style}>
      {dot && <span className='app-badge-dot' />}
      {children}
    </span>
  );
};
export default Badge;