import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrollMessage, setEnrollMessage] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(response.data);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchEnrolledCourses = async () => {
      try {
        const response = await api.get('/my-learning');
        setEnrolledCourses(response.data);
      } catch (err) {
        console.error('Failed to fetch enrolled courses:', err);
      }
    };

    fetchCourses();
    fetchEnrolledCourses();
  }, []);

  const enrollInCourse = async (courseId) => {
    try {
      const response = await api.post('/enroll', { course_id: courseId });
      setEnrollMessage(response.data.message);
      setEnrolledCourses([...enrolledCourses, courseId]);
    } catch (err) {
      setEnrollMessage(err.response?.data?.message || 'Failed to enroll in the course.');
    }
  };

  const isEnrolled = (courseId) => enrolledCourses.some((course) => course.id === courseId);

  return (
    <div className="courses-page">
      <div className="courses-container">
        <div className="header">
          <h1>Available Courses</h1>
          <div className="course-count">{courses.length} Courses</div>
        </div>

        {enrollMessage && <div className="alert success">{enrollMessage}</div>}
        {error && <div className="alert error">{error}</div>}

        {loading ? (
          <div className="loading">Loading courses...</div>
        ) : (
          <div className="course-grid">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-image">
                  {/* Display the image of the course */}
                  {course.image_url && (
                    <img
                      src={course.image_url}
                      alt={course.title}
                      className="course-image-img"
                    />
                  )}
                </div>
                <div className="course-content">
                  <h2>{course.title}</h2>
                  {course.description && (
                    <p className="description">{course.description}</p>
                  )}
                  {course.instructor && (
                    <p className="instructor">
                      <span className="label">Instructor:</span> {course.instructor}
                    </p>
                  )}
                  {course.duration && (
                    <p className="duration">
                      <span className="label">Duration:</span> {course.duration}
                    </p>
                  )}
                </div>
                {isEnrolled(course.id) ? (
                  <button className="enroll-button enrolled">Already Enrolled</button>
                ) : (
                  <button
                    className="enroll-button"
                    onClick={() => enrollInCourse(course.id)}
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .courses-page {
          min-height: 100vh;
          background-color: #f5f5f5;
          padding: 2rem 1rem;
        }

        .courses-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .header h1 {
          font-size: 2.5rem;
          color: #333;
          margin: 0;
        }

        .course-count {
          background-color: #2196f3;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 600;
        }

        .alert {
          padding: 1rem;
          border-radius: 5px;
          margin-bottom: 1rem;
        }

        .success {
          background-color: #e8f5e9;
          border-left: 4px solid #4caf50;
          color: #4caf50;
        }

        .error {
          background-color: #ffe5e5;
          border-left: 4px solid #ff4757;
          color: #ff4757;
        }

        .loading {
          text-align: center;
          padding: 2rem;
          color: #666;
          font-size: 1.1rem;
        }

        .course-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .course-card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .course-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .course-image {
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 200px;
        }

        .course-image-img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        .course-content {
          padding: 1.5rem;
          flex-grow: 1;
        }

        .course-card h2 {
          font-size: 1.4rem;
          color: #333;
          margin: 0 0 1rem 0;
        }

        .description {
          color: #666;
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .instructor, .duration {
          font-size: 0.9rem;
          color: #666;
          margin: 0.5rem 0;
        }

        .label {
          font-weight: 600;
          color: #444;
        }

        .enroll-button {
          background-color: #2196f3;
          color: white;
          border: none;
          padding: 1rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
          border-radius: 0 0 10px 10px;
        }

        .enroll-button:hover {
          background-color: #1976d2;
        }

        .enrolled {
          background-color: #4caf50;
          cursor: not-allowed;
        }

        .enrolled:hover {
          background-color: #4caf50;
        }

        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .header h1 {
            font-size: 2rem;
          }

          .course-grid {
            grid-template-columns: 1fr;
          }

          .courses-container {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CourseList;
