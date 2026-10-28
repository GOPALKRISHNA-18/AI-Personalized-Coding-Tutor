import React, { useState } from 'react';
import { defaultProfile, profileStats, formFields } from '../data/profileData';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('user_profile_data');
    if (saved) {
      try {
        return { ...defaultProfile, ...JSON.parse(saved) };
      } catch (err) {
        return defaultProfile;
      }
    }
    return defaultProfile;
  });

  const [formData, setFormData] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const getInitials = (nameStr) => {
    if (!nameStr) return 'GK';
    const parts = nameStr.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setSuccessMessage('');
  };

  const handleCancel = () => {
    setFormData(profile);
    setErrors({});
    setIsEditing(false);
  };

  const handleChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setProfile(formData);
    localStorage.setItem('user_profile_data', JSON.stringify(formData));
    const currentUser = localStorage.getItem('current_user');
    if (currentUser) {
      try {
        const parsed = JSON.parse(currentUser);
        localStorage.setItem('current_user', JSON.stringify({ ...parsed, name: formData.name, email: formData.email }));
      } catch (err) {}
    }
    window.dispatchEvent(new Event('userProfileUpdated'));
    setIsEditing(false);
    setErrors({});
    setSuccessMessage('Profile saved successfully');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <section className="profile-card profile-card-left">
          <div className="profile-summary-header">
            <div className="profile-avatar">
              <span>{getInitials(profile.name)}</span>
            </div>
            <h2 className="profile-name">{profile.name}</h2>
            <p className="profile-email">{profile.email}</p>
            <span className="profile-badge">{profile.skillLevel}</span>
          </div>
          <div className="profile-stats-row">
            {profileStats.map((stat) => (
              <div key={stat.label} className="profile-stat-box">
                <span className="profile-stat-value">{stat.value}</span>
                <span className="profile-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="profile-left-actions">
            <button
              type="button"
              className="profile-btn profile-btn-primary"
              onClick={handleEditClick}
              disabled={isEditing}
            >
              Edit Profile
            </button>
          </div>
        </section>
        <section className="profile-card profile-card-right">
          <div className="profile-card-header">
            <h2 className="profile-heading">Personal Details</h2>
          </div>
          {successMessage && (
            <div className="profile-alert-success">
              <span>{successMessage}</span>
            </div>
          )}
          <form onSubmit={handleSave} className="profile-form">
            <div className="profile-fields-grid">
              {formFields.map((field) => (
                <div key={field.id} className="profile-field-group">
                  <label htmlFor={field.id} className="profile-label">
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      id={field.id}
                      className={`profile-input profile-select ${!isEditing ? 'read-only' : ''}`}
                      value={formData[field.id]}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      disabled={!isEditing}
                    >
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      id={field.id}
                      rows={3}
                      className={`profile-input profile-textarea ${!isEditing ? 'read-only' : ''}`}
                      value={formData[field.id]}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      readOnly={!isEditing}
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.id}
                      className={`profile-input ${!isEditing ? 'read-only' : ''} ${errors[field.id] ? 'input-error' : ''}`}
                      value={formData[field.id]}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      readOnly={!isEditing}
                    />
                  )}
                  {errors[field.id] && (
                    <span className="profile-error-text">{errors[field.id]}</span>
                  )}
                </div>
              ))}
            </div>
            {isEditing && (
              <div className="profile-form-actions">
                <button
                  type="button"
                  className="profile-btn profile-btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="profile-btn profile-btn-primary"
                >
                  Save
                </button>
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};

export default Profile;
