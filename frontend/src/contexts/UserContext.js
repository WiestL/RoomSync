import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Initially, we do not know the user state until we check localStorage
        return null;
    });
    const [loading, setLoading] = useState(true);  // Initial state is loading

    useEffect(() => {
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
            setUser(JSON.parse(storedUserData));  // Set user if found in localStorage
        }
        setLoading(false);  // Set loading to false regardless of user presence
    }, []);

    // Log to check if the user is being loaded properly
    useEffect(() => {
        console.log("Loaded user from storage:", user);
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
