import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Award,
  Compass,
  Code2,
  Terminal,
  MessageSquare,
  Trophy,
  TrendingUp,
  User,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { sidebarNavItems } from '../data/menuItems';
import './Sidebar.css';

const iconMap = {
  LayoutDashboard,
  Award,
  Compass,
  Code2,
  Terminal,
  MessageSquare,
  Trophy,
  TrendingUp,
  User
};

const Sidebar = ({ isCollapsed, isMobileOpen, onClose, onToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    if (onClose) onClose();
    navigate('/login');
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
      <div className='sidebar-header'>
        <button
          type='button'
          className='sidebar-toggle-btn'
          onClick={onToggle}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label='Toggle sidebar'
        >
          {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
        <div className='sidebar-logo'>
          AI
        </div>
        <div className='sidebar-brand-text'>
          <span className='sidebar-brand-title'>CodeTutor</span>
          <span className='sidebar-brand-sub'>Personalized AI</span>
        </div>
      </div>
      <nav className='sidebar-nav'>
        {sidebarNavItems.map((item) => {
          const Icon = iconMap[item.iconName] || Code2;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              title={item.label}
              className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
            >
              <span className='menu-item-icon'>
                <Icon size={19} />
              </span>
              <span className='menu-item-label'>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className='sidebar-footer'>
        <button
          type='button'
          onClick={handleLogout}
          title='Logout'
          className='menu-item logout-item'
        >
          <span className='menu-item-icon'>
            <LogOut size={18} />
          </span>
          <span className='menu-item-label'>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;