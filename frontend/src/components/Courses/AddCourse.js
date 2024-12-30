import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { uploadImage } from '../../firebase/UploadImage';

const NewCourseForm = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    instructor: '',
    rating: '',
    image_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // Added state for direct URL
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      try {
        const imageUrl = await uploadImage(file);
        setForm({ ...form, image_url: imageUrl });
        setImagePreview(URL.createObjectURL(file));
        console.log("Image uploaded successfully:", imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    setForm({ ...form, image_url: e.target.value });
    setImagePreview(e.target.value); // Show preview of the URL image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/courses', form);
      alert('Course created successfully!');
      navigate('/admin');
    } catch (error) {
      console.error('Error creating course:', error.response?.data || error.message);
      alert('Failed to create course.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <div className="form-header">
          <h1>Create New Course</h1>
          <p>Fill in the details below to create a new course</p>
        </div>

        <form onSubmit={handleSubmit} className="course-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Course Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter course title"
                value={form.title}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Instructor</label>
              <input
                type="text"
                name="instructor"
                placeholder="Enter instructor name"
                value={form.instructor}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Price ($)</label>
              <input
                type="number"
                name="price"
                placeholder="Enter course price"
                value={form.price}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Duration (hours)</label>
              <input
                type="number"
                name="duration"
                placeholder="Enter course duration"
                value={form.duration}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Rating (1-5)</label>
              <input
                type="number"
                name="rating"
                placeholder="Enter course rating"
                value={form.rating}
                onChange={handleChange}
                min="1"
                max="5"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Enter course description"
              value={form.description}
              onChange={handleChange}
              required
              className="form-textarea"
            />
          </div>

          {/* Add URL input for course image */}
          <div className="form-group full-width">
            <label>Course Image URL (Optional)</label>
            <input
              type="text"
              name="image_url"
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={handleUrlChange}
              className="form-input"
            />
          </div>

          <div className="form-group image-upload">
            <label>Upload Course Image</label>
            <div className="file-input-container">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="file-input-label">
                Choose Image
              </label>
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}
            </div>
          </div>

          <div className="button-group">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="submit-button"
            >
              {loading ? 'Creating Course...' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .form-page {
          min-height: 100vh;
          background-color: #f5f5f5;
          padding: 2rem 1rem;
        }

        .form-container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 2rem;
        }

        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-header h1 {
          font-size: 2rem;
          color: #333;
          margin: 0;
        }

        .form-header p {
          color: #666;
          margin-top: 0.5rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .full-width {
          grid-column: 1 / -1;
        }

        label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: #444;
          margin-bottom: 0.5rem;
        }

        .form-input, .form-textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: #2196f3;
          box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
        }

        .form-textarea {
          min-height: 120px;
          resize: vertical;
        }

        .image-upload {
          margin-top: 1rem;
        }

        .file-input-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .file-input {
          display: none;
        }

        .file-input-label {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background-color: #f0f0f0;
          border-radius: 5px;
          cursor: pointer;
          text-align: center;
          transition: background-color 0.3s ease;
        }

        .file-input-label:hover {
          background-color: #e0e0e0;
        }

        .image-preview {
          margin-top: 1rem;
          max-width: 200px;
          border-radius: 5px;
          overflow: hidden;
        }

        .image-preview img {
          width: 100%;
          height: auto;
          display: block;
        }

        .button-group {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .submit-button, .cancel-button {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
          flex: 1;
        }

        .submit-button {
          background-color: #2196f3;
          color: white;
        }

        .submit-button:hover:not(:disabled) {
          background-color: #1976d2;
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .cancel-button {
          background-color: #f0f0f0;
          color: #666;
        }

        .cancel-button:hover {
          background-color: #e0e0e0;
        }

        @media (max-width: 600px) {
          .form-container {
            padding: 1rem;
          }

          .form-grid {
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

export default NewCourseForm;