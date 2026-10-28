import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Privacy.css';

const Privacy = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.title = 'Privacy Policy - AI Personalized Coding Tutor';
    window.scrollTo(0, 0);
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const lastUpdated = new Date().toLocaleString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  const sections = [
    {
      id: 'section-1',
      number: '1',
      title: 'Information we collect',
      content:
        'We collect information that you provide when creating an account and interacting with the platform. This includes your full name, email address, preferred programming language, and learning goals. As you use the tutor, we also record your code submissions, quiz and assessment answers, execution results, and conversation messages exchanged with the AI tutor to calibrate your curriculum.'
    },
    {
      id: 'section-2',
      number: '2',
      title: 'How we use your information',
      content:
        'Your data is used to deliver, personalize, and improve your educational experience. We evaluate your code submissions to identify syntax mistakes and algorithm flaws, generate context-aware hints, calculate topic mastery, and dynamically adapt your learning path. We also use your contact details for essential service notifications and security updates.'
    },
    {
      id: 'section-3',
      number: '3',
      title: 'Google sign in',
      content:
        'If you choose to authenticate using Google Sign-In, we receive your verified full name and primary email address from Google. We do not receive, store, or have access to your Google account password. This authentication process is handled securely via standard OAuth protocols.'
    },
    {
      id: 'section-4',
      number: '4',
      title: 'Password and security',
      content:
        'The security of your personal data is a critical priority. User passwords are encrypted using industry-standard hashing algorithms before being stored in our database. We employ secure communications and access controls to safeguard your credentials and learning data against unauthorized access.'
    },
    {
      id: 'section-5',
      number: '5',
      title: 'Data storage',
      content:
        'Your account details, learning paths, practice code, and progress history are stored securely on our application database servers. We retain this data as long as your account remains active to provide continuous tracking of your coding milestones.'
    },
    {
      id: 'section-6',
      number: '6',
      title: 'Your choices',
      content:
        'You maintain control over your personal information. You can review and update your preferred programming language and learning goals directly in your profile settings. If you wish to delete your account and associated submission history, you can submit a deletion request through our Contact page.'
    },
    {
      id: 'section-7',
      number: '7',
      title: 'Cookies and local storage',
      content:
        'We use browser local storage and session tokens to keep you securely signed in and preserve your active theme selection across sessions. We do not use third-party tracking cookies or advertising pixels to monitor your web activity outside our platform.'
    },
    {
      id: 'section-8',
      number: '8',
      title: 'Changes to this policy',
      content:
        'We may update this Privacy Policy from time to time to reflect operational or legal updates. When changes occur, the updated date at the top of this policy will be revised. We encourage learners to review this document periodically to stay informed about how we protect their privacy.'
    },
    {
      id: 'section-9',
      number: '9',
      title: 'Contact',
      content:
        'If you have questions regarding this Privacy Policy or wish to inquire about your stored personal information, please visit our Contact page to get in touch with our team.'
    }
  ];

  return (
    <div className={`legal-page ${theme}`}>
      <Header theme={theme} onThemeChange={handleThemeChange} />
      <main className='legal-main'>
        <div className='container legal-container'>
          <div className='legal-header'>
            <h1 className='legal-title'>Privacy Policy</h1>
            <p className='legal-updated'>Last updated: {lastUpdated}</p>
          </div>
          <nav className='legal-toc' aria-label='Table of contents'>
            <h2 className='toc-title'>Table of Contents</h2>
            <ol className='toc-list'>
              {sections.map((sec) => (
                <li key={sec.id} className='toc-item'>
                  <a href={`#${sec.id}`} className='toc-link'>
                    {sec.number}. {sec.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <article className='legal-content'>
            {sections.map((sec) => (
              <section key={sec.id} id={sec.id} className='legal-section'>
                <h2 className='legal-section-title'>
                  {sec.number}. {sec.title}
                </h2>
                <p className='legal-section-text'>{sec.content}</p>
                {sec.id === 'section-9' && (
                  <p className='legal-contact-link'>
                    <Link to='/contact' className='inline-link'>Go to Contact Us</Link>
                  </p>
                )}
              </section>
            ))}
          </article>
        </div>
      </main>
      <Footer theme={theme} />
    </div>
  );
};

export default Privacy;