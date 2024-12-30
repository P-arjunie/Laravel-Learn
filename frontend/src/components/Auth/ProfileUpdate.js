import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const ProfileUpdate = () => {
  const [user, setUser] = useState({});
  const [school, setSchool] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get('/user-details');
        setUser(response.data);
        setSchool(response.data.school || '');
        setAddress(response.data.address || '');
        setAge(response.data.age || '');
        setGender(response.data.gender || '');
      } catch (err) {
        setError('Failed to fetch user details.');
        console.error(err);
      }
    };

    fetchUserDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await api.put('/update-profile', { school, address, age, gender });
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/logout');
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      setError('Failed to log out.');
      console.error(err);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="header">
          <div className="avatar">
            <img
              src={user.avatar || 'https://via.placeholder.com/150'}
              alt="User Avatar"
              className="avatar-img"
            />
          </div>
          <div className="user-details">
            <h2>{user.name || 'User Name'}</h2>
            <p>{user.email || 'user@example.com'}</p>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>

        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>School</label>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="input-field"
              placeholder="Enter your school"
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input-field"
              placeholder="Enter your age"
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="input-field"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className="input-field"
              placeholder="Enter your address"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`submit-button ${loading ? 'loading' : ''}`}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>

      <style jsx>{`
        .profile-page {
          min-height: 100vh;
          background: linear-gradient(to bottom,rgb(216, 185, 250),rgb(136, 179, 254));
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }

        .profile-container {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          padding: 2rem;
          max-width: 600px;
          width: 100%;
        }

        .header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
          text-align: center;
        }

        .avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid #2575fc;
        }

        .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .user-details h2 {
          font-size: 1.8rem;
          color: #333;
        }

        .user-details p {
          color: #777;
          font-size: 1rem;
        }

        .logout-button {
          background: #ff4d4f;
          color: #fff;
          border: none;
          padding: 0.8rem 1.2rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .logout-button:hover {
          background: #e04547;
        }

        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        label {
          font-weight: bold;
          color: #444;
          margin-bottom: 0.5rem;
        }

        .input-field {
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
        }

        .input-field:focus {
          border-color: #2575fc;
          box-shadow: 0 0 4px rgba(37, 117, 252, 0.4);
        }

        .alert {
          padding: 1rem;
          border-radius: 8px;
          font-size: 1rem;
          margin-bottom: 1rem;
        }

        .alert.success {
          background: #e6f7e7;
          color: #2c943e;
        }

        .alert.error {
          background: #fde6e6;
          color: #d32f2f;
        }

        .submit-button {
          background:rgb(93, 150, 247);
          color: #fff;
          border: none;
          padding: 1rem;
          font-size: 1.2rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .submit-button:hover {
          background: #1b5ccc;
        }
      `}</style>
    </div>
  );
};

export default ProfileUpdate;
