// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Header from './components/Header/Header';
//import Footer from './components/Footer/Footer';
import RegisterPage from './pages/RegisterPage';
import GroupPage from './pages/GroupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage'; // Make sure this import is correct
// Import other pages...

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/groups" element={<GroupPage />} />
        <Route path="/edit" element={<EditPage />} />
        {/* Define routes for other pages using `element` prop */}
      </Routes>
    </Router>
  );
}

export default App;
