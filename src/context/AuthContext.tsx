
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string, remember: boolean) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is already authenticated on load
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('vip_auth_token');
      if (token) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    
    // Simulate a slight delay to allow animations to play
    const timer = setTimeout(() => {
      checkAuth();
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const login = (password: string, remember: boolean): boolean => {
    // This is a simple implementation. In a real app, you'd want to validate with a server
    if (password === '0585676722') {
      setIsAuthenticated(true);
      if (remember) {
        localStorage.setItem('vip_auth_token', 'authenticated');
      } else {
        sessionStorage.setItem('vip_auth_token', 'authenticated');
      }
      toast.success('Login successful');
      return true;
    } else {
      toast.error('Invalid password');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('vip_auth_token');
    sessionStorage.removeItem('vip_auth_token');
    toast.info('You have been logged out');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
