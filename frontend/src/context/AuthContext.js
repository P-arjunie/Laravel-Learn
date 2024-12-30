// import React, { createContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
// import api, { setAuthToken } from '../services/api';

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate(); // Initialize useNavigate for redirection

//   const login = async (credentials) => {
//     const response = await api.post('/login', credentials);
//     const { token, user } = response.data;

//     // Save the token and user data
//     setAuthToken(token);
//     setUser(user);
//     localStorage.setItem('token', token);

//     // Redirect based on role
//     if (user.role === 'admin') {
//       navigate('/admin'); // Redirect to admin page
//     } else {
//       navigate('/courses'); // Redirect to courses page
//     }

//     return response.data;
//   };

//   const logout = () => {
//     api.post('/logout');
//     setAuthToken(null);
//     setUser(null);
//     localStorage.removeItem('token');
//     navigate('/login'); // Redirect to login page after logout
//   };

//   // Automatically set user if token exists in localStorage
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setAuthToken(token);
//       api.get('/user').then((response) => setUser(response.data)).catch(() => logout());
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

//AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '../services/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const response = await api.post('/login', credentials);
      const { token, user } = response.data;

      setAuthToken(token); // Set auth token for all API calls
      setUser(user);
      localStorage.setItem('token', token);

      // Navigate based on user role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    }
  };

  const logout = () => {
    api.post('/logout').catch(() => console.error('Logout failed.'));
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      api.get('/user')
        .then((response) => setUser(response.data))
        .catch(() => logout());
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
