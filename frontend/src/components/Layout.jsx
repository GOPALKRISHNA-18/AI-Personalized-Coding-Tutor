import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import ToastContainer from './Toast';
import './Layout.css';

const Layout = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(() => localStorage.getItem('sidebar') === 'collapsed');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleToggle = () => {
    if (window.innerWidth < 900) {
      setIsMobileOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => {
        const next = !prev;
        localStorage.setItem('sidebar', next ? 'collapsed' : 'expanded');
        return next;
      });
    }
  };

  const handleClose = () => {
    setIsMobileOpen(false);
  };

  return (
    <div className='layout-root'>
      <div className='layout-bg-glow blob-1' aria-hidden='true' />
      <div className='layout-bg-glow blob-2' aria-hidden='true' />
      {isMobileOpen && (
        <div className='layout-overlay' onClick={handleClose} />
      )}
      <Sidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onClose={handleClose}
        onToggle={handleToggle}
      />
      <div className={`layout-main-wrapper ${isCollapsed ? 'wrapper-collapsed' : ''}`}>
        <Navbar onToggleSidebar={handleToggle} />
        <main className='layout-content'>
          <div key={location.pathname} className='layout-page-transition'>
            <Outlet />
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Layout;