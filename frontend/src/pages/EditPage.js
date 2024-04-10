import React, { useState, useEffect } from 'react';
import { addGroceryItem, postStatusUpdate } from '../services/editService';
import { useUserContext } from '../contexts/UserContext';
import {
  //Box,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Container,
  Card,
  CardContent
} from '@mui/material';

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
    // Immediately log the current state of 'groupDetails' in local storage
    console.log('Current groupDetails in storage:', localStorage.getItem('groupDetails'));
    console.log('Current user details in storage', localStorage.getItem('user'))
  
    // Try to parse the 'groupDetails' and set the groupId state
    const storedGroupDetails = JSON.parse(localStorage.getItem('groupDetails'));
    if (storedGroupDetails && storedGroupDetails.groupId) {
      setStoredGroupId(storedGroupDetails.groupId);
    } else {
      // Log an error if no groupId found in local storage
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
    try {
      console.log("User ID:", user.id);
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
    <Container component="main" maxWidth="sm">
      <Card>
        <CardContent>
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
            />
            <TextField
              margin="normal"
              fullWidth
              label="Quantity"
              type="number"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              required
            />
            <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading}>
              Add Grocery Item
            </Button>
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
            />
            <FormControlLabel
              control={<Checkbox checked={wantVisitors} onChange={e => setWantVisitors(e.target.checked)} />}
              label="Want Visitors?"
            />
            <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading}>
              Post Status Update
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EditPage;
