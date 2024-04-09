import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import React, { useState, useEffect, useCallback } from 'react';
import { checkGroupMembership, joinGroupWithCode, getGroupStatuses, getGroupGroceryList } from '../services/groupService';
import { useUserContext } from '../contexts/UserContext';

const GroupPage = () => {
  const { user } = useUserContext();
  const [groupDetails, setGroupDetails] = useState(null);
  const [invitationCode, setInvitationCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [groupGroceryList, setGroupGroceryList] = useState([]);
  const [groupStatuses, setGroupStatuses] = useState([]);

  const fetchDetails = useCallback(async () => {
    if (!user?.id) {
      setError('No user ID found.');
      return; // Early return if user ID is not available
    }
    setIsLoading(true);
    try {
      const details = await checkGroupMembership(user.id);
      if (details && details.groupId) {
        const statuses = await getGroupStatuses(details.groupId);
        setGroupStatuses(statuses);
        const groceries = await getGroupGroceryList(details.groupId);
        setGroupGroceryList(groceries);
        setGroupDetails(details);
      } else {
        setGroupDetails(null);
        setError("You are not in any group.");
      }
    } catch (err) {
      setError('Unable to fetch group details. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]); // Dependency on user?.id to update fetchDetails when user.id changes

  useEffect(() => {
    fetchDetails(); // Call fetchDetails when the component mounts or user.id changes
  }, [fetchDetails]); // Only re-run the effect if fetchDetails changes

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
        await fetchDetails();  // fetchDetails after joining a new group
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

  return (
    <Container component="main" maxWidth="sm">
      {error && <Typography color="error">{error}</Typography>}
      {isLoading && <CircularProgress />}
      {groupDetails ? (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5">Your Group</Typography>
            <Typography variant="subtitle1">Group Name: {groupDetails.name}</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>Group Statuses</Typography>
            <List>
              {groupStatuses.map(status => (
                <React.Fragment key={status.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText 
                      primary={status.statusText} 
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            {new Date(status.timestamp).toLocaleString()}
                          </Typography>
                          {status.wantVisitors ? " - Open to visitors" : " - Not open to visitors"}
                        </>
                      } 
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
            <Typography variant="h6" sx={{ mt: 2 }}>Grocery List</Typography>
            <List>
              {groupGroceryList.map(item => (
                <React.Fragment key={item.id}>
                  <ListItem>
                    <ListItemText 
                      primary={item.itemName} 
                      secondary={`Quantity: ${item.quantity}`}
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ mt: 4 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Group Join Code"
            value={invitationCode}
            onChange={e => setInvitationCode(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleJoinGroup}
            disabled={isLoading || !user?.id}
            sx={{ mt: 3, mb: 2 }}
          >
            Join Group
          </Button>
        </Box>
      )}
    </Container>
  );
};


export default GroupPage;
