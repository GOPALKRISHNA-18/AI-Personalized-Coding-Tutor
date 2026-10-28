import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div className='spinner-wrapper'>
      <div className='spinner' />
      {text && <span className='spinner-text'>{text}</span>}
    </div>
  );
};

export default LoadingSpinner;