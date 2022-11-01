import { createContext, useCallback, useContext, useMemo } from 'react';
import { z, ZodError } from 'zod';

import {
  api,
  apiWrapper,
  clearLocalStorageToken,
  isResponse,
  isUserSessionActive,
} from '../../api';
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

type ResponseType = {
  data: null;
  error: {
    message: string;
  };
  success: boolean;
};

const LoginSchemaValidation = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(50),
});

export const loginAction = async ({
  request,
}: {
  request: Request;
  params: Record<string, unknown>;
}) => {
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  // validate login input
  try {
    LoginSchemaValidation.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        error: {
          message: 'Please enter correct credentials',
        },
      };
    }
  }

  const apiResponse = await apiWrapper<ResponseType>(
    api.POST<typeof body, ResponseType>('users/login', body),
  );
  if (isResponse(apiResponse)) {
    // do something if repsonse is not type of successfull or unsuccessfull login
    return apiResponse;
  }
  return apiResponse;
};
