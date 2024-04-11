import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import GroupPage from './pages/GroupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage'; 
import Footer from './components/Footer/Footer';
import './Layout.css';
// Import other pages...

const Layout = ({ children }) => {

  useEffect(() => {
    // Access the video element by its ID and set the playback rate
    const videoElement = document.getElementById('myVideo');
    if (videoElement) {
      videoElement.playbackRate = 0.7; // Half the normal speed
    }
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
    <Router>
      <div className='Layout'>
        <video autoPlay muted loop id="myVideo">
          <source src="/topappback.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        <div className='Content'>
          {children}
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/groups" element={<GroupPage />} />
              <Route path="/edit" element={<EditPage />} />
              {/* Define routes for other pages using `element` prop */}
            </Routes>
            <Footer />
        </div>
      </div>
    </Router>
  );
};

export default Layout;
