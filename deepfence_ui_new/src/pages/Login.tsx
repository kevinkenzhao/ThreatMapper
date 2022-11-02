import cx from 'classnames';
import { useEffect } from 'react';
import { Link, useFetcher, useNavigate } from 'react-router-dom';

import Button from '../components/button/Button';
import { Card } from '../components/card/Card';
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
        <Card className="w-80 p-3 h-96">
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
          <div className="flex flex-col w-full py-5">
            <Button size="sm" color="primary" className="w-full">
              Login
            </Button>
            <Link
              to="/forgot-password"
              className={cx(
                'text-sm text-blue-600 mt-6 text-center',
                'hover:underline',
                'focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-2 dark:focus:ring-gray-400',
              )}
            >
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
        </Card>
      </fetcher.Form>
    </div>
  );
};
