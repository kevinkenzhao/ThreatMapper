import { Suspense } from 'react';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';

import Button from '../components/button/Button';
import { useAuth } from '../components/routes/auth';

export const Home = () => {
  const { data } = useLoaderData();
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-around dark:text-white">
      <div>Home</div>
      <Suspense fallback={<p className="dark:text-white">Loading...</p>}>
        <Await resolve={data}>
          {(data) => (
            <>
              <div>
                {data.title} : {data.data}
              </div>
              <Button
                onClick={() => {
                  auth?.logout();
                  navigate('/login', {
                    replace: true,
                  });
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
};
