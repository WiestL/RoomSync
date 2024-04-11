import React, { useState, useEffect } from 'react';
import { addGroceryItem, postStatusUpdate } from '../services/editService';
import { useUserContext } from '../contexts/UserContext';
import {
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Container,
} from '@mui/material';
import { theme, StyledBox, CustomButton } from './LoginPage'; // Import these styles from the LoginPage
import { ThemeProvider } from '@mui/material/styles';

const EditPage = () => {
  const [groceryName, setGroceryName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [statusText, setStatusText] = useState('');
  const [wantVisitors, setWantVisitors] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [storedGroupId, setStoredGroupId] = useState(null);
  const { user } = useUserContext();

  useEffect(() => {
    console.log('Current groupDetails in storage:', localStorage.getItem('groupDetails'));
    console.log('Current user details in storage', localStorage.getItem('user'));
  
    const storedGroupDetails = JSON.parse(localStorage.getItem('groupDetails'));
    if (storedGroupDetails && storedGroupDetails.groupId) {
      setStoredGroupId(storedGroupDetails.groupId);
    } else {
      console.error('No groupId found in local storage');
      setError('No group found. Please join a group first.');
    }
  }, []);

  const handleAddGroceryItem = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await addGroceryItem(storedGroupId, groceryName, parseInt(quantity));
      console.log('Item added successfully:', result);
      setGroceryName('');
      setQuantity('');
      setError('');
    } catch (error) {
      console.error('Failed to add grocery item:', error);
      setError('Failed to add item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePostStatusUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    console.log("User ID:", user.id);
    try {
      const result = await postStatusUpdate(user.id, statusText, wantVisitors);
      console.log('Status posted successfully:', result);
      setStatusText('');
      setWantVisitors(false);
      setError('');
    } catch (error) {
      console.error('Failed to post status update:', error);
      setError('Failed to post status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <StyledBox>
          <Typography component="h1" variant="h5">
            Group Actions
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          {loading && <CircularProgress />}
          <form onSubmit={handleAddGroceryItem}>
            <TextField
              margin="normal"
              fullWidth
              label="Grocery Item Name"
              type="text"
              value={groceryName}
              onChange={e => setGroceryName(e.target.value)}
              required
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{ style: { color: 'white' } }}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Quantity"
              type="number"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              required
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{ style: { color: 'white' } }}
            />
            <CustomButton type="submit" fullWidth variant="contained" disabled={loading}>
              Add Grocery Item
            </CustomButton>
          </form>
          <form onSubmit={handlePostStatusUpdate}>
            <TextField
              margin="normal"
              fullWidth
              label="Status Text"
              type="text"
              value={statusText}
              onChange={e => setStatusText(e.target.value)}
              required
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{ style: { color: 'white' } }}
            />
             <FormControlLabel
              control={<Checkbox checked={wantVisitors} onChange={e => setWantVisitors(e.target.checked)} />}
              label="Want Visitors?"
              sx={{ color: 'white' }}
            />
            <CustomButton type="submit" fullWidth variant="contained" disabled={loading}>
              Post Status Update
            </CustomButton>
          </form>
        </StyledBox>
      </Container>
    </ThemeProvider>
  );
};

export default EditPage;
