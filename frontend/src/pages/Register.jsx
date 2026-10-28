import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  register,
  loginWithGoogle,
  loginWithGoogleRedirect,
  checkGoogleRedirect,
  isFirebaseConfigured
} from '../services/authService';
import { getItem } from '../utils/storage';
import ThemeSwitcher from '../components/ThemeSwitcher';
import FirebaseSetupModal from '../components/FirebaseSetupModal';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    preferredLanguage: 'Python',
    goal: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showFirebaseModal, setShowFirebaseModal] = useState(false);
  const [popupBlocked, setPopupBlocked] = useState(false);

  useEffect(() => {
    document.title = 'Register - CodeTutor';
    const user = getItem('current_user');
    const token = getItem('auth_token');
    if (user && token) {
      navigate('/dashboard', { replace: true });
      return;
    }
    checkGoogleRedirect()
      .then((redirectUser) => {
        if (redirectUser) {
          navigate('/dashboard');
        }
      })
      .catch((err) => {
        setAuthError(err.message || 'Failed redirect sign-in');
      });
  }, [navigate]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const languages = ['Java', 'Python', 'JavaScript', 'C', 'C++'];

  const validateField = (fieldName, value) => {
    if (fieldName === 'name') {
      if (!value.trim()) return 'Full name is required';
    }
    if (fieldName === 'email') {
      if (!value.trim()) return 'Email is required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) return 'Please enter a valid email address';
    }
    if (fieldName === 'password') {
      if (!value) return 'Password is required';
      if (value.length < 6) return 'Password must be at least 6 characters';
    }
    if (fieldName === 'confirmPassword') {
      if (!value) return 'Please confirm your password';
      if (value !== form.password) return 'Passwords do not match';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (authError) setAuthError('');
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameErr = validateField('name', form.name);
    const emailErr = validateField('email', form.email);
    const passErr = validateField('password', form.password);
    const confirmErr = form.confirmPassword !== form.password
      ? 'Passwords do not match'
      : !form.confirmPassword
      ? 'Please confirm your password'
      : '';
    if (nameErr || emailErr || passErr || confirmErr) {
      setErrors({
        name: nameErr,
        email: emailErr,
        password: passErr,
        confirmPassword: confirmErr
      });
      return;
    }
    if (!agreeTerms) {
      setAuthError('Please accept the terms to continue');
      return;
    }
    setLoading(true);
    setAuthError('');
    try {
      await register(
        {
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password
        },
        {
          preferred_language: form.preferredLanguage,
          skill_level: 'Beginner',
          goal: form.goal.trim()
        }
      );
      navigate('/assessment');
    } catch (err) {
      const serverMsg = err.response && err.response.data && err.response.data.message;
      setAuthError(serverMsg || err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setAuthError('');
    setPopupBlocked(false);
    try {
      await loginWithGoogle(form.email, form.name || 'Gopal Krishna');
      navigate('/assessment');
    } catch (err) {
      setAuthError(err.message || 'Google sign-in failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleRedirectLogin = async () => {
    if (!isFirebaseConfigured()) {
      setShowFirebaseModal(true);
      return;
    }
    setGoogleLoading(true);
    setAuthError('');
    try {
      await loginWithGoogleRedirect();
    } catch (err) {
      setAuthError(err.message || 'Failed to start redirect sign-in');
      setGoogleLoading(false);
    }
  };

  return (
    <div className={`register-page ${theme}`}>
      <aside className='left-side'>
        <div className='left-top'>
          <div className='brand-badge'>AI</div>
          <span className='brand-text'>CodeTutor</span>
        </div>
        <div className='left-content'>
          <h1 className='left-heading'>Create your account</h1>
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
            <h2 className='form-title'>Create account</h2>
            <p className='form-subtitle'>Enter your details to get started</p>
          </div>
          <form onSubmit={handleSubmit} className='form-body'>
            <div className='field-group'>
              <label htmlFor='name' className='input-label'>Full Name</label>
              <input
                id='name'
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder='Enter your full name'
                className='input-box'
              />
              {errors.name && <span className='error-text'>{errors.name}</span>}
            </div>
            <div className='field-group'>
              <label htmlFor='email' className='input-label'>Email</label>
              <input
                id='email'
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                placeholder='name@example.com'
                className='input-box'
              />
              {errors.email && <span className='error-text'>{errors.email}</span>}
            </div>
            <div className='field-group'>
              <label htmlFor='password' className='input-label'>Password</label>
              <div className='password-wrapper'>
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={form.password}
                  onChange={handleChange}
                  placeholder='Create a password'
                  className='input-box'
                />
                <button
                  type='button'
                  className='password-toggle'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <span className='error-text'>{errors.password}</span>}
            </div>
            <div className='field-group'>
              <label htmlFor='confirmPassword' className='input-label'>Confirm Password</label>
              <div className='password-wrapper'>
                <input
                  id='confirmPassword'
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder='Confirm your password'
                  className='input-box'
                />
                <button
                  type='button'
                  className='password-toggle'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.confirmPassword && <span className='error-text'>{errors.confirmPassword}</span>}
            </div>
            <div className='field-group'>
              <label htmlFor='preferredLanguage' className='input-label'>Preferred Language</label>
              <select
                id='preferredLanguage'
                name='preferredLanguage'
                value={form.preferredLanguage}
                onChange={handleChange}
                className='input-box select-box'
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
            <div className='field-group'>
              <label htmlFor='goal' className='input-label'>Goal</label>
              <input
                id='goal'
                type='text'
                name='goal'
                value={form.goal}
                onChange={handleChange}
                placeholder='Enter your learning goal'
                className='input-box'
              />
            </div>
            <div className='field-group'>
              <label className='remember-label'>
                <input
                  type='checkbox'
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    if (authError) setAuthError('');
                  }}
                  className='checkbox-input'
                />
                <span>
                  I agree to the <Link to='/terms' className='legal-link'>Terms</Link> and <Link to='/privacy' className='legal-link'>Privacy Policy</Link>
                </span>
              </label>
            </div>
            {authError && <div className='error-text form-error'>{authError}</div>}
            <button type='submit' className='login-btn' disabled={loading}>
              {loading ? (
                <>
                  <span className='spinner'></span>
                  <span>Please wait</span>
                </>
              ) : (
                <span>Create account</span>
              )}
            </button>
          </form>
          <div className='divider'>
            <span className='divider-line'></span>
            <span className='divider-text'>or</span>
            <span className='divider-line'></span>
          </div>
          <button
            type='button'
            className='google-btn'
            onClick={handleGoogleLogin}
            disabled={loading || googleLoading}
          >
            {googleLoading ? (
              <>
                <span className='spinner'></span>
                <span>Connecting with Google...</span>
              </>
            ) : (
              <>
                <svg width='18' height='18' viewBox='0 0 24 24'>
                  <path fill='#4285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' />
                  <path fill='#34A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' />
                  <path fill='#FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z' />
                  <path fill='#EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z' />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>
          {popupBlocked && (
            <div className='popup-blocked-banner'>
              <div className='popup-blocked-title'>
                <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                  <circle cx='12' cy='12' r='10' />
                  <line x1='12' y1='8' x2='12' y2='12' />
                  <line x1='12' y1='16' x2='12.01' y2='16' />
                </svg>
                <span>Browser blocked the popup</span>
              </div>
              <p className='popup-blocked-desc'>
                Click the pop-up icon in your browser URL bar to allow popups, or continue with page redirect:
              </p>
              <button
                type='button'
                className='redirect-btn'
                onClick={handleRedirectLogin}
                disabled={googleLoading}
              >
                Sign In With Page Redirect &rarr;
              </button>
            </div>
          )}
          <div className='bottom-text'>
            <span>Already have an account? </span>
            <Link to='/login' className='link-blue'>Login</Link>
          </div>
          <div className='legal-text'>
            By continuing you agree to the <Link to='/terms' className='legal-link'>Terms</Link> and <Link to='/privacy' className='legal-link'>Privacy Policy</Link>
          </div>
        </div>
      </main>
      <FirebaseSetupModal
        isOpen={showFirebaseModal}
        onClose={() => setShowFirebaseModal(false)}
      />
    </div>
  );
};

export default Register;