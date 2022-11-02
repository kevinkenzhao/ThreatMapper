import cx from 'classnames';
import { Link, useFetcher } from 'react-router-dom';

import Button from '../components/button/Button';
import { Card } from '../components/card/Card';
import TextInput from '../components/input/TextInput';

export const ForgetPassword = () => {
  const fetcher = useFetcher();
  const { data, state } = fetcher;
  console.log('data:', data?.errors);
  return (
    <div className="h-full flex items-center justify-center">
      <fetcher.Form method="post">
        <Card className="w-80 p-3">
          <TextInput
            label="New Password"
            type={'text'}
            placeholder="New Password"
            sizing="sm"
            name="newPassword"
            required
            color={data?.errors?.newPassword ? 'error' : 'default'}
            helperText={data?.errors?.newPassword?.[0]}
          />
          <TextInput
            label="Confirm New Password"
            type={'password'}
            placeholder="Confirm New Password"
            className="py-2"
            sizing="sm"
            name="confirmNewPassword"
            required
            color={data?.errors?.confirmNewPassword ? 'error' : 'default'}
            helperText={data?.errors?.confirmNewPassword?.[0]}
          />
          <div className="flex flex-col w-full py-5">
            <Button size="sm" color="primary" className="w-full">
              Submit
            </Button>
            <Link
              to="/login"
              className={cx(
                'text-sm text-blue-600 mt-6 text-center',
                'hover:underline',
                'focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-2 dark:focus:ring-gray-400',
              )}
            >
              Back to Login
            </Link>
          </div>
          <div>{state === 'submitting' ? 'Loading...' : null}</div>
        </Card>
      </fetcher.Form>
    </div>
  );
};
