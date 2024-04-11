import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/userService';
import { useUserContext } from '../contexts/UserContext';
import { Link as RouterLink } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

// Custom theme to override the TextField focus color
const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Add specific styles for your button here
          '&:hover': {
            backgroundColor: '#2e8b57',
          },
          '&.Mui-focused': {
            boxShadow: '0 0 0 2px #654321', // Dark brown focus ring around the button
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#20614B', // Dark brown for text field borders
            },
          }
        }
      }
    }
  }
});


// Styled components
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

const CustomButton = styled(Button)({
  backgroundColor: '#4EA26F',
  '&:hover': {
    backgroundColor: '#2e8b57',
  },
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)',
  mt: 3,
  mb: 2,
  color: 'white'
});

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { user, token } = await loginUser({ email, password });
      if (user && user.id) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify({ ...user, token }));
        navigate('/');
      } else {
        setError("Invalid login credentials.");
      }
    } catch (error) {
      setError(error.message || "Login failed.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <StyledBox>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CustomButton type="submit" fullWidth variant="contained">
              Sign In
            </CustomButton>
            {error && <Alert severity="error">{error}</Alert>}
            <Typography sx={{ mt: 2, mb: 2 }}>
              <Link component={RouterLink} to="/register" variant="body2" sx={{ color: 'white' }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Typography>
          </Box>
        </StyledBox>
      </Container>
    </ThemeProvider>
  );
};

export{
  CustomButton,
  StyledBox,
  theme
}
export default LoginPage;
