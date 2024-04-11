import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import EditIcon from '@mui/icons-material/Edit';
import LoginIcon from '@mui/icons-material/Login';
import { styled } from '@mui/material/styles';

const StyledBottomNavigation = styled(BottomNavigation)({
  backgroundColor: '#489574', // Sage green background
  color: 'white', // White text for the icons and labels
  position: 'fixed', // Keep it at the bottom
  bottom: 0,
  width: '100%',
  boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.2)' // Subtle shadow for elevation effect
});

const StyledBottomNavigationAction = styled(BottomNavigationAction)(({ theme }) => ({
  color: 'white', // Default color for icons and labels
  '&.Mui-selected': { // Styles when the item is selected
    color: '#5DC575', // Medium Sea Green
  },
  '&.Mui-selected:hover': {
    backgroundColor: '#4CA07E', // Darker shade on hover for selected item
  }
}));

const Footer = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  return (
    <StyledBottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <StyledBottomNavigationAction label="Home" icon={<HomeIcon />} onClick={() => navigate('/')} />
      <StyledBottomNavigationAction label="Groups" icon={<GroupIcon />} onClick={() => navigate('/groups')} />
      <StyledBottomNavigationAction label="Edit" icon={<EditIcon />} onClick={() => navigate('/edit')} />
      <StyledBottomNavigationAction label="Login" icon={<LoginIcon />} onClick={() => navigate('/login')} />
    </StyledBottomNavigation>
  );
};

export default Footer;
