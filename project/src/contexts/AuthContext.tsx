import React, { createContext, useState, useContext, useEffect } from "react";
import { User, AuthContextType } from "../types";

// Mock authentication - In a real app, this would use a backend API
const mockUsers: User[] = [
  {
    id: "1",
    email: "demo@example.com",
    name: "Demo User",
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored user in localStorage on initial load
    const storedUser = localStorage.getItem("taskmate-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock login logic (replace with real API call in production)
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem("taskmate-user", JSON.stringify(foundUser));
      } else {
        // For demo purposes, create a new user if not found
        const newUser = {
          id: Date.now().toString(),
          email,
          name: email.split('@')[0],
        };
        mockUsers.push(newUser);
        setUser(newUser);
        localStorage.setItem("taskmate-user", JSON.stringify(newUser));
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if user already exists
      const userExists = mockUsers.some(u => u.email === email);
      
      if (userExists) {
        throw new Error("User already exists");
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        name: name || email.split('@')[0],
      };
      
      mockUsers.push(newUser);
      setUser(newUser);
      localStorage.setItem("taskmate-user", JSON.stringify(newUser));
    } catch (err) {
      setError("Registration failed. User may already exist.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("taskmate-user");
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      loading,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};