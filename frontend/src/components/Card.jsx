import React from 'react';
import './Card.css';

const Card = ({ children, className = '', hover = true, onClick, style }) => {
  return (
    <div
      className={`app-card ${hover ? 'app-card-hover' : ''} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;