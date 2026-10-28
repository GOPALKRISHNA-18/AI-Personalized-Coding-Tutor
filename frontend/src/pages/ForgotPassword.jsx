import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitcher from '../components/ThemeSwitcher';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Reset Password - CodeTutor';
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess('If an account exists for this email, password reset instructions have been sent.');
    }, 600);
  };

  return (
    <div className={`forgot-page ${theme}`}>
      <aside className='left-side'>
        <div className='left-top'>
          <div className='brand-badge'>AI</div>
          <span className='brand-text'>CodeTutor</span>
        </div>
        <div className='left-content'>
          <h1 className='left-heading'>Reset your password</h1>
          <p className='left-subtitle'>Learn programming with an AI tutor that adapts to your level.</p>
          <div className='feature-list'>
            <div className='feature-row'>
              <span className='dot'></span>
              <span>Personalized hints</span>
            </div>
            <div className='feature-row'>
              <span className='dot'></span>
              <span>Skill based exercises</span>
            </div>
            <div className='feature-row'>
              <span className='dot'></span>
              <span>Progress tracking</span>
            </div>
          </div>
        </div>
        <div className='left-bottom'>
          <Link to='/' className='home-link'>Back to home</Link>
        </div>
      </aside>
      <main className='right-side'>
        <div className='theme-container'>
          <ThemeSwitcher currentTheme={theme} onThemeChange={handleThemeChange} />
        </div>
        <div className='form-box'>
          <div className='form-header'>
            <h2 className='form-title'>Reset password</h2>
            <p className='form-subtitle'>Enter your email to receive recovery instructions</p>
          </div>
          {success && <div className='success-text'>{success}</div>}
          <form onSubmit={handleSubmit} className='form-body'>
            <div className='field-group'>
              <label htmlFor='email' className='input-label'>Email</label>
              <input
                id='email'
                type='email'
                name='email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                  if (success) setSuccess('');
                }}
                placeholder='name@example.com'
                className='input-box'
              />
              {error && <span className='error-text'>{error}</span>}
            </div>
            <button type='submit' className='login-btn' disabled={loading}>
              {loading ? (
                <>
                  <span className='spinner'></span>
                  <span>Please wait</span>
                </>
              ) : (
                <span>Send reset link</span>
              )}
            </button>
          </form>
          <div className='bottom-text'>
            <span>Remember your password? </span>
            <Link to='/login' className='link-blue'>Login</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;