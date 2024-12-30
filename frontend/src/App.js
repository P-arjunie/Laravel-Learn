import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CourseList from './components/Courses/CourseList';
import AdminPanel from './components/Admin/AdminPanel';
import NewCourseForm from './components/Courses/AddCourse';
import ProfileUpdate from './components/Auth/ProfileUpdate';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import Navbar from './components/Navbar'; // Import Navbar
import MyLearningPage from './components/Auth/MyLearning';


const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar /> {/* Shared Navbar */}
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/my-learning" element={<MyLearningPage />} />
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminPanel />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/new-course"
            element={
              <PrivateRoute requiredRole="admin">
                <NewCourseForm />
              </PrivateRoute>
            }
          />

          {/* Common Routes */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfileUpdate />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
