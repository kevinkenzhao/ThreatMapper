import cx from 'classnames';
import { useEffect } from 'react';
import { Form, Link, useFetcher, useNavigate } from 'react-router-dom';

import Button from '../components/button/Button';
import { useLocalStorage } from '../components/hooks/useLocalStorage';
import TextInput from '../components/input/TextInput';
import { AuthUserType, useAuth } from '../components/routes/auth';

export const Login = () => {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [user, setValueInLocalStorage] = useLocalStorage<AuthUserType>('user', {
    auth: false,
  });
  const auth = useAuth();

  useEffect(() => {
    if (user.auth) {
      auth?.setLoginUser({
        auth: true,
      });
      navigate('/');
    }
  }, [user]);

  // method
  const onLogin = () => {
    setValueInLocalStorage({
      auth: true,
    });
    auth?.setLoginUser({
      auth: true,
    });

    navigate('/');
  };

  return (
    <div className="h-full flex items-center justify-center">
      <fetcher.Form method="post">
        <div
          className={cx(
            'w-80 p-3 h-96 flex flex-col items-center justify-center rounded-lg bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.08)]',
            'dark:bg-gray-800',
          )}
        >
          <TextInput
            label="Username"
            type={'text'}
            placeholder="Username"
            sizing="sm"
            name="username"
          />
          <TextInput
            label="Password"
            type={'password'}
            placeholder="Password"
            className="py-5"
            sizing="sm"
            name="password"
          />
          <div className="flex items-baseline justify-between w-full py-5">
            <Button size="xs" color="primary">
              Login
            </Button>
            <Link to="/forget-password" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>
      </fetcher.Form>
    </div>
  );
};
