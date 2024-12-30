import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const AdminPanel = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    instructor: '',
    image_url: '',
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error.response?.data || error.message);
      }
    };
    fetchCourses();
  }, []);

  const deleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await api.delete(`/courses/${id}`);
        setCourses(courses.filter((course) => course.id !== id));
      } catch (error) {
        console.error('Error deleting course:', error.response?.data || error.message);
      }
    }
  };

  const startEditing = (course) => {
    setEditingCourse(course.id);
    setEditForm({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      image_url: course.image_url || '',
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveCourse = async (id) => {
    try {
      const response = await api.put(`/courses/${id}`, editForm);
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === id ? { ...course, ...editForm } : course
        )
      );
      setEditingCourse(null);
      alert('Course updated successfully!');
    } catch (error) {
      console.error('Error updating course:', error.response?.data || error.message);
      alert('Failed to update course.');
    }
  };

  const cancelEditing = () => {
    setEditingCourse(null);
    setEditForm({ title: '', description: '', instructor: '', image_url: '' });
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="header">
          <div className="header-content">
            <h1>Admin Panel</h1>
            <p>Manage your courses efficiently</p>
          </div>
          <Link to="/admin/new-course" className="add-course-button">
            Add New Course
          </Link>
        </div>

        <div className="course-list">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              {editingCourse === course.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    placeholder="Title"
                    className="edit-input"
                    required
                  />
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    placeholder="Description"
                    className="edit-textarea"
                    required
                  />
                  <input
                    type="text"
                    name="instructor"
                    value={editForm.instructor}
                    onChange={handleEditChange}
                    placeholder="Instructor"
                    className="edit-input"
                    required
                  />
                  <input
                    type="text"
                    name="image_url"
                    value={editForm.image_url}
                    onChange={handleEditChange}
                    placeholder="Image URL"
                    className="edit-input"
                  />
                  <div className="button-group">
                    <button onClick={() => saveCourse(course.id)} className="save-button">
                      Save Changes
                    </button>
                    <button onClick={cancelEditing} className="cancel-button">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="course-content">
                  <img
                    src={course.image_url || 'https://via.placeholder.com/300'}
                    alt={course.title}
                    className="course-image"
                  />
                  <h3>{course.title}</h3>
                  <p className="description">{course.description}</p>
                  <div className="course-details">
                    <p>
                      <span>Instructor:</span> {course.instructor}
                    </p>
                    <p>
                      <span>Created:</span>{' '}
                      {new Date(course.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="button-group">
                    <button onClick={() => startEditing(course)} className="edit-button">
                      Edit
                    </button>
                    <button onClick={() => deleteCourse(course.id)} className="delete-button">
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .admin-page {
          min-height: 100vh;
          background-color: #f5f5f5;
          padding: 2rem 1rem;
        }

        .course-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-bottom: 1px solid #ddd;
        }

        .admin-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .header-content h1 {
          font-size: 2.5rem;
          color: #333;
          margin: 0;
        }

        .header-content p {
          color: #666;
          margin-top: 0.5rem;
        }

        .add-course-button {
          background-color: #4CAF50;
          color: white;
          padding: 0.8rem 1.5rem;
          border-radius: 5px;
          text-decoration: none;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }

        .add-course-button:hover {
          background-color: #45a049;
        }

        .course-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .course-card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .course-content {
          padding: 1.5rem;
        }

        .course-content h3 {
          font-size: 1.4rem;
          color: #333;
          margin: 0 0 1rem 0;
        }

        .description {
          color: #666;
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .course-details {
          margin: 1rem 0;
          font-size: 0.9rem;
        }

        .course-details p {
          margin: 0.5rem 0;
          color: #666;
        }

        .course-details span {
          font-weight: 600;
          color: #444;
        }

        .edit-form {
          padding: 1.5rem;
        }

        .edit-input, .edit-textarea {
          width: 100%;
          padding: 0.8rem;
          margin-bottom: 1rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
        }

        .edit-textarea {
          min-height: 100px;
          resize: vertical;
        }

        .button-group {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .edit-button, .delete-button, .save-button, .cancel-button {
          padding: 0.6rem 1.2rem;
          border: none;
          border-radius: 5px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .edit-button {
          background-color: #2196f3;
          color: white;
        }

        .edit-button:hover {
          background-color: #1976d2;
        }

        .delete-button {
          background-color: #ff4757;
          color: white;
        }

        .delete-button:hover {
          background-color: #ff6b81;
        }

        .save-button {
          background-color: #4CAF50;
          color: white;
        }

        .save-button:hover {
          background-color: #45a049;
        }

        .cancel-button {
          background-color: #666;
          color: white;
        }

        .cancel-button:hover {
          background-color: #777;
        }

        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .course-list {
            grid-template-columns: 1fr;
          }

          .button-group {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;