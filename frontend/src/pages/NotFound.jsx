import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
  return (
    <main className='not-found-page'>
      <div className='card not-found-card'>
        <div className='error-code'>404</div>
        <h2 className='not-found-title'>Page Not Found</h2>
        <p className='not-found-desc'>
          The page or coding resource you are searching for does not exist or has been relocated.
        </p>
        <div className='not-found-actions'>
          <Link to='/dashboard' className='btn btn-primary'>
            <Home size={16} />
            Go to Dashboard
          </Link>
          <Link to='/' className='btn btn-outline'>
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;