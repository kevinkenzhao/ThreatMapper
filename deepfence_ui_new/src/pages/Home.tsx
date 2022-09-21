import { Suspense } from 'react';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';

import Button from '../components/button/Button';
import { useLocalStorage } from '../components/hooks/useLocalStorage';

export const Home = () => {
  const { data } = useLoaderData();
  const [, setValueInLocalStorage] = useLocalStorage('user', {});
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-around dark:text-white">
      <div>Home</div>
      <Suspense fallback={<p className="dark:text-white">Loading...</p>}>
        <Await resolve={data} errorElement={<p>Error loading </p>}>
          {(data) => (
            <>
              <div>
                {data.title} : {data.data}
              </div>
              <Button
                onClick={() => {
                  setValueInLocalStorage({
                    auth: false,
                  });
                  navigate('/login');
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
