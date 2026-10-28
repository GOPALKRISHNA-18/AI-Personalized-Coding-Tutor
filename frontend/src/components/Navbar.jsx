import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  User,
  Compass,
  TrendingUp,
  LogOut
} from 'lucide-react';
import { getCurrentUser, logout } from '../services/authService';
import { getLearnerProfile } from '../services/learnerProfileService';
import { sampleNotifications } from '../data/activityData';
import ThemeSwitcher from './ThemeSwitcher';
import './Navbar.css';

const routeTitles = {
  '/dashboard': 'Dashboard',
  '/assessment': 'Skill Assessment',
  '/learning-path': 'Learning Path',
  '/exercises': 'Exercises',
  '/editor': 'Code Editor',
  '/code-editor': 'Code Editor',
  '/chat': 'AI Tutor Chat',
  '/ai-tutor': 'AI Tutor Chat',
  '/quizzes': 'Contests & Quizzes',
  '/progress': 'Progress & Stats',
  '/profile': 'My Profile'
};

const Navbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(getCurrentUser());
  const [profile, setProfile] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(sampleNotifications);

  const notifRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    loadUserData();
    const handleProfileUpdate = () => loadUserData();
    window.addEventListener('userProfileUpdated', handleProfileUpdate);
    return () => window.removeEventListener('userProfileUpdated', handleProfileUpdate);
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    document.body.className = theme;
    localStorage.setItem('theme', theme);
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadUserData = async () => {
    const u = getCurrentUser();
    setUser(u);
    if (u && u.id) {
      try {
        const p = await getLearnerProfile(u.id);
        setProfile(p);
      } catch (e) {}
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/exercises?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const markAllNotifsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const currentTitle = routeTitles[location.pathname] || 'LeetCode AI Tutor';
  const displayName = user && user.name ? user.name : 'Gopal Krishna';
  const displayRole = user && user.role ? user.role : 'Student';
  const avatarUrl = user?.photoUrl || localStorage.getItem('user_avatar');
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className='app-navbar'>
      <div className='navbar-left'>
        <button
          type='button'
          className='menu-btn'
          onClick={onToggleSidebar}
          aria-label='Toggle sidebar'
          title='Toggle sidebar'
        >
          <Menu size={20} />
        </button>
        <div className='navbar-page-title-wrap'>
          <span className='navbar-badge-sub'>Platform</span>
          <h1 className='navbar-page-title'>{currentTitle}</h1>
        </div>
      </div>
      <div className='navbar-center'>
        <form onSubmit={handleSearchSubmit} className={`navbar-search-form ${isSearchOpen ? 'open' : ''}`}>
          <Search size={16} className='search-icon' />
          <input
            type='text'
            className='navbar-search-input'
            placeholder='Search exercises, concepts, syntax...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
            onBlur={() => setIsSearchOpen(false)}
          />
        </form>
      </div>
      <div className='navbar-right'>
        <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />
        {profile && (
          <div className='navbar-tags'>
            <span className='navbar-badge badge-language'>
              {profile.preferred_language || 'Python'}
            </span>
            <span className='navbar-badge badge-level'>
              {profile.skill_level || 'Intermediate'}
            </span>
          </div>
        )}
        <div className='notif-wrapper' ref={notifRef}>
          <button
            type='button'
            className='icon-action-btn'
            onClick={() => setIsNotifOpen((prev) => !prev)}
            title='Notifications'
            aria-label='Notifications'
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className='notif-badge'>{unreadCount}</span>}
          </button>
          {isNotifOpen && (
            <div className='navbar-dropdown notif-dropdown'>
              <div className='dropdown-header'>
                <div className='dropdown-title-row'>
                  <span className='dropdown-title'>Notifications</span>
                  {unreadCount > 0 && (
                    <button type='button' className='mark-read-btn' onClick={markAllNotifsRead}>
                      Mark all read
                    </button>
                  )}
                </div>
              </div>
              <div className='notif-list'>
                {notifications.map((n) => (
                  <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`}>
                    <div className='notif-dot-col'>
                      <span className={`notif-dot ${!n.read ? 'active' : ''}`} />
                    </div>
                    <div className='notif-body'>
                      <span className='notif-item-title'>{n.title}</span>
                      <p className='notif-item-desc'>{n.desc}</p>
                      <span className='notif-item-time'>{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className='user-menu-wrapper' ref={userMenuRef}>
          <div
            className='navbar-user'
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            role='button'
            tabIndex={0}
          >
            <div className='user-avatar'>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : (
                initials
              )}
            </div>
            <div className='user-details'>
              <span className='user-name'>{displayName}</span>
              <span className='user-role'>{displayRole}</span>
            </div>
            <ChevronDown size={14} className='user-chevron' />
          </div>
          {isUserMenuOpen && (
            <div className='navbar-dropdown user-dropdown'>
              <div className='user-dropdown-header'>
                <div className='user-avatar large'>
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={displayName}
                      style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    initials
                  )}
                </div>
                <div className='user-dropdown-info'>
                  <span className='user-dropdown-name'>{displayName}</span>
                  <span className='user-dropdown-email'>
                    {user?.email || 'gopal.krishna@gmail.com'}
                  </span>
                </div>
              </div>
              <div className='dropdown-divider' />
              <button
                type='button'
                className='dropdown-item'
                onClick={() => {
                  setIsUserMenuOpen(false);
                  navigate('/profile');
                }}
              >
                <User size={16} />
                <span>My Profile</span>
              </button>
              <button
                type='button'
                className='dropdown-item'
                onClick={() => {
                  setIsUserMenuOpen(false);
                  navigate('/learning-path');
                }}
              >
                <Compass size={16} />
                <span>Learning Path</span>
              </button>
              <button
                type='button'
                className='dropdown-item'
                onClick={() => {
                  setIsUserMenuOpen(false);
                  navigate('/progress');
                }}
              >
                <TrendingUp size={16} />
                <span>Performance Stats</span>
              </button>
              <div className='dropdown-divider' />
              <button
                type='button'
                className='dropdown-item danger'
                onClick={() => {
                  setIsUserMenuOpen(false);
                  handleLogout();
                }}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;