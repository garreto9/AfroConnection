import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setUser({
            name: decodedToken.nome,
            role: decodedToken.role,
            profilePicture: `https://placehold.co/40x40/${decodedToken.role === 'admin' ? '9a3412' : 'c2410c'}/FFFFFF?text=${decodedToken.nome.charAt(0)}`
          });
        } else {
          sessionStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error("Token inválido:", error);
        sessionStorage.removeItem('authToken');
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha: password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Email ou senha inválidos.');
      }

      const data = await response.json();
      const { token } = data;

      sessionStorage.setItem('authToken', token);

      const decodedToken = jwtDecode(token);
      setUser({
        name: decodedToken.nome,
        role: decodedToken.role,
        profilePicture: `https://placehold.co/40x40/${decodedToken.role === 'admin' ? '9a3412' : 'c2410c'}/FFFFFF?text=${decodedToken.nome.charAt(0)}`
      });

      return { success: true };

    } catch (error) {
      console.error("Falha no login:", error);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    sessionStorage.removeItem('authToken');
    setUser(null);
  };

  const updateUserProfile = (updatedData) => {
    setUser(currentUser => ({
        ...currentUser,
        ...updatedData
    }));
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    logout,
    updateUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
