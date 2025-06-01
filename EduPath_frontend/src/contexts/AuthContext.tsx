import { createContext, useContext, useEffect, useState } from "react";
import UserRole from "../types/UserRole";
import { whoami } from "../api/api";

type AuthContextType = {
  isAuthenticated: boolean;
  username: string | null;
  userRole: UserRole | null;
  login: (username: string, role: UserRole) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  username: '',
  userRole: null,
  login: () => {},
  logout: () => {},
});
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    const savedUser = sessionStorage.getItem('user');

    if (token && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setIsAuthenticated(true);
        setUsername(userData.email);
        setUserRole(userData.role);
      } catch {
        logout();
      }
    }
  }, []);

  const login = (email: string, role: UserRole) => {
    setIsAuthenticated(true);
    setUsername(email);
    setUserRole(role);
    sessionStorage.setItem('user', JSON.stringify({ email, role }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setUserRole(null);
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);