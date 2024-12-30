import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const MyLearning = () => {
  const [user, setUser] = useState({});
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setAuthError('No token found. Please log in.');
          return;
        }
        const response = await api.get('/user-details', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        setAuthError('Authentication failed. Please log in again.');
        console.error(err);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User is not authenticated.');
        setLoading(false);
        return;
      }
      try {
        const response = await api.get('/my-learning', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEnrolledCourses(response.data);
      } catch (err) {
        setError('Failed to fetch enrolled courses. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [user]);

  return (
    <div className="my-learning-page">
      <div className="header">
        <h1>My Learning <br/> </h1><h2>Enrolled Courses</h2>
        {authError && <p className="auth-error">{authError}</p>}
      </div>

      {loading ? (
        <p className="loading-message">Loading enrolled courses...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="enrolled-courses-list">
          {enrolledCourses.map((courseData) => (
            <div key={courseData.id} className="course-card">
              <img
                src={courseData.course.image_url || 'default-image.jpg'}
                alt={courseData.course.title}
                className="course-image"
              />
              <h3>{courseData.course.title}</h3>
              <p className="course-description">{courseData.course.description}</p>
              <div className="course-details">
                <span><strong>Instructor:</strong> {courseData.course.instructor}</span>
                <span><strong>Duration:</strong> {courseData.course.duration} hrs</span>
                <span><strong>Rating:</strong> {courseData.course.rating} / 5</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .my-learning-page {
          padding: 2rem;
          font-family: 'Arial', sans-serif;
          background: linear-gradient(135deg, #f7f7f7, #e3f2fd);
          color: #333;
          min-height: 100vh;
        }

        .header {
          text-align: center;
          margin-bottom: 2rem;
        }

        h1 {
          font-size: 2.5rem;
          color: #007bff;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .auth-error,
        .error-message {
          color: #f5222d;
          font-weight: bold;
          text-align: center;
          margin-bottom: 1rem;
        }

        .loading-message {
          text-align: center;
          font-size: 1.2rem;
          color: #555;
        }

        .enrolled-courses-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          padding: 1rem;
        }

        .course-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .course-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
        }

        .course-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }

        .course-card h3 {
          font-size: 1.5rem;
          margin: 1rem;
          color: #333;
        }

        .course-description {
          margin: 0 1rem 1rem;
          font-size: 1rem;
          color: #555;
        }

        .course-details {
          display: flex;
          flex-direction: column;
          margin: 0 1rem 1rem;
          font-size: 0.9rem;
          color: #555;
        }

        .course-details span {
          margin: 0.3rem 0;
        }

        @media (max-width: 768px) {
          .my-learning-page {
            padding: 1rem;
          }

          .course-card h3 {
            font-size: 1.2rem;
          }

          .course-description,
          .course-details {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MyLearning;
