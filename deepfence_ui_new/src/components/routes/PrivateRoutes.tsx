import { Navigate, Outlet, useRouteError } from 'react-router-dom';

import { Typography } from '../typography/Typography';
import { useAuth } from './auth';

const PrivateRoutes = () => {
  const authContext = useAuth();
  return authContext?.user.auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export const RootRouteError = () => {
  const error = useRouteError() as Error;
  console.warn(error.message);
  return (
    <div>
      <h1 className={`${Typography.size['6xl']} ${Typography.weight.bold}`}>
        <pre>Please try in sometime.</pre>
      </h1>
    </div>
  );
};

export default PrivateRoutes;
