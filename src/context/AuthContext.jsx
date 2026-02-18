import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing session
        const storedUser = localStorage.getItem('ub_session');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (userData, role) => {
        const sessionData = { ...userData, appRole: role };
        setUser(sessionData);
        localStorage.setItem('ub_session', JSON.stringify(sessionData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('ub_session');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
