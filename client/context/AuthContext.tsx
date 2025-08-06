import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  phone: string;
  country: string;
  region: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: Omit<User, 'id' | 'isVerified'>) => void;
  logout: () => void;
  verifyUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // For demo purposes, we'll start with a logged-in user
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Фирдавс Ахрорхонов',
    phone: '+998 90 123 45 67',
    country: 'Uzbekistan',
    region: 'Ташкент',
    isVerified: true
  });

  const isAuthenticated = !!user;

  const login = (userData: Omit<User, 'id' | 'isVerified'>) => {
    setUser({
      ...userData,
      id: Date.now().toString(),
      isVerified: false
    });
  };

  const logout = () => {
    setUser(null);
  };

  const verifyUser = () => {
    if (user) {
      setUser({ ...user, isVerified: true });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      verifyUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
