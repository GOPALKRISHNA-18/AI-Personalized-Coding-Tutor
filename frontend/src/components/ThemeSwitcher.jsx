import React from 'react';
import { Sun, Moon, Eye } from 'lucide-react';
import './ThemeSwitcher.css';

const themes = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'comfort', label: 'Comfort', icon: Eye }
];

const ThemeSwitcher = ({ currentTheme, onThemeChange }) => {
  const handleSelect = (id) => {
    document.documentElement.className = id;
    document.body.className = id;
    localStorage.setItem('theme', id);
    localStorage.setItem('app_theme', id);
    if (onThemeChange) {
      onThemeChange(id);
    }
  };

  return (
    <div className='theme-switcher' role='group' aria-label='Theme selection'>
      {themes.map((t) => {
        const Icon = t.icon;
        const isActive = currentTheme === t.id;
        return (
          <button
            key={t.id}
            type='button'
            className={`theme-btn ${isActive ? 'active' : ''}`}
            onClick={() => handleSelect(t.id)}
            title={`${t.label} theme`}
            aria-label={`${t.label} theme`}
            aria-pressed={isActive}
          >
            <Icon size={14} className='theme-btn-icon' />
            <span className='theme-btn-label'>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ThemeSwitcher;