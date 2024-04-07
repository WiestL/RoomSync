import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function HomePage() {
  const navigate = useNavigate(); // Use the useNavigate hook

  // Function to handle button click
  const goToGroupPage = () => {
    navigate('/groups'); // Navigate to the GroupPage
  };

  return (
    <div>
      <h1>Welcome to RoomSync!</h1>
      <button onClick={goToGroupPage}>Go to Group Page</button> 
      {/* You can add other content or buttons here */}
    </div>
  );
}

export default HomePage;
