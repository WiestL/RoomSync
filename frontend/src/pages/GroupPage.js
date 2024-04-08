import React, { useState, useEffect, useCallback } from 'react';
import { checkGroupMembership, joinGroupWithCode } from '../services/groupService';
import { useUserContext } from '../contexts/UserContext';

const GroupPage = () => {
  const { user } = useUserContext();
  const [groupDetails, setGroupDetails] = useState(null);
  const [invitationCode, setInvitationCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchGroupDetails = useCallback(async () => {
    if (!user?.id) {
      setError('No user ID found.');
      return; // Early return if user ID is not available
    }
    setIsLoading(true);
    try {
      const details = await checkGroupMembership(user.id);
      if (details && details.groupId) {
        setGroupDetails(details);
      } else {
        setGroupDetails(null);
        setError("You are not in any group.");
      }
    } catch (err) {
      setError('Unable to check if you are in a group. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);  // Dependency here is crucial for re-checking when user changes

  useEffect(() => {
    console.log('Current user in context:', user);
    if (user?.id) {
      fetchGroupDetails();
    } else {
      setError('No user ID found. Please log in.'); // Set an initial error if no user is logged in
    }
  }, [user, user?.id, fetchGroupDetails]);  // Include user?.id in the dependency array

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
        await fetchGroupDetails();
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
    <div>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {groupDetails ? (
        <div>
          <h2>Your Group</h2>
          <p>Group Name: {groupDetails.name}</p>
          {/* Additional group info */}
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={invitationCode}
            onChange={e => setInvitationCode(e.target.value)}
            placeholder="Enter group join code"
          />
          <button onClick={handleJoinGroup} disabled={isLoading || !user?.id}>Join Group</button>
        </div>
      )}
    </div>
  );
};

export default GroupPage;
