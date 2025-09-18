

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

export const AppContext = createContext();



export const AppContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [technicians, setTechnicians] = useState([]);
    const [token, setToken] = useState('');

    const getTechniciansData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/technician/list');
            if (data.success) {
                setTechnicians(data.technicians);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Check localStorage for a token on initial load
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        getTechniciansData();
    }, []);

    const value = {
        technicians,
        token,
        setToken,
        backendUrl,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};