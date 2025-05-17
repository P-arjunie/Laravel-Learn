import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and About Section */}
        <div className="footer-logo-container">
          <h2 className="footer-logo-text">LEARN</h2>
          <p className="footer-about-text">
            LEARN is your go-to platform for online learning. Empower your knowledge, anytime, anywhere.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-links-container">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/my-learning">My Learning</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Contact Information Section */}
        <div className="footer-contact-container">
          <h4>Contact Us</h4>
          <p>Email: support@learn.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 Learn Street, Knowledge City</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} LEARN. All rights reserved.</p>
      </div>

      <style jsx>{`
        .footer {
          background: #222;
          color: white;
          padding: 2rem 1rem;
          margin-top: 2rem;
        }

        .footer-container {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          max-width: 1200px;
          margin: 0 auto;
          gap: 2rem;
        }

        .footer-logo-container {
          flex: 1 1 30%;
        }

        .footer-logo-text {
          font-size: 1.8rem;
          font-weight: bold;
          color: #2196f3;
        }

        .footer-about-text {
          margin-top: 1rem;
          line-height: 1.6;
        }

        .footer-links-container {
          flex: 1 1 30%;
        }

        .footer-links {
          list-style: none;
          padding: 0;
        }

        .footer-links li {
          margin: 0.5rem 0;
        }

        .footer-links a {
          color: white;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-links a:hover {
          color: #2196f3;
        }

        .footer-contact-container {
          flex: 1 1 30%;
        }

        .footer-contact-container p {
          margin: 0.5rem 0;
        }

        .footer-bottom {
          text-align: center;
          margin-top: 2rem;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .footer-container {
            flex-direction: column;
            align-items: flex-start;
          }

          .footer-bottom {
            margin-top: 1rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
