import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/userService';  // Ensure jwtDecode is not imported here if not used
import { useUserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  useEffect(() => {
    // Any necessary useEffect logic
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { user, token } = await loginUser({ email, password });
      if (user && user.id) {
        setUser(user);  // Set user in context
        localStorage.setItem('user', JSON.stringify({ ...user, token }));  // Persist user and token
        navigate('/groups');
      } else {
        setError("Invalid login credentials.");
      }
    } catch (error) {
      setError(error.message || "Login failed.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
