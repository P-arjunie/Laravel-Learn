import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import api from '../../services/api';
import img from "../../images/register.jpeg";

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Registering user:', form);
      await api.post('/register', form);
      alert('Registration successful!');
      navigate('/login'); // Navigate to login page
    } catch (error) {
      alert('Error during registration.');
    }
  };

  return (
    <div className="register-page">
      <div className="image-section">
        <img
          src={img}
          alt="Register Illustration"
          className="register-image"
        />
      </div>
      <div className="form-section">
        <h2 className="register-title">Register</h2>
        <p className="register-description">
          Create an account and start your journey with us.
        </p>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <input
              name="email"
              placeholder="Email"
              type="email"
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              placeholder="Password"
              type="password"
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
      </div>

      <style jsx>{`
        .register-page {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          height: 83vh;
          padding: 2rem 4rem; /* Added horizontal padding for a wider layout */
          background-color: white;
        }

        .image-section {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }

        .register-image {
          max-width: 80%;
          height: auto;
          border-radius: 15px;
          object-fit: cover;
        }

        .form-section {
          max-width: 600px; /* Increase the width of the form container */
          width: 100%;
          background-color: white;
          padding: 2rem;
          border-radius: 10px;
          text-align: center;
        }

        .register-title {
          font-size: 30px;
          font-weight: 600;
          margin-bottom: 10px;
          color: #333333;
        }

        .register-description {
          font-size: 14px;
          color: #666666;
          margin-bottom: 20px;
          text-align: center;
        }

        .form-group {
          margin-bottom: 20px; /* Add more spacing between input fields */
          width: 100%; /* Ensure form group spans the full width */
        }

        .input-field {
          width: 100%; /* Make the input fields span the full width of the container */
          padding: 15px; /* Add more padding for better usability */
          border: 1px solid #ddd;
          border-radius: 6px; /* Add a modern border radius */
          font-size: 16px;
          box-sizing: border-box; /* Ensure padding doesn't overflow */
        }

        .input-field:focus {
          border-color: #007bff;
          outline: none;
          box-shadow: 0 0 8px rgba(0, 123, 255, 0.5); /* Add a subtle glow effect on focus */
        }

        .submit-button {
          width: 80%;
          padding: 12px 15px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .submit-button:hover {
          background-color: #0056b3;
        }

        @media (max-width: 768px) {
          .register-page {
            flex-direction: column;
            padding: 1rem;
          }

          .image-section {
            margin-bottom: 2rem;
          }

          .form-section {
            width: 100%;
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;
