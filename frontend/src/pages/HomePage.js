import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          Welcome to RoomSync!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={goToLoginPage}
          sx={{ mt: 3 }}
        >
          Go to Login Page (Before Group)
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={goToGroupPage}
          sx={{ mt: 3 }}
        >
          Go to Group Page
        </Button>
        {/* Add other content or buttons as needed */}
      </Box>
    </Container>
  );
}

export default HomePage;
