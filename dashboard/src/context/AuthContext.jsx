import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Al montar verificamos si hay una sesión guardada localmente
        const loggedUser = localStorage.getItem('reparatech_admin');
        if (loggedUser) {
            setUser(JSON.parse(loggedUser));
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('reparatech_admin', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('reparatech_admin');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
