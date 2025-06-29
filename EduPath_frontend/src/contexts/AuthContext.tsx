import { createContext, useContext, useEffect, useState } from "react";
import UserRole from "../types/UserRole";

type AuthContextType = {
 isAuthenticated: boolean;
  username: string | null;
  userRole: UserRole | null;
  userId: string | null;
  authReady: boolean;
  login: (email: string, role: UserRole, token: string, id: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  username: '',
  userRole: null,
  userId: '',
  login: () => {},
  logout: () => {},
  authReady: false,
});
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [username, setUsername] = useState('');
//   const [userRole, setUserRole] = useState<UserRole | null>(null);

//   useEffect(() => {
//     const token = sessionStorage.getItem('accessToken');
//     const savedUser = sessionStorage.getItem('user');
//     const [authReady, setAuthReady] = useState(false);


//     if (token && savedUser) {
//     try {
//       const userData = JSON.parse(savedUser);
//       console.log("userData loaded from sessionStorage:", userData);
//       setIsAuthenticated(true);
//       setUsername(userData.email);
//       setUserRole(userData.role);
//       console.log(userData.role)
//     } catch (err) {
//       console.error('Invalid user data in sessionStorage:', err);
//       logout();
//     }
//   }
//     setAuthReady(true); // <-- set authReady to true after checking sessionStorage
// }, []);

// const login = (email: string, role: UserRole, token: string) => {
//   const normalizedRole = role.toLowerCase() as UserRole;

//   setIsAuthenticated(true);
//   setUsername(email);
//   setUserRole(normalizedRole);
//   sessionStorage.setItem('accessToken', token);
//   sessionStorage.setItem('user', JSON.stringify({ email, role: normalizedRole }));
// };


//   const logout = () => {
//     setIsAuthenticated(false);
//     setUsername('');
//     setUserRole(null);
//     sessionStorage.removeItem('accessToken');
//     sessionStorage.removeItem('user');
//     window.location.href = '/login';
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, username, userRole, login, logout, authReady}}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userId, setUserId] = useState('');
  const [authReady, setAuthReady] = useState(false); // ✅ moved here

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    const savedUser = sessionStorage.getItem('user');

    if (token && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setIsAuthenticated(true);
        setUsername(userData.email);
        setUserRole(userData.role);
        setUserId(userData.id);
      } catch (err) {
        console.error('Invalid user data in sessionStorage:', err);
        logout();
      }
    }

    setAuthReady(true); // ✅ this is safe here
  }, []);

  const login = (email: string, role: UserRole, token: string, id: string) => {
    const normalizedRole = role.toLowerCase() as UserRole;

    setIsAuthenticated(true);
    setUsername(email);
    setUserRole(normalizedRole);
    setUserId(id);
    sessionStorage.setItem('accessToken', token);
    sessionStorage.setItem('user', JSON.stringify({ email, role: normalizedRole, id }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setUserRole(null);
    setUserId('');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, userRole, userId, authReady, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
