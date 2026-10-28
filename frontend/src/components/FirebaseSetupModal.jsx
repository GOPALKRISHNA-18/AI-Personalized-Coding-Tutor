import React from 'react';
import './FirebaseSetupModal.css';

const FirebaseSetupModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='firebase-modal-overlay' onClick={onClose}>
      <div className='firebase-modal-box' onClick={(e) => e.stopPropagation()}>
        <div className='firebase-modal-header'>
          <div className='firebase-modal-badge'>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <path d='M4.5 10.5L8 3.5L12 11.5L8.5 18L4.5 10.5Z' fill='#FFA000' />
              <path d='M12 11.5L8 3.5L14 3.5L17.5 10.5L12 11.5Z' fill='#F57C00' />
              <path d='M8.5 18L12 11.5L17.5 10.5L13.5 18H8.5Z' fill='#FFCA28' />
            </svg>
          </div>
          <div>
            <h3 className='firebase-modal-title'>Firebase Google Login Setup</h3>
            <p className='firebase-modal-subtitle'>
              Firebase credentials are not configured in <code>frontend/.env</code> yet.
            </p>
          </div>
        </div>
        <div className='firebase-modal-body'>
          <p className='firebase-instructions-title'>Quick 3-step setup for live Google OAuth:</p>
          <ol className='firebase-steps'>
            <li>
              Go to <a href='https://console.firebase.google.com/' target='_blank' rel='noreferrer'>Firebase Console</a> and create or select a project.
            </li>
            <li>
              Under <strong>Authentication &gt; Sign-in method</strong>, enable the <strong>Google</strong> provider.
            </li>
            <li>
              Register a Web App, copy your config variables into <code>frontend/.env</code>, and restart Vite dev server:
              <pre className='firebase-code-block'>
{`VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-app
VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef`}
              </pre>
            </li>
          </ol>
        </div>
        <div className='firebase-modal-footer'>
          <button
            type='button'
            className='firebase-close-btn'
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirebaseSetupModal;