import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Initially, we do not know the user state until we check localStorage
        return null;
    });
    const [groupId, setGroupId] = useState(null);  // Manage group ID state
    const [loading, setLoading] = useState(true);  // Initial state is loading

    useEffect(() => {
        const storedUserData = localStorage.getItem('user');
        const storedGroupId = localStorage.getItem('groupId');  // Potentially store group ID in local storage

        if (storedUserData) {
            setUser(JSON.parse(storedUserData));  // Set user if found in localStorage
        }
        if (storedGroupId) {
            setGroupId(storedGroupId);  // Set groupId from localStorage
        }
        setLoading(false);  // Set loading to false regardless of user or group presence
    }, []);

    // Log to check if the user and group are being loaded properly
    useEffect(() => {
        console.log("Loaded user from storage:", user);
        console.log("Loaded groupId from storage:", groupId);
    }, [user, groupId]);

    return (
        <UserContext.Provider value={{ user, setUser, groupId, setGroupId, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
