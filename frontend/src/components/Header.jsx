import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { headerNavItems } from '../data/menuItems';
import './Header.css';

const Header = ({ theme, onThemeChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`header ${theme}`}>
      <div className='container header-container'>
        <Link to='/' className='header-left'>
          <div className='logo-box'>AI</div>
          <span className='logo-text'>Coding Tutor</span>
        </Link>
        <nav className='nav-links'>
          {headerNavItems.map((item) => (
            <a key={item.href} href={item.href} className='nav-link'>
              {item.label}
            </a>
          ))}
        </nav>
        <div className='header-right'>
          <ThemeSwitcher currentTheme={theme} onThemeChange={onThemeChange} />
          <Link to='/login' className='btn btn-outline header-btn'>Login</Link>
          <Link to='/register' className='btn btn-primary header-btn'>Get Started</Link>
          <button
            type='button'
            className='menu-btn'
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label='Toggle navigation menu'
          >
            <svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
              <line x1='3' y1='6' x2='21' y2='6' />
              <line x1='3' y1='12' x2='21' y2='12' />
              <line x1='3' y1='18' x2='21' y2='18' />
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className='mobile-nav-panel'>
          {headerNavItems.map((item) => (
            <a key={item.href} href={item.href} className='mobile-nav-link' onClick={handleNavClick}>
              {item.label}
            </a>
          ))}
          <div className='mobile-actions'>
            <Link to='/login' className='btn btn-outline' onClick={handleNavClick}>Login</Link>
            <Link to='/register' className='btn btn-primary' onClick={handleNavClick}>Get Started</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;