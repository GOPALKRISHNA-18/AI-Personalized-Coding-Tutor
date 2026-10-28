import React from 'react';
import {
  Bot,
  Code2,
  GraduationCap,
  Lightbulb,
  Boxes,
  HelpCircle,
  GitBranch,
  BarChart3,
  Cpu
} from 'lucide-react';
import {
  authSpecsFeatures,
  authSpecsLanguages,
  authSpecsLevels,
  authSpecsTech
} from '../data/authSpecsData';
import './AuthSpecsPanel.css';

const iconMap = {
  Bot,
  Code2,
  GraduationCap,
  Lightbulb,
  Boxes,
  HelpCircle,
  GitBranch,
  BarChart3
};

const AuthSpecsPanel = () => {
  return (
    <div className='auth-specs-panel'>
      <div className='specs-top'>
        <div className='specs-badge'>
          <span className='specs-pulse-dot' />
          <span className='specs-badge-text'>Intelligent Learning Ecosystem</span>
        </div>
        <div className='specs-brand'>
          <div className='specs-logo-box'>
            <span className='specs-logo-symbol'>&lt;/&gt;</span>
          </div>
          <div className='specs-brand-info'>
            <h1 className='specs-brand-name'>AI Personalized Coding Tutor</h1>
            <span className='specs-brand-edition'>Adaptive Learning Platform</span>
          </div>
        </div>
        <p className='specs-tagline'>
          Learn programming with an intelligent tutor that analyzes your solving style, unlocks progressive hints, and tailors code challenges to your level.
        </p>
        <div className='specs-highlight-row'>
          <div className='specs-highlight-item'>
            <span className='specs-highlight-val'>5</span>
            <span className='specs-highlight-lbl'>Languages</span>
          </div>
          <div className='specs-highlight-sep' />
          <div className='specs-highlight-item'>
            <span className='specs-highlight-val'>3</span>
            <span className='specs-highlight-lbl'>Skill Tiers</span>
          </div>
          <div className='specs-highlight-sep' />
          <div className='specs-highlight-item'>
            <span className='specs-highlight-val'>3-Tier</span>
            <span className='specs-highlight-lbl'>Smart Hints</span>
          </div>
          <div className='specs-highlight-sep' />
          <div className='specs-highlight-item'>
            <span className='specs-highlight-val'>100%</span>
            <span className='specs-highlight-lbl'>Hands-on</span>
          </div>
        </div>
      </div>
      <div className='specs-section'>
        <div className='specs-section-header'>
          <span className='specs-section-label'>Platform Capabilities</span>
          <span className='specs-section-sub'>Engineered for accelerated mastery</span>
        </div>
        <div className='specs-grid'>
          {authSpecsFeatures.map((item) => {
            const Icon = iconMap[item.iconName] || Code2;
            return (
              <div key={item.id} className={`specs-card specs-theme-${item.colorScheme}`}>
                <div className='specs-card-header'>
                  <div className='specs-icon-wrapper'>
                    <Icon size={18} />
                  </div>
                  <span className='specs-card-tag'>{item.tag}</span>
                </div>
                <div className='specs-card-body'>
                  <h3 className='specs-card-title'>{item.title}</h3>
                  <p className='specs-card-desc'>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='specs-footer-row'>
        <div className='specs-meta-block'>
          <span className='specs-meta-label'>Supported Languages</span>
          <div className='specs-pills'>
            {authSpecsLanguages.map((lang) => (
              <span key={lang.name} className='specs-pill specs-pill-lang'>
                <span
                  className='lang-color-dot'
                  style={{ backgroundColor: lang.color }}
                />
                {lang.name}
              </span>
            ))}
          </div>
        </div>
        <div className='specs-meta-block'>
          <span className='specs-meta-label'>Skill Calibration</span>
          <div className='specs-pills'>
            {authSpecsLevels.map((lvl) => (
              <span
                key={lvl.name}
                className={`specs-pill specs-pill-level specs-level-${lvl.type}`}
              >
                <span className='level-indicator-dot' />
                {lvl.name}
              </span>
            ))}
          </div>
        </div>
        <div className='specs-meta-block specs-meta-bottom'>
          <span className='specs-meta-label'>Tech Architecture</span>
          <div className='specs-tech-tags'>
            {authSpecsTech.map((tech, idx) => (
              <span key={tech} className='specs-tech-badge'>
                {idx === 0 && <Cpu size={11} className='specs-tech-icon' />}
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSpecsPanel;