import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Contact.css';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com',
    icon: (
      <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
        <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' />
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: (
      <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
        <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
      </svg>
    )
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com',
    icon: (
      <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
        <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
      </svg>
    )
  },
  {
    name: 'X',
    url: 'https://x.com',
    icon: (
      <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
        <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
      </svg>
    )
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com',
    icon: (
      <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
        <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
      </svg>
    )
  }
];

const Contact = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.title = 'Contact Us - AI Personalized Coding Tutor';
    window.scrollTo(0, 0);
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const validateField = (name, value) => {
    if (name === 'name') {
      if (!value.trim()) return 'Name is required';
    }
    if (name === 'email') {
      if (!value.trim()) return 'Email is required';
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value.trim())) return 'Please enter a valid email address';
    }
    if (name === 'subject') {
      if (!value.trim()) return 'Subject is required';
    }
    if (name === 'message') {
      if (!value.trim()) return 'Message is required';
      if (value.trim().length < 10) return 'Message must be at least 10 characters';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
    if (success) setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameErr = validateField('name', form.name);
    const emailErr = validateField('email', form.email);
    const subjectErr = validateField('subject', form.subject);
    const messageErr = validateField('message', form.message);
    if (nameErr || emailErr || subjectErr || messageErr) {
      setErrors({
        name: nameErr,
        email: emailErr,
        subject: subjectErr,
        message: messageErr
      });
      return;
    }
    setSuccess(true);
    setForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setErrors({});
  };

  return (
    <div className={`contact-page ${theme}`}>
      <Header theme={theme} onThemeChange={handleThemeChange} />
      <main className='contact-main'>
        <div className='container contact-container'>
          <div className='contact-header'>
            <h1 className='contact-title'>Contact Us</h1>
            <p className='contact-subtitle'>
              Have questions, feedback, or need account assistance? We are here to help.
            </p>
          </div>
          <div className='contact-grid'>
            <section className='contact-form-col'>
              <form onSubmit={handleSubmit} className='contact-form' noValidate>
                {success && (
                  <div className='contact-success-msg'>
                    Your message has been sent
                  </div>
                )}
                <div className='form-group'>
                  <label htmlFor='name' className='input-label'>Name</label>
                  <input
                    id='name'
                    type='text'
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                    placeholder='Your full name'
                    className={`input-box ${errors.name ? 'input-has-error' : ''}`}
                  />
                  {errors.name && <span className='error-text'>{errors.name}</span>}
                </div>
                <div className='form-group'>
                  <label htmlFor='email' className='input-label'>Email</label>
                  <input
                    id='email'
                    type='email'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                    placeholder='name@example.com'
                    className={`input-box ${errors.email ? 'input-has-error' : ''}`}
                  />
                  {errors.email && <span className='error-text'>{errors.email}</span>}
                </div>
                <div className='form-group'>
                  <label htmlFor='subject' className='input-label'>Subject</label>
                  <input
                    id='subject'
                    type='text'
                    name='subject'
                    value={form.subject}
                    onChange={handleChange}
                    placeholder='Topic of your inquiry'
                    className={`input-box ${errors.subject ? 'input-has-error' : ''}`}
                  />
                  {errors.subject && <span className='error-text'>{errors.subject}</span>}
                </div>
                <div className='form-group'>
                  <label htmlFor='message' className='input-label'>Message</label>
                  <textarea
                    id='message'
                    name='message'
                    rows='5'
                    value={form.message}
                    onChange={handleChange}
                    placeholder='How can we assist you?'
                    className={`input-box textarea-box ${errors.message ? 'input-has-error' : ''}`}
                  ></textarea>
                  {errors.message && <span className='error-text'>{errors.message}</span>}
                </div>
                <button type='submit' className='btn btn-primary submit-btn'>
                  Send Message
                </button>
              </form>
            </section>
            <aside className='contact-info-col'>
              <div className='contact-info-card'>
                <h2 className='info-title'>Reach us</h2>
                <p className='info-text'>
                  Connect with us on our official channels. We usually reply within 2 working days.
                </p>
                <div className='contact-social-row'>
                  {socialLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='contact-social-btn'
                      aria-label={item.name}
                      title={item.name}
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer theme={theme} />
    </div>
  );
};

export default Contact;