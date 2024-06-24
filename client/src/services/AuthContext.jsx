import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulamos la obtención de datos del usuario autenticado
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/auth/user'); // Ajusta esta ruta según tu API
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
