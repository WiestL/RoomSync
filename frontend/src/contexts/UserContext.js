import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUserData = localStorage.getItem('user');
        return storedUserData ? JSON.parse(storedUserData) : null;
    });

    // Log to check if the user is being loaded properly
    useEffect(() => {
        console.log("Loaded user from storage:", user);
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
