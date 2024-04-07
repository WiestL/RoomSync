import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/userService';
import { useUserContext } from '../contexts/UserContext'; // Corrected import
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useUserContext(); // Correct usage of the context hook

  useEffect(() => {
    if (user?.id) {
      navigate('/groups');  // Navigate to the groups page only after user is set
    }
  }, [user, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const userData = { email, password };
    try {
      const user = await loginUser(userData);
      setUser(user); // Set user in context
      localStorage.setItem('user', JSON.stringify(user)); // Persist user data in local storage
      navigate('/');
    } catch (error) {
      console.error("Login Error:", error);
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
