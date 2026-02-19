import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const getStoredAuth = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return { token, user: user ? JSON.parse(user) : null };
};

export const AuthProvider = ({ children }) => {
  const [{ token, user }, setAuthState] = useState(getStoredAuth());

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [token, user]);

  const login = (payload) => setAuthState({ token: payload.token, user: payload.user });
  const logout = () => setAuthState({ token: null, user: null });

  return <AuthContext.Provider value={{ token, user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
