import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkGroupMembership, joinGroupWithCode, getGroupStatuses, getGroupGroceryList, createGroup } from '../services/groupService';
import { useUserContext } from '../contexts/UserContext';
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
//import Card from '@mui/material/Card';
//import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
//import Alert from '@mui/material/Alert';
import { theme, StyledBox, CustomButton } from './LoginPage'; 


const GroupPage = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [groupDetails, setGroupDetails] = useState(null);
  const [invitationCode] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [groupGroceryList, setGroupGroceryList] = useState([]);
  const [groupStatuses, setGroupStatuses] = useState([]);

  const fetchDetails = useCallback(async () => {
    if (!user?.id) {
      setError('No user ID found.');
      return;
    }
    setIsLoading(true);
    try {
      const details = await checkGroupMembership(user.id);
      if (details && details.groupId) {
        setGroupDetails(details);
        const statuses = await getGroupStatuses(details.groupId);
        const groceries = await getGroupGroceryList(details.groupId);
        setGroupStatuses(statuses);
        setGroupGroceryList(groceries);
        localStorage.setItem('groupDetails', JSON.stringify(details));
      } else {
        setError("You are not in any group.");
      }
    } catch (err) {
      setError('Unable to fetch group details. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleJoinGroup = async () => {
    if (!user?.id) {
      setError('No user ID found. Please log in before joining a group.');
      return;
    }
    if (!invitationCode.trim()) {
      setError('Please enter a valid invitation code.');
      return;
    }
    setIsLoading(true);
    try {
      const result = await joinGroupWithCode(invitationCode);
      if (result && result.success) {
        fetchDetails();
      } else {
        setError('Failed to join the group with provided code.');
      }
    } catch (err) {
      setError('An error occurred while trying to join the group.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) {
      setError('Please enter a group name to create a group.');
      return;
    }
    setIsLoading(true);
    try {
      const result = await createGroup(newGroupName);
      if (result && result.groupId) {
        fetchDetails();
      } else {
        setError('Failed to create group.');
      }
    } catch (err) {
      setError('An error occurred while trying to create a group.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <StyledBox>
          {error && <Typography color="error">{error}</Typography>}
          {isLoading && <CircularProgress />}
          {groupDetails ? (
          <StyledBox>
            <Typography variant="subtitle1">Group Name: {groupDetails.groupName || "N/A"}</Typography>
            <Typography variant="subtitle1">Invitation Code: {groupDetails.invitationCode || "N/A"}</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>Group Statuses</Typography>
            <List>
              {groupStatuses.map(status => (
                <ListItem key={status.id}>
                  <ListItemText primary={`${status.name}: ${status.statusText}`} 
                  secondary={new Date(status.timestamp).toLocaleString() - status.wantVisitors ? "Open to Visitors" : "Not Open to Visitors"} />
                  <Divider />
                </ListItem>
              ))}
            </List>
            <Typography variant="h6" sx={{ mt: 2 }}>Grocery List</Typography>
            <List>
              {groupGroceryList.map(item => (
                <ListItem key={item.id}>
                  <ListItemText primary={item.itemName} 
                  secondary={`Quantity: ${item.quantity}`} />
                  <Divider />
                </ListItem>
              ))}
            </List>
            <Button variant="contained" color="primary" onClick={() => navigate('/edit')} sx={{ mt: 2 }}>
              Manage Group
            </Button>
          </StyledBox>
        ) : (
          <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Invitation Code"
              value={newGroupName}
              onChange={e => setNewGroupName(e.target.value)}
            />
            <CustomButton // Use CustomButton instead of Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleJoinGroup}
              disabled={isLoading || !user?.id}
            >
              Join Group
            </CustomButton>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="New Group Name"
              value={newGroupName}
              onChange={e => setNewGroupName(e.target.value)}
            />
             <CustomButton // Use CustomButton instead of Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleCreateGroup}
                disabled={isLoading}
              >
              Create Group
              </CustomButton>
            </Box>
          )}
        </StyledBox>
      </Container>
    </ThemeProvider>
  );
};

export default GroupPage;
