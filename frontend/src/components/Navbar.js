import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from "../images/logo.png";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo Section */}
        <div className="logo-container">
          <img src={logo} alt="MyApp Logo" className="nav-logo-img" />
          <Link to="/" className="nav-logo-text">
            LEARN
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li>
            <Link to="/courses">Courses</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          {user && (
            <li>
              <Link to="/my-learning">My Learning</Link>
            </li>
          )}
          {user?.role === 'admin' && (
            <>
              <li>
                <Link to="/admin">Admin Panel</Link>
              </li>
              <li>
                <Link to="/admin/new-course">Add New Course</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <style jsx>{`
        .navbar {
          background: #333;
          padding: 1rem;
          color: white;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .logo-container {
          display: flex;
          align-items: center;
        }

        .nav-logo-img {
          height: 55px;
          margin-right: 10px;
        }

        .nav-logo-text {
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
          text-decoration: none;
        }

        .nav-links {
          list-style: none;
          display: flex;
          gap: 1rem;
        }

        .nav-links li {
          font-size: 1rem;
        }

        .nav-links a {
          color: white;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .nav-links a:hover {
          color: #2196f3;
        }

        @media (max-width: 768px) {
          .nav-container {
            flex-direction: column;
            align-items: flex-start;
          }

          .nav-links {
            margin-top: 1rem;
            gap: 0.5rem;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
