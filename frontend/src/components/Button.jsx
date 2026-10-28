import React from 'react';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  icon: Icon,
  style
}) => {
  return (
    <button
      type={type}
      className={`app-btn app-btn-${variant} app-btn-${size} ${className}`}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} className='app-btn-icon' />}
      {children}
    </button>
  );
};

export default Button;