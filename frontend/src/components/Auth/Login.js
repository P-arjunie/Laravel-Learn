import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import loginImage from "../../images/login.png"; // Adjust path as needed

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = await login({ email, password });
      localStorage.setItem("authToken", data.token);

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile", {
          state: {
            user: data.user,
            missingFields: data.missingFields,
          },
        });
      }
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Image Section */}
      <div className="login-image">
        <img src={loginImage} alt="Login Illustration" className="image" />
      </div>

      {/* Form Section */}
      <div className="login-form-container">
        <h2 className="login-title">Log in</h2>
        <p className="login-description">Hello, friend! 👋</p>

        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="error-message">{error}</div>}

          {/* Email Field */}
          <div className="form-group">
            <div className="input-group">
              <Mail className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="Email"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <div className="input-group">
              <Lock className="input-icon" />
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Password"
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Link to Register */}
        <div className="register-link">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="link">
              Register here
            </Link>
          </p>
        </div>
      </div>

      {/* Styling */}
      <style jsx="true">{`
        .login-container {
          display: flex;
          height: 88vh;
          width: 100vw;
          background-color: white;
        }

        .login-image {
          padding-left: 100px;
          flex: 0 0 35%;
          background-color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-image .image {
          max-width: 90%;
          max-height: 90%;
          object-fit: cover;
        }

        .login-form-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 40px;
          background-color: white;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .login-title {
          font-size: 36px;
          margin-bottom: 20px;
          text-align: center;
        }

        .login-description {
          text-align: center;
          color: #555;
          margin-bottom: 40px;
          line-height: 1.5;
        }

        .form-group {
          margin-bottom: 15px;
          width: 80%;
        }

        .input-group {
          position: relative;
          width: 90%;
        }

        .input-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #888;
        }

        .input-field {
          width: 100%;
          padding: 15px 50px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 18px;
        }

        .submit-button {
          width: 50%;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 18px;
          margin-top: 20px;
          cursor: pointer;
        }
        .submit-button:disabled {
          background-color: #b0b0b0;
          cursor: not-allowed;
        }

        .error-message {
          background-color: #f8d7da;
          color: #721c24;
          padding: 15px;
          margin-bottom: 30px;
          border-radius: 8px;
          width: 100%;
          text-align: center;
        }

        .register-link {
          margin-top: 20px;
          text-align: center;
          font-size: 16px;
          color: #555;
        }

        .register-link .link {
          color: #007bff;
          text-decoration: none;
          font-weight: bold;
        }

        .register-link .link:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
          }

          .login-image {
            flex: 0 0 auto;
            height: 200px;
          }

          .login-image .image {
            max-height: 80%;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
