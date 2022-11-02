import { createContext, useCallback, useContext, useMemo } from 'react';

import { clearLocalStorageToken, isUserSessionActive } from '../../api';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type AuthUserType = {
  auth: boolean;
};
type AuthContextType = {
  user: AuthUserType;
  setLoginUser: (params: AuthUserType) => void;
  logout: () => void;
  addLocalStorageToken: (access_token: string, refresh_token: string) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setLoginUser] = useLocalStorage<AuthUserType>('user', {
    auth: false,
  });

  const logout = useCallback(() => {
    setLoginUser({
      auth: false,
    });
    clearLocalStorageToken();
  }, []);

  const addLocalStorageToken = useCallback(
    (access_token: string, refresh_token: string) => {
      addLocalStorageToken(access_token, refresh_token);
    },
    [],
  );

  const value = useMemo(
    () => ({
      user,
      setLoginUser,
      logout,
      addLocalStorageToken,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
