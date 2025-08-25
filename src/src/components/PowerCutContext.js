import React, { createContext, useState, useContext } from "react";

// 1. Create Context
const PowerCutContext = createContext();

// 2. Create Provider Component
export const PowerCutProvider = ({ children }) => {
    // Global state to store announcements
    const [announcements, setAnnouncements] = useState([]);

    // Function to add a new announcement (adds at the top)
    const addAnnouncement = (street, message) => {
        const newAnnouncement = {
            id: Date.now(), // Unique ID based on timestamp
            street,
            message,
            time: new Date().toLocaleTimeString(), // Get current time
        };

        // Add new announcement at the top
        setAnnouncements([newAnnouncement, ...announcements]);
    };

    return (
        <PowerCutContext.Provider value={{ announcements, addAnnouncement }}>
            {children}
        </PowerCutContext.Provider>
    );
};

// 3. Custom hook for easy access to context
export const usePowerCut = () => {
    return useContext(PowerCutContext);
};
