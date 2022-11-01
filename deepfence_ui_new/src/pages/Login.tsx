import cx from 'classnames';
import { useEffect } from 'react';
import { Link, useFetcher, useNavigate } from 'react-router-dom';

import Button from '../components/button/Button';
import TextInput from '../components/input/TextInput';
import { useAuth } from '../components/routes/auth';

export const Login = () => {
  const fetcher = useFetcher();
  const auth = useAuth();
  const navigate = useNavigate();

  const { data, state } = fetcher;

  /**
   * on successfull login and before navigating to home page,
   * set localstorage and auth context value
   */
  useEffect(() => {
    if (data && data.success) {
      auth?.setLoginUser({
        auth: true,
      });
      auth?.addLocalStorageToken(data?.data.access_token, data?.data.refresh_token);
      return navigate('/home', {
        replace: true,
      });
    }
  }, [data]);

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
            name="email"
          />
          <TextInput
            label="Password"
            type={'password'}
            placeholder="Password"
            className="py-2"
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
          <div>
            {data?.error
              ? data.error.message
              : state === 'submitting'
              ? 'Loading...'
              : null}
          </div>
        </div>
      </fetcher.Form>
    </div>
  );
};
