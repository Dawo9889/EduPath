import { createContext, useContext, useEffect, useState } from "react";
import UserRole from "../types/UserRole";

type AuthContextType = {
  isAuthenticated: boolean;
  username: string | null;
  userRole: UserRole | null;
  login: (email: string, role: UserRole, token: string) => void;
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
      console.log("userData loaded from sessionStorage:", userData);
      setIsAuthenticated(true);
      setUsername(userData.email);
      setUserRole(userData.role);
      console.log(userData.role)
    } catch (err) {
      console.error('Invalid user data in sessionStorage:', err);
      logout();
    }
  }
}, []);

  const login = (email: string, role: UserRole, token: string) => {
    setIsAuthenticated(true);
    setUsername(email);
    setUserRole(role);
    sessionStorage.setItem('accessToken', token);
    sessionStorage.setItem('user', JSON.stringify({ email, role }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setUserRole(null);
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);