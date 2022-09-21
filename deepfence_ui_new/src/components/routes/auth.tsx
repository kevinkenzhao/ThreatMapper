import { createContext, useContext, useMemo } from 'react';
import { redirect } from 'react-router-dom';

import { useLocalStorage } from '../hooks/useLocalStorage';

export type AuthUserType = {
  auth: boolean;
};
type AuthContextType = {
  user: AuthUserType;
  setLoginUser: (params: AuthUserType) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setLoginUser] = useLocalStorage<AuthUserType>('user', {
    auth: false,
  });
  const value = useMemo(
    () => ({
      user,
      setLoginUser,
    }),
    [user],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const authLoader = async () => {
  console.log('authLoader');
};

export const authAction = async ({ request, params }) => {
  console.log('authAction: ');
  const formData = await request.formData();
  const firstName = formData.get('username');
  const lastName = formData.get('password');
  console.log('firstName: ', firstName);
  console.log('lastName: ', lastName);
  return redirect('/');
};
