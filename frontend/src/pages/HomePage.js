import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)({
  backgroundColor: '#489574', // Adjusted to a more specific sage green color
  borderRadius: '15px',
  padding: '20px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.8)', // Enhanced drop shadow for better visibility
  color: 'white', // Set text color to white
  textAlign: 'center', // Center the text inside the box
  marginTop: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

function HomePage() {
  const navigate = useNavigate();

  const goToGroupPage = () => {
    navigate('/groups');
  };

  const goToLoginPage = () => {
    navigate('/login');
  };

  return (
    <Container component="main" maxWidth="xs">
      <StyledBox>
        <Typography component="h1" variant="h4" gutterBottom>
          Welcome to RoomSync!
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: '#4EA26F', // Slate Blue
            '&:hover': {
              backgroundColor: '#2e8b57', // Dark Slate Blue
            },
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)'
          }}
          onClick={goToLoginPage}
        >
          Go to Login Page (Before Group)
        </Button>
        <Button
          variant="contained"
          sx={{
            mt: 1,
            backgroundColor: '#4EA26F', // Medium Sea Green
            '&:hover': {
              backgroundColor: '#2e8b57' // Sea Green
            },
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)'
          }}
          onClick={goToGroupPage}
        >
          Go to Group Page
        </Button>
        {/* Add other content or buttons as needed */}
      </StyledBox>
    </Container>
  );
}

export default HomePage;
