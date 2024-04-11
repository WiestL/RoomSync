import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

// Customized styles
const StyledBox = styled(Box)({
  backgroundColor: '#489574',
  borderRadius: '15px',
  padding: '20px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.8)',
  color: 'white',
  textAlign: 'center',
  marginTop: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const StyledPaper = styled(Paper)({
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  padding: '15px',
  marginTop: '16px',
  marginBottom: '16px',
  color: 'white',
});

const CustomButton = styled(Button)({
  backgroundColor: '#4EA26F',
  '&:hover': {
    backgroundColor: '#2e8b57',
  },
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)',
  color: 'white',
  marginTop: '16px',
});

function HomePage() {
  // Data could also be fetched from an API or generated dynamically
  const dailyQuote = "The only limit to our realization of tomorrow will be our doubts of today. – Franklin D. Roosevelt";

  return (
    <Container component="main" maxWidth="md">
      <StyledBox>
        <Typography variant="h4" gutterBottom>
          Discover RoomSync
        </Typography>
        <Typography variant="h6">
          Your journey to seamless room management starts here.
        </Typography>
        <StyledPaper elevation={4}>
          <Typography variant="subtitle1">
            Quickly sync up with your roommates on chores, bills, and events with RoomSync.
            Our intuitive design makes managing your shared space a breeze.
          </Typography>
        </StyledPaper>
        <StyledPaper elevation={4}>
          <Typography variant="subtitle1">
            {dailyQuote}
          </Typography>
        </StyledPaper>
        <CustomButton variant="contained">
          Learn More
        </CustomButton>
      </StyledBox>
    </Container>
  );
}

export default HomePage;
