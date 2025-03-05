
import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("auth") === "true"
  );
  const navigate = useNavigate();

  const login = () => {
    localStorage.setItem("auth", "true");
    setIsAuthenticated(true);
    toast("Login successful", {
      description: "Welcome to VIP Financial System",
    });
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
    navigate("/login");
    toast("Logged out successfully", {
      description: "You have been logged out of the system",
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
